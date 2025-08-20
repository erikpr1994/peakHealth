import baseConfig from '../../eslint.config.js';
import playwrightPlugin from 'eslint-plugin-playwright';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: (await import('@typescript-eslint/parser')).default,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        process: 'readonly',
      },
    },
  },
  {
    files: ['tests/**/*.ts', 'playwright.config.ts'],
    plugins: {
      playwright: playwrightPlugin,
    },
    rules: {
      'playwright/expect-expect': 'off',
      'playwright/no-focused-test': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/no-wait-for-timeout': 'warn', // Changed from error to warn
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/valid-expect': 'error',
    },
  },
];
