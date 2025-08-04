'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import UnderConstruction from './UnderConstruction';

import { useFeatureFlag } from '@/features/feature-flags';

interface FeatureFlagProtectedProps {
  featureName: string;
  children: React.ReactNode;
  showUnderConstruction?: boolean;
  fallbackPath?: string;
}

const FeatureFlagProtected = ({
  featureName,
  children,
  showUnderConstruction = false,
  fallbackPath = '/profile',
}: FeatureFlagProtectedProps) => {
  const router = useRouter();
  const { flags, isLoading } = useFeatureFlag([featureName]);
  const isEnabled = flags[featureName];

  useEffect(() => {
    if (!isLoading && !isEnabled && !showUnderConstruction) {
      router.push(fallbackPath);
    }
  }, [isLoading, isEnabled, showUnderConstruction, router, fallbackPath]);

  const handleGoToFallback = () => {
    router.push(fallbackPath);
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
          onGoToFallback={handleGoToFallback}
        />
      );
    }
    return null; // Will redirect to fallback path
  }

  return <>{children}</>;
};

export default FeatureFlagProtected;
