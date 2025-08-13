import { test, expect } from '@playwright/test';

// Trainer user: Landing -> Login -> App selector -> Web
test.describe('Trainer user flows', () => {
  test.use({ storageState: 'storage-states/trainer-web.json' });
  test('trainer: landing -> login -> app selector -> web', async ({ page }) => {
    await page.goto('http://localhost:3024/');
    await page.getByRole('link', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/localhost:3000\/login/);
    await page.goto('http://localhost:3000/app-selector');
    await page.getByTestId('app-card-web').click();
    await expect(page).toHaveURL(/localhost:3001/);
  });
});
