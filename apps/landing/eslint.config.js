import baseConfig from '../../eslint.config.js';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

export default [
  ...baseConfig,
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
    },
  },
];
