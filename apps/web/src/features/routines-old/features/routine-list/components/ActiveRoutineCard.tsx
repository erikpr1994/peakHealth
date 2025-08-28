'use client';

import { Play, Calendar, Target, Trophy, Zap, Dumbbell } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Routine } from '@/features/routines-old/types';
import {
  getIconColor,
  calculateDaysPerWeek,
} from '@/features/routines-old/utils';

interface ActiveRoutineCardProps {
  routine: Routine;
}

const ActiveRoutineCard = ({
  routine,
}: ActiveRoutineCardProps): React.ReactElement => {
  const router = useRouter();

  const handleStartWorkout = (): void => {
    router.push(`/workout-tracker/${routine.id}`);
  };

  const getObjectiveIcon = (
    index: number
  ): React.ComponentType<{ className?: string }> => {
    const icons = [Target, Trophy, Zap, Dumbbell];
    return icons[index % icons.length];
  };

  const progressPercentage = routine.progress
    ? (routine.progress.current / routine.progress.total) * 100
    : 0;

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 text-white">
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                Active
              </span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                {routine.difficulty}
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-4">{routine.name}</h2>
            <p className="text-indigo-100 mb-6 text-lg leading-relaxed">
              {routine.description}
            </p>

            {/* Week Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Week Progress</h3>
                <span className="text-indigo-100">
                  Week {routine.progress?.current || 0} of{' '}
                  {routine.progress?.total || 4}
                </span>
              </div>
              <div className="bg-white/20 rounded-full h-3 mb-2">
                <div
                  className="bg-white rounded-full h-3 transition-all duration-300"
                  style={{
                    width: `${progressPercentage}%`,
                  }}
                />
              </div>
              <p className="text-indigo-100 text-sm">
                {Math.round(progressPercentage)}% Complete
              </p>
            </div>

            {/* Program Objectives */}
            {routine.objectives && (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Program Objectives
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {routine.objectives.map((objective, index) => {
                    const IconComponent = getObjectiveIcon(index);
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3"
                      >
                        <IconComponent
                          className={`w-5 h-5 ${getIconColor(['green', 'blue', 'purple', 'orange'][index])}`}
                        />
                        <span className="text-sm text-indigo-100">
                          {objective}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Stats and Actions */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="w-5 h-5 text-indigo-200" />
                  <span className="text-sm font-medium">Frequency</span>
                </div>
                <p className="text-2xl font-bold">
                  {calculateDaysPerWeek(routine)} days/week
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Target className="w-5 h-5 text-indigo-200" />
                  <span className="text-sm font-medium">Goal</span>
                </div>
                <p className="text-lg font-semibold">{routine.goal}</p>
              </div>

              {routine.totalWorkouts &&
                routine.completedWorkouts !== undefined && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Trophy className="w-5 h-5 text-indigo-200" />
                      <span className="text-sm font-medium">Workouts</span>
                    </div>
                    <p className="text-lg font-semibold">
                      {routine.completedWorkouts}/{routine.totalWorkouts}{' '}
                      completed
                    </p>
                    <Progress
                      value={
                        (routine.completedWorkouts / routine.totalWorkouts) *
                        100
                      }
                      className="mt-2 h-2 bg-white/20"
                    />
                  </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleStartWorkout}
                className="w-full bg-indigo-500 text-white hover:!bg-indigo-600 focus:!bg-indigo-600 active:!bg-indigo-700 font-semibold py-3 shadow-lg border-0 transition-colors duration-200"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Today's Workout
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push(`/routines/${routine.id}`)}
                className="w-full border-white/60 text-white hover:bg-white/25 hover:border-white/90 focus:bg-white/25 focus:border-white/90 font-medium bg-transparent transition-all duration-200 hover:shadow-md"
              >
                View Routine Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActiveRoutineCard;
