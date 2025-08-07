import { UserEngagement } from '@/components/UserEngagement';

export default function EngagementPage() {
  return (
    <UserEngagement
      scopeInfo={{
        scope: 'platform',
        label: 'Platform Wide',
        color: 'default',
      }}
    />
  );
}
