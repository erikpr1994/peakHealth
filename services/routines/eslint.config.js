import baseConfig from '../../eslint.config.js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  ...baseConfig,
  {
    files: ['src/**/*.ts'],
    ignores: ['**/*.test.ts'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        process: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      'no-console': 'off', // Allow console.log for service logging
    },
  },
  {
    files: ['**/*.test.ts'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.vitest,
      },
    },
    rules: {
      'no-undef': 'off', // Vitest globals are not always picked up
      '@typescript-eslint/no-explicit-any': 'warn', // Allow any in tests
    },
  },
];
