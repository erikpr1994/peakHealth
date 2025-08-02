import { describe, it, expect, vi, beforeEach } from 'vitest';

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

describe('Exercise Service Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Complete Exercise Flow', () => {
    it('should handle complete exercise retrieval flow', async () => {
      // Mock data
      const mockExercises = [
        {
          id: '1',
          name: 'Push-up',
          category: 'strength',
          description: 'A basic push-up',
        },
      ];
      const mockVariants = [
        {
          id: '1',
          exercise_id: '1',
          name: 'Standard Push-up',
          difficulty: 'beginner',
        },
      ];
      const mockSteps = [
        {
          id: '1',
          exercise_variant_id: '1',
          step_order: 1,
          instruction: 'Start in plank position',
        },
      ];
      const mockTips = [
        { id: '1', exercise_variant_id: '1', tip: 'Keep your core tight' },
      ];
      const mockMedia = [
        { id: '1', exercise_variant_id: '1', url: 'video.mp4', type: 'video' },
      ];

      const mockTransformedVariants = [
        { id: '1', name: 'Standard Push-up', steps: [] },
      ];
      const mockTransformedExercise = {
        id: '1',
        name: 'Push-up',
        variants: mockTransformedVariants,
      };

      // Setup mocks
      mockDatabaseQueries.fetchExercisesWithRelatedData.mockResolvedValue({
        exercises: mockExercises,
        variants: mockVariants,
        steps: mockSteps,
        tips: mockTips,
        media: mockMedia,
      });
      mockDataAggregators.aggregateExerciseData.mockReturnValue([
        mockTransformedExercise,
      ]);

      // Execute
      const result = await exerciseService.getAllExercises();

      // Verify
      expect(
        mockDatabaseQueries.fetchExercisesWithRelatedData
      ).toHaveBeenCalledOnce();
      expect(mockDataAggregators.aggregateExerciseData).toHaveBeenCalledWith(
        mockExercises,
        mockVariants,
        mockSteps,
        mockTips,
        mockMedia
      );
      expect(result).toEqual([mockTransformedExercise]);
    });

    it('should handle exercise search flow with filters', async () => {
      // Mock data
      const searchParams = {
        searchTerm: 'push',
        category: 'strength' as const,
        difficulty: 'beginner' as const,
        equipment: 'bodyweight' as const,
        muscleGroup: 'chest' as const,
      };

      const mockJoinedExercises = [
        {
          id: '1',
          name: 'Push-up',
          exercise_variants: [
            {
              id: '1',
              name: 'Standard Push-up',
              difficulty: 'beginner',
              equipment: ['bodyweight'],
              muscle_groups: ['chest'],
              exercise_instruction_steps: [],
              exercise_tips: [],
              exercise_media: [],
            },
          ],
        },
      ];

      const mockTransformedExercise = {
        id: '1',
        name: 'Push-up',
        variants: [{ id: '1', name: 'Standard Push-up', steps: [] }],
      };

      // Setup mocks
      mockValidators.validateSearchParams.mockReturnValue(true);
      mockDatabaseQueries.searchExercisesWithJoins.mockResolvedValue(
        mockJoinedExercises
      );
      mockDataAggregators.transformJoinedExerciseData.mockReturnValue([
        mockTransformedExercise,
      ]);

      // Execute
      const result = await exerciseService.searchExercises(searchParams);

      // Verify
      expect(mockValidators.validateSearchParams).toHaveBeenCalledWith(
        searchParams
      );
      expect(mockDatabaseQueries.searchExercisesWithJoins).toHaveBeenCalledWith(
        searchParams.searchTerm,
        searchParams.category
      );
      expect(
        mockDataAggregators.transformJoinedExerciseData
      ).toHaveBeenCalledWith(mockJoinedExercises, {
        difficulty: searchParams.difficulty,
        equipment: searchParams.equipment,
        muscleGroup: searchParams.muscleGroup,
      });
      expect(result).toEqual([mockTransformedExercise]);
    });

    it('should handle favorites flow', async () => {
      // Mock data
      const userId = 'user-1';
      const exerciseId = '1';

      const mockFavorites = [
        {
          exercise_id: '1',
          exercises: {
            id: '1',
            name: 'Push-up',
            exercise_variants: [
              {
                id: '1',
                name: 'Standard Push-up',
                exercise_instruction_steps: [],
                exercise_tips: [],
                exercise_media: [],
              },
            ],
          },
        },
      ];

      const mockTransformedExercise = {
        id: '1',
        name: 'Push-up',
        variants: [{ id: '1', name: 'Standard Push-up', steps: [] }],
        isFavorite: true,
      };

      // Setup mocks
      mockValidators.validateUserId.mockReturnValue(true);
      mockDatabaseQueries.fetchUserFavorites.mockResolvedValue(mockFavorites);
      mockDataAggregators.transformUserFavoritesData.mockReturnValue([
        mockTransformedExercise,
      ]);

      // Execute
      const result = await exerciseService.getUserFavoriteExercises(userId);

      // Verify
      expect(mockValidators.validateUserId).toHaveBeenCalledWith(userId);
      expect(mockDatabaseQueries.fetchUserFavorites).toHaveBeenCalledWith(
        userId
      );
      expect(
        mockDataAggregators.transformUserFavoritesData
      ).toHaveBeenCalledWith(mockFavorites);
      expect(result).toEqual([mockTransformedExercise]);
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle database errors throughout the flow', async () => {
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

    it('should handle validation errors throughout the flow', async () => {
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

    it('should handle not found errors', async () => {
      const exerciseId = '1';
      const mockData = {
        exercise: null,
        variants: [],
        steps: [],
        tips: [],
        media: [],
      };

      mockValidators.validateExerciseId.mockReturnValue(true);
      mockDatabaseQueries.fetchExerciseWithRelatedData.mockResolvedValue(
        mockData
      );
      mockErrorHandlers.handleNotFoundError.mockImplementation(() => {
        throw new Error('Exercise with ID 1 not found');
      });

      await expect(exerciseService.getExerciseById(exerciseId)).rejects.toThrow(
        'Exercise with ID 1 not found'
      );
      expect(mockErrorHandlers.handleNotFoundError).toHaveBeenCalledWith(
        'Exercise',
        exerciseId
      );
    });
  });

  describe('Data Transformation Integration', () => {
    it('should properly transform complex exercise data', async () => {
      // Mock complex data structure
      const exercises = [
        {
          id: '1',
          name: 'Push-up',
          category: 'strength',
          description: 'A basic push-up',
        },
        {
          id: '2',
          name: 'Squat',
          category: 'strength',
          description: 'A basic squat',
        },
      ];
      const variants = [
        {
          id: '1',
          exercise_id: '1',
          name: 'Standard Push-up',
          difficulty: 'beginner',
        },
        {
          id: '2',
          exercise_id: '1',
          name: 'Diamond Push-up',
          difficulty: 'intermediate',
        },
        {
          id: '3',
          exercise_id: '2',
          name: 'Bodyweight Squat',
          difficulty: 'beginner',
        },
      ];
      const steps = [
        {
          id: '1',
          exercise_variant_id: '1',
          step_order: 1,
          instruction: 'Start in plank position',
        },
        {
          id: '2',
          exercise_variant_id: '1',
          step_order: 2,
          instruction: 'Lower your body',
        },
        {
          id: '3',
          exercise_variant_id: '2',
          step_order: 1,
          instruction: 'Form diamond with hands',
        },
        {
          id: '4',
          exercise_variant_id: '3',
          step_order: 1,
          instruction: 'Stand with feet shoulder-width apart',
        },
      ];
      const tips = [
        { id: '1', exercise_variant_id: '1', tip: 'Keep your core tight' },
        {
          id: '2',
          exercise_variant_id: '2',
          tip: 'Form a diamond with your hands',
        },
        { id: '3', exercise_variant_id: '3', tip: 'Keep your chest up' },
      ];
      const media = [
        {
          id: '1',
          exercise_variant_id: '1',
          url: 'pushup-video.mp4',
          type: 'video',
        },
        {
          id: '2',
          exercise_variant_id: '2',
          url: 'diamond-pushup-video.mp4',
          type: 'video',
        },
        {
          id: '3',
          exercise_variant_id: '3',
          url: 'squat-video.mp4',
          type: 'video',
        },
      ];

      const mockTransformedExercises = [
        {
          id: '1',
          name: 'Push-up',
          variants: [
            { id: '1', name: 'Standard Push-up', steps: [] },
            { id: '2', name: 'Diamond Push-up', steps: [] },
          ],
        },
        {
          id: '2',
          name: 'Squat',
          variants: [{ id: '3', name: 'Bodyweight Squat', steps: [] }],
        },
      ];

      // Setup mocks
      mockDatabaseQueries.fetchExercisesWithRelatedData.mockResolvedValue({
        exercises,
        variants,
        steps,
        tips,
        media,
      });
      mockDataAggregators.aggregateExerciseData.mockReturnValue(
        mockTransformedExercises
      );

      // Execute
      const result = await exerciseService.getAllExercises();

      // Verify
      expect(mockDataAggregators.aggregateExerciseData).toHaveBeenCalledWith(
        exercises,
        variants,
        steps,
        tips,
        media
      );
      expect(result).toEqual(mockTransformedExercises);
      expect(result).toHaveLength(2);
      expect(result[0].variants).toHaveLength(2);
      expect(result[1].variants).toHaveLength(1);
    });
  });

  describe('Search and Filter Integration', () => {
    it('should handle complex search criteria', async () => {
      const searchParams = {
        searchTerm: 'push',
        category: 'strength' as const,
        difficulty: 'beginner' as const,
        equipment: 'bodyweight' as const,
        muscleGroup: 'chest' as const,
      };

      const mockJoinedExercises = [
        {
          id: '1',
          name: 'Push-up',
          exercise_variants: [
            {
              id: '1',
              name: 'Standard Push-up',
              difficulty: 'beginner',
              equipment: ['bodyweight'],
              muscle_groups: ['chest'],
              exercise_instruction_steps: [],
              exercise_tips: [],
              exercise_media: [],
            },
            {
              id: '2',
              name: 'Diamond Push-up',
              difficulty: 'intermediate',
              equipment: ['bodyweight'],
              muscle_groups: ['chest', 'triceps'],
              exercise_instruction_steps: [],
              exercise_tips: [],
              exercise_media: [],
            },
          ],
        },
      ];

      const mockTransformedExercise = {
        id: '1',
        name: 'Push-up',
        variants: [{ id: '1', name: 'Standard Push-up', steps: [] }], // Only beginner variant
      };

      // Setup mocks
      mockValidators.validateSearchParams.mockReturnValue(true);
      mockDatabaseQueries.searchExercisesWithJoins.mockResolvedValue(
        mockJoinedExercises
      );
      mockDataAggregators.transformJoinedExerciseData.mockReturnValue([
        mockTransformedExercise,
      ]);

      // Execute
      const result = await exerciseService.searchExercises(searchParams);

      // Verify
      expect(
        mockDataAggregators.transformJoinedExerciseData
      ).toHaveBeenCalledWith(mockJoinedExercises, {
        difficulty: 'beginner',
        equipment: 'bodyweight',
        muscleGroup: 'chest',
      });
      expect(result).toEqual([mockTransformedExercise]);
      // Should only include the beginner variant due to filtering
      expect(result[0].variants).toHaveLength(1);
    });
  });
});
