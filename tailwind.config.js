const production = !process.env.ROLLUP_WATCH;
module.exports = {
    future: {
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
    },
    plugins: [],
    purge: {
        content: ['./client/**/*.svelte'],
        enabled: production, // disable purge in dev
        options: {
            safelist: [
                // for sll entry bubbles
                'bg-red-100',
                'bg-blue-100',
                'bg-red-500',
                'bg-blue-500',
                // for state
                'bg-blue-200',
                'bg-red-200',
                'text-blue-500',
                'text-red-500',
                'animate-pulse',
            ],
        },
    },
};
