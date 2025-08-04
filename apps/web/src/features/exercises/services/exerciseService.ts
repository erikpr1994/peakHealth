import type { Exercise } from '../types';
import type {
  Category,
  Difficulty,
  Equipment,
  MuscleGroup,
} from '../types/constants';

import { exerciseDataAggregators } from './dataAggregators';
import { exerciseDatabaseQueries } from './databaseQueries';
import { exerciseErrorHandlers } from './errorHandlers';
import { exerciseValidators } from './validators';

export class ExerciseService {
  /**
   * Get all exercises with their variants
   */
  async getAllExercises(): Promise<Exercise[]> {
    try {
      const { exercises, variants, steps, tips, media } =
        await exerciseDatabaseQueries.fetchExercisesWithRelatedData();

      return exerciseDataAggregators.aggregateExerciseData(
        exercises,
        variants,
        steps,
        tips,
        media
      );
    } catch (error) {
      return exerciseErrorHandlers.handleDatabaseError(
        error,
        'fetch exercises'
      );
    }
  }

  /**
   * Get a single exercise by ID with all its variants
   */
  async getExerciseById(exerciseId: string): Promise<Exercise | null> {
    if (!exerciseValidators.validateExerciseId(exerciseId)) {
      exerciseErrorHandlers.handleValidationError('Invalid exercise ID');
      return null; // This line will never be reached, but satisfies TypeScript
    }

    try {
      const { exercise, variants, steps, tips, media } =
        await exerciseDatabaseQueries.fetchExerciseWithRelatedData(exerciseId);

      if (!exercise) {
        exerciseErrorHandlers.handleNotFoundError('Exercise', exerciseId);
        return null; // This line will never be reached, but satisfies TypeScript
      }

      const exercises = exerciseDataAggregators.aggregateExerciseData(
        [exercise],
        variants,
        steps,
        tips,
        media
      );

      return exercises[0] || null;
    } catch (error) {
      exerciseErrorHandlers.handleDatabaseError(error, 'fetch exercise');
      return null; // This line will never be reached, but satisfies TypeScript
    }
  }

  /**
   * Search exercises by various criteria
   */
  async searchExercises(params: {
    searchTerm?: string;
    category?: Category;
    difficulties?: Difficulty[];
    equipment?: Equipment[];
    muscleGroups?: MuscleGroup[];
  }): Promise<Exercise[]> {
    if (!exerciseValidators.validateSearchParams(params)) {
      exerciseErrorHandlers.handleValidationError('Invalid search parameters');
      return []; // This line will never be reached, but satisfies TypeScript
    }

    try {
      const exercises = await exerciseDatabaseQueries.searchExercisesWithJoins(
        params.searchTerm,
        params.category
      );

      const criteria = {
        difficulties: params.difficulties,
        equipment: params.equipment,
        muscleGroups: params.muscleGroups,
      };

      return exerciseDataAggregators.transformJoinedExerciseData(
        exercises,
        criteria
      );
    } catch (error) {
      exerciseErrorHandlers.handleDatabaseError(error, 'search exercises');
      return []; // This line will never be reached, but satisfies TypeScript
    }
  }

  /**
   * Get user's favorite exercises
   */
  async getUserFavoriteExercises(userId: string): Promise<Exercise[]> {
    if (!exerciseValidators.validateUserId(userId)) {
      exerciseErrorHandlers.handleValidationError('Invalid user ID');
      return []; // This line will never be reached, but satisfies TypeScript
    }

    try {
      const favorites =
        await exerciseDatabaseQueries.fetchUserFavorites(userId);
      return exerciseDataAggregators.transformUserFavoritesData(favorites);
    } catch (error) {
      exerciseErrorHandlers.handleDatabaseError(error, 'fetch user favorites');
      return []; // This line will never be reached, but satisfies TypeScript
    }
  }

  /**
   * Add exercise to user favorites
   */
  async addToFavorites(userId: string, exerciseId: string): Promise<void> {
    if (!exerciseValidators.validateUserId(userId)) {
      exerciseErrorHandlers.handleValidationError('Invalid user ID');
      return; // This line will never be reached, but satisfies TypeScript
    }

    if (!exerciseValidators.validateExerciseId(exerciseId)) {
      exerciseErrorHandlers.handleValidationError('Invalid exercise ID');
      return; // This line will never be reached, but satisfies TypeScript
    }

    try {
      await exerciseDatabaseQueries.addToFavorites(userId, exerciseId);
    } catch (error) {
      exerciseErrorHandlers.handleDatabaseError(error, 'add to favorites');
    }
  }

  /**
   * Remove exercise from user favorites
   */
  async removeFromFavorites(userId: string, exerciseId: string): Promise<void> {
    if (!exerciseValidators.validateUserId(userId)) {
      exerciseErrorHandlers.handleValidationError('Invalid user ID');
      return; // This line will never be reached, but satisfies TypeScript
    }

    if (!exerciseValidators.validateExerciseId(exerciseId)) {
      exerciseErrorHandlers.handleValidationError('Invalid exercise ID');
      return; // This line will never be reached, but satisfies TypeScript
    }

    try {
      await exerciseDatabaseQueries.removeFromFavorites(userId, exerciseId);
    } catch (error) {
      exerciseErrorHandlers.handleDatabaseError(error, 'remove from favorites');
    }
  }
}

// Export a singleton instance
export const exerciseService = new ExerciseService();
