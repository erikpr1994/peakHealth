import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { AuthPage } from '../pages/AuthPage';
import { ErrorHandler } from '../utils/ErrorHandler';
import { ScreenshotHelper } from '../utils/ScreenshotHelper';

test('landing CTA navigates to auth signup and can go back to login', async ({
  page,
}, testInfo) => {
  // Initialize page objects and utilities
  const landingPage = new LandingPage(page);
  const signupPage = new AuthPage(page, '/signup');
  // Login page is initialized for potential use in future test extensions
  // const loginPage = new AuthPage(page, '/login');
  // Error handler is initialized but used implicitly for capturing errors
  new ErrorHandler(page, testInfo);
  const screenshotHelper = new ScreenshotHelper(page);

  await test.step('Navigate to landing page', async () => {
    // Navigate to landing page
    await landingPage.goto();

    // Verify title
    expect(await page.title()).toMatch(/Peak Health/i);

    // Verify hero section is visible
    expect(await landingPage.isHeroSectionVisible()).toBeTruthy();

    // Take screenshot
    await screenshotHelper.takeFullPageScreenshot('landing');
  });

  await test.step('Click Get Started and navigate to signup', async () => {
    // Click Get Started button
    await landingPage.clickGetStarted();

    // Verify URL
    expect(page.url()).toMatch(/localhost:3000\/en\/signup/i);

    // Take screenshot
    await screenshotHelper.takeFullPageScreenshot('signup');
  });

  await test.step('Navigate to login from signup', async () => {
    // Click Sign In link
    await signupPage.clickSignInLink();

    // Verify URL
    expect(page.url()).toMatch(/localhost:3000\/en\/login/i);

    // Take screenshot
    await screenshotHelper.takeFullPageScreenshot('login');
  });
});
