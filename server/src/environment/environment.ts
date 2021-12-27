import * as crypto from 'crypto';

export interface scdEnvironment {
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

const HOST_LIST: string[] = process.env.HOST_LIST
    ? process.env.HOST_LIST.split(',').map((i) => i.trim())
    : [];

const ENV = process.env.NODE_ENV;
let config: scdEnvironment = {
    hosts: HOST_LIST,
    cron: process.env.CRON || '0 */12 * * *',
    production: ENV === 'production',
    port: 3000,
    svelte: {
        outDir: './pages',
    },
    auth: {
        username: process.env.USERNAME || 'admin',
        password: process.env.PASSWORD || 'admin',
        secret: process.env.SECRET || crypto.randomUUID(),
    },
    logger: process.env.LOG_LEVEL?.split(',') || ['error', 'warn'],
};

if (!config.production) {
    try {
        const confPath = './environment.dev';
        const devConfig = require(confPath)?.configuration;
        config = { ...config, ...devConfig };
        console.log(`loaded config: ${confPath}`);
    } catch {
        console.log(`loaded default config`);
    }
}

export default () => config;
