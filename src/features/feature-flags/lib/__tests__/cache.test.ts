import { describe, it, expect, beforeEach, vi } from 'vitest';

import { featureFlagCache } from '../cache';

describe('Feature Flag Cache', () => {
  beforeEach(() => {
    featureFlagCache.clear();
    vi.clearAllTimers();
  });

  describe('get', () => {
    it('should return cached data when available and not expired', async () => {
      const mockFetcher = vi.fn().mockResolvedValue('test-data');

      // First call - should call fetcher
      const result1 = await featureFlagCache.get('test-key', mockFetcher);
      expect(result1).toBe('test-data');
      expect(mockFetcher).toHaveBeenCalledTimes(1);

      // Second call - should return cached data
      const result2 = await featureFlagCache.get('test-key', mockFetcher);
      expect(result2).toBe('test-data');
      expect(mockFetcher).toHaveBeenCalledTimes(1); // Should not call again
    });

    it('should call fetcher when cache is expired', async () => {
      const mockFetcher = vi.fn().mockResolvedValue('test-data');

      // Set up fake timers
      vi.useFakeTimers();

      // First call
      const promise1 = featureFlagCache.get('test-key', mockFetcher);
      vi.runAllTimers();
      await promise1;

      // Advance time past TTL (5 minutes + 1 second)
      vi.advanceTimersByTime(5 * 60 * 1000 + 1000);

      // Second call - should call fetcher again
      const promise2 = featureFlagCache.get('test-key', mockFetcher);
      vi.runAllTimers();
      await promise2;

      expect(mockFetcher).toHaveBeenCalledTimes(2);

      vi.useRealTimers();
    });

    it('should handle fetcher errors', async () => {
      const mockFetcher = vi.fn().mockRejectedValue(new Error('Fetch failed'));

      await expect(
        featureFlagCache.get('test-key', mockFetcher)
      ).rejects.toThrow('Fetch failed');
    });

    it('should use custom TTL when provided', async () => {
      const mockFetcher = vi.fn().mockResolvedValue('test-data');

      vi.useFakeTimers();

      // Call with custom TTL (1 minute)
      const promise = featureFlagCache.get('test-key', mockFetcher, 60 * 1000);
      vi.runAllTimers();
      await promise;

      // Advance time past custom TTL
      vi.advanceTimersByTime(60 * 1000 + 1000);

      // Should call fetcher again
      const promise2 = featureFlagCache.get('test-key', mockFetcher, 60 * 1000);
      vi.runAllTimers();
      await promise2;

      expect(mockFetcher).toHaveBeenCalledTimes(2);

      vi.useRealTimers();
    });
  });

  describe('invalidate', () => {
    it('should remove cache entries matching pattern', async () => {
      const mockFetcher = vi.fn().mockResolvedValue('test-data');

      // Add multiple cache entries
      await featureFlagCache.get('user-123-flags', mockFetcher);
      await featureFlagCache.get('user-456-flags', mockFetcher);
      await featureFlagCache.get('feature-analytics', mockFetcher);

      expect(featureFlagCache.getStats().size).toBe(3);

      // Invalidate user-specific entries
      featureFlagCache.invalidate('user-');

      expect(featureFlagCache.getStats().size).toBe(1);
      expect(featureFlagCache.getStats().keys).toContain('feature-analytics');
    });

    it('should handle invalidate with no matches', async () => {
      const mockFetcher = vi.fn().mockResolvedValue('test-data');

      await featureFlagCache.get('test-key', mockFetcher);
      expect(featureFlagCache.getStats().size).toBe(1);

      featureFlagCache.invalidate('non-existent');
      expect(featureFlagCache.getStats().size).toBe(1);
    });
  });

  describe('invalidateUser', () => {
    it('should remove all cache entries for a specific user', async () => {
      const mockFetcher = vi.fn().mockResolvedValue('test-data');

      // Add user-specific cache entries
      await featureFlagCache.get('user-123-flags', mockFetcher);
      await featureFlagCache.get('user-123-types', mockFetcher);
      await featureFlagCache.get('user-456-flags', mockFetcher);

      expect(featureFlagCache.getStats().size).toBe(3);

      // Invalidate user 123
      featureFlagCache.invalidateUser('123');

      expect(featureFlagCache.getStats().size).toBe(1);
      expect(featureFlagCache.getStats().keys).toContain('user-456-flags');
    });
  });

  describe('invalidateFeatureFlag', () => {
    it('should remove cache entries for a specific feature flag', async () => {
      const mockFetcher = vi.fn().mockResolvedValue('test-data');

      // Add feature-specific cache entries
      await featureFlagCache.get('feature-notifications', mockFetcher);
      await featureFlagCache.get('feature-analytics', mockFetcher);
      await featureFlagCache.get('feature-beta', mockFetcher);

      expect(featureFlagCache.getStats().size).toBe(3);

      // Invalidate notifications feature
      featureFlagCache.invalidateFeatureFlag('notifications');

      expect(featureFlagCache.getStats().size).toBe(2);
      expect(featureFlagCache.getStats().keys).not.toContain(
        'feature-notifications'
      );
    });
  });

  describe('clear', () => {
    it('should remove all cache entries', async () => {
      const mockFetcher = vi.fn().mockResolvedValue('test-data');

      await featureFlagCache.get('key1', mockFetcher);
      await featureFlagCache.get('key2', mockFetcher);

      expect(featureFlagCache.getStats().size).toBe(2);

      featureFlagCache.clear();

      expect(featureFlagCache.getStats().size).toBe(0);
    });
  });

  describe('getStats', () => {
    it('should return correct cache statistics', async () => {
      const mockFetcher = vi.fn().mockResolvedValue('test-data');

      await featureFlagCache.get('key1', mockFetcher);
      await featureFlagCache.get('key2', mockFetcher);

      const stats = featureFlagCache.getStats();

      expect(stats.size).toBe(2);
      expect(stats.keys).toContain('key1');
      expect(stats.keys).toContain('key2');
    });

    it('should return empty stats when cache is empty', () => {
      const stats = featureFlagCache.getStats();

      expect(stats.size).toBe(0);
      expect(stats.keys).toEqual([]);
    });
  });
});
