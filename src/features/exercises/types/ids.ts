/**
 * Branded ID types for type safety
 */

// Exercise-related IDs
export type ExerciseId = string & { readonly __brand: 'ExerciseId' };
export type ExerciseVariantId = string & {
  readonly __brand: 'ExerciseVariantId';
};
export type RoutineId = string & { readonly __brand: 'RoutineId' };

// Utility functions to create branded IDs
export const createExerciseId = (id: string): ExerciseId => id as ExerciseId;
export const createExerciseVariantId = (id: string): ExerciseVariantId =>
  id as ExerciseVariantId;
export const createRoutineId = (id: string): RoutineId => id as RoutineId;

// Type guards
export const isExerciseId = (id: string): id is ExerciseId => {
  return typeof id === 'string' && id.length > 0;
};

export const isExerciseVariantId = (id: string): id is ExerciseVariantId => {
  return typeof id === 'string' && id.length > 0;
};

export const isRoutineId = (id: string): id is RoutineId => {
  return typeof id === 'string' && id.length > 0;
};
