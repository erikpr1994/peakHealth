import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getLoginUrl, getSignupUrl } from './auth';

describe('auth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  // Helper function to construct expected URLs with correct encoding
  const buildExpectedUrl = (
    base: string,
    path: string,
    returnUrl?: string
  ): string => {
    if (returnUrl) {
      // Use encodeURIComponent to match the auth function behavior
      const encodedReturnUrl = encodeURIComponent(returnUrl);
      return `${base}?returnUrl=${encodedReturnUrl}`;
    }
    return base;
  };

  describe('getLoginUrl', () => {
    it('should return development URL when NODE_ENV is development', () => {
      vi.stubEnv('NODE_ENV', 'development');
      expect(getLoginUrl()).toBe('http://localhost:3000/en/login');
    });

    it('should return production URL when NODE_ENV is production', () => {
      vi.stubEnv('NODE_ENV', 'production');
      expect(getLoginUrl()).toBe('https://auth.peakhealth.es/en/login');
    });

    it('should include returnUrl when provided', () => {
      vi.stubEnv('NODE_ENV', 'development');
      const returnUrl = '/dashboard';
      const result = getLoginUrl(returnUrl);
      const expectedUrl = buildExpectedUrl(
        'http://localhost:3000/en/login',
        '/login',
        returnUrl
      );
      expect(result).toBe(expectedUrl);
    });

    it('should handle special characters in returnUrl', () => {
      vi.stubEnv('NODE_ENV', 'development');
      const returnUrl = '/path with spaces';
      const result = getLoginUrl(returnUrl);
      const expectedUrl = buildExpectedUrl(
        'http://localhost:3000/en/login',
        '/login',
        returnUrl
      );
      expect(result).toBe(expectedUrl);
    });

    it('should use provided locale', () => {
      vi.stubEnv('NODE_ENV', 'development');
      const result = getLoginUrl(undefined, 'es');
      expect(result).toBe('http://localhost:3000/es/login');
    });
  });

  describe('getSignupUrl', () => {
    it('should return development URL when NODE_ENV is development', () => {
      vi.stubEnv('NODE_ENV', 'development');
      expect(getSignupUrl()).toBe('http://localhost:3000/en/signup');
    });

    it('should return production URL when NODE_ENV is production', () => {
      vi.stubEnv('NODE_ENV', 'production');
      expect(getSignupUrl()).toBe('https://auth.peakhealth.es/en/signup');
    });

    it('should include returnUrl when provided', () => {
      vi.stubEnv('NODE_ENV', 'development');
      const returnUrl = '/welcome';
      const result = getSignupUrl(returnUrl);
      const expectedUrl = buildExpectedUrl(
        'http://localhost:3000/en/signup',
        '/signup',
        returnUrl
      );
      expect(result).toBe(expectedUrl);
    });

    it('should handle special characters in returnUrl', () => {
      vi.stubEnv('NODE_ENV', 'development');
      const returnUrl = '/path with spaces';
      const result = getSignupUrl(returnUrl);
      const expectedUrl = buildExpectedUrl(
        'http://localhost:3000/en/signup',
        '/signup',
        returnUrl
      );
      expect(result).toBe(expectedUrl);
    });

    it('should use provided locale', () => {
      vi.stubEnv('NODE_ENV', 'development');
      const result = getSignupUrl(undefined, 'es');
      expect(result).toBe('http://localhost:3000/es/signup');
    });
  });
});
