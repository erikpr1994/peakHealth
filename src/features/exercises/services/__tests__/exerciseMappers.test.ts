import { describe, it, expect } from 'vitest';

import type {
  DatabaseExercise,
  DatabaseExerciseVariant,
  DatabaseInstructionStep,
  DatabaseExerciseTips,
  DatabaseExerciseMedia,
} from '../../types/database';
import {
  mapCategory,
  mapDifficulty,
  mapEquipment,
  mapMuscleGroup,
  transformExercise,
  transformExerciseVariant,
} from '../exerciseMappers';

describe('exerciseMappers', () => {
  describe('mapCategory', () => {
    it('should map valid database categories correctly', () => {
      expect(mapCategory('Strength')).toBe('Strength');
      expect(mapCategory('Cardio')).toBe('Cardio');
      expect(mapCategory('Flexibility')).toBe('Flexibility');
      expect(mapCategory('Balance')).toBe('Balance');
    });

    it('should return Strength as default for invalid categories', () => {
      expect(mapCategory('Invalid')).toBe('Strength');
      expect(mapCategory('')).toBe('Strength');
      expect(mapCategory('unknown')).toBe('Strength');
    });
  });

  describe('mapDifficulty', () => {
    it('should map valid database difficulties correctly', () => {
      expect(mapDifficulty('Beginner')).toBe('Beginner');
      expect(mapDifficulty('Intermediate')).toBe('Intermediate');
      expect(mapDifficulty('Advanced')).toBe('Advanced');
      expect(mapDifficulty('Unknown')).toBe('Unknown');
    });

    it('should return Beginner as default for invalid difficulties', () => {
      expect(mapDifficulty('Invalid')).toBe('Beginner');
      expect(mapDifficulty('')).toBe('Beginner');
      expect(mapDifficulty('expert')).toBe('Beginner');
    });
  });

  describe('mapEquipment', () => {
    it('should map valid database equipment correctly', () => {
      expect(mapEquipment('Barbell')).toBe('Barbell');
      expect(mapEquipment('Dumbbell')).toBe('Dumbbell');
      expect(mapEquipment('Bodyweight')).toBe('Bodyweight');
      expect(mapEquipment('Machine')).toBe('Machine');
      expect(mapEquipment('Resistance Band')).toBe('Resistance Band');
      expect(mapEquipment('Kettlebell')).toBe('Kettlebell');
      expect(mapEquipment('Cable')).toBe('Cable');
      expect(mapEquipment('Bench')).toBe('Bench');
      expect(mapEquipment('Incline Bench')).toBe('Incline Bench');
      expect(mapEquipment('Decline Bench')).toBe('Decline Bench');
      expect(mapEquipment('Pull-up Bar')).toBe('Pull-up Bar');
      expect(mapEquipment('Squat Rack')).toBe('Squat Rack');
      expect(mapEquipment('Step')).toBe('Step');
    });

    it('should return Bodyweight as default for invalid equipment', () => {
      expect(mapEquipment('Invalid')).toBe('Bodyweight');
      expect(mapEquipment('')).toBe('Bodyweight');
      expect(mapEquipment('rope')).toBe('Bodyweight');
    });
  });

  describe('mapMuscleGroup', () => {
    it('should map valid database muscle groups correctly', () => {
      expect(mapMuscleGroup('Chest')).toBe('Chest');
      expect(mapMuscleGroup('Back')).toBe('Back');
      expect(mapMuscleGroup('Legs')).toBe('Legs');
      expect(mapMuscleGroup('Arms')).toBe('Arms');
      expect(mapMuscleGroup('Shoulders')).toBe('Shoulders');
      expect(mapMuscleGroup('Core')).toBe('Core');
      expect(mapMuscleGroup('Glutes')).toBe('Glutes');
      expect(mapMuscleGroup('Biceps')).toBe('Biceps');
      expect(mapMuscleGroup('Triceps')).toBe('Triceps');
      expect(mapMuscleGroup('Cardio')).toBe('Cardio');
      expect(mapMuscleGroup('Full Body')).toBe('Full Body');
      expect(mapMuscleGroup('Upper Chest')).toBe('Upper Chest');
      expect(mapMuscleGroup('Lower Chest')).toBe('Lower Chest');
      expect(mapMuscleGroup('Front Delts')).toBe('Front Delts');
      expect(mapMuscleGroup('Obliques')).toBe('Obliques');
      expect(mapMuscleGroup('Quadriceps')).toBe('Quadriceps');
      expect(mapMuscleGroup('Hamstrings')).toBe('Hamstrings');
    });

    it('should return Core as default for invalid muscle groups', () => {
      expect(mapMuscleGroup('Invalid')).toBe('Core');
      expect(mapMuscleGroup('')).toBe('Core');
      expect(mapMuscleGroup('neck')).toBe('Core');
    });
  });

  describe('transformExerciseVariant', () => {
    const mockDbVariant: DatabaseExerciseVariant = {
      id: 'variant-1',
      exercise_id: 'exercise-1',
      name: 'Standard Push-up',
      alternative_names: ['Regular Push-up'],
      description: 'A classic bodyweight exercise',
      focus: 'Upper body strength',
      difficulty: 'Beginner',
      equipment: ['Bodyweight'],
      muscle_groups: ['Chest', 'Triceps'],
      secondary_muscles: ['Shoulders'],
      is_unilateral: false,
      instructions: 'Perform a standard push-up',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    const mockSteps: DatabaseInstructionStep[] = [
      {
        id: 'step-1',
        exercise_variant_id: 'variant-1',
        step_order: 1,
        title: 'Starting Position',
        description: 'Get into a plank position',
      },
      {
        id: 'step-2',
        exercise_variant_id: 'variant-1',
        step_order: 2,
        title: 'Lower Body',
        description: 'Lower your body to the ground',
      },
    ];

    const mockTips: DatabaseExerciseTips = {
      id: 'tips-1',
      exercise_variant_id: 'variant-1',
      pro_tips: ['Keep your core tight'],
      common_mistakes: ['Letting your hips sag'],
      safety_notes: ['Stop if you feel pain'],
    };

    const mockMedia: DatabaseExerciseMedia = {
      id: 'media-1',
      exercise_variant_id: 'variant-1',
      images: ['image1.jpg', 'image2.jpg'],
      videos: ['video1.mp4'],
      featured_image: 'featured.jpg',
      featured_video: 'featured.mp4',
    };

    it('should transform database variant to ExerciseVariant correctly', () => {
      const result = transformExerciseVariant(
        mockDbVariant,
        mockSteps,
        mockTips,
        mockMedia
      );

      expect(result).toEqual({
        id: 'variant-1',
        name: 'Standard Push-up',
        alternativeNames: ['Regular Push-up'],
        description: 'A classic bodyweight exercise',
        focus: 'Upper body strength',
        difficulty: 'Beginner',
        equipment: ['Bodyweight'],
        muscleGroups: ['Chest', 'Triceps'],
        secondaryMuscles: ['Shoulders'],
        isUnilateral: false,
        instructions: 'Perform a standard push-up',
        steps: [
          {
            title: 'Starting Position',
            description: 'Get into a plank position',
          },
          {
            title: 'Lower Body',
            description: 'Lower your body to the ground',
          },
        ],
        tips: {
          proTips: ['Keep your core tight'],
          commonMistakes: ['Letting your hips sag'],
          safetyNotes: ['Stop if you feel pain'],
        },
        media: {
          images: ['image1.jpg', 'image2.jpg'],
          videos: ['video1.mp4'],
          featuredImage: 'featured.jpg',
          featuredVideo: 'featured.mp4',
        },
        prerequisites: undefined,
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z'),
      });
    });

    it('should handle variant without tips and media', () => {
      const result = transformExerciseVariant(mockDbVariant, mockSteps);

      expect(result.tips).toBeUndefined();
      expect(result.media).toBeUndefined();
      expect(result.steps).toHaveLength(2);
    });

    it('should sort steps by step_order', () => {
      const unsortedSteps: DatabaseInstructionStep[] = [
        {
          id: 'step-2',
          exercise_variant_id: 'variant-1',
          step_order: 2,
          title: 'Second Step',
          description: 'Second step description',
        },
        {
          id: 'step-1',
          exercise_variant_id: 'variant-1',
          step_order: 1,
          title: 'First Step',
          description: 'First step description',
        },
      ];

      const result = transformExerciseVariant(mockDbVariant, unsortedSteps);

      expect(result.steps).toEqual([
        {
          title: 'First Step',
          description: 'First step description',
        },
        {
          title: 'Second Step',
          description: 'Second step description',
        },
      ]);
    });

    it('should handle empty arrays for equipment and muscle groups', () => {
      const variantWithEmptyArrays = {
        ...mockDbVariant,
        equipment: [],
        muscle_groups: [],
        secondary_muscles: [],
      };

      const result = transformExerciseVariant(
        variantWithEmptyArrays,
        mockSteps
      );

      expect(result.equipment).toEqual([]);
      expect(result.muscleGroups).toEqual([]);
      expect(result.secondaryMuscles).toEqual([]);
    });

    it('should handle null secondary muscles', () => {
      const variantWithNullSecondary = {
        ...mockDbVariant,
        secondary_muscles: null,
      };

      const result = transformExerciseVariant(
        variantWithNullSecondary,
        mockSteps
      );

      expect(result.secondaryMuscles).toBeUndefined();
    });
  });

  describe('transformExercise', () => {
    const mockDbExercise: DatabaseExercise = {
      id: 'exercise-1',
      name: 'Push-up',
      alternative_names: ['Press-up'],
      category: 'Strength',
      description: 'A classic upper body exercise',
      icon: 'push-up-icon',
      icon_color: '#ff0000',
      is_popular: true,
      is_new: false,
      rating: 4.5,
      tags: ['bodyweight', 'strength'],
      related_exercise_ids: ['exercise-2', 'exercise-3'],
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    const mockVariants = [
      {
        id: 'variant-1',
        name: 'Standard Push-up',
        alternativeNames: ['Regular Push-up'],
        description: 'A classic bodyweight exercise',
        focus: 'Upper body strength',
        difficulty: 'Beginner' as const,
        equipment: ['Bodyweight'],
        muscleGroups: ['Chest', 'Triceps'],
        secondaryMuscles: ['Shoulders'],
        isUnilateral: false,
        instructions: 'Perform a standard push-up',
        steps: [],
        tips: undefined,
        media: undefined,
        prerequisites: undefined,
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z'),
      },
      {
        id: 'variant-2',
        name: 'Diamond Push-up',
        alternativeNames: [],
        description: 'A more challenging push-up variation',
        focus: 'Tricep focus',
        difficulty: 'Advanced' as const,
        equipment: ['Bodyweight'],
        muscleGroups: ['Chest', 'Triceps'],
        secondaryMuscles: ['Shoulders'],
        isUnilateral: false,
        instructions: 'Perform a diamond push-up',
        steps: [],
        tips: undefined,
        media: undefined,
        prerequisites: undefined,
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z'),
      },
    ];

    it('should transform database exercise to Exercise correctly', () => {
      const result = transformExercise(mockDbExercise, mockVariants as any);

      expect(result).toEqual({
        id: 'exercise-1',
        name: 'Push-up',
        alternativeNames: ['Press-up'],
        category: 'Strength',
        description: 'A classic upper body exercise',
        variants: mockVariants,
        mainVariantId: 'variant-1',
        icon: 'push-up-icon',
        iconColor: '#ff0000',
        isFavorite: false,
        isPopular: true,
        isNew: false,
        rating: 4.5,
        summary: {
          difficultyRange: {
            min: 'Beginner',
            max: 'Advanced',
          },
          equipmentOptions: ['Bodyweight'],
          primaryMuscleGroups: ['Chest', 'Triceps'],
        },
        tags: ['bodyweight', 'strength'],
        relatedExercises: ['exercise-2', 'exercise-3'],
        created_at: new Date('2024-01-01T00:00:00Z'),
        updated_at: new Date('2024-01-01T00:00:00Z'),
      });
    });

    it('should handle exercise with no variants', () => {
      const result = transformExercise(mockDbExercise, []);

      expect(result.variants).toEqual([]);
      expect(result.mainVariantId).toBeUndefined();
      expect(result.summary).toEqual({
        difficultyRange: {
          min: 'Beginner',
          max: 'Beginner',
        },
        equipmentOptions: [],
        primaryMuscleGroups: [],
      });
    });

    it('should handle exercise with single variant', () => {
      const singleVariant = [mockVariants[0]];
      const result = transformExercise(mockDbExercise, singleVariant);

      expect(result.variants).toEqual(singleVariant);
      expect(result.mainVariantId).toBe('variant-1');
      expect(result.summary.difficultyRange).toEqual({
        min: 'Beginner',
        max: 'Beginner',
      });
    });

    it('should deduplicate equipment and muscle groups', () => {
      const variantsWithDuplicates = [
        {
          ...mockVariants[0],
          equipment: ['Bodyweight', 'Bench'],
          muscleGroups: ['Chest', 'Triceps'],
        },
        {
          ...mockVariants[1],
          equipment: ['Bodyweight', 'Bench'],
          muscleGroups: ['Chest', 'Shoulders'],
        },
      ];

      const result = transformExercise(mockDbExercise, variantsWithDuplicates);

      expect(result.summary.equipmentOptions).toEqual(['Bodyweight', 'Bench']);
      expect(result.summary.primaryMuscleGroups).toEqual([
        'Chest',
        'Triceps',
        'Shoulders',
      ]);
    });

    it('should handle null rating', () => {
      const exerciseWithNullRating = {
        ...mockDbExercise,
        rating: null,
      };

      const result = transformExercise(exerciseWithNullRating, mockVariants);

      expect(result.rating).toBeUndefined();
    });

    it('should handle unknown difficulty in summary calculation', () => {
      const variantsWithUnknown = [
        {
          ...mockVariants[0],
          difficulty: 'Unknown' as const,
        },
        {
          ...mockVariants[1],
          difficulty: 'Advanced' as const,
        },
      ];

      const result = transformExercise(mockDbExercise, variantsWithUnknown);

      expect(result.summary.difficultyRange).toEqual({
        min: 'Unknown',
        max: 'Advanced',
      });
    });

    it('should handle empty arrays in variants', () => {
      const variantsWithEmptyArrays = [
        {
          ...mockVariants[0],
          equipment: [],
          muscleGroups: [],
        },
      ];

      const result = transformExercise(mockDbExercise, variantsWithEmptyArrays);

      expect(result.summary.equipmentOptions).toEqual([]);
      expect(result.summary.primaryMuscleGroups).toEqual([]);
    });
  });
});
