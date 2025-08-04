'use client';

import FeatureFlagProtected from '@/components/shared/FeatureFlagProtected';
import { FEATURE_FLAGS } from '@/features/feature-flags';
import TrainerAndClubs from '@/features/social/TrainerAndClubs';

const TrainerAndClubsPage = () => {
  return (
    <FeatureFlagProtected featureName={FEATURE_FLAGS.TRAINER_AND_CLUBS_FEATURE}>
      <TrainerAndClubs />
    </FeatureFlagProtected>
  );
};

export default TrainerAndClubsPage;
