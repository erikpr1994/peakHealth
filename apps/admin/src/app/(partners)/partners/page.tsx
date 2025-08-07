import { PartnerManagement } from '@/components/PartnerManagement';

export default function PartnersPage() {
  return (
    <PartnerManagement
      scopeInfo={{
        scope: 'general',
        label: 'System Wide',
        color: 'secondary',
      }}
    />
  );
}
