import { useFeatureFlags } from '../context/FeatureFlagContext';
import { UseFeatureFlagReturn } from '../types';

export function useFeatureFlag(featureNames: string[]): UseFeatureFlagReturn {
  const { isEnabled, isLoading, flags: allFlags } = useFeatureFlags();

  const getInitialFlags = () =>
    featureNames.reduce((acc: Record<string, boolean>, name) => {
      acc[name] = false;
      return acc;
    }, {});

  if (isLoading) {
    return { flags: getInitialFlags(), isLoading: true };
  }

  // Handle unauthenticated state where no flags are loaded.
  if (Object.keys(allFlags).length === 0) {
    return { flags: getInitialFlags(), isLoading: false };
  }

  const flags = featureNames.reduce((acc: Record<string, boolean>, name) => {
    acc[name] = isEnabled(name);
    return acc;
  }, {});

  return { flags, isLoading };
}
