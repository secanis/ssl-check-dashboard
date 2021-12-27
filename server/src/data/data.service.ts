import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import sslChecker from 'ssl-checker';

import { Server } from 'socket.io';
import { SslCheck, SslCheckState, SslError } from '../types';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DataService {
    private readonly logger = new Logger(DataService.name);
    currentState: { queue: Set<string>; processing: Set<string> } = {
        queue: new Set(),
        processing: new Set(),
    };

    private errors: Map<string, string | null> = new Map();
    socket: Server;

    constructor(private readonly dbService: InMemoryDBService<SslCheck>) {
        this.processQueue();
    }

    addToQueue(hostnames: string[]) {
        hostnames.forEach(this.currentState.queue.add, this.currentState.queue);
        this.emitState();
    }

    private removeFromQueue(hostname: string) {
        this.currentState.queue.delete(hostname);
        this.currentState.processing.add(hostname);
        this.emitState();
    }

    private removeFromProcessing(hostname: string) {
        this.currentState.processing.delete(hostname);
        this.emitState();
    }

    processQueue() {
        setInterval(async () => {
            if (this.currentState.queue.size > 0) {
                const iterator = this.currentState.queue.values();
                const hostnameToProcess = iterator.next().value;
                this.removeFromQueue(hostnameToProcess);
                this.logger.log(`hostname checked: ${hostnameToProcess}`);

                let result;

                try {
                    result = {
                        ...(await sslChecker(hostnameToProcess)),
                        host: hostnameToProcess,
                        state: SslCheckState.OK,
                        message: '',
                    };

                    this.removeFromProcessing(hostnameToProcess);
                    this.errors.delete(hostnameToProcess);
                } catch (e) {
                    result = {
                        host: hostnameToProcess,
                        state: SslCheckState.ERROR,
                        message: e.message,
                        valid: false,
                        validFrom: null,
                        validTo: null,
                        daysRemaining: 0,
                        validFor: [],
                    };
                    setTimeout(
                        (_) => this.addToQueue([hostnameToProcess]),
                        30000
                    );
                    this.errors.set(hostnameToProcess, e.message);
                    this.logger.warn(e.message, 'could not process, try again');
                } finally {
                    this.setItemToDBAndSend(hostnameToProcess, result);
                    const allChecks = this.dbService.getAll();
                    this.socket.emit('data', allChecks);
                    this.emitErrors();
                }
            }
        }, 1000);
    }

    setItemToDBAndSend(host: string, result: SslCheck) {
        const existing = this.dbService.query((record) => record.host === host);

        if (existing.length > 0) {
            this.dbService.update({ ...existing[0], ...result });
        } else {
            this.dbService.create(result);
        }
    }

    emitState() {
        this.socket.emit('queuestate', {
            queue: this.currentState.queue.size,
            processing: this.currentState.processing.size,
        });
    }

    async emitData() {
        const currentResults = await this.getCurrentResults();
        this.socket.emit('data', currentResults);
    }

    emitErrors(errs: SslError[] = this.getErrors()) {
        this.socket.emit('sslerrors', errs);
    }

    getCurrentResults() {
        return this.dbService.getAll();
    }

    getErrors(): SslError[] {
        return Array.from(this.errors, ([host, message]) => ({
            host,
            message,
        }));
    }
}
