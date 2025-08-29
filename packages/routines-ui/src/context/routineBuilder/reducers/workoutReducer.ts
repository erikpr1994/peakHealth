import { RoutineBuilderState } from '../types';
import { Workout } from '@peakhealth/routines-types';

type AddWorkoutPayload = {
  workout: Workout;
};

type RemoveWorkoutPayload = {
  workoutId: string;
};

type UpdateWorkoutPayload = {
  workoutId: string;
  updates: Partial<Omit<Workout, '_id' | 'orderIndex'>>;
};

export const addWorkout = (
  state: RoutineBuilderState,
  payload: AddWorkoutPayload
): RoutineBuilderState => {
  const { workout } = payload;

  // Ensure the workout has the correct orderIndex
  const updatedWorkout = {
    ...workout,
    orderIndex: state.workouts.length,
  };

  return {
    ...state,
    workouts: [...state.workouts, updatedWorkout],
    totalWorkouts: state.workouts.length + 1,
  };
};

export const removeWorkout = (
  state: RoutineBuilderState,
  payload: RemoveWorkoutPayload
): RoutineBuilderState => {
  const { workoutId } = payload;

  const filteredWorkouts = state.workouts.filter(
    workout => workout._id !== workoutId
  );

  // Reorder the remaining workouts
  const reorderedWorkouts = filteredWorkouts.map((workout, index) => ({
    ...workout,
    orderIndex: index,
  }));

  return {
    ...state,
    workouts: reorderedWorkouts,
    totalWorkouts: reorderedWorkouts.length,
  };
};

export const updateWorkout = (
  state: RoutineBuilderState,
  payload: UpdateWorkoutPayload
): RoutineBuilderState => {
  const { workoutId, updates } = payload;

  const updatedWorkouts = state.workouts.map(workout =>
    workout._id === workoutId
      ? ({ ...workout, ...updates } as Workout)
      : workout
  );

  return {
    ...state,
    workouts: updatedWorkouts,
  };
};
