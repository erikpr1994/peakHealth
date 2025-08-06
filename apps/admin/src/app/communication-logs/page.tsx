import { CommunicationLogs } from '@/components/CommunicationLogs';

export default function CommunicationLogsPage() {
  return (
    <CommunicationLogs
      scopeInfo={{
        scope: 'platform',
        label: 'Platform Wide',
        color: 'default',
      }}
    />
  );
}
