import { describe, it, expect, vi, beforeEach } from 'vitest';

import {
  CATEGORY,
  DIFFICULTY,
  EQUIPMENT,
  MUSCLE_GROUP,
} from '../../types/constants';
import { createExerciseId, createExerciseVariantId } from '../../types/ids';
import { exerciseDataAggregators } from '../dataAggregators';
import { exerciseDatabaseQueries } from '../databaseQueries';
import { exerciseErrorHandlers } from '../errorHandlers';
import { exerciseService } from '../exerciseService';
import { exerciseValidators } from '../validators';

// Mock all dependencies
vi.mock('../databaseQueries');
vi.mock('../dataAggregators');
vi.mock('../errorHandlers');
vi.mock('../validators');

const mockDatabaseQueries = vi.mocked(exerciseDatabaseQueries);
const mockDataAggregators = vi.mocked(exerciseDataAggregators);
const mockErrorHandlers = vi.mocked(exerciseErrorHandlers);
const mockValidators = vi.mocked(exerciseValidators);

describe('ExerciseService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllExercises', () => {
    it('should return all exercises successfully', async () => {
      const mockData = {
        exercises: [
          {
            id: '1',
            name: 'Push-up',
            category: 'Strength',
            description: 'A classic bodyweight exercise',
            icon: 'dumbbell',
            icon_color: 'blue',
            is_popular: false,
            is_new: false,
            rating: 4.5,
            tags: [],
            related_exercise_ids: [],
            created_at: '2023-01-01',
            updated_at: '2023-01-01',
          },
        ],
        variants: [
          {
            id: '1',
            exercise_id: '1',
            name: 'Standard Push-up',
            description: 'A standard push-up',
            focus: 'strength',
            difficulty: 'beginner',
            equipment: ['bodyweight'],
            muscle_groups: ['chest'],
            secondary_muscles: ['triceps'],
            is_unilateral: false,
            instructions: ['Perform a standard push-up'],
            created_at: '2023-01-01',
            updated_at: '2023-01-01',
          },
        ],
        steps: [
          {
            id: '1',
            exercise_variant_id: '1',
            step_order: 1,
            title: 'Start Position',
            description: 'Get into plank position',
            created_at: '2023-01-01',
          },
        ],
        tips: [
          {
            id: '1',
            exercise_variant_id: '1',
            pro_tips: ['Keep your core tight'],
            common_mistakes: ['Letting your hips sag'],
            safety_notes: ['Maintain proper form'],
            created_at: '2023-01-01',
            updated_at: '2023-01-01',
          },
        ],
        media: [
          {
            id: '1',
            exercise_variant_id: '1',
            images: ['image1.jpg'],
            videos: ['video.mp4'],
            featured_image: 'featured.jpg',
            featured_video: 'video.mp4',
            created_at: '2023-01-01',
            updated_at: '2023-01-01',
          },
        ],
      };

      const expectedExercises = [
        {
          id: createExerciseId('1'),
          name: 'Push-up',
          category: CATEGORY.STRENGTH,
          description: 'A classic bodyweight exercise',
          variants: [],
          mainVariantId: createExerciseVariantId('1'),
          icon: 'dumbbell',
          iconColor: 'blue',
          isFavorite: false,
          isPopular: false,
          isNew: false,
          rating: 4.5,
          tags: [],
          relatedExercises: [],
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      mockDatabaseQueries.fetchExercisesWithRelatedData.mockResolvedValue(
        mockData
      );
      mockDataAggregators.aggregateExerciseData.mockReturnValue(
        expectedExercises
      );

      const result = await exerciseService.getAllExercises();

      expect(
        mockDatabaseQueries.fetchExercisesWithRelatedData
      ).toHaveBeenCalledOnce();
      expect(mockDataAggregators.aggregateExerciseData).toHaveBeenCalledWith(
        mockData.exercises,
        mockData.variants,
        mockData.steps,
        mockData.tips,
        mockData.media
      );
      expect(result).toEqual(expectedExercises);
    });

    it('should handle database errors', async () => {
      const error = new Error('Database connection failed');
      mockDatabaseQueries.fetchExercisesWithRelatedData.mockRejectedValue(
        error
      );
      mockErrorHandlers.handleDatabaseError.mockImplementation(() => {
        throw new Error('Failed to fetch exercises');
      });

      await expect(exerciseService.getAllExercises()).rejects.toThrow(
        'Failed to fetch exercises'
      );
      expect(mockErrorHandlers.handleDatabaseError).toHaveBeenCalledWith(
        error,
        'fetch exercises'
      );
    });
  });

  describe('getExerciseById', () => {
    it('should return exercise by ID successfully', async () => {
      const exerciseId = '1';
      const mockData = {
        exercise: {
          id: '1',
          name: 'Push-up',
          category: 'Strength',
          description: 'A classic bodyweight exercise',
          icon: 'dumbbell',
          icon_color: 'blue',
          is_popular: false,
          is_new: false,
          rating: 4.5,
          tags: [],
          related_exercise_ids: [],
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
        variants: [
          {
            id: '1',
            exercise_id: '1',
            name: 'Standard Push-up',
            description: 'A standard push-up',
            focus: 'strength',
            difficulty: 'beginner',
            equipment: ['bodyweight'],
            muscle_groups: ['chest'],
            secondary_muscles: ['triceps'],
            is_unilateral: false,
            instructions: ['Perform a standard push-up'],
            created_at: '2023-01-01',
            updated_at: '2023-01-01',
          },
        ],
        steps: [
          {
            id: '1',
            exercise_variant_id: '1',
            step_order: 1,
            title: 'Start Position',
            description: 'Get into plank position',
            created_at: '2023-01-01',
          },
        ],
        tips: [
          {
            id: '1',
            exercise_variant_id: '1',
            pro_tips: ['Keep your core tight'],
            common_mistakes: ['Letting your hips sag'],
            safety_notes: ['Maintain proper form'],
            created_at: '2023-01-01',
            updated_at: '2023-01-01',
          },
        ],
        media: [
          {
            id: '1',
            exercise_variant_id: '1',
            images: ['image1.jpg'],
            videos: ['video.mp4'],
            featured_image: 'featured.jpg',
            featured_video: 'video.mp4',
            created_at: '2023-01-01',
            updated_at: '2023-01-01',
          },
        ],
      };

      const expectedExercise = {
        id: createExerciseId('1'),
        name: 'Push-up',
        category: CATEGORY.STRENGTH,
        description: 'A classic bodyweight exercise',
        variants: [],
        mainVariantId: createExerciseVariantId('1'),
        icon: 'dumbbell',
        iconColor: 'blue',
        isFavorite: false,
        isPopular: false,
        isNew: false,
        rating: 4.5,
        tags: [],
        relatedExercises: [],
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockValidators.validateExerciseId.mockReturnValue(true);
      mockDatabaseQueries.fetchExerciseWithRelatedData.mockResolvedValue(
        mockData
      );
      mockDataAggregators.aggregateExerciseData.mockReturnValue([
        expectedExercise,
      ]);

      const result = await exerciseService.getExerciseById(exerciseId);

      expect(mockValidators.validateExerciseId).toHaveBeenCalledWith(
        exerciseId
      );
      expect(
        mockDatabaseQueries.fetchExerciseWithRelatedData
      ).toHaveBeenCalledWith(exerciseId);
      expect(mockDataAggregators.aggregateExerciseData).toHaveBeenCalledWith(
        [mockData.exercise],
        mockData.variants,
        mockData.steps,
        mockData.tips,
        mockData.media
      );
      expect(result).toEqual(expectedExercise);
    });

    it('should handle invalid exercise ID', async () => {
      const exerciseId = 'invalid-id';
      mockValidators.validateExerciseId.mockReturnValue(false);
      mockErrorHandlers.handleValidationError.mockImplementation(() => {
        throw new Error('Invalid exercise ID');
      });

      await expect(exerciseService.getExerciseById(exerciseId)).rejects.toThrow(
        'Invalid exercise ID'
      );
      expect(mockErrorHandlers.handleValidationError).toHaveBeenCalledWith(
        'Invalid exercise ID'
      );
    });

    it('should handle exercise not found', async () => {
      const exerciseId = '1';

      mockValidators.validateExerciseId.mockReturnValue(true);
      mockDatabaseQueries.fetchExerciseWithRelatedData.mockRejectedValue(
        new Error('Exercise not found')
      );
      mockErrorHandlers.handleDatabaseError.mockImplementation(() => {
        throw new Error('Failed to fetch exercise');
      });

      await expect(exerciseService.getExerciseById(exerciseId)).rejects.toThrow(
        'Failed to fetch exercise'
      );
      expect(mockErrorHandlers.handleDatabaseError).toHaveBeenCalledWith(
        expect.any(Error),
        'fetch exercise'
      );
    });
  });

  describe('searchExercises', () => {
    it('should search exercises successfully', async () => {
      const searchParams = {
        searchTerm: 'push',
        category: CATEGORY.STRENGTH,
        difficulties: [DIFFICULTY.BEGINNER],
        equipment: [EQUIPMENT.BODYWEIGHT],
        muscleGroups: [MUSCLE_GROUP.CHEST],
      };

      const mockExercises = [
        { id: '1', name: 'Push-up', exercise_variants: [] },
      ];
      const expectedExercises = [
        {
          id: createExerciseId('1'),
          name: 'Push-up',
          category: CATEGORY.STRENGTH,
          description: 'A classic bodyweight exercise',
          variants: [],
          mainVariantId: createExerciseVariantId('1'),
          icon: 'dumbbell',
          iconColor: 'blue',
          isFavorite: false,
          isPopular: false,
          isNew: false,
          rating: 4.5,
          tags: [],
          relatedExercises: [],
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      mockValidators.validateSearchParams.mockReturnValue(true);
      mockDatabaseQueries.searchExercisesWithJoins.mockResolvedValue(
        mockExercises
      );
      mockDataAggregators.transformJoinedExerciseData.mockReturnValue(
        expectedExercises
      );

      const result = await exerciseService.searchExercises(searchParams);

      expect(mockValidators.validateSearchParams).toHaveBeenCalledWith(
        searchParams
      );
      expect(mockDatabaseQueries.searchExercisesWithJoins).toHaveBeenCalledWith(
        searchParams.searchTerm,
        searchParams.category
      );
      expect(
        mockDataAggregators.transformJoinedExerciseData
      ).toHaveBeenCalledWith(mockExercises, {
        difficulties: searchParams.difficulties,
        equipment: searchParams.equipment,
        muscleGroups: searchParams.muscleGroups,
      });
      expect(result).toEqual(expectedExercises);
    });

    it('should handle invalid search parameters', async () => {
      const searchParams = { searchTerm: 'push' };
      mockValidators.validateSearchParams.mockReturnValue(false);
      mockErrorHandlers.handleValidationError.mockImplementation(() => {
        throw new Error('Invalid search parameters');
      });

      await expect(
        exerciseService.searchExercises(searchParams)
      ).rejects.toThrow('Invalid search parameters');
      expect(mockErrorHandlers.handleValidationError).toHaveBeenCalledWith(
        'Invalid search parameters'
      );
    });
  });

  describe('getUserFavoriteExercises', () => {
    it('should return user favorites successfully', async () => {
      const userId = 'user-1';
      const mockFavorites = [
        { exercise_id: '1', exercises: { id: '1', name: 'Push-up' } },
      ];
      const expectedExercises = [
        {
          id: createExerciseId('1'),
          name: 'Push-up',
          category: CATEGORY.STRENGTH,
          description: 'A classic bodyweight exercise',
          variants: [],
          mainVariantId: createExerciseVariantId('1'),
          icon: 'dumbbell',
          iconColor: 'blue',
          isFavorite: true,
          isPopular: false,
          isNew: false,
          rating: 4.5,
          tags: [],
          relatedExercises: [],
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      mockValidators.validateUserId.mockReturnValue(true);
      mockDatabaseQueries.fetchUserFavorites.mockResolvedValue(mockFavorites);
      mockDataAggregators.transformUserFavoritesData.mockReturnValue(
        expectedExercises
      );

      const result = await exerciseService.getUserFavoriteExercises(userId);

      expect(mockValidators.validateUserId).toHaveBeenCalledWith(userId);
      expect(mockDatabaseQueries.fetchUserFavorites).toHaveBeenCalledWith(
        userId
      );
      expect(
        mockDataAggregators.transformUserFavoritesData
      ).toHaveBeenCalledWith(mockFavorites);
      expect(result).toEqual(expectedExercises);
    });

    it('should handle invalid user ID', async () => {
      const userId = '';
      mockValidators.validateUserId.mockReturnValue(false);
      mockErrorHandlers.handleValidationError.mockImplementation(() => {
        throw new Error('Invalid user ID');
      });

      await expect(
        exerciseService.getUserFavoriteExercises(userId)
      ).rejects.toThrow('Invalid user ID');
      expect(mockErrorHandlers.handleValidationError).toHaveBeenCalledWith(
        'Invalid user ID'
      );
    });
  });

  describe('addToFavorites', () => {
    it('should add exercise to favorites successfully', async () => {
      const userId = 'user-1';
      const exerciseId = '1';

      mockValidators.validateUserId.mockReturnValue(true);
      mockValidators.validateExerciseId.mockReturnValue(true);
      mockDatabaseQueries.addToFavorites.mockResolvedValue();

      await exerciseService.addToFavorites(userId, exerciseId);

      expect(mockValidators.validateUserId).toHaveBeenCalledWith(userId);
      expect(mockValidators.validateExerciseId).toHaveBeenCalledWith(
        exerciseId
      );
      expect(mockDatabaseQueries.addToFavorites).toHaveBeenCalledWith(
        userId,
        exerciseId
      );
    });

    it('should handle validation errors', async () => {
      const userId = '';
      const exerciseId = '1';

      mockValidators.validateUserId.mockReturnValue(false);
      mockErrorHandlers.handleValidationError.mockImplementation(() => {
        throw new Error('Invalid user ID');
      });

      await expect(
        exerciseService.addToFavorites(userId, exerciseId)
      ).rejects.toThrow('Invalid user ID');
      expect(mockErrorHandlers.handleValidationError).toHaveBeenCalledWith(
        'Invalid user ID'
      );
    });
  });

  describe('removeFromFavorites', () => {
    it('should remove exercise from favorites successfully', async () => {
      const userId = 'user-1';
      const exerciseId = '1';

      mockValidators.validateUserId.mockReturnValue(true);
      mockValidators.validateExerciseId.mockReturnValue(true);
      mockDatabaseQueries.removeFromFavorites.mockResolvedValue();

      await exerciseService.removeFromFavorites(userId, exerciseId);

      expect(mockValidators.validateUserId).toHaveBeenCalledWith(userId);
      expect(mockValidators.validateExerciseId).toHaveBeenCalledWith(
        exerciseId
      );
      expect(mockDatabaseQueries.removeFromFavorites).toHaveBeenCalledWith(
        userId,
        exerciseId
      );
    });

    it('should handle validation errors', async () => {
      const userId = 'user-1';
      const exerciseId = '';

      mockValidators.validateUserId.mockReturnValue(true);
      mockValidators.validateExerciseId.mockReturnValue(false);
      mockErrorHandlers.handleValidationError.mockImplementation(() => {
        throw new Error('Invalid exercise ID');
      });

      await expect(
        exerciseService.removeFromFavorites(userId, exerciseId)
      ).rejects.toThrow('Invalid exercise ID');
      expect(mockErrorHandlers.handleValidationError).toHaveBeenCalledWith(
        'Invalid exercise ID'
      );
    });
  });
});
