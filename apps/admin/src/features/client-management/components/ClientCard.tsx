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
import { Card, CardContent, CardHeader } from '../../../components/ui/card';
import { Progress } from '../../../components/ui/progress';

interface ClientCardProps {
  client: Client;
  onViewClient: (client: Client) => void;
  onAssignProgram: (client: Client) => void;
}

export const ClientCard = ({
  client,
  onAssignProgram,
  onViewClient,
}: ClientCardProps): React.JSX.Element => {
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
    <Card className="hover:shadow-lg transition-all duration-200 border-0 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-muted text-muted-foreground">
                {client.email.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-foreground">{client.email}</h4>
              <p className="text-sm text-muted-foreground">
                {client.primary_user_type || 'No type assigned'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge
              variant={
                client.profile?.onboarding_completed_at
                  ? 'default'
                  : 'secondary'
              }
              className="text-xs px-2 py-1"
            >
              {client.profile?.onboarding_completed_at ? 'Active' : 'Inactive'}
            </Badge>
            <Badge
              variant={getProgramStatusColor(client)}
              className="text-xs px-2 py-1"
            >
              {getProgramStatusIcon(client)}
              <span className="ml-1">{getProgramStatusText(client)}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-0">
        {client.stats && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">
                Workout Progress
              </span>
              <span className="text-sm font-semibold text-foreground">
                {client.stats.total_workouts} workouts
              </span>
            </div>
            <Progress
              value={Math.min((client.stats.total_workouts / 50) * 100, 100)}
              className="h-2"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Subscription</p>
            <p className="font-semibold text-sm text-foreground">
              {client.subscription_tier || 'Free'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Days Active</p>
            <p className="font-semibold text-sm text-foreground">
              {client.stats?.days_active || 0}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Hours Trained</p>
            <p className="font-semibold text-sm text-foreground">
              {client.stats?.hours_trained || 0}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Achievements</p>
            <div className="font-semibold text-sm text-foreground flex items-center gap-1">
              <Zap className="h-3 w-3 text-yellow-500" />
              {client.stats?.achievements_count || 0}
            </div>
          </div>
        </div>

        {client.profile?.goals && client.profile.goals.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Goals</p>
            <div className="space-y-1">
              {client.profile.goals.map((goal: string, index: number) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full flex-shrink-0"></div>
                  <span className="text-foreground">{goal}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2 border-t">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-8"
            onClick={() => onViewClient(client)}
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button size="sm" variant="outline" className="flex-1 h-8">
            <MessageCircle className="h-3 w-3 mr-1" />
            Message
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-3"
            onClick={() => onAssignProgram(client)}
          >
            Assign
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
