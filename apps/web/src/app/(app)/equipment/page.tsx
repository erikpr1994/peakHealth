'use client';

import FeatureFlagProtected from '@/components/shared/FeatureFlagProtected';
import EquipmentPage from '@/features/equipment/Equipment';
import { FEATURE_FLAGS } from '@/features/feature-flags';

const Equipment = () => {
  return (
    <FeatureFlagProtected featureName={FEATURE_FLAGS.EQUIPMENT_FEATURE}>
      <EquipmentPage />
    </FeatureFlagProtected>
  );
};

export default Equipment;
