import { SubscriptionTiersManagement } from '@/components/SubscriptionTiersManagement';

export default function SubscriptionTiersPage() {
  return (
    <SubscriptionTiersManagement
      scopeInfo={{
        scope: 'general',
        label: 'System Wide',
        color: 'secondary',
      }}
    />
  );
}
