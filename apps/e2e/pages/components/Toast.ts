import { Page as PlaywrightPage, Locator } from '@playwright/test';

/**
 * Component object for toast notifications
 */
export class Toast {
  private readonly toastSelector = '.peakhealth-toast-message';
  private readonly page: PlaywrightPage;

  /**
   * Constructor for the Toast component
   * @param page - The Playwright page object
   */
  constructor(page: PlaywrightPage) {
    this.page = page;
  }

  /**
   * Get the toast element
   * @returns Locator for the toast element
   */
  getToast(): Locator {
    return this.page.locator(this.toastSelector);
  }

  /**
   * Check if a toast is visible
   * @returns Promise that resolves to true if a toast is visible
   */
  async isVisible(): Promise<boolean> {
    return await this.getToast().isVisible();
  }

  /**
   * Get the text of the toast message
   * @returns Promise that resolves to the toast message text
   */
  async getText(): Promise<string | null> {
    if (await this.isVisible()) {
      return await this.getToast().textContent();
    }
    return null;
  }

  /**
   * Wait for a toast to appear
   * @param text - Optional text to check for in the toast
   * @param timeout - Optional timeout in milliseconds
   * @returns Promise that resolves when the toast appears
   */
  async waitForToast(text?: string, timeout?: number): Promise<void> {
    const toast = this.getToast();
    await toast.waitFor({ state: 'visible', timeout });

    if (text) {
      await toast.waitFor({
        state: 'visible',
        timeout,
        predicate: async element => {
          const content = await element.textContent();
          return content !== null && content.includes(text);
        },
      });
    }
  }

  /**
   * Wait for a toast to disappear
   * @param timeout - Optional timeout in milliseconds
   * @returns Promise that resolves when the toast disappears
   */
  async waitForToastToDisappear(timeout?: number): Promise<void> {
    const toast = this.getToast();
    await toast.waitFor({ state: 'detached', timeout });
  }

  /**
   * Check if a toast contains specific text
   * @param text - The text to check for
   * @returns Promise that resolves to true if the toast contains the text
   */
  async containsText(text: string): Promise<boolean> {
    if (await this.isVisible()) {
      const toastText = await this.getText();
      return toastText !== null && toastText.includes(text);
    }
    return false;
  }
}
