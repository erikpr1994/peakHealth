import { describe, it, expect } from 'vitest';
import type { AppConfig, User, Session, AuthState } from './index';

describe('auth-types', () => {
  describe('AppConfig type', () => {
    it('should validate correct AppConfig structure', () => {
      const appConfig: AppConfig = {
        name: 'Test App',
        domain: 'test.com',
        path: '/dashboard',
        roles: ['user', 'admin'],
        groups: ['free', 'premium'],
        description: 'Test description',
        icon: '🚀',
      };

      expect(appConfig.name).toBe('Test App');
      expect(appConfig.domain).toBe('test.com');
      expect(appConfig.roles).toEqual(['user', 'admin']);
      expect(appConfig.groups).toEqual(['free', 'premium']);
    });

    it('should allow optional fields', () => {
      const appConfig: AppConfig = {
        name: 'Minimal App',
        domain: 'minimal.com',
        path: '/',
        roles: ['user'],
        groups: ['free'],
      };

      expect(appConfig.description).toBeUndefined();
      expect(appConfig.icon).toBeUndefined();
    });
  });

  describe('User type', () => {
    it('should validate correct User structure', () => {
      const user: User = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        user_metadata: { name: 'John Doe' },
        app_metadata: { role: 'user' },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      expect(user.id).toBe('123e4567-e89b-12d3-a456-426614174000');
      expect(user.email).toBe('test@example.com');
      expect(user.user_metadata).toEqual({ name: 'John Doe' });
    });

    it('should allow minimal User structure', () => {
      const user: User = {
        id: '123e4567-e89b-12d3-a456-426614174000',
      };

      expect(user.id).toBe('123e4567-e89b-12d3-a456-426614174000');
      expect(user.email).toBeUndefined();
    });
  });

  describe('Session type', () => {
    it('should validate correct Session structure', () => {
      const session: Session = {
        access_token: 'access_token_123',
        refresh_token: 'refresh_token_456',
        expires_in: 3600,
        expires_at: 1704067200,
        token_type: 'Bearer',
        user: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'test@example.com',
        },
      };

      expect(session.access_token).toBe('access_token_123');
      expect(session.refresh_token).toBe('refresh_token_456');
      expect(session.expires_in).toBe(3600);
      expect(session.token_type).toBe('Bearer');
      expect(session.user.id).toBe('123e4567-e89b-12d3-a456-426614174000');
    });
  });

  describe('AuthState type', () => {
    it('should validate correct AuthState structure', () => {
      const authState: AuthState = {
        user: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'test@example.com',
        },
        session: {
          access_token: 'access_token_123',
          refresh_token: 'refresh_token_456',
          expires_in: 3600,
          token_type: 'Bearer',
          user: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            email: 'test@example.com',
          },
        },
        isLoading: false,
        error: null,
      };

      expect(authState.user?.email).toBe('test@example.com');
      expect(authState.session?.access_token).toBe('access_token_123');
      expect(authState.isLoading).toBe(false);
      expect(authState.error).toBeNull();
    });

    it('should allow null user and session', () => {
      const authState: AuthState = {
        user: null,
        session: null,
        isLoading: true,
        error: 'Authentication failed',
      };

      expect(authState.user).toBeNull();
      expect(authState.session).toBeNull();
      expect(authState.isLoading).toBe(true);
      expect(authState.error).toBe('Authentication failed');
    });
  });
});
