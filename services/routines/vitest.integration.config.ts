import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup/integration.setup.ts'],
    include: [
      'tests/**/*.integration.test.ts',
      'tests/**/*.integration.spec.ts',
    ],
    exclude: [
      'node_modules/',
      'dist/',
      'src/test/',
      '**/*.unit.test.ts',
      '**/*.unit.spec.ts',
      '**/*.d.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'src/test/',
        '**/*.d.ts',
        '**/*.unit.test.ts',
        '**/*.unit.spec.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': './src',
    },
  },
});
