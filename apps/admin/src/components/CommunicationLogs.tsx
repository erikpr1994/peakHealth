'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Send, Settings } from 'lucide-react';

interface CommunicationLogsProps {
  scopeInfo: any;
}

export function CommunicationLogs({ scopeInfo }: CommunicationLogsProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Badge variant={scopeInfo.color}>
            <Settings className="h-3 w-3 mr-1" />
            {scopeInfo.label}
          </Badge>
          <h1>Communication Logs</h1>
        </div>
        <Button>Export Logs</Button>
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
}
