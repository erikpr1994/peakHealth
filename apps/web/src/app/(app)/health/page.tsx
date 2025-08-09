'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { FEATURE_FLAGS, useFeatureFlag } from '@/features/feature-flags';
import Health from '@/features/health/Health';

const HealthPage = () => {
  const router = useRouter();
  const { flags, isLoading } = useFeatureFlag([FEATURE_FLAGS.HEALTH_FEATURE]);
  const isEnabled = flags[FEATURE_FLAGS.HEALTH_FEATURE];

  useEffect(() => {
    if (!isLoading && !isEnabled) router.push('/profile');
  }, [isLoading, isEnabled, router]);

  if (isLoading || !isEnabled) return null;
  return <Health />;
};

export default HealthPage;
