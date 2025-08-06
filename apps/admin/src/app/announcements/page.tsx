import { PlatformAnnouncements } from '@/components/PlatformAnnouncements';

export default function AnnouncementsPage() {
  return (
    <PlatformAnnouncements
      scopeInfo={{
        scope: 'platform',
        label: 'Platform Wide',
        color: 'default',
      }}
    />
  );
}
