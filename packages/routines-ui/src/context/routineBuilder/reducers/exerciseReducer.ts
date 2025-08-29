import { RoutineBuilderState } from '../types';
import { Exercise, Workout } from '@peakhealth/routines-types';

type AddExercisePayload = {
  workoutId: string;
  sectionId: string;
  exercise: Exercise;
};

type RemoveExercisePayload = {
  workoutId: string;
  sectionId: string;
  exerciseId: string;
};

type UpdateExercisePayload = {
  workoutId: string;
  sectionId: string;
  exerciseId: string;
  updates: Partial<Omit<Exercise, '_id' | 'orderIndex'>>;
};

type ReorderExercisesPayload = {
  workoutId: string;
  sectionId: string;
  exerciseIds: string[];
};

export const addExercise = (
  state: RoutineBuilderState,
  payload: AddExercisePayload
): RoutineBuilderState => {
  const { workoutId, sectionId, exercise } = payload;

  const updatedWorkouts = state.workouts.map(workout => {
    if (workout._id !== workoutId) {
      return workout;
    }

    const updatedSections = workout.sections.map(section => {
      if (section._id !== sectionId) {
        return section;
      }

      // Ensure the exercise has the correct orderIndex
      const updatedExercise = {
        ...exercise,
        orderIndex: section.exercises.length,
      };

      return {
        ...section,
        exercises: [...section.exercises, updatedExercise],
      };
    });

    return {
      ...workout,
      sections: updatedSections,
    } as Workout;
  });

  return {
    ...state,
    workouts: updatedWorkouts,
  };
};

export const removeExercise = (
  state: RoutineBuilderState,
  payload: RemoveExercisePayload
): RoutineBuilderState => {
  const { workoutId, sectionId, exerciseId } = payload;

  const updatedWorkouts = state.workouts.map(workout => {
    if (workout._id !== workoutId) {
      return workout;
    }

    const updatedSections = workout.sections.map(section => {
      if (section._id !== sectionId) {
        return section;
      }

      const filteredExercises = section.exercises.filter(
        exercise => exercise._id !== exerciseId
      );

      // Reorder the remaining exercises
      const reorderedExercises = filteredExercises.map((exercise, index) => ({
        ...exercise,
        orderIndex: index,
      }));

      return {
        ...section,
        exercises: reorderedExercises,
      };
    });

    return {
      ...workout,
      sections: updatedSections,
    } as Workout;
  });

  return {
    ...state,
    workouts: updatedWorkouts,
  };
};

export const updateExercise = (
  state: RoutineBuilderState,
  payload: UpdateExercisePayload
): RoutineBuilderState => {
  const { workoutId, sectionId, exerciseId, updates } = payload;

  const updatedWorkouts = state.workouts.map(workout => {
    if (workout._id !== workoutId) {
      return workout;
    }

    const updatedSections = workout.sections.map(section => {
      if (section._id !== sectionId) {
        return section;
      }

      const updatedExercises = section.exercises.map(exercise =>
        exercise._id === exerciseId
          ? ({ ...exercise, ...updates } as Exercise)
          : exercise
      );

      return {
        ...section,
        exercises: updatedExercises,
      };
    });

    return {
      ...workout,
      sections: updatedSections,
    } as Workout;
  });

  return {
    ...state,
    workouts: updatedWorkouts,
  };
};

export const reorderExercises = (
  state: RoutineBuilderState,
  payload: ReorderExercisesPayload
): RoutineBuilderState => {
  const { workoutId, sectionId, exerciseIds } = payload;

  const updatedWorkouts = state.workouts.map(workout => {
    if (workout._id !== workoutId) {
      return workout;
    }

    const updatedSections = workout.sections.map(section => {
      if (section._id !== sectionId) {
        return section;
      }

      // Create a map of exercise ID to exercise for quick lookup
      const exerciseMap = new Map(
        section.exercises.map(exercise => [exercise._id, exercise])
      );

      // Reorder exercises based on the provided order
      const reorderedExercises = exerciseIds
        .map((exerciseId, index) => {
          const exercise = exerciseMap.get(exerciseId);
          if (!exercise) {
            return null;
          }
          return {
            ...exercise,
            orderIndex: index,
          };
        })
        .filter((exercise): exercise is Exercise => exercise !== null);

      return {
        ...section,
        exercises: reorderedExercises,
      };
    });

    return {
      ...workout,
      sections: updatedSections,
    } as Workout;
  });

  return {
    ...state,
    workouts: updatedWorkouts,
  };
};
