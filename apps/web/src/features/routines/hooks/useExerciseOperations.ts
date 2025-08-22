'use client';

import {
  Exercise,
  ProgressionMethod,
  WorkoutSet,
  StrengthWorkout,
  RunningWorkout,
} from '../types';

type WorkoutType = StrengthWorkout | RunningWorkout;
type SetWorkoutsFunction<T extends WorkoutType> = React.Dispatch<
  React.SetStateAction<T[]>
>;

interface UseExerciseOperationsProps<T extends WorkoutType> {
  setWorkouts: SetWorkoutsFunction<T>;
  workoutType: 'strength' | 'running';
}

/**
 * Generic exercise operations hook that works with both strength and running workouts
 * Eliminates code duplication between specialized exercise operation hooks
 */
export const useExerciseOperations = <T extends WorkoutType>({
  setWorkouts,
  workoutType,
}: UseExerciseOperationsProps<T>) => {
  const addExercise = (
    workoutId: string,
    sectionId: string,
    exerciseData: Partial<Exercise>
  ): void => {
    const newExercise: Exercise = {
      id: `exercise-${Date.now()}`,
      name: exerciseData.name || 'New Exercise',
      category: exerciseData.category,
      muscleGroups: exerciseData.muscleGroups,
      equipment: exerciseData.equipment || [],
      exerciseId: exerciseData.exerciseId,
      variantId: exerciseData.variantId,
      sets: exerciseData.sets || [],
      restTimer: exerciseData.restTimer || '',
      restAfter: exerciseData.restAfter || '',
      notes: exerciseData.notes || '',
      progressionMethod: exerciseData.progressionMethod,
      hasApproachSets: exerciseData.hasApproachSets || false,
      emomReps: exerciseData.emomReps,
    };

    setWorkouts(
      prev =>
        prev.map(workout =>
          workout.id === workoutId
            ? {
                ...workout,
                sections: workout.sections.map(section =>
                  section.id === sectionId
                    ? {
                        ...section,
                        exercises: [...section.exercises, newExercise],
                      }
                    : section
                ),
              }
            : workout
        ) as T[]
    );
  };

  const removeExercise = (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ): void => {
    setWorkouts(
      prev =>
        prev.map(workout =>
          workout.id === workoutId
            ? {
                ...workout,
                sections: workout.sections.map(section =>
                  section.id === sectionId
                    ? {
                        ...section,
                        exercises: section.exercises.filter(
                          exercise => exercise.id !== exerciseId
                        ),
                      }
                    : section
                ),
              }
            : workout
        ) as T[]
    );
  };

  const updateExerciseName = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    name: string
  ): void => {
    setWorkouts(
      prev =>
        prev.map(workout =>
          workout.id === workoutId
            ? {
                ...workout,
                sections: workout.sections.map(section =>
                  section.id === sectionId
                    ? {
                        ...section,
                        exercises: section.exercises.map(exercise =>
                          exercise.id === exerciseId
                            ? { ...exercise, name }
                            : exercise
                        ),
                      }
                    : section
                ),
              }
            : workout
        ) as T[]
    );
  };

  const updateExerciseSets = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    sets: WorkoutSet[]
  ): void => {
    setWorkouts(
      prev =>
        prev.map(workout =>
          workout.id === workoutId
            ? {
                ...workout,
                sections: workout.sections.map(section =>
                  section.id === sectionId
                    ? {
                        ...section,
                        exercises: section.exercises.map(exercise =>
                          exercise.id === exerciseId
                            ? { ...exercise, sets }
                            : exercise
                        ),
                      }
                    : section
                ),
              }
            : workout
        ) as T[]
    );
  };

  const updateRestTimer = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restTimer: string
  ): void => {
    setWorkouts(
      prev =>
        prev.map(workout =>
          workout.id === workoutId
            ? {
                ...workout,
                sections: workout.sections.map(section =>
                  section.id === sectionId
                    ? {
                        ...section,
                        exercises: section.exercises.map(exercise =>
                          exercise.id === exerciseId
                            ? { ...exercise, restTimer }
                            : exercise
                        ),
                      }
                    : section
                ),
              }
            : workout
        ) as T[]
    );
  };

  const updateExerciseRestAfter = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restAfter: string
  ): void => {
    setWorkouts(
      prev =>
        prev.map(workout =>
          workout.id === workoutId
            ? {
                ...workout,
                sections: workout.sections.map(section =>
                  section.id === sectionId
                    ? {
                        ...section,
                        exercises: section.exercises.map(exercise =>
                          exercise.id === exerciseId
                            ? { ...exercise, restAfter }
                            : exercise
                        ),
                      }
                    : section
                ),
              }
            : workout
        ) as T[]
    );
  };

  const updateExerciseEmomReps = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    reps: number
  ): void => {
    setWorkouts(
      prev =>
        prev.map(workout =>
          workout.id === workoutId
            ? {
                ...workout,
                sections: workout.sections.map(section =>
                  section.id === sectionId
                    ? {
                        ...section,
                        exercises: section.exercises.map(exercise =>
                          exercise.id === exerciseId
                            ? { ...exercise, emomReps: reps }
                            : exercise
                        ),
                      }
                    : section
                ),
              }
            : workout
        ) as T[]
    );
  };

  // Strength-specific operations
  const updateExerciseProgressionMethod = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    progressionMethod: ProgressionMethod
  ): void => {
    if (workoutType !== 'strength') {
      console.warn(
        'Progression method is only available for strength workouts'
      );
      return;
    }

    setWorkouts(
      prev =>
        prev.map(workout =>
          workout.id === workoutId
            ? {
                ...workout,
                sections: workout.sections.map(section =>
                  section.id === sectionId
                    ? {
                        ...section,
                        exercises: section.exercises.map(exercise =>
                          exercise.id === exerciseId
                            ? { ...exercise, progressionMethod }
                            : exercise
                        ),
                      }
                    : section
                ),
              }
            : workout
        ) as T[]
    );
  };

  // Return operations based on workout type
  const baseOperations = {
    addExercise,
    removeExercise,
    updateExerciseName,
    updateExerciseSets,
    updateRestTimer,
    updateExerciseRestAfter,
    updateExerciseEmomReps,
  };

  if (workoutType === 'strength') {
    return {
      ...baseOperations,
      updateExerciseProgressionMethod,
    };
  }

  return baseOperations;
};
