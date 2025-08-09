'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import EquipmentPage from '@/features/equipment/Equipment';
import { FEATURE_FLAGS, useFeatureFlag } from '@/features/feature-flags';

const Equipment = () => {
  const router = useRouter();
  const { flags, isLoading } = useFeatureFlag([
    FEATURE_FLAGS.EQUIPMENT_FEATURE,
  ]);
  const isEnabled = flags[FEATURE_FLAGS.EQUIPMENT_FEATURE];

  useEffect(() => {
    if (!isLoading && !isEnabled) router.push('/profile');
  }, [isLoading, isEnabled, router]);

  if (isLoading || !isEnabled) return null;
  return <EquipmentPage />;
};

export default Equipment;
