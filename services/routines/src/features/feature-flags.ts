import { evaluateFlag, TargetingAttributes } from '../config/hypertune';

// Define feature flag names as constants to avoid typos
export const FEATURE_FLAGS = {
  ENABLE_ADVANCED_FILTERING: 'enable-advanced-filtering',
  ENABLE_ROUTINE_SHARING: 'enable-routine-sharing',
  ENABLE_ROUTINE_ANALYTICS: 'enable-routine-analytics',
  MAX_ROUTINES_PER_USER: 'max-routines-per-user',
};

/**
 * Check if advanced filtering is enabled
 * @param attributes Targeting attributes for the flag evaluation
 * @returns Boolean indicating if the feature is enabled
 */
export const isAdvancedFilteringEnabled = (
  attributes: TargetingAttributes
): boolean => {
  return evaluateFlag<boolean>(
    FEATURE_FLAGS.ENABLE_ADVANCED_FILTERING,
    attributes,
    false
  );
};

/**
 * Check if routine sharing is enabled
 * @param attributes Targeting attributes for the flag evaluation
 * @returns Boolean indicating if the feature is enabled
 */
export const isRoutineSharingEnabled = (
  attributes: TargetingAttributes
): boolean => {
  return evaluateFlag<boolean>(
    FEATURE_FLAGS.ENABLE_ROUTINE_SHARING,
    attributes,
    false
  );
};

/**
 * Check if routine analytics is enabled
 * @param attributes Targeting attributes for the flag evaluation
 * @returns Boolean indicating if the feature is enabled
 */
export const isRoutineAnalyticsEnabled = (
  attributes: TargetingAttributes
): boolean => {
  return evaluateFlag<boolean>(
    FEATURE_FLAGS.ENABLE_ROUTINE_ANALYTICS,
    attributes,
    false
  );
};

/**
 * Get the maximum number of routines a user can create
 * @param attributes Targeting attributes for the flag evaluation
 * @returns Number indicating the maximum routines allowed
 */
export const getMaxRoutinesPerUser = (
  attributes: TargetingAttributes
): number => {
  return evaluateFlag<number>(
    FEATURE_FLAGS.MAX_ROUTINES_PER_USER,
    attributes,
    10
  );
};
