import { useFeatureFlag } from '@/features/feature-flags';
import { FEATURE_FLAGS } from '@/features/feature-flags/lib/config';

export const useNavigationFeatureFlags = () => {
  const { flags, isLoading } = useFeatureFlag([
    FEATURE_FLAGS.CALENDAR_FEATURE,
    FEATURE_FLAGS.PERFORMANCE_FEATURE,
    FEATURE_FLAGS.HEALTH_FEATURE,
    FEATURE_FLAGS.TRAINER_AND_CLUBS_FEATURE,
    FEATURE_FLAGS.GYMS_FEATURE,
    FEATURE_FLAGS.EQUIPMENT_FEATURE,
    FEATURE_FLAGS.SUGGESTIONS_FEATURE,
    FEATURE_FLAGS.ACCOUNT_SETTINGS_FEATURE,
    FEATURE_FLAGS.APP_SETTINGS_FEATURE,
    FEATURE_FLAGS.HELP_SUPPORT_FEATURE,
  ]);

  return {
    flags,
    isLoading,
    isCalendarEnabled: flags[FEATURE_FLAGS.CALENDAR_FEATURE],
    isPerformanceEnabled: flags[FEATURE_FLAGS.PERFORMANCE_FEATURE],
    isHealthEnabled: flags[FEATURE_FLAGS.HEALTH_FEATURE],
    isTrainerAndClubsEnabled: flags[FEATURE_FLAGS.TRAINER_AND_CLUBS_FEATURE],
    isGymsEnabled: flags[FEATURE_FLAGS.GYMS_FEATURE],
    isEquipmentEnabled: flags[FEATURE_FLAGS.EQUIPMENT_FEATURE],
    isSuggestionsEnabled: flags[FEATURE_FLAGS.SUGGESTIONS_FEATURE],
    isAccountSettingsEnabled: flags[FEATURE_FLAGS.ACCOUNT_SETTINGS_FEATURE],
    isAppSettingsEnabled: flags[FEATURE_FLAGS.APP_SETTINGS_FEATURE],
    isHelpSupportEnabled: flags[FEATURE_FLAGS.HELP_SUPPORT_FEATURE],
  };
};
