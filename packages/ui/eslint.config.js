// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  {
    files: ['src/components/toast/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
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
];
