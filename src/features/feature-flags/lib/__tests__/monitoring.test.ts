import { describe, it, expect, beforeEach, vi } from 'vitest';
import { featureFlagMonitor } from '../monitoring';

describe('Feature Flag Monitoring', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset console methods to avoid test pollution
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    // Reset metrics before each test
    featureFlagMonitor.resetMetrics();
  });

  describe('trackFeatureFlagUsage', () => {
    it('should track feature flag usage', () => {
      featureFlagMonitor.trackFeatureFlagUsage('test-feature', true, 'user-123');
      
      const metrics = featureFlagMonitor.getMetrics();
      expect(metrics.usage['test-feature']).toBe(1);
    });

    it('should handle disabled feature flags', () => {
      featureFlagMonitor.trackFeatureFlagUsage('test-feature', false, 'user-123');
      
      const metrics = featureFlagMonitor.getMetrics();
      expect(metrics.usage['test-feature']).toBe(1);
    });
  });

  describe('trackFeatureFlagError', () => {
    it('should log feature flag errors', () => {
      const error = new Error('Feature flag fetch failed');
      
      featureFlagMonitor.trackFeatureFlagError('test-feature', error, 'user-123');
      
      expect(console.error).toHaveBeenCalledWith(
        '[Feature Flag Error]',
        'test-feature',
        error,
        'user-123'
      );
    });

    it('should handle errors without user context', () => {
      const error = new Error('Feature flag fetch failed');
      
      featureFlagMonitor.trackFeatureFlagError('test-feature', error);
      
      expect(console.error).toHaveBeenCalledWith(
        '[Feature Flag Error]',
        'test-feature',
        error,
        undefined
      );
    });

    it('should track error metrics', () => {
      const error = new Error('Feature flag fetch failed');
      
      featureFlagMonitor.trackFeatureFlagError('test-feature', error);
      
      const metrics = featureFlagMonitor.getMetrics();
      expect(metrics.errors['test-feature']).toBe(1);
    });
  });

  describe('trackFeatureFlagPerformance', () => {
    it('should track performance metrics', () => {
      featureFlagMonitor.trackFeatureFlagPerformance('test-feature', 150, 'user-123');
      
      const metrics = featureFlagMonitor.getMetrics();
      expect(metrics.performance['test-feature']).toBe(150);
    });

    it('should handle slow operations', () => {
      featureFlagMonitor.trackFeatureFlagPerformance('test-feature', 2000, 'user-123');
      
      const metrics = featureFlagMonitor.getMetrics();
      expect(metrics.performance['test-feature']).toBe(2000);
    });
  });

  describe('trackCacheHit', () => {
    it('should track cache hits', () => {
      featureFlagMonitor.trackCacheHit('user-123-flags');
      
      const metrics = featureFlagMonitor.getMetrics();
      expect(metrics.cache.hits).toBe(1);
    });
  });

  describe('trackCacheMiss', () => {
    it('should track cache misses', () => {
      featureFlagMonitor.trackCacheMiss('user-123-flags');
      
      const metrics = featureFlagMonitor.getMetrics();
      expect(metrics.cache.misses).toBe(1);
    });
  });

  describe('trackUserTypeAssignment', () => {
    it('should log user type assignments', () => {
      featureFlagMonitor.trackUserTypeAssignment('user-123', 'trainer');
      
      expect(console.log).toHaveBeenCalledWith(
        '[User Type Assignment]',
        'user-123',
        'trainer'
      );
    });

    it('should track user type metrics', () => {
      featureFlagMonitor.trackUserTypeAssignment('user-123', 'trainer');
      
      const metrics = featureFlagMonitor.getMetrics();
      expect(metrics.userAssignments.types['trainer']).toBe(1);
    });
  });

  describe('trackUserGroupAssignment', () => {
    it('should log user group assignments', () => {
      featureFlagMonitor.trackUserGroupAssignment('user-123', 'beta');
      
      expect(console.log).toHaveBeenCalledWith(
        '[User Group Assignment]',
        'user-123',
        'beta'
      );
    });

    it('should track user group metrics', () => {
      featureFlagMonitor.trackUserGroupAssignment('user-123', 'beta');
      
      const metrics = featureFlagMonitor.getMetrics();
      expect(metrics.userAssignments.groups['beta']).toBe(1);
    });
  });

  describe('getMetrics', () => {
    it('should return empty metrics by default', () => {
      const metrics = featureFlagMonitor.getMetrics();
      
      expect(metrics).toEqual({
        usage: {},
        errors: {},
        performance: {},
        cache: { hits: 0, misses: 0 },
        userAssignments: { types: {}, groups: {} }
      });
    });

    it('should track metrics across multiple calls', () => {
      // Simulate some activity
      featureFlagMonitor.trackFeatureFlagUsage('feature1', true, 'user1');
      featureFlagMonitor.trackFeatureFlagUsage('feature1', false, 'user2');
      featureFlagMonitor.trackFeatureFlagError('feature1', new Error('test'), 'user1');
      featureFlagMonitor.trackCacheHit('user1-flags');
      featureFlagMonitor.trackCacheMiss('user2-flags');
      
      const metrics = featureFlagMonitor.getMetrics();
      
      expect(metrics.usage['feature1']).toBe(2);
      expect(metrics.errors['feature1']).toBe(1);
      expect(metrics.cache.hits).toBe(1);
      expect(metrics.cache.misses).toBe(1);
    });
  });

  describe('resetMetrics', () => {
    it('should reset all metrics', () => {
      // Add some metrics
      featureFlagMonitor.trackFeatureFlagUsage('feature1', true, 'user1');
      featureFlagMonitor.trackCacheHit('user1-flags');
      
      // Reset
      featureFlagMonitor.resetMetrics();
      
      const metrics = featureFlagMonitor.getMetrics();
      
      expect(metrics.usage).toEqual({});
      expect(metrics.cache.hits).toBe(0);
      expect(metrics.cache.misses).toBe(0);
    });
  });
}); 