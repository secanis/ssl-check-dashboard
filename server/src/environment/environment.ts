import { ConfigModule } from '@nestjs/config';
import * as crypto from 'crypto';

export interface ScdEnvironment {
    hosts?: string[];
    cron?: string;
    production?: boolean;
    port?: number;
    svelte?: {
        outDir?: string;
    };
    auth?: {
        username: string;
        password: string;
        secret: string;
    };
    logger?: string[];
}

export default async (): Promise<ScdEnvironment> => {
    await ConfigModule.envVariablesLoaded;

    const HOST_LIST: string[] = process.env.HOST_LIST
        ? process.env.HOST_LIST.split(',').map((i) => i.trim())
        : [];

    return {
        hosts: HOST_LIST,
        cron: process.env.CRON ?? '0 */12 * * *',
        production: process.env.NODE_ENV === 'production',
        port: 3000,
        svelte: {
            outDir: './pages',
        },
        auth: {
            username: process.env.USERNAME ?? 'admin',
            password: process.env.PASSWORD ?? 'admin',
            secret: process.env.SECRET ?? crypto.randomUUID(),
        },
        logger: process.env.LOG_LEVEL?.split(',') || ['error', 'warn'],
    };
};
