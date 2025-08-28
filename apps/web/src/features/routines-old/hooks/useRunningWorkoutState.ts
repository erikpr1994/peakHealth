'use client';

import { useState } from 'react';
import { RunningWorkout } from '../types';

interface UseRunningWorkoutStateProps {
  initialRunningWorkouts?: RunningWorkout[];
}

export const useRunningWorkoutState = ({
  initialRunningWorkouts = [],
}: UseRunningWorkoutStateProps = {}): {
  runningWorkouts: RunningWorkout[];
  setRunningWorkouts: React.Dispatch<React.SetStateAction<RunningWorkout[]>>;
  addRunningWorkout: () => void;
  removeRunningWorkout: (workoutId: string) => void;
  moveRunningWorkout: (workoutId: string, direction: 'up' | 'down') => void;
  updateRunningWorkoutName: (workoutId: string, name: string) => void;
  updateRunningWorkoutObjective: (workoutId: string, objective: string) => void;
  updateRunningWorkoutSchedule: (
    workoutId: string,
    field: keyof RunningWorkout['schedule'],
    value: string | string[]
  ) => void;
} => {
  const [runningWorkouts, setRunningWorkouts] = useState<RunningWorkout[]>(
    initialRunningWorkouts
  );

  const addRunningWorkout = (): void => {
    const newWorkout: RunningWorkout = {
      id: `running-${Date.now()}`,
      name: 'New Running Workout',
      type: 'running',
      objective: '',
      schedule: {
        repeatPattern: '',
        repeatValue: '',
        selectedDays: [],
        time: '',
      },
      sections: [],
    };
    setRunningWorkouts(prev => [...prev, newWorkout]);
  };

  const removeRunningWorkout = (workoutId: string): void => {
    setRunningWorkouts(prev =>
      prev.filter(workout => workout.id !== workoutId)
    );
  };

  const moveRunningWorkout = (
    workoutId: string,
    direction: 'up' | 'down'
  ): void => {
    setRunningWorkouts(prev => {
      const index = prev.findIndex(workout => workout.id === workoutId);
      if (index === -1) return prev;

      const newWorkouts = [...prev];
      if (direction === 'up' && index > 0) {
        [newWorkouts[index], newWorkouts[index - 1]] = [
          newWorkouts[index - 1],
          newWorkouts[index],
        ];
      } else if (direction === 'down' && index < newWorkouts.length - 1) {
        [newWorkouts[index], newWorkouts[index + 1]] = [
          newWorkouts[index + 1],
          newWorkouts[index],
        ];
      }
      return newWorkouts;
    });
  };

  const updateRunningWorkoutName = (workoutId: string, name: string): void => {
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId ? { ...workout, name } : workout
      )
    );
  };

  const updateRunningWorkoutObjective = (
    workoutId: string,
    objective: string
  ): void => {
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId ? { ...workout, objective } : workout
      )
    );
  };

  const updateRunningWorkoutSchedule = (
    workoutId: string,
    field: keyof RunningWorkout['schedule'],
    value: string | string[]
  ): void => {
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? { ...workout, schedule: { ...workout.schedule, [field]: value } }
          : workout
      )
    );
  };

  return {
    runningWorkouts,
    setRunningWorkouts,
    addRunningWorkout,
    removeRunningWorkout,
    moveRunningWorkout,
    updateRunningWorkoutName,
    updateRunningWorkoutObjective,
    updateRunningWorkoutSchedule,
  };
};
