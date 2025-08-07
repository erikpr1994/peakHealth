'use client';

import { Send, Settings } from 'lucide-react';

import { Badge } from './ui/badge';

interface CommunicationLogsProps {
  scopeInfo: Record<string, unknown>;
}

export const CommunicationLogs = ({ scopeInfo }: CommunicationLogsProps) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Badge
            variant={
              scopeInfo.color as
                | 'default'
                | 'secondary'
                | 'outline'
                | 'destructive'
            }
          >
            <Settings className="h-3 w-3 mr-1" />
            {scopeInfo.label as string}
          </Badge>
          <h1>Communication Logs</h1>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Export Logs
        </button>
      </div>

      <div className="text-center py-12">
        <Send className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3>Communication Logs</h3>
        <p className="text-sm text-muted-foreground">
          Track and monitor all communication activities across email, push
          notifications, and SMS.
        </p>
      </div>
    </div>
  );
};
