import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/trainer/DashboardPage';
import { ErrorHandler } from '../utils/ErrorHandler';
import { ScreenshotHelper } from '../utils/ScreenshotHelper';

test.describe('Trainer User Direct Page Access Tests', () => {
  test.use({ storageState: 'storage-states/trainer-web.json' });

  test('can access web app dashboard directly with authenticated session', async ({
    page,
  }, testInfo) => {
    // Initialize page objects and utilities
    const dashboardPage = new DashboardPage(page);
    // Error handler is initialized but used implicitly for capturing errors
    new ErrorHandler(page, testInfo);
    const screenshotHelper = new ScreenshotHelper(page);

    await test.step('Navigate directly to web app dashboard', async () => {
      // Navigate to dashboard
      await dashboardPage.goto();

      // Verify URL
      expect(dashboardPage.getUrl()).toMatch(/localhost:3024\/dashboard/);

      // Verify welcome message is visible
      expect(await dashboardPage.isWelcomeMessageVisible()).toBeTruthy();

      // Take screenshot
      await screenshotHelper.takeFullPageScreenshot('trainer-dashboard');
    });
  });
});
