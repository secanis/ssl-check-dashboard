import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CronJob } from 'cron';

import { SslCheck } from '../types';
import { DataService } from './data.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class DataController {
    private readonly logger = new Logger(DataController.name);

    constructor(
        private readonly dataService: DataService,
        private readonly configService: ConfigService,
    ) {
        const hosts = this.configService.get('hosts');
        const cron = this.configService.get('cron');

        this.logger.debug(`configured hosts: ${hosts}`);
        this.logger.debug(`configured cron: ${cron}`);

        // wait a short time for initializing socket to start the queue
        setTimeout(() => this.startQueueCron(hosts, cron), 500);
    }

    @Get('/data/queue')
    async getQueue(): Promise<string[]> {
        return [...this.dataService.currentState.queue];
    }

    @Get('/data/processing')
    async getProcessing(): Promise<string[]> {
        return [...this.dataService.currentState.processing];
    }

    @Get('/data/cache')
    async getCache(): Promise<SslCheck[]> {
        return this.dataService.getCurrentResults();
    }

    @Get('/socket')
    async getSocket(): Promise<any> {
        const sockets = await this.dataService.socket.fetchSockets();
        return sockets.map((s) => s.id);
    }

    private startQueueCron(hosts: string[], cronTime: string) {
        const job = new CronJob(
            cronTime,
            () => {
                this.dataService.addToQueue(hosts);
            },
            null,
            false,
            undefined,
            null,
            true,
        );
        job.start();
    }
}
