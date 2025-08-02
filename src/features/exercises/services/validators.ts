import type { DatabaseExercise } from '../types/database';

export class ExerciseValidators {
  /**
   * Validate exercise data structure
   */
  validateExerciseData(data: unknown): data is DatabaseExercise {
    if (!data || typeof data !== 'object') {
      return false;
    }

    const exercise = data as Record<string, unknown>;

    return (
      typeof exercise.id === 'string' &&
      typeof exercise.name === 'string' &&
      typeof exercise.category === 'string' &&
      typeof exercise.description === 'string'
    );
  }

  /**
   * Validate exercise array data
   */
  validateExerciseArray(data: unknown): data is DatabaseExercise[] {
    if (!Array.isArray(data)) {
      return false;
    }

    return data.every(exercise => this.validateExerciseData(exercise));
  }

  /**
   * Validate favorite data structure
   */
  validateFavoriteData(data: unknown): boolean {
    if (!data || typeof data !== 'object') {
      return false;
    }

    const favorite = data as Record<string, unknown>;

    return Boolean(
      typeof favorite.exercise_id === 'string' &&
        favorite.exercises &&
        typeof favorite.exercises === 'object' &&
        !Array.isArray(favorite.exercises)
    );
  }

  /**
   * Validate search parameters
   */
  validateSearchParams(params: {
    searchTerm?: string;
    category?: string;
    difficulty?: string;
    equipment?: string;
    muscleGroup?: string;
  }): boolean {
    // All parameters are optional, so any combination is valid
    // You can add more specific validation rules here if needed
    return true;
  }

  /**
   * Validate user ID
   */
  validateUserId(userId: string): boolean {
    return typeof userId === 'string' && userId.length > 0;
  }

  /**
   * Validate exercise ID
   */
  validateExerciseId(exerciseId: string): boolean {
    return typeof exerciseId === 'string' && exerciseId.length > 0;
  }
}

// Export a singleton instance
export const exerciseValidators = new ExerciseValidators();
