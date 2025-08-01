interface Metrics {
  usage: Record<string, number>;
  errors: Record<string, number>;
  performance: Record<string, number>;
  cache: { hits: number; misses: number };
  userAssignments: {
    types: Record<string, number>;
    groups: Record<string, number>;
  };
}

class FeatureFlagMonitor {
  private metrics: Metrics = {
    usage: {},
    errors: {},
    performance: {},
    cache: { hits: 0, misses: 0 },
    userAssignments: { types: {}, groups: {} },
  };

  trackFeatureFlagUsage(
    featureName: string,
    isEnabled: boolean,
    userId?: string
  ): void {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "[Feature Flag Usage]",
        featureName,
        isEnabled ? "enabled" : "disabled",
        userId
      );
    }

    this.metrics.usage[featureName] =
      (this.metrics.usage[featureName] || 0) + 1;
  }

  trackFeatureFlagError(
    featureName: string,
    error: Error,
    userId?: string
  ): void {
    console.error("[Feature Flag Error]", featureName, error, userId);

    this.metrics.errors[featureName] =
      (this.metrics.errors[featureName] || 0) + 1;
  }

  trackFeatureFlagPerformance(
    featureName: string,
    duration: number,
    userId?: string
  ): void {
    if (process.env.NODE_ENV === "development") {
      if (duration > 1000) {
        console.warn(
          "[Feature Flag Performance Warning]",
          featureName,
          `${duration}ms (slow)`,
          userId
        );
      } else {
        console.log(
          "[Feature Flag Performance]",
          featureName,
          `${duration}ms`,
          userId
        );
      }
    }

    this.metrics.performance[featureName] = duration;
  }

  trackCacheHit(key: string): void {
    if (process.env.NODE_ENV === "development") {
      console.log("[Feature Flag Cache Hit]", key);
    }
    this.metrics.cache.hits++;
  }

  trackCacheMiss(key: string): void {
    if (process.env.NODE_ENV === "development") {
      console.log("[Feature Flag Cache Miss]", key);
    }
    this.metrics.cache.misses++;
  }

  trackUserTypeAssignment(userId: string, userType: string): void {
    console.log("[User Type Assignment]", userId, userType);
    this.metrics.userAssignments.types[userType] =
      (this.metrics.userAssignments.types[userType] || 0) + 1;
  }

  trackUserGroupAssignment(userId: string, userGroup: string): void {
    console.log("[User Group Assignment]", userId, userGroup);
    this.metrics.userAssignments.groups[userGroup] =
      (this.metrics.userAssignments.groups[userGroup] || 0) + 1;
  }

  getMetrics(): Metrics {
    return { ...this.metrics };
  }

  resetMetrics(): void {
    this.metrics = {
      usage: {},
      errors: {},
      performance: {},
      cache: { hits: 0, misses: 0 },
      userAssignments: { types: {}, groups: {} },
    };
  }
}

export const featureFlagMonitor = new FeatureFlagMonitor();
