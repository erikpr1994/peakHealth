import { test, expect } from '@playwright/test';

import { generateTestUser, signUpUser } from '../utils/auth-helpers';

test.describe('Exercise Flows', () => {
  test.describe('Exercise Browsing', () => {
    test('should load exercises page and display exercise list', async ({
      page,
    }) => {
      const user = generateTestUser();
      await signUpUser(page, user);

      // Navigate to exercises page
      await page.goto('/exercises');

      // Check page title and header - use more specific selector
      await expect(page.locator('h1:has-text("Exercises")')).toBeVisible();
      await expect(
        page.locator(
          'text=Discover and explore exercises for your fitness journey.'
        )
      ).toBeVisible();

      // Check that exercises are loaded
      const cards = page.locator('[data-slot="card"]');
      const cardCount = await cards.count();
      expect(cardCount).toBeGreaterThan(0);
      await expect(cards.first()).toBeVisible();
    });

    test('should display exercise cards with correct information', async ({
      page,
    }) => {
      const user = generateTestUser();
      await signUpUser(page, user);

      await page.goto('/exercises');

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
    test('should navigate to suggest exercise page', async ({ page }) => {
      const user = generateTestUser();
      await signUpUser(page, user);

      await page.goto('/exercises');

      // Click suggest exercise button
      await page.click('button:has-text("Suggest Exercise")');

      // Should navigate to suggest exercise page
      await expect(page).toHaveURL('/suggest-exercise');
    });
  });

  test.describe('Exercise Responsive Design', () => {
    test('should work on mobile viewport', async ({ page }) => {
      const user = generateTestUser();
      await signUpUser(page, user);

      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto('/exercises');

      // Check that page loads correctly on mobile
      await expect(page.locator('h1:has-text("Exercises")')).toBeVisible();
      await expect(page.locator('[data-slot="card"]').first()).toBeVisible();

      // Check that search and filters are accessible
      await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
      await expect(page.locator('button:has-text("Filters")')).toBeVisible();
    });

    test('should work on tablet viewport', async ({ page }) => {
      const user = generateTestUser();
      await signUpUser(page, user);

      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });

      await page.goto('/exercises');

      // Check that page loads correctly on tablet
      await expect(page.locator('h1:has-text("Exercises")')).toBeVisible();
      await expect(page.locator('[data-slot="card"]').first()).toBeVisible();
    });
  });
});
