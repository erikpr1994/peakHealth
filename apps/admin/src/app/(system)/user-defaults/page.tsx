import { UserDefaultsManagement } from '@/components/UserDefaultsManagement';

export default function UserDefaultsPage() {
  return (
    <UserDefaultsManagement
      scopeInfo={{
        scope: 'general',
        label: 'System Wide',
        color: 'secondary',
      }}
    />
  );
}
