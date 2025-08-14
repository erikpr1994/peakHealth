import { test, expect } from '@playwright/test';

test.describe('Setup: Admin User Landing → Login → Admin App', () => {
  test('admin user can navigate from landing to admin app', async ({
    browser,
  }) => {
    const email = 'erikpastorrios1994@gmail.com';
    const password = 'password123';

    const context = await browser.newContext();
    const page = await context.newPage();

    // Start from landing page
    await test.step('Navigate to landing page', async () => {
      await page.goto('http://localhost:3024/');
      await expect(page).toHaveTitle(/Peak Health/i);
    });

    // Navigate to login from landing
    await test.step('Navigate from landing to login page', async () => {
      await page.getByRole('link', { name: /sign in/i }).click();
      await expect(page).toHaveURL(/localhost:3000\/login/);
    });

    // Login and verify app selector appears
    await test.step('Login and verify app selector appears', async () => {
      // Wait for the login form to be ready
      await page.waitForSelector('input[placeholder="Enter your email"]', {
        state: 'visible',
      });

      // Clear and fill email field
      const emailInput = page.getByPlaceholder('Enter your email');
      await emailInput.clear();
      await emailInput.fill(email);

      // Clear and fill password field
      const passwordInput = page.getByPlaceholder('Enter your password');
      await passwordInput.clear();
      await passwordInput.fill(password);

      // Verify the email was filled correctly
      await expect(emailInput).toHaveValue(email);

      // Click sign in button
      await page.getByRole('button', { name: /sign in|log in/i }).click();
      await page.waitForURL('**/app-selector', { timeout: 60_000 });
      await expect(page.getByText(/Choose\s*Your\s*App/i)).toBeVisible();
    });

    // Select admin app and verify navigation
    await test.step('Select admin app and verify navigation', async () => {
      await page.getByTestId('app-card-admin').click();
      await page.waitForURL('http://localhost:3002/**', { timeout: 30_000 });
      await expect(page).toHaveURL(/localhost:3002/);
    });

    // Create storage state for admin user accessing admin app
    await test.step('Create storage state for admin user accessing admin app', async () => {
      await context.storageState({ path: 'storage-states/admin-admin.json' });
      await context.close();
    });
  });
});
