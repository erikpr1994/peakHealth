import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  {
    files: ['tests/**/*.ts', 'playwright.config.ts'],
    rules: {
      'playwright/expect-expect': 'off',
      'playwright/no-focused-test': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/no-wait-for-timeout': 'error',
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/valid-expect': 'error',
    },
  },
];
