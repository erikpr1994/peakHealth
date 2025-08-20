import { Page as PlaywrightPage, Locator, expect } from '@playwright/test';

/**
 * Base Page class that provides common functionality for all page objects
 */
export class Page {
  /**
   * Constructor for the base Page class
   * @param page - The Playwright page object
   * @param path - The path of the page (used for navigation)
   * @param baseUrl - The base URL of the application
   */
  constructor(
    // eslint-disable-next-line no-unused-vars
    protected page: PlaywrightPage,
    // eslint-disable-next-line no-unused-vars
    protected path: string = '',
    // eslint-disable-next-line no-unused-vars
    protected baseUrl: string = 'http://localhost:3024'
  ) {}

  /**
   * Navigate to the page
   * @returns Promise that resolves when navigation is complete
   */
  async goto(): Promise<void> {
    const url = `${this.baseUrl}${this.path}`;
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  /**
   * Wait for the page to be fully loaded
   * @returns Promise that resolves when the page is loaded
   */
  async waitForPageLoad(): Promise<void> {
    // Wait for the page to be in a ready state
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for an element to be visible
   * @param selector - The selector for the element
   * @param timeout - Optional timeout in milliseconds
   * @returns Promise that resolves to the Locator for the element
   */
  async waitForSelector(selector: string, timeout?: number): Promise<Locator> {
    const locator = this.page.locator(selector);
    await locator.waitFor({ state: 'visible', timeout });
    return locator;
  }

  /**
   * Wait for a network request to complete
   * @param urlPattern - The URL pattern to match
   * @param options - Optional options for the wait
   * @returns Promise that resolves when the request is complete
   */
  async waitForRequest(
    urlPattern: string | RegExp,
    options?: { timeout?: number }
  ): Promise<void> {
    await this.page.waitForRequest(urlPattern, options);
  }

  /**
   * Wait for a network response to complete
   * @param urlPattern - The URL pattern to match
   * @param options - Optional options for the wait
   * @returns Promise that resolves when the response is complete
   */
  async waitForResponse(
    urlPattern: string | RegExp,
    options?: { timeout?: number }
  ): Promise<void> {
    await this.page.waitForResponse(urlPattern, options);
  }

  /**
   * Take a screenshot of the page
   * @param name - Optional name for the screenshot
   * @param options - Optional screenshot options
   * @returns Promise that resolves when the screenshot is taken
   */
  async takeScreenshot(
    name?: string,
    options?: { fullPage?: boolean; animations?: 'disabled' | 'allow' }
  ): Promise<void> {
    const screenshotOptions = {
      fullPage: options?.fullPage ?? true,
      animations: options?.animations ?? 'disabled',
    };

    await expect(this.page).toHaveScreenshot(
      name || 'screenshot',
      screenshotOptions
    );
  }

  /**
   * Get the title of the page
   * @returns Promise that resolves to the page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get the current URL of the page
   * @returns The current URL
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Check if an element exists on the page
   * @param selector - The selector for the element
   * @returns Promise that resolves to true if the element exists, false otherwise
   */
  async elementExists(selector: string): Promise<boolean> {
    const count = await this.page.locator(selector).count();
    return count > 0;
  }

  /**
   * Wait for an element to be removed from the DOM
   * @param selector - The selector for the element
   * @param timeout - Optional timeout in milliseconds
   * @returns Promise that resolves when the element is removed
   */
  async waitForElementToBeRemoved(
    selector: string,
    timeout?: number
  ): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'detached', timeout });
  }

  /**
   * Fill a form field
   * @param selector - The selector for the field
   * @param value - The value to fill
   * @returns Promise that resolves when the field is filled
   */
  async fillField(selector: string, value: string): Promise<void> {
    const field = this.page.locator(selector);
    await field.waitFor({ state: 'visible' });
    await field.fill(value);
  }

  /**
   * Click an element
   * @param selector - The selector for the element
   * @returns Promise that resolves when the element is clicked
   */
  async click(selector: string): Promise<void> {
    const element = this.page.locator(selector);
    await element.waitFor({ state: 'visible' });
    await element.click();
  }

  /**
   * Get text from an element
   * @param selector - The selector for the element
   * @returns Promise that resolves to the text content
   */
  async getText(selector: string): Promise<string> {
    const element = this.page.locator(selector);
    await element.waitFor({ state: 'visible' });
    const textContent = await element.textContent();
    return textContent ?? '';
  }

  /**
   * Check if an element is visible
   * @param selector - The selector for the element
   * @returns Promise that resolves to true if the element is visible
   */
  async isVisible(selector: string): Promise<boolean> {
    const element = this.page.locator(selector);
    return await element.isVisible();
  }

  /**
   * Wait for a condition to be true
   * @param condition - The condition function
   * @param timeout - Optional timeout in milliseconds
   * @param message - Optional error message
   * @returns Promise that resolves when the condition is true
   */
  async waitForCondition(
    condition: () => Promise<boolean>,
    timeout: number = 30000,
    message: string = 'Condition not met within timeout'
  ): Promise<void> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }
      await this.page.waitForTimeout(100); // Small wait to avoid tight loop
    }
    throw new Error(message);
  }
}
