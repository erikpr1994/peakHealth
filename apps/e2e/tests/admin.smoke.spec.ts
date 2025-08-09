import { test, expect } from '@playwright/test';

test('admin loads after auth', async ({ page }) => {
  await page.goto('http://localhost:3002/dashboard');
  await expect(page).toHaveURL(/localhost:3002/);
  const res = await page.request.get('http://localhost:3002/api/auth/user');
  expect(res.ok()).toBeTruthy();
  const body = (await res.json()) as {
    user: { app_metadata?: Record<string, unknown> } | null;
  };
  expect(body.user).toBeTruthy();
  const appMeta = body.user?.app_metadata ?? {};
  const isAdmin =
    Array.isArray((appMeta as any).user_types) &&
    (appMeta as any).user_types.includes('admin');
  expect(isAdmin).toBeTruthy();
});
