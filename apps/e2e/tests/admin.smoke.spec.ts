import { test, expect } from '@playwright/test';

test('admin loads after auth', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/localhost:3002/);
  await expect(page.getByText(/admin|settings|users|dashboard/i)).toBeVisible();
});
