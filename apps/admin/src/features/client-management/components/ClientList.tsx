'use client';

import type { Client } from '../types';

import {
  Activity,
  AlertCircle,
  Eye,
  MessageCircle,
  Target,
  Zap,
} from 'lucide-react';
import React from 'react';

import { Avatar, AvatarFallback } from '../../../components/ui/avatar';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';

interface ClientListProps {
  clients: Client[];
  onViewClient: (client: Client) => void;
  onAssignProgram: (client: Client) => void;
}

export const ClientList = ({
  clients,
  onAssignProgram,
  onViewClient,
}: ClientListProps): React.JSX.Element => {
  const getProgramStatusColor = (
    client: Client
  ): 'outline' | 'destructive' | 'default' => {
    if (!client.profile?.onboarding_completed_at) return 'outline';
    if (client.stats?.total_workouts === 0) return 'destructive';
    return 'default';
  };

  const getProgramStatusIcon = (client: Client): React.JSX.Element => {
    if (!client.profile?.onboarding_completed_at)
      return <Target className="h-3 w-3" />;
    if (client.stats?.total_workouts === 0)
      return <AlertCircle className="h-3 w-3" />;
    return <Activity className="h-3 w-3" />;
  };

  const getProgramStatusText = (client: Client): string => {
    if (!client.profile?.onboarding_completed_at) return 'No Program';
    if (client.stats?.total_workouts === 0) return 'At Risk';
    return 'Active';
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Program Status</TableHead>
            <TableHead>Subscription</TableHead>
            <TableHead>Days Active</TableHead>
            <TableHead>Hours Trained</TableHead>
            <TableHead>Achievements</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map(client => (
            <TableRow key={client.id} className="hover:bg-muted/50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                      {client.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{client.email}</div>
                    <div className="text-sm text-muted-foreground">
                      {client.primary_user_type || 'No type assigned'}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    client.profile?.onboarding_completed_at
                      ? 'default'
                      : 'secondary'
                  }
                  className="text-xs"
                >
                  {client.profile?.onboarding_completed_at
                    ? 'Active'
                    : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={getProgramStatusColor(client)}
                  className="text-xs flex items-center gap-1 w-fit"
                >
                  {getProgramStatusIcon(client)}
                  {getProgramStatusText(client)}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm font-medium">
                  {client.subscription_tier || 'Free'}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {client.stats?.days_active || 0}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {client.stats?.hours_trained || 0}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3 text-yellow-500" />
                  <span className="text-sm">
                    {client.stats?.achievements_count || 0}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2"
                    onClick={() => onViewClient(client)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 px-2">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Message
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2"
                    onClick={() => onAssignProgram(client)}
                  >
                    Assign
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
