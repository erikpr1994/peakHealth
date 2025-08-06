import { SuggestionsManagement } from '@/components/SuggestionsManagement';

export default function SuggestionsPage() {
  return (
    <SuggestionsManagement
      userRole="admin"
      scopeInfo={{
        scope: 'general',
        label: 'System Wide',
        color: 'secondary',
      }}
    />
  );
}
