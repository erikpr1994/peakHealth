'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAppContext } from '@/contexts/AppContext';
import { FEATURE_FLAGS, useFeatureFlag } from '@/features/feature-flags';
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

  const router = useRouter();
  const { flags, isLoading } = useFeatureFlag([
    FEATURE_FLAGS.APP_SETTINGS_FEATURE,
  ]);
  const isEnabled = flags[FEATURE_FLAGS.APP_SETTINGS_FEATURE];

  useEffect(() => {
    if (!isLoading && !isEnabled) router.push('/profile');
  }, [isLoading, isEnabled, router]);

  if (isLoading || !isEnabled) return null;
  return (
    <AppSettings
      hasTrainer={hasTrainer}
      onToggleTrainer={toggleTrainer}
      isClubMember={isClubMember}
      onToggleClubMembership={toggleClubMembership}
      showWelcomeScreen={showWelcomeScreen}
      onToggleWelcomeScreen={toggleWelcomeScreen}
    />
  );
};

export default AppSettingsPage;
