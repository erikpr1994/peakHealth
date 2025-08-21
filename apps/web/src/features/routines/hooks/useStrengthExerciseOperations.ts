'use client';

import {
  Exercise,
  ProgressionMethod,
  WorkoutSet,
  StrengthWorkout,
  WorkoutSection,
} from '../types';

export const useStrengthExerciseOperations = (
  setStrengthWorkouts: React.Dispatch<React.SetStateAction<StrengthWorkout[]>>
) => {
  const addStrengthExercise = (
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

    setStrengthWorkouts(prev =>
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
      )
    );
  };

  const removeStrengthExercise = (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ): void => {
    setStrengthWorkouts(prev =>
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
      )
    );
  };

  const updateStrengthExerciseName = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    name: string
  ): void => {
    setStrengthWorkouts(prev =>
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
      )
    );
  };

  const updateStrengthExerciseSets = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    sets: WorkoutSet[]
  ): void => {
    setStrengthWorkouts(prev =>
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
      )
    );
  };

  const updateStrengthRestTimer = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restTimer: string
  ): void => {
    setStrengthWorkouts(prev =>
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
      )
    );
  };

  const updateStrengthExerciseRestAfter = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restAfter: string
  ): void => {
    setStrengthWorkouts(prev =>
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
      )
    );
  };

  const updateStrengthExerciseEmomReps = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    reps: number
  ): void => {
    setStrengthWorkouts(prev =>
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
      )
    );
  };

  const updateStrengthExerciseProgressionMethod = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    progressionMethod: ProgressionMethod
  ): void => {
    setStrengthWorkouts(prev =>
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
      )
    );
  };

  return {
    addStrengthExercise,
    removeStrengthExercise,
    updateStrengthExerciseName,
    updateStrengthExerciseSets,
    updateStrengthRestTimer,
    updateStrengthExerciseRestAfter,
    updateStrengthExerciseEmomReps,
    updateStrengthExerciseProgressionMethod,
  };
};
