'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { FEATURE_FLAGS, useFeatureFlag } from '@/features/feature-flags';
import AccountSettings from '@/features/settings/AccountSettings';

const AccountSettingsPage = () => {
  const router = useRouter();
  const { flags, isLoading } = useFeatureFlag([
    FEATURE_FLAGS.ACCOUNT_SETTINGS_FEATURE,
  ]);
  const isEnabled = flags[FEATURE_FLAGS.ACCOUNT_SETTINGS_FEATURE];

  useEffect(() => {
    if (!isLoading && !isEnabled) router.push('/profile');
  }, [isLoading, isEnabled, router]);

  if (isLoading || !isEnabled) return null;
  return <AccountSettings />;
};

export default AccountSettingsPage;
