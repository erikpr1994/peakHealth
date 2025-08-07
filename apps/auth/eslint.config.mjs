import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Strict TypeScript rules (type-aware) - but allow some flexibility for external libraries
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/require-await': 'error',
      // Allow unsafe operations for external libraries (Supabase, etc.)
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',

      // Strict React rules - but allow common patterns
      'react/no-unescaped-entities': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'warn', // Allow prop spreading but warn
      'react/require-default-props': 'warn', // Warn instead of error
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      // Strict general rules
      'no-console': 'error',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-expressions': 'error',
      'no-unused-labels': 'error',
      'no-useless-escape': 'error',
      'no-useless-return': 'error',
      'no-duplicate-imports': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
      'comma-dangle': 'off', // Let Prettier handle trailing commas
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],

      // Import rules
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always-and-inside-groups',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'import/no-duplicates': 'error',

      // Next.js specific
      '@next/next/no-img-element': 'error',
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-unwanted-polyfillio': 'error',

      // Prettier integration
      'prettier/prettier': 'error',
    },
  },
];

export default eslintConfig;
