import { Page, expect } from '@playwright/test';

export interface TestUser {
  email: string;
  password: string;
  name?: string;
}

export const generateTestUser = (): TestUser => ({
  email: `test-${Date.now()}@example.com`,
  password: 'TestPassword123!',
  name: 'Test User',
});

export const signUpUser = async (page: Page, user: TestUser) => {
  await page.goto('/signup');

  // Fill in the signup form
  await page.fill('[data-testid="email-input"]', user.email);
  await page.fill('[data-testid="password-input"]', user.password);
  await page.fill('#confirmPassword', user.password); // Fill confirm password field
  if (user.name) {
    await page.fill('[data-testid="name-input"]', user.name);
  }

  // Submit the form
  await page.click('[data-testid="signup-button"]');

  // Wait a moment for any validation errors
  await page.waitForTimeout(1000);

  // Check if there are any validation errors
  const emailError = await page.locator('[data-testid="email-error"]').isVisible();
  const passwordError = await page.locator('[data-testid="password-error"]').isVisible();
  const nameError = await page.locator('[data-testid="name-error"]').isVisible();
  const confirmPasswordError = await page.locator('[data-testid="confirm-password-error"]').isVisible();
  const signupError = await page.locator('[data-testid="signup-error"]').isVisible();

  if (emailError || passwordError || nameError || confirmPasswordError || signupError) {
    console.log('Validation errors found:', { emailError, passwordError, nameError, confirmPasswordError, signupError });
    throw new Error('Signup form has validation errors');
  }

  // Wait for successful signup (redirect to dashboard or success message)
  await expect(page).toHaveURL(/\/dashboard/);
};

export const loginUser = async (page: Page, user: TestUser) => {
  await page.goto('/login');

  // Fill in the login form
  await page.fill('[data-testid="email-input"]', user.email);
  await page.fill('[data-testid="password-input"]', user.password);

  // Submit the form
  await page.click('[data-testid="login-button"]');

  // Wait for successful login (redirect to dashboard)
  await expect(page).toHaveURL(/\/dashboard/);
};

export const logoutUser = async (page: Page) => {
  // Navigate to user menu and click logout
  await page.click('[data-testid="user-menu-button"]');
  await page.click('[data-testid="logout-button"]');

  // Wait for logout (redirect to landing page or login)
  await expect(page).toHaveURL(/\/login|\/$/);
};

export const expectToBeLoggedIn = async (page: Page) => {
  // Check that we're on the dashboard or authenticated area
  await expect(page).toHaveURL(/\/dashboard/);
  // Check that user menu is visible
  await expect(page.locator('[data-testid="user-menu-button"]')).toBeVisible();
};

export const expectToBeLoggedOut = async (page: Page) => {
  // Check that we're on login page or landing page
  await expect(page).toHaveURL(/\/login|\/$/);
  // Check that user menu is not visible
  await expect(
    page.locator('[data-testid="user-menu-button"]')
  ).not.toBeVisible();
};
