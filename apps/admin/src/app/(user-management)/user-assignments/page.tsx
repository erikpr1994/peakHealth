import { UserAssignmentsManagement } from '@/components/UserAssignmentsManagement';

export default function UserAssignmentsPage() {
  return (
    <UserAssignmentsManagement
      scopeInfo={{
        scope: 'general',
        label: 'System Wide',
        color: 'secondary',
      }}
    />
  );
}
