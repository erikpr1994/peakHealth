import { Page as PlaywrightPage } from '@playwright/test';
import { Page } from './base/Page';

/**
 * Page object for the authentication pages (login, signup)
 */
export class AuthPage extends Page {
  // Selectors for auth page elements
  private readonly emailInputSelector = 'input[placeholder="Enter your email"]';
  private readonly passwordInputSelector =
    'input[placeholder="Enter your password"]';
  private readonly signInButtonSelector =
    'button:has-text("Sign In"), button:has-text("Log In")';
  private readonly signUpButtonSelector =
    'button:has-text("Sign Up"), button:has-text("Register")';
  private readonly signInLinkSelector =
    'a:has-text("Sign In"), a:has-text("Login")';
  private readonly signUpLinkSelector =
    'a:has-text("Sign Up"), a:has-text("Register")';
  private readonly errorMessageSelector = '[role="alert"]';

  /**
   * Constructor for the AuthPage
   * @param page - The Playwright page object
   * @param path - The path of the page (e.g., '/login', '/signup')
   */
  constructor(page: PlaywrightPage, path: string = '/login') {
    super(page, path, 'http://localhost:3000/en');
  }

  /**
   * Fill the email field
   * @param email - The email to fill
   * @returns Promise that resolves when the field is filled
   */
  async fillEmail(email: string): Promise<void> {
    await this.fillField(this.emailInputSelector, email);
  }

  /**
   * Fill the password field
   * @param password - The password to fill
   * @returns Promise that resolves when the field is filled
   */
  async fillPassword(password: string): Promise<void> {
    await this.fillField(this.passwordInputSelector, password);
  }

  /**
   * Click the Sign In button
   * @returns Promise that resolves when the button is clicked
   */
  async clickSignIn(): Promise<void> {
    await this.click(this.signInButtonSelector);
  }

  /**
   * Click the Sign Up button
   * @returns Promise that resolves when the button is clicked
   */
  async clickSignUp(): Promise<void> {
    await this.click(this.signUpButtonSelector);
  }

  /**
   * Click the Sign In link
   * @returns Promise that resolves when the link is clicked
   */
  async clickSignInLink(): Promise<void> {
    await this.click(this.signInLinkSelector);
    await this.waitForPageLoad();
  }

  /**
   * Click the Sign Up link
   * @returns Promise that resolves when the link is clicked
   */
  async clickSignUpLink(): Promise<void> {
    await this.click(this.signUpLinkSelector);
    await this.waitForPageLoad();
  }

  /**
   * Login with email and password
   * @param email - The email to use
   * @param password - The password to use
   * @returns Promise that resolves when login is complete
   */
  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignIn();
  }

  /**
   * Check if an error message is visible
   * @returns Promise that resolves to true if an error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return this.isVisible(this.errorMessageSelector);
  }

  /**
   * Get the error message text
   * @returns Promise that resolves to the error message text
   */
  async getErrorMessage(): Promise<string> {
    await this.waitForSelector(this.errorMessageSelector);
    return this.getText(this.errorMessageSelector);
  }

  /**
   * Take a screenshot of the auth page
   * @param name - Optional name for the screenshot
   * @returns Promise that resolves when the screenshot is taken
   */
  async takeScreenshot(name?: string): Promise<void> {
    await super.takeScreenshot(name || 'auth', {
      fullPage: true,
      animations: 'disabled',
    });
  }
}
