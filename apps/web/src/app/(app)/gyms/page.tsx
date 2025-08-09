'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { FEATURE_FLAGS, useFeatureFlag } from '@/features/feature-flags';
import Gyms from '@/features/gyms/Gyms';

const GymsPage = () => {
  const router = useRouter();
  const { flags, isLoading } = useFeatureFlag([FEATURE_FLAGS.GYMS_FEATURE]);
  const isEnabled = flags[FEATURE_FLAGS.GYMS_FEATURE];

  useEffect(() => {
    if (!isLoading && !isEnabled) router.push('/profile');
  }, [isLoading, isEnabled, router]);

  if (isLoading || !isEnabled) return null;
  return <Gyms />;
};

export default GymsPage;
