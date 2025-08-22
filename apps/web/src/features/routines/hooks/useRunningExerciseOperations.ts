'use client';

import { Exercise, WorkoutSet, RunningWorkout } from '../types';

export const useRunningExerciseOperations = (
  setRunningWorkouts: React.Dispatch<React.SetStateAction<RunningWorkout[]>>
) => {
  const addRunningExercise = (
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

    setRunningWorkouts(prev =>
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

  const removeRunningExercise = (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ): void => {
    setRunningWorkouts(prev =>
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

  const updateRunningExerciseName = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    name: string
  ): void => {
    setRunningWorkouts(prev =>
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

  const updateRunningExerciseSets = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    sets: WorkoutSet[]
  ): void => {
    setRunningWorkouts(prev =>
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

  const updateRunningRestTimer = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restTimer: string
  ): void => {
    setRunningWorkouts(prev =>
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

  const updateRunningExerciseRestAfter = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restAfter: string
  ): void => {
    setRunningWorkouts(prev =>
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

  const updateRunningExerciseEmomReps = (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    reps: number
  ): void => {
    setRunningWorkouts(prev =>
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

  return {
    addRunningExercise,
    removeRunningExercise,
    updateRunningExerciseName,
    updateRunningExerciseSets,
    updateRunningRestTimer,
    updateRunningExerciseRestAfter,
    updateRunningExerciseEmomReps,
  };
};
