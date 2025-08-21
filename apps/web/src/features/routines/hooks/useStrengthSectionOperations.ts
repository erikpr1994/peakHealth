'use client';

import { WorkoutSection, StrengthWorkout } from '../types';

export const useStrengthSectionOperations = (
  setStrengthWorkouts: React.Dispatch<React.SetStateAction<StrengthWorkout[]>>
) => {
  const addStrengthSection = (workoutId: string): void => {
    const newSection: WorkoutSection = {
      id: `section-${Date.now()}`,
      name: 'New Section',
      type: 'basic',
      exercises: [],
      restAfter: '',
    };
    setStrengthWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? { ...workout, sections: [...workout.sections, newSection] }
          : workout
      )
    );
  };

  const removeStrengthSection = (
    workoutId: string,
    sectionId: string
  ): void => {
    setStrengthWorkouts(prev =>
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

  const updateStrengthSectionName = (
    workoutId: string,
    sectionId: string,
    name: string
  ): void => {
    setStrengthWorkouts(prev =>
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

  const updateStrengthSectionType = (
    workoutId: string,
    sectionId: string,
    type: WorkoutSection['type']
  ): void => {
    setStrengthWorkouts(prev =>
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

  const updateStrengthSectionRestAfter = (
    workoutId: string,
    sectionId: string,
    restAfter: string
  ): void => {
    setStrengthWorkouts(prev =>
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

  const updateStrengthSectionEmomDuration = (
    workoutId: string,
    sectionId: string,
    duration: number
  ): void => {
    setStrengthWorkouts(prev =>
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
    addStrengthSection,
    removeStrengthSection,
    updateStrengthSectionName,
    updateStrengthSectionType,
    updateStrengthSectionRestAfter,
    updateStrengthSectionEmomDuration,
  };
};
