import {
  RoutineBuilderState,
} from '../context/routineBuilder/types';
import {
  Workout,
  StrengthWorkoutSection,
  RunningWorkoutSection,
  Exercise,
  WorkoutSet,
} from '@peakhealth/routines-types';

/**
 * Find a specific workout within the state.workouts array
 */
export function findWorkoutById(
  state: RoutineBuilderState,
  workoutId: string
): Workout | undefined {
  return state.workouts.find(workout => workout._id === workoutId);
}

/**
 * Find a specific section within a given workout
 */
export function findSectionById(
  state: RoutineBuilderState,
  workoutId: string,
  sectionId: string
): (StrengthWorkoutSection | RunningWorkoutSection) | undefined {
  const workout = findWorkoutById(state, workoutId);
  if (!workout) return undefined;
  
  return workout.sections.find((section: StrengthWorkoutSection | RunningWorkoutSection) => section._id === sectionId);
}

/**
 * Find a specific exercise within a given section
 */
export function findExerciseById(
  state: RoutineBuilderState,
  workoutId: string,
  sectionId: string,
  exerciseId: string
): Exercise | undefined {
  const section = findSectionById(state, workoutId, sectionId);
  if (!section) return undefined;
  
  return section.exercises.find((exercise: Exercise) => exercise._id === exerciseId);
}

/**
 * Find a specific set within a given exercise
 */
export function findSetById(
  state: RoutineBuilderState,
  workoutId: string,
  sectionId: string,
  exerciseId: string,
  setId: string
): WorkoutSet | undefined {
  const exercise = findExerciseById(state, workoutId, sectionId, exerciseId);
  if (!exercise || exercise.type === 'tabata') return undefined;
  
  // Handle different exercise types that have sets
  if ('sets' in exercise) {
    return exercise.sets.find((set: WorkoutSet) => set._id === setId);
  }
  
  return undefined;
}

/**
 * Get all workout IDs from the state
 */
export function getWorkoutIds(state: RoutineBuilderState): string[] {
  return state.workouts.map(workout => workout._id);
}

/**
 * Get all section IDs for a specific workout
 */
export function getSectionIds(
  state: RoutineBuilderState,
  workoutId: string
): string[] {
  const workout = findWorkoutById(state, workoutId);
  if (!workout) return [];
  
  return workout.sections.map((section: StrengthWorkoutSection | RunningWorkoutSection) => section._id);
}

/**
 * Get all exercise IDs for a specific section
 */
export function getExerciseIds(
  state: RoutineBuilderState,
  workoutId: string,
  sectionId: string
): string[] {
  const section = findSectionById(state, workoutId, sectionId);
  if (!section) return [];
  
  return section.exercises.map((exercise: Exercise) => exercise._id);
}

/**
 * Get all set IDs for a specific exercise
 */
export function getSetIds(
  state: RoutineBuilderState,
  workoutId: string,
  sectionId: string,
  exerciseId: string
): string[] {
  const exercise = findExerciseById(state, workoutId, sectionId, exerciseId);
  if (!exercise || exercise.type === 'tabata') return [];
  
  // Handle different exercise types that have sets
  if ('sets' in exercise) {
    return exercise.sets.map((set: WorkoutSet) => set._id);
  }
  
  return [];
}
