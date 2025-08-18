import { StrengthWorkout, RunningWorkout } from '@/features/routines/types';

interface RoutineValidationData {
  name: string;
  difficulty: string;
  goal: string;
  objectives: string[];
  strengthWorkouts: StrengthWorkout[];
  runningWorkouts: RunningWorkout[];
}

interface ValidationError {
  message: string;
}

export const useRoutineValidation = (): {
  validateRoutineData: (data: RoutineValidationData) => ValidationError | null;
} => {
  const validateRoutineData = (
    data: RoutineValidationData
  ): ValidationError | null => {
    // Validate routine metadata
    if (!data.name.trim()) {
      return { message: 'Routine name is required' };
    }

    if (!data.difficulty || !data.goal) {
      return { message: 'Difficulty and goal are required' };
    }

    if (!data.objectives || data.objectives.length === 0) {
      return { message: 'At least one objective is required' };
    }

    // Validate that at least one workout exists (strength or running)
    if (
      (!data.strengthWorkouts || data.strengthWorkouts.length === 0) &&
      (!data.runningWorkouts || data.runningWorkouts.length === 0)
    ) {
      return {
        message: 'At least one workout (strength or running) is required',
      };
    }

    // Validate each strength workout
    for (const workout of data.strengthWorkouts) {
      if (!workout.name?.trim()) {
        return {
          message: `Workout "${workout.name || 'Unnamed'}" must have a name`,
        };
      }

      if (!workout.objective?.trim()) {
        return { message: `Workout "${workout.name}" must have an objective` };
      }

      if (!workout.sections || workout.sections.length === 0) {
        return {
          message: `Workout "${workout.name}" must have at least one section`,
        };
      }

      // Validate each section
      for (const section of workout.sections) {
        if (!section.name?.trim()) {
          return {
            message: `Section "${section.name || 'Unnamed'}" in workout "${workout.name}" must have a name`,
          };
        }

        if (!section.exercises || section.exercises.length === 0) {
          return {
            message: `Section "${section.name}" in workout "${workout.name}" must have at least one exercise`,
          };
        }

        // Validate each exercise
        for (const exercise of section.exercises) {
          if (!exercise.variantId && !exercise.exerciseId) {
            return {
              message: `Exercise "${exercise.name || 'Unnamed'}" in section "${section.name}" must be selected from the exercise library`,
            };
          }

          if (!exercise.sets || exercise.sets.length === 0) {
            return {
              message: `Exercise "${exercise.name || 'Unnamed'}" in section "${section.name}" must have at least one set`,
            };
          }

          // Validate each set
          for (const set of exercise.sets) {
            if (!set.reps || set.reps <= 0) {
              return {
                message: `Set ${set.setNumber} in exercise "${exercise.name || 'Unnamed'}" must have valid reps`,
              };
            }
          }
        }
      }
    }

    // Validate running workouts if any
    if (data.runningWorkouts && data.runningWorkouts.length > 0) {
      for (const workout of data.runningWorkouts) {
        if (!workout.name?.trim()) {
          return {
            message: `Running workout "${workout.name || 'Unnamed'}" must have a name`,
          };
        }

        if (!workout.objective?.trim()) {
          return {
            message: `Running workout "${workout.name}" must have an objective`,
          };
        }

        if (!workout.sections || workout.sections.length === 0) {
          return {
            message: `Running workout "${workout.name}" must have at least one section`,
          };
        }

        // Validate each section
        for (const section of workout.sections) {
          if (!section.name?.trim()) {
            return {
              message: `Section "${section.name || 'Unnamed'}" in running workout "${workout.name}" must have a name`,
            };
          }

          if (!section.exercises || section.exercises.length === 0) {
            return {
              message: `Section "${section.name}" in running workout "${workout.name}" must have at least one exercise`,
            };
          }

          // Validate each exercise
          for (const exercise of section.exercises) {
            if (!exercise.variantId && !exercise.exerciseId) {
              return {
                message: `Exercise "${exercise.name || 'Unnamed'}" in section "${section.name}" must be selected from the exercise library`,
              };
            }
          }
        }
      }
    }

    return null; // No validation errors
  };

  return { validateRoutineData };
};
