'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { FEATURE_FLAGS, useFeatureFlag } from '@/features/feature-flags';
import TrainerAndClubs from '@/features/social/TrainerAndClubs';

const TrainerAndClubsPage = () => {
  const router = useRouter();
  const { flags, isLoading } = useFeatureFlag([
    FEATURE_FLAGS.TRAINER_AND_CLUBS_FEATURE,
  ]);
  const isEnabled = flags[FEATURE_FLAGS.TRAINER_AND_CLUBS_FEATURE];

  useEffect(() => {
    if (!isLoading && !isEnabled) router.push('/profile');
  }, [isLoading, isEnabled, router]);

  if (isLoading || !isEnabled) return null;
  return <TrainerAndClubs />;
};

export default TrainerAndClubsPage;
