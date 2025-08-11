'use client';

import { Calendar, Activity, Clock, Target } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { getGoalColor } from '@/features/routines/utils';

interface RoutineOverviewCardsProps {
  duration: number;
  daysPerWeek: number;
  goal: string;
  difficulty: string;
}

const RoutineOverviewCards = ({
  duration,
  daysPerWeek,
  goal,
  difficulty,
}: RoutineOverviewCardsProps): React.ReactElement => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Duration</h3>
          <Calendar className="w-4 h-4 text-gray-400" />
        </div>
        <div className="text-2xl font-bold text-gray-800">{duration} weeks</div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Frequency</h3>
          <Activity className="w-4 h-4 text-gray-400" />
        </div>
        <div className="text-2xl font-bold text-gray-800">
          {daysPerWeek} days/week
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Avg. Duration</h3>
          <Clock className="w-4 h-4 text-gray-400" />
        </div>
        <div className="text-2xl font-bold text-gray-800">45-60 min</div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Goal</h3>
          <Target className="w-4 h-4 text-gray-400" />
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getGoalColor(goal)}`}
        >
          {goal}
        </span>
      </Card>
    </div>
  );
};

export default RoutineOverviewCards;
