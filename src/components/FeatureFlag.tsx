import React from "react";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { FeatureFlagProps } from "@/types/feature-flags";

export function FeatureFlag({
  name,
  children,
  fallback,
  loadingComponent,
}: FeatureFlagProps) {
  const { isEnabled, isLoading } = useFeatureFlag(name);

  if (isLoading) {
    return loadingComponent || null;
  }

  if (!isEnabled) {
    return fallback || null;
  }

  return <>{children}</>;
}
