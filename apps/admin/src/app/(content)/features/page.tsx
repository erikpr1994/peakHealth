import { FeatureFlags } from '@/components/FeatureFlags';

export default function FeaturesPage() {
  return (
    <FeatureFlags
      scopeInfo={{
        scope: 'general',
        label: 'System Wide',
        color: 'secondary',
      }}
    />
  );
}
