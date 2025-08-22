import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  {
    rules: {
      // Disable problematic rules for this package
      'no-unsanitized/method': 'off',
      'no-secrets/no-secrets': 'off',
    },
  },
];
