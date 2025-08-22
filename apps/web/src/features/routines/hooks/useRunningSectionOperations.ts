'use client';

import { WorkoutSection, RunningWorkout } from '../types';

export const useRunningSectionOperations = (
  setRunningWorkouts: React.Dispatch<React.SetStateAction<RunningWorkout[]>>
) => {
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

  const updateRunningSectionEmomDuration = (
    workoutId: string,
    sectionId: string,
    duration: number
  ): void => {
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
  };

  return {
    addRunningSection,
    removeRunningSection,
    updateRunningSectionName,
    updateRunningSectionType,
    updateRunningSectionRestAfter,
    updateRunningSectionEmomDuration,
  };
};
