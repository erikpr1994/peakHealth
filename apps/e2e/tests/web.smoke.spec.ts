import { test, expect } from '@playwright/test';

test('web dashboard loads after auth', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/localhost:3001/);
  await expect(page.getByText(/dashboard|home|welcome/i)).toBeVisible();
});
