import { FeatureFlagConfig } from "../types";

export const DEFAULT_FEATURE_FLAG_CONFIG: FeatureFlagConfig = {
  monitoring: {
    enabled: false, // Will be enabled when monitoring is added
  },
  caching: {
    enabled: true,
    ttl: 5 * 60 * 1000, // 5 minutes
  },
  analytics: {
    enabled: true,
    trackUsage: true,
    trackPerformance: true,
  },
};

export const FEATURE_FLAG_CONFIG: FeatureFlagConfig = {
  monitoring: {
    enabled:
      process.env.NODE_ENV === "production" &&
      !!process.env.FEATURE_FLAG_MONITORING_ENABLED,
    endpoint: process.env.FEATURE_FLAG_MONITORING_ENDPOINT,
    apiKey: process.env.FEATURE_FLAG_MONITORING_API_KEY,
  },
  caching: {
    enabled: true,
    ttl: parseInt(process.env.FEATURE_FLAG_CACHE_TTL || "300000"), // 5 minutes default
  },
  analytics: {
    enabled:
      process.env.NODE_ENV === "production" ||
      process.env.FEATURE_FLAG_ANALYTICS_ENABLED === "true",
    trackUsage: true,
    trackPerformance: true,
  },
};

// Environment detection
export const getCurrentEnvironment = ():
  | "development"
  | "staging"
  | "production" => {
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_ENVIRONMENT === "staging"
      ? "staging"
      : "production";
  }
  return "development";
};

// Feature flag names constants
export const FEATURE_FLAGS = {
  NOTIFICATION_SYSTEM_FEATURE: "notification_system_feature",
} as const;

// User types constants
export const USER_TYPES = {
  REGULAR: "regular",
  TRAINER: "trainer",
  PHYSIO: "physio",
  ADMIN: "admin",
} as const;

// User groups constants
export const USER_GROUPS = {
  BETA: "beta",
  PREMIUM: "premium",
  EARLY_ACCESS: "early_access",
} as const;
