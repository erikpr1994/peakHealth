/**
 * Simplified ESLint configuration for Peak Health
 *
 * This configuration focuses on essential rules for code quality, security, and best practices
 * while removing redundant or overly strict rules to improve performance and developer experience.
 */
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import cssModulesPlugin from 'eslint-plugin-css-modules';
import importXPlugin from 'eslint-plugin-import-x';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import ymlPlugin from 'eslint-plugin-yml';
import yamlParser from 'yaml-eslint-parser';

export default [
  js.configs.recommended,
  {
    files: [
      'apps/**/*.{js,jsx,ts,tsx,mjs,cjs}',
      'packages/**/*.{js,jsx,ts,tsx,mjs,cjs}',
      'scripts/**/*.{js,jsx,ts,tsx,mjs,cjs}',
      '*.{js,jsx,ts,tsx,mjs,cjs}',
    ],
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/dist/**',
      '**/build/**',
      '**/.vercel/**',
      '**/coverage/**',
      '**/.nyc_output/**',
      '**/playwright-report/**',
      '**/test-results/**',
      '**/storage-states/**',
      '**/.sentryclirc',
      '**/sentry.properties',
    ],
    languageOptions: {
      globals: {
        // Browser globals
        document: 'readonly',
        window: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        fetch: 'readonly',
        Headers: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        alert: 'readonly',

        // Node.js globals
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        global: 'readonly',

        // Common utility globals
        clearInterval: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        setTimeout: 'readonly',

        // React globals
        React: 'readonly',

        // DOM element types
        HTMLButtonElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLSpanElement: 'readonly',
        KeyboardEvent: 'readonly',

        // Test globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': typescriptPlugin,
      'css-modules': cssModulesPlugin,
      'import-x': importXPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
    },
    rules: {
      // Next.js rules
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'error',

      // TypeScript rules - relaxed for better developer experience
      '@typescript-eslint/explicit-function-return-type': 'warn', // Downgraded from error
      '@typescript-eslint/explicit-module-boundary-types': 'warn', // Downgraded from error
      '@typescript-eslint/no-empty-function': 'warn', // Downgraded from error
      '@typescript-eslint/no-explicit-any': 'warn', // Downgraded from error
      '@typescript-eslint/no-non-null-assertion': 'warn', // Downgraded from error
      '@typescript-eslint/no-unused-vars': [
        'warn', // Downgraded from error
        {
          argsIgnorePattern: '^_|^[a-z]',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-var-requires': 'warn', // Downgraded from error

      // CSS Modules rules
      'css-modules/no-unused-class': 'warn', // Downgraded from error

      // Import rules
      'import-x/default': 'error',
      'import-x/named': 'error',
      'import-x/namespace': 'error',
      'import-x/no-extraneous-dependencies': 'warn', // Downgraded from error
      'import-x/no-unresolved': ['error', { ignore: ['^@/'] }],

      // Accessibility rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',

      // General JavaScript rules
      'no-console': 'warn', // Downgraded from error
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-unused-expressions': 'warn', // Downgraded from error
      'no-unused-labels': 'error',
      'no-unused-vars': 'off', // Handled by TypeScript
      'no-useless-escape': 'warn', // Downgraded from error
      'no-useless-return': 'warn', // Downgraded from error
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'warn', // Downgraded from error

      // Prettier integration
      'prettier/prettier': 'error',

      // React rules
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
    },
    settings: {
      'import-x/internal-regex': '^@peakhealth/',
      'import-x/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
          project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json'],
        },
      },
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: [
      '**/*.config.js',
      '**/*.config.ts',
      '**/*.config.mjs',
      '**/*.config.cjs',
      'eslint.config.*',
    ],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'import-x/extensions': 'off',
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      // Disable TypeScript-specific rules for JavaScript files
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  // YAML configuration for GitHub Actions workflows
  {
    files: ['.github/workflows/**/*.yml', '.github/workflows/**/*.yaml'],
    plugins: {
      yml: ymlPlugin,
    },
    languageOptions: {
      parser: yamlParser,
    },
    rules: {
      ...ymlPlugin.configs.recommended.rules,
      'yml/indent': ['error', 2],
      'yml/quotes': ['error', { prefer: 'single' }],
      'yml/no-empty-document': 'error',
      'yml/no-empty-key': 'error',
      'yml/no-empty-mapping-value': 'error',
      'yml/no-empty-sequence-entry': 'error',
      'yml/no-tab-indent': 'error',
      'yml/require-string-key': 'error',
      'yml/key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'yml/no-irregular-whitespace': 'error',
      'yml/spaced-comment': ['error', 'always'],
    },
  },
];
