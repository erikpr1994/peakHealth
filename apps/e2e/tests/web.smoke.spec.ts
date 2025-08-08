import { test, expect } from '@playwright/test';

test('web dashboard loads after auth', async ({ page }) => {
  await page.goto('http://localhost:3001/dashboard');
  await expect(page).toHaveURL(/localhost:3001/);
  await expect(
    page.getByRole('heading', { name: /dashboard|home|welcome/i })
  ).toBeVisible({ timeout: 15_000 });
});
