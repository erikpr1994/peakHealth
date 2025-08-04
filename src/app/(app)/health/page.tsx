'use client';

import FeatureFlagProtected from '@/components/shared/FeatureFlagProtected';
import { FEATURE_FLAGS } from '@/features/feature-flags';
import Health from '@/features/health/Health';

const HealthPage = () => {
  return (
    <FeatureFlagProtected featureName={FEATURE_FLAGS.HEALTH_FEATURE}>
      <Health />
    </FeatureFlagProtected>
  );
};

export default HealthPage;
