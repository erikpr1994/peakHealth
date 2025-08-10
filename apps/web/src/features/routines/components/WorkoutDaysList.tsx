'use client';

import { Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getDifficultyColor } from '../utils';

interface Exercise {
  id: string;
  name: string;
  sets: Array<{
    reps?: string;
    weight?: string;
    duration?: string;
    restTime: string;
  }>;
  notes?: string;
  muscleGroups: string[];
}

interface WorkoutDay {
  id: string;
  name: string;
  exercises: Exercise[];
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface WorkoutDaysListProps {
  workoutDays: WorkoutDay[];
  routineId: string;
}

const WorkoutDaysList = ({
  workoutDays,
  routineId,
}: WorkoutDaysListProps): React.ReactElement => {
  const router = useRouter();

  return (
    <Card className="p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Workout Days</h2>
      <div className="space-y-6">
        {workoutDays.map(workout => (
          <div
            key={workout.id}
            className="border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {workout.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span>Est. {workout.estimatedTime}</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${getDifficultyColor(workout.difficulty)}`}
                  >
                    {workout.difficulty}
                  </span>
                  <span>{workout.exercises.length} exercises</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/workout-tracker/${routineId}`)}
              >
                <Play className="w-4 h-4 mr-2" />
                Start
              </Button>
            </div>

            <div className="space-y-3">
              {workout.exercises.map(exercise => (
                <div key={exercise.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">
                      {exercise.name}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {exercise.muscleGroups.map(group => (
                        <span
                          key={group}
                          className="px-2 py-1 bg-white text-gray-600 rounded text-xs"
                        >
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {exercise.sets.length} sets •{' '}
                    {exercise.sets.map(set => set.reps).join(', ')} reps
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WorkoutDaysList;
