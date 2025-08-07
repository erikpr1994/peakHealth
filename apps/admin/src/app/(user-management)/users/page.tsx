import { UserManagement } from '@/components/UserManagement';

export default function UsersPage() {
  return (
    <UserManagement
      scopeInfo={{
        scope: 'general',
        label: 'System Wide',
        color: 'secondary',
      }}
    />
  );
}
