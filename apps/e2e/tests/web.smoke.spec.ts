import { test, expect } from '@playwright/test';

test('web dashboard loads after auth', async ({ page }) => {
  await page.goto('http://localhost:3001/dashboard');
  await expect(page).toHaveURL(/localhost:3001/);
  const res = await page.request.get('http://localhost:3001/api/auth/user');
  expect(res.ok()).toBeTruthy();
  const body = (await res.json()) as { user: unknown };
  expect(body.user).toBeTruthy();
});
