'use client';

import type { Client } from '../types';

import { Activity, AlertCircle, UserPlus, Zap } from 'lucide-react';
import React from 'react';

import { Card, CardContent } from '../../../components/ui/card';

interface ClientStatsProps {
  clients: Client[];
}

export const ClientStats = ({
  clients,
}: ClientStatsProps): React.JSX.Element => {
  const activeClients = clients.filter(
    client => client.profile?.onboarding_completed_at
  );
  const inactiveClients = clients.filter(
    client => !client.profile?.onboarding_completed_at
  );
  const clientsWithPrograms = clients.filter(
    client => client.stats && client.stats.total_workouts > 0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <UserPlus className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Clients</p>
              <p className="text-2xl font-semibold">{clients.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Activity className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Clients</p>
              <p className="text-2xl font-semibold">{activeClients.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inactive</p>
              <p className="text-2xl font-semibold">{inactiveClients.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Zap className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">With Programs</p>
              <p className="text-2xl font-semibold">
                {clientsWithPrograms.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
