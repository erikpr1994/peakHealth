import { test, expect } from '@playwright/test';

test('admin loads after auth', async ({ page }) => {
  await page.goto('http://localhost:3002/dashboard');
  await expect(page).toHaveURL(/localhost:3002/);
  // Be specific to reduce strict mode collisions
  await expect(
    page.getByRole('heading', { name: /admin|dashboard/i })
  ).toBeVisible({ timeout: 15_000 });
});
