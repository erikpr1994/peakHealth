import { test, expect } from '@playwright/test';

test.describe('Trainer User Direct Page Access Tests', () => {
  test.use({ storageState: 'storage-states/trainer-web.json' });

  test('can access web app dashboard directly with authenticated session', async ({
    page,
  }) => {
    await test.step('Navigate directly to web app dashboard', async () => {
      await page.goto('http://localhost:3024/dashboard');
      await expect(page).toHaveURL(/localhost:3024\/dashboard/);
    });
  });
});
