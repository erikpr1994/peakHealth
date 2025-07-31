import { useFeatureFlags } from '@/contexts/FeatureFlagContext';
import { UseFeatureFlagReturn } from '@/types/feature-flags';

export function useFeatureFlag(featureName: string): UseFeatureFlagReturn {
  const { isEnabled, isLoading } = useFeatureFlags();
  
  return {
    isEnabled: isEnabled(featureName),
    isLoading,
  };
} 