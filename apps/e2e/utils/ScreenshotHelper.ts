import { Page as PlaywrightPage, expect, Locator } from '@playwright/test';

/**
 * Helper class for taking and comparing screenshots
 */
export class ScreenshotHelper {
  /**
   * Constructor for the ScreenshotHelper
   * @param page - The Playwright page object
   */
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly page: PlaywrightPage
  ) {}

  /**
   * Take a full page screenshot
   * @param name - Optional name for the screenshot
   * @returns Promise that resolves when the screenshot is taken
   */
  async takeFullPageScreenshot(name?: string): Promise<void> {
    const screenshotName = name ? `${name}.png` : 'screenshot.png';
    await expect(this.page).toHaveScreenshot(screenshotName, {
      fullPage: true,
      animations: 'disabled',
    });
  }

  /**
   * Take a screenshot of a specific element
   * @param selector - The selector for the element
   * @param name - Optional name for the screenshot
   * @returns Promise that resolves when the screenshot is taken
   */
  async takeElementScreenshot(selector: string, name?: string): Promise<void> {
    const locator = this.page.locator(selector);
    await expect(locator).toBeVisible();
    const screenshotName = name ? `${name}.png` : 'element-screenshot.png';
    await expect(locator).toHaveScreenshot(screenshotName, {
      animations: 'disabled',
    });
  }

  /**
   * Take a screenshot of a specific locator
   * @param locator - The locator for the element
   * @param name - Optional name for the screenshot
   * @returns Promise that resolves when the screenshot is taken
   */
  async takeLocatorScreenshot(locator: Locator, name?: string): Promise<void> {
    await expect(locator).toBeVisible();
    const screenshotName = name ? `${name}.png` : 'locator-screenshot.png';
    await expect(locator).toHaveScreenshot(screenshotName, {
      animations: 'disabled',
    });
  }

  /**
   * Take a screenshot of the current viewport
   * @param name - Optional name for the screenshot
   * @returns Promise that resolves when the screenshot is taken
   */
  async takeViewportScreenshot(name?: string): Promise<void> {
    const screenshotName = name ? `${name}.png` : 'viewport-screenshot.png';
    await expect(this.page).toHaveScreenshot(screenshotName, {
      fullPage: false,
      animations: 'disabled',
    });
  }

  /**
   * Take a screenshot with a custom mask to hide dynamic content
   * @param name - Optional name for the screenshot
   * @param maskSelectors - Array of selectors to mask
   * @returns Promise that resolves when the screenshot is taken
   */
  async takeScreenshotWithMask(
    name?: string,
    maskSelectors: string[] = []
  ): Promise<void> {
    // Create mask locators
    const maskLocators = maskSelectors.map(selector =>
      this.page.locator(selector)
    );

    const screenshotName = name ? `${name}.png` : 'masked-screenshot.png';
    await expect(this.page).toHaveScreenshot(screenshotName, {
      fullPage: true,
      animations: 'disabled',
      mask: maskLocators,
    });
  }

  /**
   * Take a screenshot with a specific timeout
   * @param name - Optional name for the screenshot
   * @param timeout - Timeout in milliseconds
   * @returns Promise that resolves when the screenshot is taken
   */
  async takeScreenshotWithTimeout(
    name?: string,
    timeout: number = 30000
  ): Promise<void> {
    const screenshotName = name ? `${name}.png` : 'timeout-screenshot.png';
    await expect(this.page).toHaveScreenshot(screenshotName, {
      fullPage: true,
      animations: 'disabled',
      timeout,
    });
  }
}
