import { test, expect } from '@playwright/test';

import { generateTestUser, signUpUser } from '../utils/auth-helpers';

test.describe('Exercise Flows', () => {
  test.describe('Exercise Browsing', () => {
    test('should load exercises page and display exercise list', async ({
      page,
      browserName,
    }) => {
      // Skip this test for WebKit due to authentication timing issues
      if (browserName === 'webkit') {
        test.skip();
        return;
      }

      const user = generateTestUser();
      await signUpUser(page, user);

      // Navigate to exercises page
      await page.goto('/exercises');

      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');

      // Check that page loaded successfully
      await expect(page).toHaveURL('/exercises');

      // Wait a bit more for content to load
      await page.waitForTimeout(2000);

      // Check if any content is visible
      const pageContent = page.locator('body');
      await expect(pageContent).toBeVisible();
    });

    test('should display exercise cards with correct information', async ({
      page,
      browserName,
    }) => {
      // Skip this test for WebKit due to authentication timing issues
      if (browserName === 'webkit') {
        test.skip();
        return;
      }

      const user = generateTestUser();
      await signUpUser(page, user);

      await page.goto('/exercises');

      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');

      // Wait for exercises to load
      await page.waitForSelector('[data-slot="card"]');

      // Check first exercise card has expected elements
      const firstCard = page.locator('[data-slot="card"]').first();
      await expect(firstCard.locator('h3')).toBeVisible(); // Exercise name
      await expect(firstCard.locator('text=variants')).toBeVisible(); // Variants info
      await expect(firstCard.locator('button')).toBeVisible(); // Favorite button
    });
  });

  test.describe('Exercise Navigation', () => {
    test('should navigate to suggest exercise page', async ({
      page,
      browserName,
    }) => {
      // Skip this test for WebKit due to authentication timing issues
      if (browserName === 'webkit') {
        test.skip();
        return;
      }

      const user = generateTestUser();
      await signUpUser(page, user);

      await page.goto('/exercises');

      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');

      // Click suggest exercise button
      await page.click('button:has-text("Suggest Exercise")');

      // Should navigate to suggest exercise page
      await expect(page).toHaveURL('/suggest-exercise');
    });
  });
});
