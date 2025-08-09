import baseConfig from '../../eslint.config';
import playwright from 'eslint-plugin-playwright';

const pw = playwright.configs['flat/recommended'] ?? {};

export default [
  ...baseConfig,
  {
    ...pw,
    files: ['tests/**/*.ts', 'playwright.config.ts'],
  },
];
