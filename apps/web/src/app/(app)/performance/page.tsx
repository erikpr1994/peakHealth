'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { FEATURE_FLAGS, useFeatureFlag } from '@/features/feature-flags';
import Performance from '@/features/performance/Performance';

const PerformancePage = () => {
  const router = useRouter();
  const { flags, isLoading } = useFeatureFlag([
    FEATURE_FLAGS.PERFORMANCE_FEATURE,
  ]);
  const isEnabled = flags[FEATURE_FLAGS.PERFORMANCE_FEATURE];

  useEffect(() => {
    if (!isLoading && !isEnabled) router.push('/profile');
  }, [isLoading, isEnabled, router]);

  if (isLoading || !isEnabled) return null;
  return <Performance />;
};

export default PerformancePage;
