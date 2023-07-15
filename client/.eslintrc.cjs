/* eslint-env node */

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react', 'react-refresh'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
        'plugin:storybook/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': 'error',
    },
    env: {
        browser: true,
        es2021: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
