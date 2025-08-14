import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: true,
    exclude: [
      'node_modules/**/*',
      '**/node_modules/**/*',
      '**/dist/**/*',
      '**/build/**/*',
      '**/.storybook/**/*',
      '**/*.stories.{js,jsx,ts,tsx}',
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
        '**/.storybook/**',
        '**/*.stories.{js,jsx,ts,tsx}',
      ],
      // This will check coverage only for changed files
      changedFiles: true,
      // Ensure all files are not included by default
      all: false,
      // Thresholds are applied only to files included in the run
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
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
