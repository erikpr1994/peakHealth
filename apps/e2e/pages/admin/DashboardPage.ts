import { Page as PlaywrightPage } from '@playwright/test';
import { AdminBasePage } from './AdminBasePage';

/**
 * Page object for the admin dashboard page
 */
export class DashboardPage extends AdminBasePage {
  // Selectors specific to the admin dashboard page
  private readonly welcomeMessageSelector = 'h1:has-text("Welcome")';
  private readonly statsCardSelector = '[data-testid="stats-card"]';
  private readonly userStatsSelector = '[data-testid="user-stats"]';
  private readonly activityLogSelector = '[data-testid="activity-log"]';

  /**
   * Constructor for the AdminDashboardPage
   * @param page - The Playwright page object
   * @param isAdminApp - Whether this is the admin app (vs web app)
   */
  constructor(page: PlaywrightPage, isAdminApp: boolean = true) {
    super(page, '/dashboard', isAdminApp);
  }

  /**
   * Check if the welcome message is visible
   * @returns Promise that resolves to true if the welcome message is visible
   */
  async isWelcomeMessageVisible(): Promise<boolean> {
    return this.isVisible(this.welcomeMessageSelector);
  }

  /**
   * Get the welcome message text
   * @returns Promise that resolves to the welcome message text
   */
  async getWelcomeMessage(): Promise<string> {
    return this.getText(this.welcomeMessageSelector);
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
