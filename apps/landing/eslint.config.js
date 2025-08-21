import baseConfig from '../../eslint.config.js';
import nextConfig from '../../eslint.next.config.js';

// Custom overrides for landing app
const landingOverrides = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
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

export default [...baseConfig, ...nextConfig, ...landingOverrides];

