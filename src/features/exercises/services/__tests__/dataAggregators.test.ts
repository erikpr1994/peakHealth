import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { Difficulty, Equipment, MuscleGroup } from '../../types/constants';
import { exerciseDataAggregators } from '../dataAggregators';

// Mock the mappers
vi.mock('../exerciseMappers', () => ({
  transformExercise: vi.fn(),
  transformExerciseVariant: vi.fn(),
}));

import {
  transformExercise,
  transformExerciseVariant,
} from '../exerciseMappers';

const mockTransformExercise = vi.mocked(transformExercise);
const mockTransformExerciseVariant = vi.mocked(transformExerciseVariant);

describe('ExerciseDataAggregators', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('aggregateExerciseData', () => {
    it('should aggregate exercise data successfully', () => {
      const exercises = [
        {
          id: '1',
          name: 'Push-up',
          category: 'strength',
          description: 'A basic push-up',
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
      ];
      const tips = [
        { id: '1', exercise_variant_id: '1', tip: 'Keep your core tight' },
        {
          id: '2',
          exercise_variant_id: '2',
          tip: 'Form a diamond with your hands',
        },
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
      ];

      const mockTransformedVariants = [
        { id: '1', name: 'Standard Push-up', steps: [] },
        { id: '2', name: 'Diamond Push-up', steps: [] },
      ] as any;

      const mockTransformedExercise = {
        id: '1',
        name: 'Push-up',
        variants: mockTransformedVariants,
      } as any;

      mockTransformExerciseVariant
        .mockReturnValueOnce(mockTransformedVariants[0])
        .mockReturnValueOnce(mockTransformedVariants[1]);
      mockTransformExercise.mockReturnValue(mockTransformedExercise);

      const result = exerciseDataAggregators.aggregateExerciseData(
        exercises,
        variants,
        steps,
        tips,
        media
      );

      expect(mockTransformExerciseVariant).toHaveBeenCalledTimes(2);
      expect(mockTransformExerciseVariant).toHaveBeenCalledWith(
        variants[0],
        [steps[0], steps[1]],
        tips[0],
        media[0]
      );
      expect(mockTransformExerciseVariant).toHaveBeenCalledWith(
        variants[1],
        [],
        tips[1],
        media[1]
      );
      expect(mockTransformExercise).toHaveBeenCalledWith(
        exercises[0],
        mockTransformedVariants
      );
      expect(result).toEqual([mockTransformedExercise]);
    });

    it('should handle exercises with no variants', () => {
      const exercises = [
        {
          id: '1',
          name: 'Push-up',
          category: 'strength',
          description: 'A basic push-up',
        },
      ] as any;
      const variants: any[] = [];
      const steps: any[] = [];
      const tips: any[] = [];
      const media: any[] = [];

      const mockTransformedExercise = {
        id: '1',
        name: 'Push-up',
        variants: [],
      } as any;

      mockTransformExercise.mockReturnValue(mockTransformedExercise);

      const result = exerciseDataAggregators.aggregateExerciseData(
        exercises,
        variants,
        steps,
        tips,
        media
      );

      expect(mockTransformExerciseVariant).not.toHaveBeenCalled();
      expect(mockTransformExercise).toHaveBeenCalledWith(exercises[0], []);
      expect(result).toEqual([mockTransformedExercise]);
    });

    it('should handle variants with no related data', () => {
      const exercises = [
        {
          id: '1',
          name: 'Push-up',
          category: 'strength',
          description: 'A basic push-up',
        },
      ];
      const variants = [
        {
          id: '1',
          exercise_id: '1',
          name: 'Standard Push-up',
          difficulty: 'beginner',
        },
      ];
      const steps: any[] = [];
      const tips: any[] = [];
      const media: any[] = [];

      const mockTransformedVariants = [
        { id: '1', name: 'Standard Push-up', steps: [] },
      ];
      const mockTransformedExercise = {
        id: '1',
        name: 'Push-up',
        variants: mockTransformedVariants,
      };

      mockTransformExerciseVariant.mockReturnValue(mockTransformedVariants[0]);
      mockTransformExercise.mockReturnValue(mockTransformedExercise);

      const result = exerciseDataAggregators.aggregateExerciseData(
        exercises,
        variants,
        steps,
        tips,
        media
      );

      expect(mockTransformExerciseVariant).toHaveBeenCalledWith(
        variants[0],
        [],
        undefined,
        undefined
      );
      expect(result).toEqual([mockTransformedExercise]);
    });
  });

  describe('filterVariantsByCriteria', () => {
    it('should filter variants by difficulty', () => {
      const variants = [
        {
          difficulty: 'beginner',
          equipment: ['bodyweight'],
          muscle_groups: ['chest'],
        },
        {
          difficulty: 'intermediate',
          equipment: ['bodyweight'],
          muscle_groups: ['chest'],
        },
        {
          difficulty: 'advanced',
          equipment: ['bodyweight'],
          muscle_groups: ['chest'],
        },
      ];

      const criteria = { difficulties: ['beginner'] as Difficulty[] };

      const result = exerciseDataAggregators.filterVariantsByCriteria(
        variants,
        criteria
      );

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(variants[0]);
    });

    it('should filter variants by equipment', () => {
      const variants = [
        {
          difficulty: 'beginner',
          equipment: ['bodyweight'],
          muscle_groups: ['chest'],
        },
        {
          difficulty: 'beginner',
          equipment: ['dumbbells'],
          muscle_groups: ['chest'],
        },
        {
          difficulty: 'beginner',
          equipment: ['barbell'],
          muscle_groups: ['chest'],
        },
      ];

      const criteria = { equipment: ['dumbbells'] as Equipment[] };

      const result = exerciseDataAggregators.filterVariantsByCriteria(
        variants,
        criteria
      );

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(variants[1]);
    });

    it('should filter variants by muscle group', () => {
      const variants = [
        {
          difficulty: 'beginner',
          equipment: ['bodyweight'],
          muscle_groups: ['chest'],
        },
        {
          difficulty: 'beginner',
          equipment: ['bodyweight'],
          muscle_groups: ['back'],
        },
        {
          difficulty: 'beginner',
          equipment: ['bodyweight'],
          muscle_groups: ['legs'],
        },
      ];

      const criteria = { muscleGroups: ['chest'] as MuscleGroup[] };

      const result = exerciseDataAggregators.filterVariantsByCriteria(
        variants,
        criteria
      );

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(variants[0]);
    });

    it('should filter by multiple criteria', () => {
      const variants = [
        {
          difficulty: 'beginner',
          equipment: ['bodyweight'],
          muscle_groups: ['chest'],
        },
        {
          difficulty: 'intermediate',
          equipment: ['dumbbells'],
          muscle_groups: ['chest'],
        },
        {
          difficulty: 'beginner',
          equipment: ['bodyweight'],
          muscle_groups: ['back'],
        },
      ];

      const criteria = {
        difficulties: ['beginner'] as Difficulty[],
        equipment: ['bodyweight'] as Equipment[],
        muscleGroups: ['chest'] as MuscleGroup[],
      };

      const result = exerciseDataAggregators.filterVariantsByCriteria(
        variants,
        criteria
      );

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(variants[0]);
    });

    it('should return all variants when no criteria provided', () => {
      const variants = [
        {
          difficulty: 'beginner',
          equipment: ['bodyweight'],
          muscle_groups: ['chest'],
        },
        {
          difficulty: 'intermediate',
          equipment: ['dumbbells'],
          muscle_groups: ['chest'],
        },
      ];

      const result = exerciseDataAggregators.filterVariantsByCriteria(
        variants,
        {}
      );

      expect(result).toEqual(variants);
    });
  });

  describe('transformJoinedExerciseData', () => {
    it('should transform joined exercise data successfully', () => {
      const exercises = [
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
              exercise_instruction_steps: [
                {
                  id: '1',
                  step_order: 1,
                  instruction: 'Start in plank position',
                },
              ],
              exercise_tips: [{ id: '1', tip: 'Keep your core tight' }],
              exercise_media: [{ id: '1', url: 'video.mp4', type: 'video' }],
            },
          ],
        },
      ];

      const criteria = { difficulty: 'beginner' as const };

      const mockTransformedVariant = {
        id: '1',
        name: 'Standard Push-up',
        steps: [],
      };
      const mockTransformedExercise = {
        id: '1',
        name: 'Push-up',
        variants: [mockTransformedVariant],
      };

      mockTransformExerciseVariant.mockReturnValue(mockTransformedVariant);
      mockTransformExercise.mockReturnValue(mockTransformedExercise);

      const result = exerciseDataAggregators.transformJoinedExerciseData(
        exercises,
        criteria
      );

      expect(mockTransformExerciseVariant).toHaveBeenCalledWith(
        exercises[0].exercise_variants[0],
        exercises[0].exercise_variants[0].exercise_instruction_steps,
        exercises[0].exercise_variants[0].exercise_tips[0],
        exercises[0].exercise_variants[0].exercise_media[0]
      );
      expect(mockTransformExercise).toHaveBeenCalledWith(exercises[0], [
        mockTransformedVariant,
      ]);
      expect(result).toEqual([mockTransformedExercise]);
    });

    it('should filter out exercises with no matching variants', () => {
      const exercises = [
        {
          id: '1',
          name: 'Push-up',
          exercise_variants: [
            {
              id: '1',
              name: 'Standard Push-up',
              difficulty: 'intermediate',
              equipment: ['bodyweight'],
              muscle_groups: ['chest'],
              exercise_instruction_steps: [],
              exercise_tips: [],
              exercise_media: [],
            },
          ],
        },
      ];

      const criteria = { difficulties: ['beginner'] as Difficulty[] };

      const result = exerciseDataAggregators.transformJoinedExerciseData(
        exercises,
        criteria
      );

      expect(mockTransformExerciseVariant).not.toHaveBeenCalled();
      expect(mockTransformExercise).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should handle exercises with no variants', () => {
      const exercises = [
        {
          id: '1',
          name: 'Push-up',
          exercise_variants: [],
        },
      ];

      const result =
        exerciseDataAggregators.transformJoinedExerciseData(exercises);

      expect(mockTransformExerciseVariant).not.toHaveBeenCalled();
      expect(mockTransformExercise).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('transformUserFavoritesData', () => {
    it('should transform user favorites data successfully', () => {
      const favorites = [
        {
          exercise_id: '1',
          exercises: {
            id: '1',
            name: 'Push-up',
            exercise_variants: [
              {
                id: '1',
                name: 'Standard Push-up',
                exercise_instruction_steps: [
                  {
                    id: '1',
                    step_order: 1,
                    instruction: 'Start in plank position',
                  },
                ],
                exercise_tips: [{ id: '1', tip: 'Keep your core tight' }],
                exercise_media: [{ id: '1', url: 'video.mp4', type: 'video' }],
              },
            ],
          },
        },
      ];

      const mockTransformedVariant = {
        id: '1',
        name: 'Standard Push-up',
        steps: [],
      };
      const mockTransformedExercise = {
        id: '1',
        name: 'Push-up',
        variants: [mockTransformedVariant],
        isFavorite: true,
      };

      mockTransformExerciseVariant.mockReturnValue(mockTransformedVariant);
      mockTransformExercise.mockReturnValue({
        ...mockTransformedExercise,
        isFavorite: false,
      });

      const result =
        exerciseDataAggregators.transformUserFavoritesData(favorites);

      expect(mockTransformExerciseVariant).toHaveBeenCalledWith(
        favorites[0].exercises.exercise_variants[0],
        favorites[0].exercises.exercise_variants[0].exercise_instruction_steps,
        favorites[0].exercises.exercise_variants[0].exercise_tips[0],
        favorites[0].exercises.exercise_variants[0].exercise_media[0]
      );
      expect(mockTransformExercise).toHaveBeenCalledWith(
        favorites[0].exercises,
        [mockTransformedVariant]
      );
      expect(result).toEqual([mockTransformedExercise]);
    });

    it('should handle invalid favorite data', () => {
      const favorites = [
        { exercise_id: '1', exercises: null },
        { exercise_id: '2', exercises: [] },
        {
          exercise_id: '3',
          exercises: { id: '3', name: 'Valid Exercise', exercise_variants: [] },
        },
      ];

      const mockTransformedExercise = {
        id: '3',
        name: 'Valid Exercise',
        variants: [],
        isFavorite: true,
      };

      mockTransformExercise.mockReturnValue({
        ...mockTransformedExercise,
        isFavorite: false,
      });

      const result =
        exerciseDataAggregators.transformUserFavoritesData(favorites);

      expect(mockTransformExercise).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockTransformedExercise]);
    });

    it('should handle empty favorites array', () => {
      const favorites: any[] = [];

      const result =
        exerciseDataAggregators.transformUserFavoritesData(favorites);

      expect(mockTransformExerciseVariant).not.toHaveBeenCalled();
      expect(mockTransformExercise).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
