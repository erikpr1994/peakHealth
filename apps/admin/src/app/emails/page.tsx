import { EmailTemplates } from '@/components/EmailTemplates';

export default function EmailsPage() {
  return (
    <EmailTemplates
      scopeInfo={{
        scope: 'general',
        label: 'System Wide',
        color: 'secondary',
      }}
    />
  );
}
