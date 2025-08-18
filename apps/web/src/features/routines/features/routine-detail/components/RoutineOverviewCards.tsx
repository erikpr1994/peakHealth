'use client';

import { Calendar, Activity, Clock } from 'lucide-react';

import { Card } from '@/components/ui/card';

interface RoutineOverviewCardsProps {
  duration: number;
  daysPerWeek: number;
  difficulty: string;
}

const RoutineOverviewCards = ({
  duration,
  daysPerWeek,
  difficulty,
}: RoutineOverviewCardsProps): React.ReactElement => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="p-6 h-32 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Duration</h3>
          <Calendar className="w-4 h-4 text-gray-400" />
        </div>
        <div className="text-2xl font-bold text-gray-800">{duration} weeks</div>
      </Card>

      <Card className="p-6 h-32 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Frequency</h3>
          <Activity className="w-4 h-4 text-gray-400" />
        </div>
        <div className="text-2xl font-bold text-gray-800">
          {daysPerWeek} days/week
        </div>
      </Card>

      <Card className="p-6 h-32 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">
            Avg. Training Duration
          </h3>
          <Clock className="w-4 h-4 text-gray-400" />
        </div>
        <div className="text-2xl font-bold text-gray-800">45-60 min</div>
      </Card>
    </div>
  );
};

export default RoutineOverviewCards;
