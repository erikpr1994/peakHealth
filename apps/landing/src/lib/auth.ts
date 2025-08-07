/**
 * Auth app URL configuration
 */

const getAuthAppUrl = (): string => {
  // In development, auth app runs on port 3000
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  // In production, use the auth subdomain
  return 'https://auth.peakhealth.es';
};

export const getLoginUrl = (returnUrl?: string): string => {
  const authUrl = getAuthAppUrl();
  const loginUrl = `${authUrl}/login`;

  if (returnUrl) {
    return `${loginUrl}?returnUrl=${encodeURIComponent(returnUrl)}`;
  }

  return loginUrl;
};

export const getSignupUrl = (returnUrl?: string): string => {
  const authUrl = getAuthAppUrl();
  const signupUrl = `${authUrl}/signup`;

  if (returnUrl) {
    return `${signupUrl}?returnUrl=${encodeURIComponent(returnUrl)}`;
  }

  return signupUrl;
};
