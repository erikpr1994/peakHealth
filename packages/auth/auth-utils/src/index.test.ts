import { describe, it, expect } from 'vitest';
import { getReturnUrl, canAccessApp } from './index';

describe('auth-utils', () => {
  describe('getReturnUrl', () => {
    it('should return returnUrl from search params', () => {
      const searchParams = new URLSearchParams('returnUrl=/dashboard');
      expect(getReturnUrl(searchParams)).toBe('/dashboard');
    });

    it('should return redirect from search params when returnUrl is not present', () => {
      const searchParams = new URLSearchParams('redirect=/profile');
      expect(getReturnUrl(searchParams)).toBe('/profile');
    });

    it('should return null when neither returnUrl nor redirect is present', () => {
      const searchParams = new URLSearchParams('other=value');
      expect(getReturnUrl(searchParams)).toBeNull();
    });

    it('should return null for empty search params', () => {
      const searchParams = new URLSearchParams();
      expect(getReturnUrl(searchParams)).toBeNull();
    });
  });

  describe('canAccessApp', () => {
    it('should allow access for admin user to admin app', () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        app_metadata: {
          user_types: ['admin'],
          primary_user_type: 'admin',
          groups: ['admin'],
        },
      };

      expect(canAccessApp(user, 'admin')).toBe(true);
    });

    it('should allow access for regular user to web app', () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        app_metadata: {
          user_types: ['user'],
          primary_user_type: 'user',
          groups: ['free'],
        },
      };

      expect(canAccessApp(user, 'web')).toBe(true);
    });

    it('should deny access for regular user to admin app', () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        app_metadata: {
          user_types: ['user'],
          primary_user_type: 'user',
          groups: ['free'],
        },
      };

      expect(canAccessApp(user, 'admin')).toBe(false);
    });

    it('should deny access for null user', () => {
      expect(canAccessApp(null, 'web')).toBe(false);
    });
  });
});
