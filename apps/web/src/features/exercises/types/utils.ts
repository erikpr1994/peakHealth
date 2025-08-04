/**
 * Utility types for exercise operations
 */

import type { Exercise, ExerciseVariant } from './exercise';

// Partial types for updates
export type ExerciseUpdate = Partial<Omit<Exercise, 'id' | 'variants'>>;
export type ExerciseVariantUpdate = Partial<Omit<ExerciseVariant, 'id'>>;

// Readonly types for immutable data
export type ReadonlyExercise = Readonly<Exercise>;
export type ReadonlyExerciseVariant = Readonly<ExerciseVariant>;

// Exercise summary (minimal data for lists)
export type ExerciseSummary = Pick<
  Exercise,
  | 'id'
  | 'name'
  | 'category'
  | 'description'
  | 'isPopular'
  | 'isNew'
  | 'rating'
  | 'icon'
  | 'iconColor'
>;

// Variant summary (minimal data for variant lists)
export type ExerciseVariantSummary = Pick<
  ExerciseVariant,
  'id' | 'name' | 'description' | 'difficulty' | 'equipment' | 'muscleGroups'
>;

// Exercise with selected variant (for display)
export interface ExerciseWithVariant {
  exercise: Exercise;
  selectedVariant: ExerciseVariant;
}

// Exercise creation data (without generated fields)
export type ExerciseCreateData = Omit<
  Exercise,
  'id' | 'created_at' | 'updated_at'
>;
export type ExerciseVariantCreateData = Omit<ExerciseVariant, 'id'>;

// Exercise search result
export interface ExerciseSearchResult {
  exercise: ExerciseSummary;
  matchedVariants: ExerciseVariantSummary[];
  relevanceScore: number;
}

// Exercise validation result
export interface ExerciseValidationResult {
  isValid: boolean;
  errors: Array<{
    field: string;
    message: string;
  }>;
  warnings: Array<{
    field: string;
    message: string;
  }>;
}

// Type for exercise filtering functions
export type ExerciseFilter = (exercise: Exercise) => boolean;
export type ExerciseVariantFilter = (variant: ExerciseVariant) => boolean;

// Type for exercise sorting functions
export type ExerciseSorter = (a: Exercise, b: Exercise) => number;
export type ExerciseVariantSorter = (
  a: ExerciseVariant,
  b: ExerciseVariant
) => number;
