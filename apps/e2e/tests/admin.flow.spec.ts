import { test, expect } from '@playwright/test';

// Admin user: Landing -> Login -> App selector -> Web
test.describe('Admin flows', () => {
  test.use({ storageState: 'storage-states/admin-web.json' });
  test('admin: landing -> login -> app selector -> web', async ({ page }) => {
    // Start from landing to verify deep link and login path
    await page.goto('http://localhost:3024/');
    await page.getByRole('link', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/localhost:3000\/login/);
    // Already authenticated by storageState; navigate to selector and choose web
    await page.goto('http://localhost:3000/app-selector');
    await page.getByTestId('app-card-web').click();
    await expect(page).toHaveURL(/localhost:3024\/dashboard/);
  });
});

// Admin user: Landing -> Login -> App selector -> Admin
test.describe('Admin flows (admin app)', () => {
  test.use({ storageState: 'storage-states/admin-admin.json' });
  test('admin: landing -> login -> app selector -> admin', async ({ page }) => {
    await page.goto('http://localhost:3024/');
    await page.getByRole('link', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/localhost:3000\/login/);
    await page.goto('http://localhost:3000/app-selector');
    await page.getByTestId('app-card-admin').click();
    await expect(page).toHaveURL(/localhost:3002/);
  });
});
