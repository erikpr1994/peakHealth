'use client';

import FeatureFlagProtected from '@/components/shared/FeatureFlagProtected';
import { FEATURE_FLAGS } from '@/features/feature-flags';
import Gyms from '@/features/gyms/Gyms';

const GymsPage = () => {
  return (
    <FeatureFlagProtected featureName={FEATURE_FLAGS.GYMS_FEATURE}>
      <Gyms />
    </FeatureFlagProtected>
  );
};

export default GymsPage;
