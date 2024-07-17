import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';

import { Server } from 'socket.io';
import { SslCheck, SslCheckState, SslError } from '../types';
import { getSSLCertificateInfo } from './cert-check';

@Injectable()
export class DataService implements OnApplicationShutdown {
    private readonly logger = new Logger(DataService.name);
    private inMemoryDb = new Map<string, SslCheck>();

    currentState: { queue: Set<string>; processing: Set<string> } = {
        queue: new Set(),
        processing: new Set(),
    };

    private errors: Map<string, string | null> = new Map();
    socket: Server = new Server();

    constructor() {
        // initial timeout to start the queue
        setTimeout(() => this.processQueue(), 5000);
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

                let result: SslCheck = {
                    host: hostnameToProcess,
                    state: SslCheckState.PROCESSING,
                    message: '',
                    valid: false,
                    validFrom: '',
                    validTo: '',
                    validationError: null,
                    daysRemaining: 0,
                    validFor: [],
                    id: hostnameToProcess,
                    usedCipher: {},
                };

                try {
                    const res = await getSSLCertificateInfo(hostnameToProcess);
                    result = {
                        ...res,
                        host: hostnameToProcess,
                        state: SslCheckState.OK,
                    };
                    // this.logger.debug(result, result.host);
                    this.removeFromProcessing(hostnameToProcess);
                    this.errors.delete(hostnameToProcess);
                } catch (err: any) {
                    result = {
                        ...result,
                        state: SslCheckState.ERROR,
                        valid: false,
                        validationError: err.message,
                        message: err.message,
                    };
                    setTimeout(
                        () => this.addToQueue([hostnameToProcess]),
                        30000,
                    );
                    this.errors.set(hostnameToProcess, err.message);
                    this.logger.warn(
                        err.message,
                        'could not process, try again',
                    );
                } finally {
                    this.setItemToDBAndSend(hostnameToProcess, result);
                    const allChecks: SslCheck[] = Array.from(
                        this.inMemoryDb.values(),
                    );
                    this.socket.emit('data', allChecks);
                    this.emitErrors();
                }
            }
        }, 1000);
    }

    setItemToDBAndSend(host: string, result: SslCheck) {
        const existing = this.inMemoryDb.get(host);

        if (existing) {
            this.inMemoryDb.set(host, { ...existing, ...result });
        } else {
            this.inMemoryDb.set(host, result);
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

    getCurrentResults(): SslCheck[] {
        return Array.from(this.inMemoryDb.values());
    }

    getErrors(): SslError[] {
        return Array.from(this.errors, ([host, message]) => ({
            id: host,
            host: host || 'no host',
            message: message ?? 'no message',
        }));
    }

    onApplicationShutdown() {
        this.socket.disconnectSockets();
    }
}
