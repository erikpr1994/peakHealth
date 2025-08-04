'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import UnderConstruction from './UnderConstruction';

import { useFeatureFlag } from '@/features/feature-flags';

interface FeatureFlagProtectedProps {
  featureName: string;
  children: React.ReactNode;
  showUnderConstruction?: boolean;
}

const FeatureFlagProtected = ({
  featureName,
  children,
  showUnderConstruction = false,
}: FeatureFlagProtectedProps) => {
  const router = useRouter();
  const { flags, isLoading } = useFeatureFlag([featureName]);
  const isEnabled = flags[featureName];

  useEffect(() => {
    if (!isLoading && !isEnabled && !showUnderConstruction) {
      router.push('/dashboard');
    }
  }, [isLoading, isEnabled, showUnderConstruction, router]);

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isEnabled) {
    if (showUnderConstruction) {
      return (
        <UnderConstruction
          featureName={featureName}
          onGoToDashboard={handleGoToDashboard}
        />
      );
    }
    return null; // Will redirect to dashboard
  }

  return <>{children}</>;
};

export default FeatureFlagProtected;
