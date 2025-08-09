import { FeatureFlag, TargetingOptions, FeatureFlagFormData } from './types';

export async function fetchFeatureFlags(): Promise<FeatureFlag[]> {
  const response = await fetch('/api/admin/feature-flags');
  if (!response.ok) throw new Error('Failed to fetch feature flags');
  const data = await response.json();
  return data.featureFlags || [];
}

export async function fetchTargetingOptions(): Promise<TargetingOptions> {
  const response = await fetch('/api/admin/feature-flags/targeting-options');
  if (!response.ok) throw new Error('Failed to fetch targeting options');
  return response.json();
}

export async function createFeatureFlagApi(
  payload: FeatureFlagFormData
): Promise<void> {
  const response = await fetch('/api/admin/feature-flags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: payload.name,
      displayName: payload.displayName,
      description: payload.description,
      isPublic: payload.isPublic,
      isGlobal: payload.isGlobal,
      environments: payload.environments,
      userTypes: payload.userTypes,
      subscriptionTiers: payload.subscriptionTiers,
      users: payload.users,
    }),
  });

  if (!response.ok) throw new Error('Failed to create feature flag');
}

export async function updateFeatureFlagApi(
  id: string,
  payload: FeatureFlagFormData
): Promise<void> {
  const response = await fetch('/api/admin/feature-flags', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,
      name: payload.name,
      displayName: payload.displayName,
      description: payload.description,
      isPublic: payload.isPublic,
      isGlobal: payload.isGlobal,
      environments: payload.environments,
      userTypes: payload.userTypes,
      subscriptionTiers: payload.subscriptionTiers,
      users: payload.users,
    }),
  });

  if (!response.ok) throw new Error('Failed to update feature flag');
}

export async function deleteFeatureFlagApi(id: string): Promise<void> {
  const response = await fetch(`/api/admin/feature-flags?id=${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete feature flag');
}
