'use client';

import FeatureFlagProtected from '@/components/shared/FeatureFlagProtected';
import Dashboard from '@/features/dashboard/Dashboard';
import { FEATURE_FLAGS } from '@/features/feature-flags';

const DashboardPage = () => {
  return (
    <FeatureFlagProtected
      featureName={FEATURE_FLAGS.DASHBOARD_FEATURE}
      showUnderConstruction={true}
      fallbackPath="/profile"
    >
      <Dashboard />
    </FeatureFlagProtected>
  );
};

export default DashboardPage;
