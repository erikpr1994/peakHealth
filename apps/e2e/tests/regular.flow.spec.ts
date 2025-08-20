import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/regular/DashboardPage';
import { RoutinesPage } from '../pages/regular/RoutinesPage';
import { RoutineCreatePage } from '../pages/regular/RoutineCreatePage';
import { ErrorHandler } from '../utils/ErrorHandler';
import { ScreenshotHelper } from '../utils/ScreenshotHelper';
import { TestDataHelper } from '../utils/TestDataHelper';

test.describe('Regular user flows', () => {
  test.use({ storageState: 'storage-states/regular-web.json' });

  test('regular user can create routines with proper validation', async ({
    page,
  }, testInfo) => {
    // Initialize page objects and utilities
    const dashboardPage = new DashboardPage(page);
    const routinesPage = new RoutinesPage(page);
    const routineCreatePage = new RoutineCreatePage(page);
    // Error handler is initialized but used implicitly for capturing errors
    new ErrorHandler(page, testInfo);
    const screenshotHelper = new ScreenshotHelper(page);

    await test.step('Access dashboard with authenticated session', async () => {
      // Navigate to dashboard
      await dashboardPage.goto();

      // Verify URL
      expect(dashboardPage.getUrl()).toMatch(/localhost:3024\/dashboard/);

      // Verify welcome message is visible
      await expect(await dashboardPage.isWelcomeMessageVisible()).toBeTruthy();

      // Take screenshot
      await screenshotHelper.takeFullPageScreenshot('dashboard');
    });

    await test.step('Navigate to routines page', async () => {
      // Navigate to routines page
      await dashboardPage.navigateToRoutines();

      // Verify URL
      expect(routinesPage.getUrl()).toMatch(/localhost:3024\/routines/);

      // Verify routine list is visible
      await expect(await routinesPage.isRoutineListVisible()).toBeTruthy();

      // Take screenshot
      await screenshotHelper.takeFullPageScreenshot('routines');
    });

    await test.step('Test validation with incomplete data', async () => {
      // Click create routine button
      await routinesPage.clickCreateRoutine();

      // Verify URL
      expect(routineCreatePage.getUrl()).toMatch(
        /localhost:3024\/routines\/create/
      );

      // Take screenshot
      await screenshotHelper.takeFullPageScreenshot('routine-create-empty');

      // Fill incomplete routine data
      await routineCreatePage.fillRoutineName('Incomplete Test Routine');
      await routineCreatePage.fillRoutineDescription(
        'A test routine with incomplete data'
      );
      await routineCreatePage.addGoal('Build strength');

      // Take screenshot
      await screenshotHelper.takeFullPageScreenshot(
        'routine-create-incomplete'
      );

      // Try to save incomplete routine
      await routineCreatePage.clickSaveRoutine();

      // Verify validation error toast
      await routineCreatePage.waitForToast('At least one workout');

      // Verify we're still on the create page
      expect(routineCreatePage.getUrl()).toMatch(
        /localhost:3024\/routines\/create/
      );
    });

    await test.step('Test successful routine creation with complete data', async () => {
      // Reload the page to start fresh
      await page.reload();
      await routineCreatePage.waitForPageLoad();

      // Verify URL
      expect(routineCreatePage.getUrl()).toMatch(
        /localhost:3024\/routines\/create/
      );

      // Take screenshot
      await screenshotHelper.takeFullPageScreenshot('routine-create-reloaded');

      // Generate test data for routine
      const routineData = TestDataHelper.generateRoutineData();

      // Create a complete routine
      await routineCreatePage.createCompleteRoutine(routineData);

      // Verify success toast
      await routineCreatePage.waitForToast('Routine saved successfully');

      // Verify redirect to routines page
      await page.waitForURL(/localhost:3024\/routines/);
      expect(routinesPage.getUrl()).toMatch(/localhost:3024\/routines/);

      // Verify the new routine exists in the list
      await expect(
        await routinesPage.routineExists(routineData.name)
      ).toBeTruthy();

      // Take screenshot
      await screenshotHelper.takeFullPageScreenshot('routines-after-create');
    });
  });
});
