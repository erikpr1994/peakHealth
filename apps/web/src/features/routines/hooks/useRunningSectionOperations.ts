'use client';

import { useCallback } from 'react';
import { WorkoutSection, RunningWorkout } from '../types';

export const useRunningSectionOperations = (
  setRunningWorkouts: React.Dispatch<React.SetStateAction<RunningWorkout[]>>
): {
  addRunningSection: (workoutId: string) => void;
  removeRunningSection: (workoutId: string, sectionId: string) => void;
  updateRunningSectionName: (
    workoutId: string,
    sectionId: string,
    name: string
  ) => void;
  updateRunningSectionType: (
    workoutId: string,
    sectionId: string,
    type: WorkoutSection['type']
  ) => void;
  updateRunningSectionRestAfter: (
    workoutId: string,
    sectionId: string,
    restAfter: string
  ) => void;
  updateRunningSectionEmomDuration: (
    workoutId: string,
    sectionId: string,
    duration: number
  ) => void;
} => {
  const addRunningSection = (workoutId: string): void => {
    const newSection: WorkoutSection = {
      id: `section-${Date.now()}`,
      name: 'New Section',
      type: 'basic',
      exercises: [],
      restAfter: '',
    };
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? { ...workout, sections: [...workout.sections, newSection] }
          : workout
      )
    );
  };

  const removeRunningSection = (workoutId: string, sectionId: string): void => {
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.filter(
                (section: WorkoutSection) => section.id !== sectionId
              ),
            }
          : workout
      )
    );
  };

  const updateRunningSectionName = (
    workoutId: string,
    sectionId: string,
    name: string
  ): void => {
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section: WorkoutSection) =>
                section.id === sectionId ? { ...section, name } : section
              ),
            }
          : workout
      )
    );
  };

  const updateRunningSectionType = (
    workoutId: string,
    sectionId: string,
    type: WorkoutSection['type']
  ): void => {
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section: WorkoutSection) =>
                section.id === sectionId ? { ...section, type } : section
              ),
            }
          : workout
      )
    );
  };

  const updateRunningSectionRestAfter = (
    workoutId: string,
    sectionId: string,
    restAfter: string
  ): void => {
    setRunningWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sections: workout.sections.map((section: WorkoutSection) =>
                section.id === sectionId ? { ...section, restAfter } : section
              ),
            }
          : workout
      )
    );
  };

  const updateRunningSectionEmomDuration = useCallback(
    (workoutId: string, sectionId: string, duration: number): void => {
      setRunningWorkouts(prev =>
        prev.map(workout =>
          workout.id === workoutId
            ? {
                ...workout,
                sections: workout.sections.map((section: WorkoutSection) =>
                  section.id === sectionId
                    ? { ...section, emomDuration: duration }
                    : section
                ),
              }
            : workout
        )
      );
    },
    [setRunningWorkouts]
  );

  return {
    addRunningSection,
    removeRunningSection,
    updateRunningSectionName,
    updateRunningSectionType,
    updateRunningSectionRestAfter,
    updateRunningSectionEmomDuration,
  };
};
