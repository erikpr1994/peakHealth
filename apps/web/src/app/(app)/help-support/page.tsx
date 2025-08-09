'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { FEATURE_FLAGS, useFeatureFlag } from '@/features/feature-flags';
import HelpSupport from '@/features/settings/HelpSupport';

const HelpSupportPage = () => {
  const router = useRouter();
  const { flags, isLoading } = useFeatureFlag([
    FEATURE_FLAGS.HELP_SUPPORT_FEATURE,
  ]);
  const isEnabled = flags[FEATURE_FLAGS.HELP_SUPPORT_FEATURE];

  useEffect(() => {
    if (!isLoading && !isEnabled) router.push('/profile');
  }, [isLoading, isEnabled, router]);

  if (isLoading || !isEnabled) return null;
  return <HelpSupport />;
};

export default HelpSupportPage;
