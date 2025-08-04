'use client';

import FeatureFlagProtected from '@/components/shared/FeatureFlagProtected';
import { FEATURE_FLAGS } from '@/features/feature-flags';
import AccountSettings from '@/features/settings/AccountSettings';

const AccountSettingsPage = () => {
  return (
    <FeatureFlagProtected featureName={FEATURE_FLAGS.ACCOUNT_SETTINGS_FEATURE}>
      <AccountSettings />
    </FeatureFlagProtected>
  );
};

export default AccountSettingsPage;
