import { test, expect } from '@playwright/test';

// Regular user: Landing -> Login -> Web (no selector)
test.describe('Regular user flows', () => {
  test.use({ storageState: 'storage-states/regular-web.json' });
  test('regular: landing -> login -> web', async ({ page }) => {
    await page.goto('http://localhost:3004/');
    await page.getByRole('link', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/localhost:3000\/login/);
    // With storage state, the web is accessible directly
    await page.goto('http://localhost:3001/dashboard');
    await expect(page).toHaveURL(/localhost:3001/);
  });
});
