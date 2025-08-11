'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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

interface ExerciseListProps {
  exercises: Exercise[];
}

const ExerciseList = ({ exercises }: ExerciseListProps): React.ReactElement => {
  const [showAllExercises, setShowAllExercises] = useState(false);

  const displayedExercises = showAllExercises
    ? exercises
    : exercises.slice(0, 6);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">All Exercises</h2>
        <Button
          variant="ghost"
          onClick={() => setShowAllExercises(!showAllExercises)}
          className="text-indigo-600"
        >
          {showAllExercises ? 'Show Less' : 'View All'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedExercises.map(exercise => (
          <div
            key={exercise.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <h4 className="font-medium text-gray-800 mb-2">{exercise.name}</h4>
            <div className="flex flex-wrap gap-1 mb-2">
              {exercise.muscleGroups.map(group => (
                <span
                  key={group}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  {group}
                </span>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              {exercise.sets.length} sets
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ExerciseList;
