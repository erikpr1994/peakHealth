'use client';

import FeatureFlagProtected from '@/components/shared/FeatureFlagProtected';
import { FEATURE_FLAGS } from '@/features/feature-flags';
import HelpSupport from '@/features/settings/HelpSupport';

const HelpSupportPage = () => {
  return (
    <FeatureFlagProtected featureName={FEATURE_FLAGS.HELP_SUPPORT_FEATURE}>
      <HelpSupport />
    </FeatureFlagProtected>
  );
};

export default HelpSupportPage;
