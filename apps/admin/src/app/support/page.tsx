import { SupportTicketing } from '@/components/SupportTicketing';

export default function SupportPage() {
  return (
    <SupportTicketing
      scopeInfo={{
        scope: 'general',
        label: 'System Wide',
        color: 'secondary',
      }}
    />
  );
}
