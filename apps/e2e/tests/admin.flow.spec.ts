import { test, expect } from '@playwright/test';

test.describe('Admin User Direct Page Access Tests', () => {
  test.describe('Admin User → Web App', () => {
    test.use({ storageState: 'storage-states/admin-web.json' });

    test('can access web app dashboard directly with authenticated session', async ({
      page,
    }) => {
      await page.goto('http://localhost:3024/dashboard');
      await expect(page).toHaveURL(/localhost:3024\/dashboard/);
    });
  });

  test.describe('Admin User → Admin App', () => {
    test.use({ storageState: 'storage-states/admin-admin.json' });

    test('can access admin app dashboard directly with authenticated session', async ({
      page,
    }) => {
      await page.goto('http://localhost:3002/dashboard');
      await expect(page).toHaveURL(/localhost:3002\/dashboard/);
    });
  });
});
