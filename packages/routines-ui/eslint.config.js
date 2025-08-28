import baseConfig from '../../eslint.config.js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    languageOptions: {
      parser: (await import('@typescript-eslint/parser')).default,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    rules: {
      // Add any package-specific rules here
    },
  },
];
