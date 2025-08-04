import { FEATURE_FLAG_CONFIG } from './config';

interface CacheEntry<T = unknown> {
  data: T;
  timestamp: number;
  ttl: number;
}

class FeatureFlagCache {
  private cache = new Map<string, CacheEntry<unknown>>();
  private readonly DEFAULT_TTL = FEATURE_FLAG_CONFIG.caching.ttl;

  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl = this.DEFAULT_TTL
  ): Promise<T> {
    if (!FEATURE_FLAG_CONFIG.caching.enabled) {
      return await fetcher();
    }

    const entry = this.cache.get(key);

    if (entry && Date.now() - entry.timestamp < entry.ttl) {
      return entry.data as T;
    }

    const data = await fetcher();
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });

    return data;
  }

  invalidate(pattern: string): void {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  invalidateUser(userId: string): void {
    this.invalidate(`user-${userId}`);
  }

  invalidateFeatureFlag(featureName: string): void {
    this.invalidate(`feature-${featureName}`);
  }

  clear(): void {
    this.cache.clear();
  }

  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

export const featureFlagCache = new FeatureFlagCache();
