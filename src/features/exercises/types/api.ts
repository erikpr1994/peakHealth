/**
 * API types for exercise services
 */

import type { Category, Difficulty, Equipment, MuscleGroup } from './constants';
import type { Exercise, ExerciseVariant } from './exercise';
import type { ExerciseId, ExerciseVariantId } from './ids';

// Search and filter parameters
export interface ExerciseSearchParams {
  query?: string;
  category?: Category[];
  equipment?: Equipment[];
  targetMuscles?: MuscleGroup[];
  difficulty?: Difficulty[];
  tags?: string[];
  featured?: boolean;
}

// Pagination parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

// Sort parameters
export interface ExerciseSortParams {
  sortBy?: 'name' | 'difficulty' | 'featured' | 'popularity' | 'created_at';
  sortOrder?: 'asc' | 'desc';
}

// Combined query parameters
export interface ExerciseQueryParams
  extends ExerciseSearchParams,
    PaginationParams,
    ExerciseSortParams {}

// API response types
export interface ExerciseListResponse {
  exercises: Exercise[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ExerciseResponse {
  exercise: Exercise;
}

export interface ExerciseVariantResponse {
  variant: ExerciseVariant;
  exercise: Pick<Exercise, 'id' | 'name' | 'category'>;
}

// Error response
export interface ExerciseApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Request types for creating/updating exercises
export interface CreateExerciseRequest {
  exercise: Omit<Exercise, 'id' | 'created_at' | 'updated_at'>;
}

export interface UpdateExerciseRequest {
  exerciseId: ExerciseId;
  updates: Partial<Omit<Exercise, 'id'>>;
}

export interface CreateVariantRequest {
  exerciseId: ExerciseId;
  variant: Omit<ExerciseVariant, 'id'>;
}

export interface UpdateVariantRequest {
  variantId: ExerciseVariantId;
  updates: Partial<Omit<ExerciseVariant, 'id'>>;
}
