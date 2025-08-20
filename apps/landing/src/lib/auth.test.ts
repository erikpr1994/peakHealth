import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getLoginUrl, getSignupUrl } from './auth';

describe('auth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('getLoginUrl', () => {
    it('should return development URL when NODE_ENV is development', () => {
      vi.stubEnv('NODE_ENV', 'development');
      expect(getLoginUrl()).toBe('http://localhost:3000/login');
    });

    it('should return production URL when NODE_ENV is production', () => {
      vi.stubEnv('NODE_ENV', 'production');
      expect(getLoginUrl()).toBe('https://auth.peakhealth.es/login');
    });

    it('should include returnUrl when provided', () => {
      vi.stubEnv('NODE_ENV', 'development');
      const returnUrl = '/dashboard';
      const result = getLoginUrl(returnUrl);
      expect(result).toBe('http://localhost:3000/login?returnUrl=%2Fdashboard');
    });

    it('should handle special characters in returnUrl', () => {
      vi.stubEnv('NODE_ENV', 'development');
      const returnUrl = '/path with spaces';
      const result = getLoginUrl(returnUrl);
      expect(result).toBe(
        'http://localhost:3000/login?returnUrl=%2Fpath%20with%20spaces'
      );
    });
  });

  describe('getSignupUrl', () => {
    it('should return development URL when NODE_ENV is development', () => {
      vi.stubEnv('NODE_ENV', 'development');
      expect(getSignupUrl()).toBe('http://localhost:3000/signup');
    });

    it('should return production URL when NODE_ENV is production', () => {
      vi.stubEnv('NODE_ENV', 'production');
      expect(getSignupUrl()).toBe('https://auth.peakhealth.es/signup');
    });

    it('should include returnUrl when provided', () => {
      vi.stubEnv('NODE_ENV', 'development');
      const returnUrl = '/welcome';
      const result = getSignupUrl(returnUrl);
      expect(result).toBe('http://localhost:3000/signup?returnUrl=%2Fwelcome');
    });

    it('should handle special characters in returnUrl', () => {
      vi.stubEnv('NODE_ENV', 'development');
      const returnUrl = '/path with spaces';
      const result = getSignupUrl(returnUrl);
      expect(result).toBe(
        'http://localhost:3000/signup?returnUrl=%2Fpath%20with%20spaces'
      );
    });
  });
});
