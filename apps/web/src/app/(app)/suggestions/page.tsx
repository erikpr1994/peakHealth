'use client';

import FeatureFlagProtected from '@/components/shared/FeatureFlagProtected';
import { FEATURE_FLAGS } from '@/features/feature-flags';
import Suggestions from '@/features/suggestions/Suggestions';

const SuggestionsPage = () => {
  return (
    <FeatureFlagProtected featureName={FEATURE_FLAGS.SUGGESTIONS_FEATURE}>
      <Suggestions />
    </FeatureFlagProtected>
  );
};

export default SuggestionsPage;
