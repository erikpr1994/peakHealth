import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalTeardown: './global-teardown.ts',
  testDir: './tests',
  timeout: 60_000, // Increased timeout for setup tests
  fullyParallel: false, // Changed from true to false to prevent test interference
  workers: 1, // Reduced to 1 worker to ensure proper sequencing
  reporter: [['html', { open: 'never' }]],
  use: {
    trace: 'retain-on-failure',
  },
  webServer: [
    {
      command: 'pnpm supabase:start',
      url: 'http://localhost:54323',
      reuseExistingServer: true,
      timeout: 120_000,
      cwd: '../..',
    },
    {
      command: 'pnpm dev',
      url: 'http://localhost:3024',
      reuseExistingServer: true,
      timeout: 120_000,
      cwd: '../..',
    },
  ],
  projects: [
    { name: 'setup', testMatch: ['tests/00.setup.ts'] },
    {
      name: 'landing',
      testMatch: ['tests/landing.*.spec.ts'],
      use: { baseURL: 'http://localhost:3024' },
    },
    // Persona-specific projects only
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
        baseURL: 'http://localhost:3024',
        storageState: 'storage-states/admin-web.json',
      },
      testMatch: [
        'tests/admin.flow.spec.ts',
        'tests/trainer.flow.spec.ts',
        'tests/landing.redirect.spec.ts',
      ],
    },
    {
      name: 'admin-admin',
      dependencies: ['setup-admin-admin'],
      use: {
        baseURL: 'http://localhost:3002',
        storageState: 'storage-states/admin-admin.json',
      },
      testMatch: ['tests/admin.flow.spec.ts', 'tests/landing.redirect.spec.ts'],
    },
    {
      name: 'regular-web',
      dependencies: ['setup-regular-web'],
      use: {
        baseURL: 'http://localhost:3024',
        storageState: 'storage-states/regular-web.json',
      },
      testMatch: [
        'tests/regular.flow.spec.ts',
        'tests/landing.redirect.spec.ts',
      ],
    },
    {
      name: 'trainer-web',
      dependencies: ['setup-trainer-web'],
      use: {
        baseURL: 'http://localhost:3024',
        storageState: 'storage-states/trainer-web.json',
      },
      testMatch: [
        'tests/trainer.flow.spec.ts',
        'tests/landing.redirect.spec.ts',
      ],
    },
  ],
});
