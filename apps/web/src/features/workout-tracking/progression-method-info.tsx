'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  RotateCcw,
  Triangle,
  Zap,
  Target,
  Repeat,
} from 'lucide-react';
import type { ProgressionMethod } from '@/features/workout-tracking/workout';

interface ProgressionMethodInfoProps {
  method: ProgressionMethod;
  currentSet: number;
  totalSets: number;
  reps: string;
  weight: string;
  className?: string;
}

export const ProgressionMethodInfo = ({
  method,
  currentSet,
  totalSets,
  reps,
  weight,
  className = '',
}: ProgressionMethodInfoProps) => {
  const getMethodInfo = (method: ProgressionMethod) => {
    switch (method) {
      case 'linear':
        return {
          icon: TrendingUp,
          color: 'text-blue-500',
          name: 'Linear Progression',
          description: 'Same reps each set, increase weight next workout',
        };
      case 'dual':
        return {
          icon: RotateCcw,
          color: 'text-green-500',
          name: 'Dual Progression',
          description: 'Increase reps until max, then increase weight',
        };
      case 'inverse-pyramid':
        return {
          icon: Triangle,
          color: 'text-orange-500',
          name: 'Inverse Pyramid',
          description: 'Decrease reps, increase weight each set',
        };
      case 'myo-reps':
        return {
          icon: Zap,
          color: 'text-red-500',
          name: 'Myo-Reps',
          description: 'Activation set + mini-sets with short rest',
        };
      case 'widowmaker':
        return {
          icon: Target,
          color: 'text-purple-500',
          name: 'Widowmaker',
          description: 'Single high-rep set to failure',
        };
      case 'amrap':
        return {
          icon: Repeat,
          color: 'text-cyan-500',
          name: 'AMRAP',
          description: 'As Many Reps As Possible',
        };
      default:
        return {
          icon: TrendingUp,
          color: 'text-gray-500',
          name: 'Standard',
          description: 'Regular set progression',
        };
    }
  };

  const methodInfo = getMethodInfo(method);
  const MethodIcon = methodInfo.icon;

  return (
    <Card className={`border-l-4 border-l-primary ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MethodIcon className={`w-4 h-4 ${methodInfo.color}`} />
            <CardTitle className="text-sm font-medium text-foreground">
              {methodInfo.name}
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            Set {currentSet}/{totalSets}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-muted-foreground">
          {methodInfo.description}
        </p>
      </CardContent>
    </Card>
  );
};
