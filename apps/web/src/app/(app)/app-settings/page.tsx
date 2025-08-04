'use client';

import FeatureFlagProtected from '@/components/shared/FeatureFlagProtected';
import { useAppContext } from '@/contexts/AppContext';
import { FEATURE_FLAGS } from '@/features/feature-flags';
import AppSettings from '@/features/settings/AppSettings';

const AppSettingsPage = () => {
  const {
    hasTrainer,
    toggleTrainer,
    isClubMember,
    toggleClubMembership,
    showWelcomeScreen,
    toggleWelcomeScreen,
  } = useAppContext();

  return (
    <FeatureFlagProtected featureName={FEATURE_FLAGS.APP_SETTINGS_FEATURE}>
      <AppSettings
        hasTrainer={hasTrainer}
        onToggleTrainer={toggleTrainer}
        isClubMember={isClubMember}
        onToggleClubMembership={toggleClubMembership}
        showWelcomeScreen={showWelcomeScreen}
        onToggleWelcomeScreen={toggleWelcomeScreen}
      />
    </FeatureFlagProtected>
  );
};

export default AppSettingsPage;
