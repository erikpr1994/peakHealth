import baseConfig from '../../eslint.config.js';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
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
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        process: 'readonly',
        vi: 'readonly',
        React: 'readonly',
        setTimeout: 'readonly',
        document: 'readonly',
        window: 'readonly',
        HTMLButtonElement: 'readonly',
        Headers: 'readonly',
        URL: 'readonly',
      },
    },
    rules: {
      // Disable problematic rules for this package
      'no-unsanitized/method': 'off',
      'no-secrets/no-secrets': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-refresh': reactRefreshPlugin,
    },
    rules: {
      // Landing app specific overrides
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Disable problematic rules for this package
      'no-unsanitized/method': 'off',
      'no-secrets/no-secrets': 'off',
    },
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    rules: {
      // Disable problematic rules for test files
      'no-secrets/no-secrets': 'off',
    },
  },
];
