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
    {
      command: 'pnpm -C ../landing dev',
      url: 'http://localhost:3004',
      reuseExistingServer: true,
      timeout: 120_000,
    },
  ],
  projects: [
    { name: 'setup', testMatch: ['tests/00.setup.ts'] },
    {
      name: 'landing',
      testMatch: ['tests/landing.*.spec.ts'],
      use: { baseURL: 'http://localhost:3004' },
    },
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
    // Per-user setup projects
    {
      name: 'setup-admin-web',
      testMatch: ['tests/01.setup.admin.web.ts'],
      dependencies: ['setup'],
    },
    {
      name: 'setup-admin-admin',
      testMatch: ['tests/02.setup.admin.admin.ts'],
      dependencies: ['setup'],
    },
    {
      name: 'setup-regular-web',
      testMatch: ['tests/03.setup.regular.web.ts'],
      dependencies: ['setup'],
    },
    {
      name: 'setup-trainer-web',
      testMatch: ['tests/04.setup.trainer.web.ts'],
      dependencies: ['setup'],
    },
    // Projects that consume per-user storage states
    {
      name: 'admin-web',
      dependencies: ['setup-admin-web'],
      use: {
        baseURL: 'http://localhost:3001',
        storageState: 'storage-states/admin-web.json',
      },
    },
    {
      name: 'admin-admin',
      dependencies: ['setup-admin-admin'],
      use: {
        baseURL: 'http://localhost:3002',
        storageState: 'storage-states/admin-admin.json',
      },
    },
    {
      name: 'regular-web',
      dependencies: ['setup-regular-web'],
      use: {
        baseURL: 'http://localhost:3001',
        storageState: 'storage-states/regular-web.json',
      },
    },
    {
      name: 'trainer-web',
      dependencies: ['setup-trainer-web'],
      use: {
        baseURL: 'http://localhost:3001',
        storageState: 'storage-states/trainer-web.json',
      },
    },
  ],
});
