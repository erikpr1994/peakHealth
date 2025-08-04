'use client';

import FeatureFlagProtected from '@/components/shared/FeatureFlagProtected';
import { FEATURE_FLAGS } from '@/features/feature-flags';
import Performance from '@/features/performance/Performance';

const PerformancePage = () => {
  return (
    <FeatureFlagProtected featureName={FEATURE_FLAGS.PERFORMANCE_FEATURE}>
      <Performance />
    </FeatureFlagProtected>
  );
};

export default PerformancePage;
