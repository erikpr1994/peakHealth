import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/admin/DashboardPage';
import { ErrorHandler } from '../utils/ErrorHandler';
import { ScreenshotHelper } from '../utils/ScreenshotHelper';

test.describe('Admin User Direct Page Access Tests', () => {
  test.describe('Admin User → Web App', () => {
    test.use({ storageState: 'storage-states/admin.json' });

    test('can access web app dashboard directly with authenticated session', async ({
      page,
    }, testInfo) => {
      // Initialize page objects and utilities
      const dashboardPage = new DashboardPage(page, false); // false = web app (not admin app)
      // Error handler is initialized but used implicitly for capturing errors
      new ErrorHandler(page, testInfo);
      const screenshotHelper = new ScreenshotHelper(page);

      // Navigate to dashboard
      await dashboardPage.goto();

      // Verify URL
      expect(dashboardPage.getUrl()).toMatch(/localhost:3024\/en\/dashboard/);

      // Verify welcome message is visible
      expect(await dashboardPage.isWelcomeMessageVisible()).toBeTruthy();

      // Take screenshot
      await screenshotHelper.takeFullPageScreenshot('admin-web-dashboard');
    });
  });

  test.describe('Admin User → Admin App', () => {
    test.use({ storageState: 'storage-states/admin.json' });

    test('can access admin app dashboard directly with authenticated session', async ({
      page,
    }, testInfo) => {
      // Initialize page objects and utilities
      const dashboardPage = new DashboardPage(page, true); // true = admin app
      // Error handler is initialized but used implicitly for capturing errors
      new ErrorHandler(page, testInfo);
      const screenshotHelper = new ScreenshotHelper(page);

      // Navigate to dashboard
      await dashboardPage.goto();

      // Verify URL
      expect(dashboardPage.getUrl()).toMatch(/localhost:3002\/dashboard/);

      // Verify welcome message is visible
      expect(await dashboardPage.isWelcomeMessageVisible()).toBeTruthy();

      // Take screenshot
      await screenshotHelper.takeFullPageScreenshot('admin-admin-dashboard');
    });
  });
});
