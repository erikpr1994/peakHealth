import { Analytics } from '@/components/Analytics';

export default function AnalyticsPage() {
  return (
    <Analytics
      scopeInfo={{
        scope: 'platform',
        label: 'Platform Wide',
        color: 'default',
      }}
    />
  );
}
