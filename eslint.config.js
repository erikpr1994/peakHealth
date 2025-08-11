const js = require('@eslint/js');
const nextPlugin = require('@next/eslint-plugin-next');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const codeCompletePlugin = require('eslint-plugin-code-complete');
const compatPlugin = require('eslint-plugin-compat');
const constCasePlugin = require('eslint-plugin-const-case');
const cssModulesPlugin = require('eslint-plugin-css-modules');
const dependPlugin = require('eslint-plugin-depend');
const diffPlugin = require('eslint-plugin-diff');
const githubPlugin = require('eslint-plugin-github');
const importXPlugin = require('eslint-plugin-import-x');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const noSecretsPlugin = require('eslint-plugin-no-secrets');
const noUnsanitizedPlugin = require('eslint-plugin-no-unsanitized');

const piiPlugin = require('eslint-plugin-pii');
const playwrightPlugin = require('eslint-plugin-playwright');
const prettierPlugin = require('eslint-plugin-prettier');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const reactRefreshPlugin = require('eslint-plugin-react-refresh');
const ruleAdoptionPlugin = require('eslint-plugin-rule-adoption');
const typelintPlugin = require('eslint-plugin-typelint');
const unicornPlugin = require('eslint-plugin-unicorn');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    languageOptions: {
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
        alert: 'readonly',
        Buffer: 'readonly',
        clearInterval: 'readonly',
        clearTimeout: 'readonly',
        console: 'readonly',
        document: 'readonly',
        exports: 'readonly',
        fetch: 'readonly',
        global: 'readonly',

        HTMLButtonElement: 'readonly',

        HTMLDivElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLSpanElement: 'readonly',
        KeyboardEvent: 'readonly',
        localStorage: 'readonly',
        module: 'readonly',
        navigator: 'readonly',
        NodeJS: 'readonly',

        process: 'readonly',

        React: 'readonly',

        require: 'readonly',
        sessionStorage: 'readonly',
        setInterval: 'readonly',
        setTimeout: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',

        window: 'readonly',
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
      'code-complete': codeCompletePlugin,
      compat: compatPlugin,
      'const-case': constCasePlugin,
      'css-modules': cssModulesPlugin,

      depend: dependPlugin,
      diff: diffPlugin,
      github: githubPlugin,
      'import-x': importXPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'no-secrets': noSecretsPlugin,
      'no-unsanitized': noUnsanitizedPlugin,
      pii: piiPlugin,
      playwright: playwrightPlugin,
      prettier: prettierPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      'rule-adoption': ruleAdoptionPlugin,
      typelint: typelintPlugin,
      unicorn: unicornPlugin,
    },
    processor: 'rule-adoption/processor',
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'error',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-unwanted-polyfillio': 'error',

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
      'jsx-a11y/alt-text': 'error',

      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',

      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'no-console': 'warn',
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
      'react-hooks/exhaustive-deps': 'warn',

      'react-hooks/rules-of-hooks': 'error',
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
];
