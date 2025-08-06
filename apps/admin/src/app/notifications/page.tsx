import { NotificationManagement } from '@/components/NotificationManagement';

export default function NotificationsPage() {
  return (
    <NotificationManagement
      scopeInfo={{
        scope: 'general',
        label: 'System Wide',
        color: 'secondary',
      }}
    />
  );
}
