import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import codeCompletePlugin from 'eslint-plugin-code-complete';
import compatPlugin from 'eslint-plugin-compat';
import constCasePlugin from 'eslint-plugin-const-case';
import cssModulesPlugin from 'eslint-plugin-css-modules';
import dependPlugin from 'eslint-plugin-depend';
import diffPlugin from 'eslint-plugin-diff';
import githubPlugin from 'eslint-plugin-github';
import importXPlugin from 'eslint-plugin-import-x';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import noSecretsPlugin from 'eslint-plugin-no-secrets';
import noUnsanitizedPlugin from 'eslint-plugin-no-unsanitized';
import piiPlugin from 'eslint-plugin-pii';
import playwrightPlugin from 'eslint-plugin-playwright';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import ruleAdoptionPlugin from 'eslint-plugin-rule-adoption';
import unicornPlugin from 'eslint-plugin-unicorn';
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
        // Node.js globals
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        process: 'readonly',
        exports: 'readonly',
        module: 'readonly',
        require: 'readonly',
        global: 'readonly',
        NodeJS: 'readonly',

        // Common browser globals - moved to eslint.next.config.js
        clearInterval: 'readonly',
        clearTimeout: 'readonly',
        console: 'readonly',
        setInterval: 'readonly',
        setTimeout: 'readonly',

        // Vitest globals
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
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'code-complete': codeCompletePlugin,
      compat: compatPlugin,
      'const-case': constCasePlugin,
      'css-modules': cssModulesPlugin,
      depend: dependPlugin,
      diff: diffPlugin,
      github: githubPlugin,
      'import-x': importXPlugin,
      'no-secrets': noSecretsPlugin,
      'no-unsanitized': noUnsanitizedPlugin,
      pii: piiPlugin,
      playwright: playwrightPlugin,
      prettier: prettierPlugin,
      'rule-adoption': ruleAdoptionPlugin,
      unicorn: unicornPlugin,
    },
    processor: 'rule-adoption/processor',
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_|^[a-z]',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-var-requires': 'error',
      'compat/compat': 'error',
      'css-modules/no-unused-class': 'error',
      'depend/ban-dependencies': [
        'error',
        { allowed: ['eslint-plugin-react'] },
      ],
      'import-x/default': 'error',
      'import-x/named': 'error',
      'import-x/namespace': 'error',
      'import-x/no-extraneous-dependencies': 'error',
      // Import correctness via import-x
      'import-x/no-unresolved': ['error', { ignore: ['^@/'] }],
      'no-console': 'error',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-secrets/no-secrets': 'error',
      'no-unsanitized/method': 'error',
      'no-unsanitized/property': 'error',
      'no-unused-expressions': 'error',
      'no-unused-labels': 'error',
      'no-unused-vars': 'off',
      'no-useless-escape': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'prettier/prettier': 'error',
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
