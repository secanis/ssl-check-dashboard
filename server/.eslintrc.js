module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: ['prettier'],
    plugins: ['simple-import-sort'],
    // add your custom rules here
    rules: {
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-unused-vars': ['info'],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
};
