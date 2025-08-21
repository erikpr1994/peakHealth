import { Page as PlaywrightPage } from '@playwright/test';
import { AdminBasePage } from './AdminBasePage';

/**
 * Page object for the admin dashboard page
 */
export class DashboardPage extends AdminBasePage {
  // Selectors specific to the admin dashboard page
  private readonly adminWelcomeMessageSelector =
    'p:has-text("Welcome back! Here\'s what\'s happening with your platform today.")';
  private readonly webWelcomeMessageSelector = 'h1:has-text("Good morning")';
  private readonly statsCardSelector = '[data-testid="stats-card"]';
  private readonly userStatsSelector = '[data-testid="user-stats"]';
  private readonly activityLogSelector = '[data-testid="activity-log"]';

  private readonly isAdminApp: boolean;

  /**
   * Constructor for the AdminDashboardPage
   * @param page - The Playwright page object
   * @param isAdminApp - Whether this is the admin app (vs web app)
   */
  constructor(page: PlaywrightPage, isAdminApp: boolean = true) {
    super(page, '/dashboard', isAdminApp);
    this.isAdminApp = isAdminApp;
  }

  /**
   * Check if the greeting message is visible
   * @returns Promise that resolves to true if the greeting message is visible
   */
  async isWelcomeMessageVisible(): Promise<boolean> {
    const selector = this.isAdminApp
      ? this.adminWelcomeMessageSelector
      : this.webWelcomeMessageSelector;
    return this.isVisible(selector);
  }

  /**
   * Get the greeting message text
   * @returns Promise that resolves to the greeting message text
   */
  async getWelcomeMessage(): Promise<string> {
    const selector = this.isAdminApp
      ? this.adminWelcomeMessageSelector
      : this.webWelcomeMessageSelector;
    return this.getText(selector);
  }

  /**
   * Check if the stats cards are visible
   * @returns Promise that resolves to true if the stats cards are visible
   */
  async areStatsCardsVisible(): Promise<boolean> {
    return this.isVisible(this.statsCardSelector);
  }

  /**
   * Check if the user stats section is visible
   * @returns Promise that resolves to true if the user stats section is visible
   */
  async areUserStatsVisible(): Promise<boolean> {
    return this.isVisible(this.userStatsSelector);
  }

  /**
   * Check if the activity log is visible
   * @returns Promise that resolves to true if the activity log is visible
   */
  async isActivityLogVisible(): Promise<boolean> {
    return this.isVisible(this.activityLogSelector);
  }

  /**
   * Take a screenshot of the admin dashboard page
   * @returns Promise that resolves when the screenshot is taken
   */
  async takeScreenshot(): Promise<void> {
    await super.takeScreenshot('admin-dashboard', {
      fullPage: true,
      animations: 'disabled',
    });
  }
}
