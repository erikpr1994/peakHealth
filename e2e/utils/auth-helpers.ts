import { Page, expect } from '@playwright/test';

export interface TestUser {
  email: string;
  password: string;
  name?: string;
}

export const generateTestUser = (): TestUser => {
  // Generate a more unique identifier using timestamp + random number
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  const uniqueId = `${timestamp}-${random}`;

  return {
    email: `test-${uniqueId}@example.com`,
    password: 'TestPassword123!',
    name: 'Test User',
  };
};

export const signUpUser = async (page: Page, user: TestUser) => {
  await page.goto('/signup');

  // Fill in the signup form
  await page.fill('[data-testid="email-input"]', user.email);
  await page.fill('[data-testid="password-input"]', user.password);
  await page.fill('#confirmPassword', user.password); // Fill confirm password field
  if (user.name) {
    await page.fill('[data-testid="name-input"]', user.name);
  }

  // Submit the form and wait for navigation to the dashboard
  await Promise.all([
    page.waitForURL(/\/dashboard/),
    page.click('[data-testid="signup-button"]'),
  ]);

  // Use a longer timeout for WebKit which can be slower
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
};

export const loginUser = async (page: Page, user: TestUser) => {
  await page.goto('/login');

  // Fill in the login form
  await page.fill('[data-testid="email-input"]', user.email);
  await page.fill('[data-testid="password-input"]', user.password);

  // Submit the form and wait for navigation to the dashboard
  await Promise.all([
    page.waitForURL(/\/dashboard/),
    page.click('[data-testid="login-button"]'),
  ]);

  // Wait for successful login (redirect to dashboard)
  // Use a longer timeout for WebKit which can be slower
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
};

export const logoutUser = async (page: Page) => {
  // Navigate to user menu and click logout
  await page.click('[data-testid="user-menu-button"]');
  await page.click('[data-testid="logout-button"]');

  // Wait for the user menu to disappear (indicating logout)
  await expect(
    page.locator('[data-testid="user-menu-button"]')
  ).not.toBeVisible({ timeout: 10000 });

  // Wait for logout (redirect to landing page)
  await expect(page).toHaveURL('/', { timeout: 10000 });
};

export const expectToBeLoggedIn = async (page: Page) => {
  // Check that we're on the dashboard or authenticated area
  await expect(page).toHaveURL(/\/dashboard/);
  // Check that user menu is visible
  await expect(page.locator('[data-testid="user-menu-button"]')).toBeVisible();
};

export const expectToBeLoggedOut = async (page: Page) => {
  // Check that we're on landing page
  await expect(page).toHaveURL('/');
  // Check that user menu is not visible
  await expect(
    page.locator('[data-testid="user-menu-button"]')
  ).not.toBeVisible();
};
