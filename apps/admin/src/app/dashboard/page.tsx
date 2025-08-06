import { Dashboard } from '@/components/Dashboard';

export default function DashboardPage() {
  return (
    <Dashboard
      scopeInfo={{
        scope: 'platform',
        label: 'Platform Wide',
        color: 'default',
      }}
      userRole="admin"
    />
  );
}
