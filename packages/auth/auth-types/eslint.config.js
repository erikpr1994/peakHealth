import baseConfig from '../../../eslint.config.js';
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
      'no-unused-vars': 'off', // Disable general ESLint rule for auth-types package
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_|^[a-z]|^[A-Za-z]',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          args: 'none', // Don't check function arguments in interfaces
        },
      ],
    },
  },
];
