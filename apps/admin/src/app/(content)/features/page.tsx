import { FeatureFlagsPage } from '@/features/feature-flags';

export default function FeaturesPage() {
  return (
    <FeatureFlagsPage
      scopeInfo={{ scope: 'general', label: 'System Wide', color: 'secondary' }}
    />
  );
}
