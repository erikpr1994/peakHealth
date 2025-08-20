import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  hasRole,
  hasGroup,
  validateReturnUrl,
  getReturnUrl,
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
      expect(validateReturnUrl('/dashboard', [])).toBe(false);
      expect(validateReturnUrl('/profile', [])).toBe(false);
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
    });
  });
});
