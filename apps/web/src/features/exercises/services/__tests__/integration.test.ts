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
          category: 'Strength',
          description: 'A basic push-up',
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
      ];
      const mockVariants = [
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
      ];
      const mockSteps = [
        {
          id: '1',
          exercise_variant_id: '1',
          step_order: 1,
          title: 'Start Position',
          description: 'Start in plank position',
          created_at: '2023-01-01',
        },
      ];
      const mockTips = [
        {
          id: '1',
          exercise_variant_id: '1',
          pro_tips: ['Keep your core tight'],
          common_mistakes: ['Letting your hips sag'],
          safety_notes: ['Maintain proper form'],
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
      ];
      const mockMedia = [
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
      ];

      const mockTransformedVariants = [
        {
          id: createExerciseVariantId('1'),
          name: 'Standard Push-up',
          description: 'A standard push-up',
          focus: 'strength',
          difficulty: DIFFICULTY.BEGINNER,
          equipment: [EQUIPMENT.BODYWEIGHT],
          muscleGroups: [MUSCLE_GROUP.CHEST],
          secondaryMuscles: [MUSCLE_GROUP.TRICEPS],
          isUnilateral: false,
          instructions: ['Perform a standard push-up'],
          steps: [],
          tips: undefined,
          media: undefined,
          prerequisites: undefined,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      const mockTransformedExercise = {
        id: createExerciseId('1'),
        name: 'Push-up',
        category: CATEGORY.STRENGTH,
        description: 'A basic push-up',
        variants: mockTransformedVariants,
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
        category: CATEGORY.STRENGTH,
        difficulties: [DIFFICULTY.BEGINNER],
        equipment: [EQUIPMENT.BODYWEIGHT],
        muscleGroups: [MUSCLE_GROUP.CHEST],
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
        id: createExerciseId('1'),
        name: 'Push-up',
        category: CATEGORY.STRENGTH,
        description: 'A basic push-up',
        variants: [
          {
            id: createExerciseVariantId('1'),
            name: 'Standard Push-up',
            description: 'A standard push-up',
            focus: 'strength',
            difficulty: DIFFICULTY.BEGINNER,
            equipment: [EQUIPMENT.BODYWEIGHT],
            muscleGroups: [MUSCLE_GROUP.CHEST],
            secondaryMuscles: [MUSCLE_GROUP.TRICEPS],
            isUnilateral: false,
            instructions: ['Perform a standard push-up'],
            steps: [],
            tips: undefined,
            media: undefined,
            prerequisites: undefined,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
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
        difficulties: searchParams.difficulties,
        equipment: searchParams.equipment,
        muscleGroups: searchParams.muscleGroups,
      });
      expect(result).toEqual([mockTransformedExercise]);
    });

    it('should handle favorites flow', async () => {
      // Mock data
      const userId = 'user-1';

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
        id: createExerciseId('1'),
        name: 'Push-up',
        category: CATEGORY.STRENGTH,
        description: 'A basic push-up',
        variants: [
          {
            id: createExerciseVariantId('1'),
            name: 'Standard Push-up',
            description: 'A standard push-up',
            focus: 'strength',
            difficulty: DIFFICULTY.BEGINNER,
            equipment: [EQUIPMENT.BODYWEIGHT],
            muscleGroups: [MUSCLE_GROUP.CHEST],
            secondaryMuscles: [MUSCLE_GROUP.TRICEPS],
            isUnilateral: false,
            instructions: ['Perform a standard push-up'],
            steps: [],
            tips: undefined,
            media: undefined,
            prerequisites: undefined,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
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

  describe('Data Transformation Integration', () => {
    it('should properly transform complex exercise data', async () => {
      // Mock complex data structure
      const exercises = [
        {
          id: '1',
          name: 'Push-up',
          category: 'Strength',
          description: 'A basic push-up',
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
        {
          id: '2',
          name: 'Squat',
          category: 'Strength',
          description: 'A basic squat',
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
      ];
      const variants = [
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
        {
          id: '2',
          exercise_id: '1',
          name: 'Diamond Push-up',
          description: 'A diamond push-up',
          focus: 'strength',
          difficulty: 'intermediate',
          equipment: ['bodyweight'],
          muscle_groups: ['chest'],
          secondary_muscles: ['triceps'],
          is_unilateral: false,
          instructions: ['Perform a diamond push-up'],
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
        {
          id: '3',
          exercise_id: '2',
          name: 'Bodyweight Squat',
          description: 'A bodyweight squat',
          focus: 'strength',
          difficulty: 'beginner',
          equipment: ['bodyweight'],
          muscle_groups: ['legs'],
          secondary_muscles: ['glutes'],
          is_unilateral: false,
          instructions: ['Perform a bodyweight squat'],
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
      ];
      const steps = [
        {
          id: '1',
          exercise_variant_id: '1',
          step_order: 1,
          title: 'Start Position',
          description: 'Start in plank position',
          created_at: '2023-01-01',
        },
        {
          id: '2',
          exercise_variant_id: '1',
          step_order: 2,
          title: 'Lower Body',
          description: 'Lower your body',
          created_at: '2023-01-01',
        },
        {
          id: '3',
          exercise_variant_id: '2',
          step_order: 1,
          title: 'Form Diamond',
          description: 'Form diamond with hands',
          created_at: '2023-01-01',
        },
        {
          id: '4',
          exercise_variant_id: '3',
          step_order: 1,
          title: 'Stand Position',
          description: 'Stand with feet shoulder-width apart',
          created_at: '2023-01-01',
        },
      ];
      const tips = [
        {
          id: '1',
          exercise_variant_id: '1',
          pro_tips: ['Keep your core tight'],
          common_mistakes: ['Letting your hips sag'],
          safety_notes: ['Maintain proper form'],
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
        {
          id: '2',
          exercise_variant_id: '2',
          pro_tips: ['Form a diamond with your hands'],
          common_mistakes: ['Hands too far apart'],
          safety_notes: ['Keep elbows close to body'],
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
        {
          id: '3',
          exercise_variant_id: '3',
          pro_tips: ['Keep your chest up'],
          common_mistakes: ['Knees caving in'],
          safety_notes: ['Maintain proper form'],
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
      ];
      const media = [
        {
          id: '1',
          exercise_variant_id: '1',
          images: ['pushup-image.jpg'],
          videos: ['pushup-video.mp4'],
          featured_image: 'pushup-featured.jpg',
          featured_video: 'pushup-video.mp4',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
        {
          id: '2',
          exercise_variant_id: '2',
          images: ['diamond-pushup-image.jpg'],
          videos: ['diamond-pushup-video.mp4'],
          featured_image: 'diamond-pushup-featured.jpg',
          featured_video: 'diamond-pushup-video.mp4',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
        {
          id: '3',
          exercise_variant_id: '3',
          images: ['squat-image.jpg'],
          videos: ['squat-video.mp4'],
          featured_image: 'squat-featured.jpg',
          featured_video: 'squat-video.mp4',
          created_at: '2023-01-01',
          updated_at: '2023-01-01',
        },
      ];

      const mockTransformedExercises = [
        {
          id: createExerciseId('1'),
          name: 'Push-up',
          category: CATEGORY.STRENGTH,
          description: 'A basic push-up',
          variants: [
            {
              id: createExerciseVariantId('1'),
              name: 'Standard Push-up',
              description: 'A standard push-up',
              focus: 'strength',
              difficulty: DIFFICULTY.BEGINNER,
              equipment: [EQUIPMENT.BODYWEIGHT],
              muscleGroups: [MUSCLE_GROUP.CHEST],
              secondaryMuscles: [MUSCLE_GROUP.TRICEPS],
              isUnilateral: false,
              instructions: ['Perform a standard push-up'],
              steps: [],
              tips: undefined,
              media: undefined,
              prerequisites: undefined,
              created_at: new Date(),
              updated_at: new Date(),
            },
            {
              id: createExerciseVariantId('2'),
              name: 'Diamond Push-up',
              description: 'A diamond push-up',
              focus: 'strength',
              difficulty: DIFFICULTY.INTERMEDIATE,
              equipment: [EQUIPMENT.BODYWEIGHT],
              muscleGroups: [MUSCLE_GROUP.CHEST],
              secondaryMuscles: [MUSCLE_GROUP.TRICEPS],
              isUnilateral: false,
              instructions: ['Perform a diamond push-up'],
              steps: [],
              tips: undefined,
              media: undefined,
              prerequisites: undefined,
              created_at: new Date(),
              updated_at: new Date(),
            },
          ],
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
        {
          id: createExerciseId('2'),
          name: 'Squat',
          category: CATEGORY.STRENGTH,
          description: 'A basic squat',
          variants: [
            {
              id: createExerciseVariantId('3'),
              name: 'Bodyweight Squat',
              description: 'A bodyweight squat',
              focus: 'strength',
              difficulty: DIFFICULTY.BEGINNER,
              equipment: [EQUIPMENT.BODYWEIGHT],
              muscleGroups: [MUSCLE_GROUP.LEGS],
              secondaryMuscles: [MUSCLE_GROUP.GLUTES],
              isUnilateral: false,
              instructions: ['Perform a bodyweight squat'],
              steps: [],
              tips: undefined,
              media: undefined,
              prerequisites: undefined,
              created_at: new Date(),
              updated_at: new Date(),
            },
          ],
          mainVariantId: createExerciseVariantId('3'),
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
        category: CATEGORY.STRENGTH,
        difficulties: [DIFFICULTY.BEGINNER],
        equipment: [EQUIPMENT.BODYWEIGHT],
        muscleGroups: [MUSCLE_GROUP.CHEST],
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
        id: createExerciseId('1'),
        name: 'Push-up',
        category: CATEGORY.STRENGTH,
        description: 'A basic push-up',
        variants: [
          {
            id: createExerciseVariantId('1'),
            name: 'Standard Push-up',
            description: 'A standard push-up',
            focus: 'strength',
            difficulty: DIFFICULTY.BEGINNER,
            equipment: [EQUIPMENT.BODYWEIGHT],
            muscleGroups: [MUSCLE_GROUP.CHEST],
            secondaryMuscles: [MUSCLE_GROUP.TRICEPS],
            isUnilateral: false,
            instructions: ['Perform a standard push-up'],
            steps: [],
            tips: undefined,
            media: undefined,
            prerequisites: undefined,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ], // Only beginner variant
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
        difficulties: ['beginner'],
        equipment: ['bodyweight'],
        muscleGroups: ['chest'],
      });
      expect(result).toEqual([mockTransformedExercise]);
      // Should only include the beginner variant due to filtering
      expect(result[0].variants).toHaveLength(1);
    });
  });
});
