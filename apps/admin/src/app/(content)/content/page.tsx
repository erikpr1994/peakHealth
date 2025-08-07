import { ContentManagement } from '@/components/ContentManagement';

export default function ContentPage() {
  return (
    <ContentManagement
      userRole="admin"
      scopeInfo={{
        scope: 'general',
        label: 'System Wide',
        color: 'secondary',
      }}
    />
  );
}
