'use client';

import React from 'react';

import { FeatureFlag } from '../types';
import {
  ALL_ENVIRONMENTS,
  getEnvironmentColor,
  getEnvironmentIcon,
} from '../utils';

import { Badge } from '@/components/ui/badge';

type Props = {
  flag: FeatureFlag;
};

export const EnvironmentStatusGrid: React.FC<Props> = ({ flag }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {ALL_ENVIRONMENTS.map(env => {
        const envConfig = flag.feature_flag_environments.find(
          e => e.environment === env
        );
        const EnvIcon = getEnvironmentIcon(env);
        return (
          <div key={env} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EnvIcon className="h-4 w-4" />
                <span className="text-sm font-medium capitalize">{env}</span>
                <Badge variant={getEnvironmentColor(env)} className="text-xs">
                  {envConfig?.is_enabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Rollout:</span>
                <span>{envConfig?.rollout_percentage || 0}%</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EnvironmentStatusGrid;
