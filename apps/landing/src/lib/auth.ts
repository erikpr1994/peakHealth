/**
 * Auth app URL configuration
 */
import { routing } from '@/i18n/routing';

const getAuthAppUrl = (): string => {
  // In development, auth app runs on port 3000
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  // In production, use the auth subdomain
  return 'https://auth.peakhealth.es';
};

/**
 * Get the login URL with the current locale
 * @param returnUrl Optional return URL after login
 * @param locale The locale to use (defaults to 'en' if not provided)
 * @returns The login URL with locale
 */
export const getLoginUrl = (returnUrl?: string, locale?: string): string => {
  const authUrl = getAuthAppUrl();
  const currentLocale = locale || routing.defaultLocale;
  const loginUrl = `${authUrl}/${currentLocale}/login`;

  if (returnUrl) {
    return `${loginUrl}?returnUrl=${encodeURIComponent(returnUrl)}`;
  }

  return loginUrl;
};

/**
 * Get the signup URL with the current locale
 * @param returnUrl Optional return URL after signup
 * @param locale The locale to use (defaults to 'en' if not provided)
 * @returns The signup URL with locale
 */
export const getSignupUrl = (returnUrl?: string, locale?: string): string => {
  const authUrl = getAuthAppUrl();
  const currentLocale = locale || routing.defaultLocale;
  const signupUrl = `${authUrl}/${currentLocale}/signup`;

  if (returnUrl) {
    return `${signupUrl}?returnUrl=${encodeURIComponent(returnUrl)}`;
  }

  return signupUrl;
};
