'use client';

import { useState } from 'react';
import { StrengthWorkout } from '../types';

interface UseStrengthWorkoutStateProps {
  initialStrengthWorkouts?: StrengthWorkout[];
}

export const useStrengthWorkoutState = ({
  initialStrengthWorkouts = [],
}: UseStrengthWorkoutStateProps = {}): {
  strengthWorkouts: StrengthWorkout[];
  setStrengthWorkouts: React.Dispatch<React.SetStateAction<StrengthWorkout[]>>;
  addStrengthWorkout: () => void;
  removeStrengthWorkout: (workoutId: string) => void;
  moveStrengthWorkout: (workoutId: string, direction: 'up' | 'down') => void;
  updateStrengthWorkoutName: (workoutId: string, name: string) => void;
  updateStrengthWorkoutObjective: (
    workoutId: string,
    objective: string
  ) => void;
  updateStrengthWorkoutSchedule: (
    workoutId: string,
    field: keyof StrengthWorkout['schedule'],
    value: string | string[]
  ) => void;
} => {
  const [strengthWorkouts, setStrengthWorkouts] = useState<StrengthWorkout[]>(
    initialStrengthWorkouts
  );

  const addStrengthWorkout = (): void => {
    const newWorkout: StrengthWorkout = {
      id: `strength-${Date.now()}`,
      name: 'New Strength Workout',
      type: 'strength',
      objective: '',
      schedule: {
        repeatPattern: '',
        repeatValue: '',
        selectedDays: [],
        time: '',
      },
      sections: [],
    };
    setStrengthWorkouts(prev => [...prev, newWorkout]);
  };

  const removeStrengthWorkout = (workoutId: string): void => {
    setStrengthWorkouts(prev =>
      prev.filter(workout => workout.id !== workoutId)
    );
  };

  const moveStrengthWorkout = (
    workoutId: string,
    direction: 'up' | 'down'
  ): void => {
    setStrengthWorkouts(prev => {
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

  const updateStrengthWorkoutName = (workoutId: string, name: string): void => {
    setStrengthWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId ? { ...workout, name } : workout
      )
    );
  };

  const updateStrengthWorkoutObjective = (
    workoutId: string,
    objective: string
  ): void => {
    setStrengthWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId ? { ...workout, objective } : workout
      )
    );
  };

  const updateStrengthWorkoutSchedule = (
    workoutId: string,
    field: keyof StrengthWorkout['schedule'],
    value: string | string[]
  ): void => {
    setStrengthWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? { ...workout, schedule: { ...workout.schedule, [field]: value } }
          : workout
      )
    );
  };

  return {
    strengthWorkouts,
    setStrengthWorkouts,
    addStrengthWorkout,
    removeStrengthWorkout,
    moveStrengthWorkout,
    updateStrengthWorkoutName,
    updateStrengthWorkoutObjective,
    updateStrengthWorkoutSchedule,
  };
};
