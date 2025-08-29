import { RoutineBuilderState } from '../types';
import {
  WorkoutSet,
  Exercise,
  TabataExercise,
  Workout,
} from '@peakhealth/routines-types';

type AddSetPayload = {
  workoutId: string;
  sectionId: string;
  exerciseId: string;
  set: WorkoutSet;
};

type RemoveSetPayload = {
  workoutId: string;
  sectionId: string;
  exerciseId: string;
  setId: string;
};

type UpdateSetPayload = {
  workoutId: string;
  sectionId: string;
  exerciseId: string;
  setId: string;
  updates: Partial<Omit<WorkoutSet, '_id' | 'setNumber'>>;
};

type ReorderSetsPayload = {
  workoutId: string;
  sectionId: string;
  exerciseId: string;
  setIds: string[];
};

// Type guard to check if exercise has sets
const hasSets = (
  exercise: Exercise
): exercise is Exclude<Exercise, TabataExercise> => {
  return exercise.type !== 'tabata';
};

export const addSet = (
  state: RoutineBuilderState,
  payload: AddSetPayload
): RoutineBuilderState => {
  const { workoutId, sectionId, exerciseId, set } = payload;

  const updatedWorkouts = state.workouts.map(workout => {
    if (workout._id !== workoutId) {
      return workout;
    }

    const updatedSections = workout.sections.map(section => {
      if (section._id !== sectionId) {
        return section;
      }

      const updatedExercises = section.exercises.map(exercise => {
        if (exercise._id !== exerciseId || !hasSets(exercise)) {
          return exercise;
        }

        // Ensure the set has the correct setNumber
        const updatedSet = {
          ...set,
          setNumber: exercise.sets.length + 1,
        };

        return {
          ...exercise,
          sets: [...exercise.sets, updatedSet],
        };
      });

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

export const removeSet = (
  state: RoutineBuilderState,
  payload: RemoveSetPayload
): RoutineBuilderState => {
  const { workoutId, sectionId, exerciseId, setId } = payload;

  const updatedWorkouts = state.workouts.map(workout => {
    if (workout._id !== workoutId) {
      return workout;
    }

    const updatedSections = workout.sections.map(section => {
      if (section._id !== sectionId) {
        return section;
      }

      const updatedExercises = section.exercises.map(exercise => {
        if (exercise._id !== exerciseId || !hasSets(exercise)) {
          return exercise;
        }

        const filteredSets = exercise.sets.filter(set => set._id !== setId);

        // Reorder the remaining sets
        const reorderedSets = filteredSets.map((set, index) => ({
          ...set,
          setNumber: index + 1,
        }));

        return {
          ...exercise,
          sets: reorderedSets,
        };
      });

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

export const updateSet = (
  state: RoutineBuilderState,
  payload: UpdateSetPayload
): RoutineBuilderState => {
  const { workoutId, sectionId, exerciseId, setId, updates } = payload;

  const updatedWorkouts = state.workouts.map(workout => {
    if (workout._id !== workoutId) {
      return workout;
    }

    const updatedSections = workout.sections.map(section => {
      if (section._id !== sectionId) {
        return section;
      }

      const updatedExercises = section.exercises.map(exercise => {
        if (exercise._id !== exerciseId || !hasSets(exercise)) {
          return exercise;
        }

        const updatedSets = exercise.sets.map(set =>
          set._id === setId ? { ...set, ...updates } : set
        );

        return {
          ...exercise,
          sets: updatedSets,
        };
      });

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

export const reorderSets = (
  state: RoutineBuilderState,
  payload: ReorderSetsPayload
): RoutineBuilderState => {
  const { workoutId, sectionId, exerciseId, setIds } = payload;

  const updatedWorkouts = state.workouts.map(workout => {
    if (workout._id !== workoutId) {
      return workout;
    }

    const updatedSections = workout.sections.map(section => {
      if (section._id !== sectionId) {
        return section;
      }

      const updatedExercises = section.exercises.map(exercise => {
        if (exercise._id !== exerciseId || !hasSets(exercise)) {
          return exercise;
        }

        // Create a map of set ID to set for quick lookup
        const setMap = new Map(
          exercise.sets.map(set => [set._id, set] as const)
        );

        // Filter out non-existent sets first, then assign consecutive indices
        const reorderedSets = setIds
          .map(setId => setMap.get(setId))
          .filter((set): set is WorkoutSet => set !== undefined)
          .map((set, index) => ({
            ...set,
            setNumber: index + 1,
          }));

        return {
          ...exercise,
          sets: reorderedSets,
        };
      });

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
