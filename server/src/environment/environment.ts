export interface scdEnvironment {
    hosts?: string[];
    cron?: string;
    production?: boolean;
    port?: number;
    svelte?: {
        outDir?: string;
    };
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
