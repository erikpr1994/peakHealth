import { RevenueAnalytics } from '@/components/RevenueAnalytics';

export default function RevenuePage() {
  return (
    <RevenueAnalytics
      scopeInfo={{
        scope: 'platform',
        label: 'Platform Wide',
        color: 'default',
      }}
    />
  );
}
