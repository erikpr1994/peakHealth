import path from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    exclude: [
      'node_modules/**/*',
      '**/node_modules/**/*',
      '**/dist/**/*',
      '**/build/**/*',
    ],
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/*.config.{js,ts}',
        '**/test/**',
        '**/tests/**',
        '**/*.d.ts',
        '**/types/**',
      ],
      // This will check coverage only for changed files
      changedFiles: true,
      // Ensure all files are not included by default
      all: false,
      // Require 80% coverage for changed files only
      thresholds: {
        // Apply thresholds only to files that are actually being tested
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env.NODE_ENV': '"test"',
  },
});
