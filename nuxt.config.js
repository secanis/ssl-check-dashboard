import bootstrap from './.nest/nest.js';

const isProd = process.env.NODE_ENV === 'production';

const config = async () => ({
    srcDir: 'client/',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'ssl-check-dashboard',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        script: [],
    },

    serverMiddleware: isProd
        ? [{ path: '/api', handler: await bootstrap() }]
        : [],

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://www.npmjs.com/package/nuxt-socket-io
        'nuxt-socket-io',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: `http://localhost:${isProd ? 3000 : 4000}/api`,
    },

    io: {
        sockets: [
            {
                name: 'sslcache',
                url: `http://localhost:${isProd ? 3000 : 4000}/api/ws`,
            },
        ],
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
});

export default config;
