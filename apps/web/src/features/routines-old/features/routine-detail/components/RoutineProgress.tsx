'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface RoutineProgressProps {
  currentWeek: number;
  totalWeeks: number;
  completedWorkouts: number;
  totalWorkouts: number;
  isActive: boolean;
}

const RoutineProgress = ({
  currentWeek,
  totalWeeks,
  completedWorkouts,
  totalWorkouts,
  isActive,
}: RoutineProgressProps): React.ReactElement => {
  const progressPercentage = (completedWorkouts / totalWorkouts) * 100;

  if (!isActive) {
    return (
      <Card className="p-6 flex flex-col justify-center min-h-[120px]">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Progress</h2>
        <p className="text-gray-600">
          This routine is not currently active. Progress tracking will be
          available once you activate the routine.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Progress</h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Overall Progress</span>
            <span className="text-sm font-medium text-gray-800">
              Week {currentWeek} of {totalWeeks}
            </span>
          </div>
          <Progress value={(currentWeek / totalWeeks) * 100} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Workouts Completed</span>
            <span className="text-sm font-medium text-gray-800">
              {completedWorkouts} of {totalWorkouts}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>
    </Card>
  );
};

export default RoutineProgress;
