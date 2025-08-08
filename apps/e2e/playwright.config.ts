import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  fullyParallel: true,
  reporter: [['html', { open: 'never' }]],
  use: {
    trace: 'retain-on-failure',
  },
  webServer: [
    {
      command: 'pnpm supabase:start',
      url: 'http://localhost:54323',
      reuseExistingServer: true,
      timeout: 180_000,
    },
    {
      command: 'pnpm -C ../auth dev',
      url: 'http://localhost:3000',
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      command: 'pnpm -C ../web dev',
      url: 'http://localhost:3001',
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      command: 'pnpm -C ../admin dev',
      url: 'http://localhost:3002',
      reuseExistingServer: true,
      timeout: 120_000,
    },
  ],
  projects: [
    { name: 'setup', testMatch: ['tests/00.setup.ts'] },
    {
      name: 'web',
      testMatch: ['tests/web.*.spec.ts'],
      dependencies: ['setup'],
      use: {
        baseURL: 'http://localhost:3001',
        storageState: 'storage-states/web.json',
      },
    },
    {
      name: 'admin',
      testMatch: ['tests/admin.*.spec.ts'],
      dependencies: ['setup'],
      use: {
        baseURL: 'http://localhost:3002',
        storageState: 'storage-states/admin.json',
      },
    },
  ],
});
