import { test, expect } from '@playwright/test';

test('web dashboard loads after auth', async ({ page }) => {
  await page.goto('http://localhost:3024/dashboard');
  await expect(page).toHaveURL(/localhost:3024/);
  const res = await page.request.get('http://localhost:3024/api/auth/user');
  expect(res.ok()).toBeTruthy();
  const body = (await res.json()) as { user: unknown };
  expect(body.user).toBeTruthy();
});
