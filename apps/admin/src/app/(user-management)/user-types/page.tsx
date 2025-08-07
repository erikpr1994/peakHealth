import { UserTypesManagement } from '@/components/UserTypesManagement';

export default function UserTypesPage() {
  return (
    <UserTypesManagement
      scopeInfo={{
        scope: 'general',
        label: 'System Wide',
        color: 'secondary',
      }}
    />
  );
}
