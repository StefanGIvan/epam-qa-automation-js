const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    {
        ignores: [
            '**/node_modules/**',
            '**/playwright-report/**',
            '**/test-results/**',
            '**/cypress/reports/**',
            '**/cypress/screenshots/**',
            '**/cypress/videos/**',
            '**/reports/**',
            '**/coverage/**',
        ],
    },

    js.configs.recommended,

    {
        files: ['**/*.js'],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.mocha,

                cy: 'readonly',
                Cypress: 'readonly',

                $: 'readonly',
                $$: 'readonly',
                browser: 'readonly',
            },
        },

        rules: {
            'no-console': 'off',
            'no-unused-vars': 'warn',
        },
    },
];
