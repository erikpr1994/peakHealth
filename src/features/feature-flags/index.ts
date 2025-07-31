// Feature Flag System - Main Export

// Types
export * from './types';

// Configuration
export * from './lib/config';

// Context and Hooks
export { FeatureFlagProvider, useFeatureFlags } from './context/FeatureFlagContext';
export { useFeatureFlag } from './hooks/useFeatureFlag';

// Constants
export { FEATURE_FLAGS, USER_TYPES, USER_GROUPS } from './lib/config'; 