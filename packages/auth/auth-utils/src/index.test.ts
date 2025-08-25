import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  hasRole,
  hasGroup,
  validateReturnUrl,
  getReturnUrl,
  buildAppRedirectUrl,
  extractLocaleFromUrl,
  extractLocaleFromPathname,
  extractLocaleFromPathnameWithFallback,
  parseAcceptLanguage,
} from './index';
import type { User } from '@supabase/supabase-js';

describe('Auth Utils', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.org')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      const result = validatePassword('StrongPass123');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject weak passwords', () => {
      const result = validatePassword('weak');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('validateReturnUrl', () => {
    it('should validate relative URLs', () => {
      expect(validateReturnUrl('/dashboard', [])).toBe(true);
      expect(validateReturnUrl('/profile', [])).toBe(true);
    });

    it('should validate allowed domains', () => {
      expect(
        validateReturnUrl('https://example.com/dashboard', ['example.com'])
      ).toBe(true);
      expect(
        validateReturnUrl('https://sub.example.com/profile', ['example.com'])
      ).toBe(true);
    });

    it('should reject disallowed domains', () => {
      expect(
        validateReturnUrl('https://malicious.com/dashboard', ['example.com'])
      ).toBe(false);
    });

    it('should reject invalid URLs that are not relative', () => {
      expect(validateReturnUrl('invalid-url', ['example.com'])).toBe(false);
      expect(validateReturnUrl('not-a-url', [])).toBe(false);
    });
  });

  describe('getReturnUrl', () => {
    it('should extract returnUrl from search params', () => {
      const searchParams = new URLSearchParams('returnUrl=/dashboard');
      expect(getReturnUrl(searchParams)).toBe('/dashboard');
    });

    it('should extract redirect from search params', () => {
      const searchParams = new URLSearchParams('redirect=/profile');
      expect(getReturnUrl(searchParams)).toBe('/profile');
    });

    it('should return null when no return URL is present', () => {
      const searchParams = new URLSearchParams('other=value');
      expect(getReturnUrl(searchParams)).toBe(null);
    });
  });

  describe('hasRole', () => {
    it('should check user types array', () => {
      const user = {
        app_metadata: {
          user_types: ['admin', 'user'],
        },
      };
      expect(hasRole(user as unknown as User, 'admin')).toBe(true);
      expect(hasRole(user as unknown as User, 'user')).toBe(true);
      expect(hasRole(user as unknown as User, 'moderator')).toBe(false);
    });

    it('should check primary user type', () => {
      const user = {
        app_metadata: {
          primary_user_type: 'admin',
        },
      };
      expect(hasRole(user as unknown as User, 'admin')).toBe(true);
      expect(hasRole(user as unknown as User, 'user')).toBe(false);
    });

    it('should return false for null user', () => {
      expect(hasRole(null, 'admin')).toBe(false);
    });
  });

  describe('hasGroup', () => {
    it('should check if user has group', () => {
      const user = {
        app_metadata: {
          groups: ['premium', 'beta'],
        },
      };
      expect(hasGroup(user as unknown as User, 'premium')).toBe(true);
      expect(hasGroup(user as unknown as User, 'beta')).toBe(true);
      expect(hasGroup(user as unknown as User, 'free')).toBe(false);
    });

    it('should return false for null user', () => {
      expect(hasGroup(null, 'premium')).toBe(false);
    });
  });
});

describe('Locale utilities', () => {
  describe('extractLocaleFromUrl', () => {
    it('should extract locale from URL with locale prefix', () => {
      expect(extractLocaleFromUrl('https://example.com/es/dashboard')).toBe(
        'es'
      );
      expect(extractLocaleFromUrl('https://example.com/en/profile')).toBe('en');
    });

    it('should return null for URL without locale prefix', () => {
      expect(extractLocaleFromUrl('https://example.com/dashboard')).toBeNull();
      expect(extractLocaleFromUrl('https://example.com/')).toBeNull();
    });

    it('should return null for invalid URL', () => {
      expect(extractLocaleFromUrl('invalid-url')).toBeNull();
    });
  });

  describe('extractLocaleFromPathname', () => {
    it('should extract locale from pathname with locale prefix', () => {
      expect(extractLocaleFromPathname('/es/dashboard')).toBe('es');
      expect(extractLocaleFromPathname('/en/profile')).toBe('en');
    });

    it('should return null for pathname without locale prefix', () => {
      expect(extractLocaleFromPathname('/dashboard')).toBeNull();
      expect(extractLocaleFromPathname('/')).toBeNull();
    });
  });

  describe('extractLocaleFromPathnameWithFallback', () => {
    it('should extract locale from pathname with locale prefix', () => {
      expect(extractLocaleFromPathnameWithFallback('/es/dashboard')).toBe('es');
      expect(extractLocaleFromPathnameWithFallback('/en/profile')).toBe('en');
    });

    it('should return default locale for pathname without locale prefix', () => {
      expect(extractLocaleFromPathnameWithFallback('/dashboard')).toBe('en');
      expect(extractLocaleFromPathnameWithFallback('/')).toBe('en');
    });
  });

  describe('parseAcceptLanguage', () => {
    it('should parse Accept-Language header correctly', () => {
      expect(parseAcceptLanguage('es-ES,es;q=0.9,en;q=0.8')).toBe('es');
      expect(parseAcceptLanguage('en-US,en;q=0.9,es;q=0.8')).toBe('en');
    });

    it('should handle quality values correctly', () => {
      expect(parseAcceptLanguage('en;q=0.8,es;q=0.9')).toBe('es');
      expect(parseAcceptLanguage('fr;q=0.9,es;q=0.8,en;q=0.7')).toBe('es');
    });

    it('should return default locale for unsupported languages', () => {
      expect(parseAcceptLanguage('fr-FR,fr;q=0.9')).toBe('en');
      expect(parseAcceptLanguage('de-DE,de;q=0.9')).toBe('en');
    });

    it('should return default locale for empty header', () => {
      expect(parseAcceptLanguage('')).toBe('en');
    });
  });
});

describe('buildAppRedirectUrl with locale support', () => {
  it('should build URL without locale for default locale (en)', () => {
    const url = buildAppRedirectUrl('web', { locale: 'en' });
    expect(url).not.toContain('/en/');
    expect(url).toContain('/dashboard');
  });

  it('should build URL with locale prefix for non-default locale', () => {
    const url = buildAppRedirectUrl('web', { locale: 'es' });
    expect(url).toContain('/es/dashboard');
  });

  it('should build URL without locale when locale is not provided', () => {
    const url = buildAppRedirectUrl('web');
    expect(url).not.toContain('/en/');
    expect(url).toContain('/dashboard');
  });

  it('should preserve returnUrl when provided', () => {
    const url = buildAppRedirectUrl('web', {
      locale: 'es',
      returnUrl: '/profile',
    });
    expect(url).toContain('/es/profile');
  });

  it('should work with different app keys', () => {
    const webUrl = buildAppRedirectUrl('web', { locale: 'es' });
    expect(webUrl).toContain('/es/dashboard');

    const adminUrl = buildAppRedirectUrl('admin', { locale: 'es' });
    expect(adminUrl).toContain('/es/dashboard');

    const proUrl = buildAppRedirectUrl('pro', { locale: 'es' });
    expect(proUrl).toContain('/es/dashboard');
  });
});
