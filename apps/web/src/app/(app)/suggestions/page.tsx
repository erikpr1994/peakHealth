'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { FEATURE_FLAGS, useFeatureFlag } from '@/features/feature-flags';
import Suggestions from '@/features/suggestions/Suggestions';

const SuggestionsPage = () => {
  const router = useRouter();
  const { flags, isLoading } = useFeatureFlag([
    FEATURE_FLAGS.SUGGESTIONS_FEATURE,
  ]);
  const isEnabled = flags[FEATURE_FLAGS.SUGGESTIONS_FEATURE];

  useEffect(() => {
    if (!isLoading && !isEnabled) router.push('/profile');
  }, [isLoading, isEnabled, router]);

  if (isLoading || !isEnabled) return null;
  return <Suggestions />;
};

export default SuggestionsPage;
