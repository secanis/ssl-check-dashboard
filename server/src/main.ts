import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, LogLevel } from '@nestjs/common';
import { setupGracefulShutdown } from 'nestjs-graceful-shutdown';

const allLogLevels: LogLevel[] = [
    'verbose',
    'debug',
    'log',
    'warn',
    'error',
    'fatal',
];
const levels = allLogLevels.slice(
    allLogLevels.indexOf((process.env.LOG_LEVEL ?? 'debug') as LogLevel),
    allLogLevels.length,
);

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
        {
            logger: levels,
        },
    );
    const configService = app.get(ConfigService);
    const logger = new Logger('bootstrap');

    app.enableCors({ origin: '*' });
    app.setGlobalPrefix('/api');

    setupGracefulShutdown({ app });

    logger.debug(`Server running on port ${configService.get<number>('port')}`);
    await app.listen(configService.get<number>('port')!);
}

bootstrap();
export default bootstrap;
