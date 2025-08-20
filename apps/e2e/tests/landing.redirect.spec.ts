import { test, expect } from '@playwright/test';

test('landing CTA navigates to auth signup and can go back to login', async ({
  page,
}) => {
  await page.goto('http://localhost:3024/');
  await expect(page).toHaveTitle(/Peak Health/i);
  // Click primary CTA 'Get Started Free'
  await page.getByRole('link', { name: /get started free/i }).click();
  await expect(page).toHaveURL(/localhost:3000\/[a-z]{2}\/signup/i);
  // Navigate to login from signup footer link
  await page
    .getByRole('link', { name: /sign in|login/i })
    .first()
    .click();
  await expect(page).toHaveURL(/localhost:3000\/[a-z]{2}\/login/i);
});
