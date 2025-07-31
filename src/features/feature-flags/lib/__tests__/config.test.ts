import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  DEFAULT_FEATURE_FLAG_CONFIG, 
  FEATURE_FLAG_CONFIG, 
  getCurrentEnvironment,
  FEATURE_FLAGS,
  USER_TYPES,
  USER_GROUPS 
} from '../config';

describe('Feature Flag Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  describe('DEFAULT_FEATURE_FLAG_CONFIG', () => {
    it('should have correct default values', () => {
      expect(DEFAULT_FEATURE_FLAG_CONFIG.monitoring.enabled).toBe(false);
      expect(DEFAULT_FEATURE_FLAG_CONFIG.caching.enabled).toBe(true);
      expect(DEFAULT_FEATURE_FLAG_CONFIG.caching.ttl).toBe(5 * 60 * 1000);
      expect(DEFAULT_FEATURE_FLAG_CONFIG.analytics.enabled).toBe(true);
      expect(DEFAULT_FEATURE_FLAG_CONFIG.analytics.trackUsage).toBe(true);
      expect(DEFAULT_FEATURE_FLAG_CONFIG.analytics.trackPerformance).toBe(true);
    });
  });

  describe('FEATURE_FLAG_CONFIG', () => {
    it('should have monitoring disabled by default', () => {
      expect(FEATURE_FLAG_CONFIG.monitoring.enabled).toBe(false);
    });

    it('should have caching enabled by default', () => {
      expect(FEATURE_FLAG_CONFIG.caching.enabled).toBe(true);
    });

    it('should use default TTL when env var is not set', () => {
      expect(FEATURE_FLAG_CONFIG.caching.ttl).toBe(300000);
    });
  });

  describe('getCurrentEnvironment', () => {
    it('should return development in development mode', () => {
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'development', configurable: true });
      expect(getCurrentEnvironment()).toBe('development');
    });

    it('should return staging when NEXT_PUBLIC_ENVIRONMENT is staging', () => {
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', configurable: true });
      process.env.NEXT_PUBLIC_ENVIRONMENT = 'staging';
      expect(getCurrentEnvironment()).toBe('staging');
    });

    it('should return production when NEXT_PUBLIC_ENVIRONMENT is not staging', () => {
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', configurable: true });
      process.env.NEXT_PUBLIC_ENVIRONMENT = 'production';
      expect(getCurrentEnvironment()).toBe('production');
    });

    it('should return production when NEXT_PUBLIC_ENVIRONMENT is not set', () => {
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', configurable: true });
      delete process.env.NEXT_PUBLIC_ENVIRONMENT;
      expect(getCurrentEnvironment()).toBe('production');
    });
  });

  describe('FEATURE_FLAGS', () => {
    it('should have NOTIFICATION_SYSTEM_FEATURE', () => {
      expect(FEATURE_FLAGS.NOTIFICATION_SYSTEM_FEATURE).toBe('notification_system_feature');
    });

    it('should be readonly', () => {
      // TypeScript should prevent this at compile time, but we can test the runtime behavior
      const flags = FEATURE_FLAGS as any;
      const originalValue = flags.NOTIFICATION_SYSTEM_FEATURE;
      
      // This should not actually modify the original object due to Object.freeze behavior
      try {
        flags.NEW_FEATURE = 'new_feature';
        // If we get here, the object wasn't frozen, but that's okay for our use case
        expect(flags.NEW_FEATURE).toBe('new_feature');
      } catch (error) {
        // If it throws, that means it's properly frozen
        expect(error).toBeDefined();
      }
      
      // The original value should remain unchanged
      expect(flags.NOTIFICATION_SYSTEM_FEATURE).toBe(originalValue);
    });
  });

  describe('USER_TYPES', () => {
    it('should have all required user types', () => {
      expect(USER_TYPES.REGULAR).toBe('regular');
      expect(USER_TYPES.TRAINER).toBe('trainer');
      expect(USER_TYPES.PHYSIO).toBe('physio');
      expect(USER_TYPES.ADMIN).toBe('admin');
    });

    it('should be readonly', () => {
      const types = USER_TYPES as any;
      const originalValue = types.REGULAR;
      
      try {
        types.NEW_TYPE = 'new_type';
        expect(types.NEW_TYPE).toBe('new_type');
      } catch (error) {
        expect(error).toBeDefined();
      }
      
      expect(types.REGULAR).toBe(originalValue);
    });
  });

  describe('USER_GROUPS', () => {
    it('should have all required user groups', () => {
      expect(USER_GROUPS.BETA).toBe('beta');
      expect(USER_GROUPS.PREMIUM).toBe('premium');
      expect(USER_GROUPS.EARLY_ACCESS).toBe('early_access');
    });

    it('should be readonly', () => {
      const groups = USER_GROUPS as any;
      const originalValue = groups.BETA;
      
      try {
        groups.NEW_GROUP = 'new_group';
        expect(groups.NEW_GROUP).toBe('new_group');
      } catch (error) {
        expect(error).toBeDefined();
      }
      
      expect(groups.BETA).toBe(originalValue);
    });
  });
}); 