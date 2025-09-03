import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup/unit.setup.ts'],
    include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    exclude: [
      'node_modules/',
      'dist/',
      'src/test/',
      '**/*.integration.test.ts',
      '**/*.integration.spec.ts',
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
        '**/*.integration.test.ts',
        '**/*.integration.spec.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': './src',
    },
  },
});
