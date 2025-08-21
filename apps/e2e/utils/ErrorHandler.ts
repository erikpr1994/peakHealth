import { Page as PlaywrightPage, TestInfo } from '@playwright/test';

const { Buffer } = globalThis;

/**
 * Helper class for handling errors in tests
 */
export class ErrorHandler {
  private readonly consoleLogs: string[] = [];
  private readonly errors: string[] = [];
  private readonly page: PlaywrightPage;
  private readonly testInfo: TestInfo;

  /**
   * Constructor for the ErrorHandler
   * @param page - The Playwright page object
   * @param testInfo - The TestInfo object
   */
  constructor(page: PlaywrightPage, testInfo: TestInfo) {
    this.page = page;
    this.testInfo = testInfo;
    this.setupListeners();
  }

  /**
   * Set up event listeners for console logs and errors
   */
  private setupListeners(): void {
    this.page.on('console', msg => {
      const text = `${msg.type()}: ${msg.text()}`;
      this.consoleLogs.push(text);

      // Attach console logs to test results
      this.testInfo.attachments.push({
        name: `console-${this.consoleLogs.length}.txt`,
        contentType: 'text/plain',
        body: Buffer.from(text, 'utf-8'),
      });
    });

    this.page.on('pageerror', error => {
      const text = error.message;
      this.errors.push(text);

      // Attach errors to test results
      this.testInfo.attachments.push({
        name: `error-${this.errors.length}.txt`,
        contentType: 'text/plain',
        body: Buffer.from(text, 'utf-8'),
      });
    });

    // Handle dialogs automatically
    this.page.on('dialog', dialog => {
      // Log the dialog message
      const text = `Dialog: ${dialog.type()} - ${dialog.message()}`;
      this.consoleLogs.push(text);

      // Attach dialog info to test results
      this.testInfo.attachments.push({
        name: `dialog-${this.consoleLogs.length}.txt`,
        contentType: 'text/plain',
        body: Buffer.from(text, 'utf-8'),
      });

      // Accept the dialog
      dialog.accept();
    });
  }

  /**
   * Take a screenshot when an error occurs
   * @param name - Optional name for the screenshot
   * @returns Promise that resolves when the screenshot is taken
   */
  async takeErrorScreenshot(name?: string): Promise<void> {
    const screenshotName = name || `error-${Date.now()}`;
    const screenshotPath = `${screenshotName}.png`;

    await this.page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    // Attach the screenshot to test results
    this.testInfo.attachments.push({
      name: `${screenshotName}.png`,
      contentType: 'image/png',
      path: screenshotPath,
    });
  }

  /**
   * Get all console logs
   * @returns Array of console logs
   */
  getConsoleLogs(): string[] {
    return this.consoleLogs;
  }

  /**
   * Get all errors
   * @returns Array of errors
   */
  getErrors(): string[] {
    return this.errors;
  }

  /**
   * Check if there are any errors
   * @returns True if there are errors
   */
  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  /**
   * Log additional information
   * @param message - The message to log
   * @param data - Optional data to include
   */
  log(message: string, data?: any): void {
    const text = data ? `${message}: ${JSON.stringify(data)}` : message;

    this.consoleLogs.push(text);

    // Attach log to test results
    this.testInfo.attachments.push({
      name: `log-${this.consoleLogs.length}.txt`,
      contentType: 'text/plain',
      body: Buffer.from(text, 'utf-8'),
    });
  }
}
