import type { Exercise, ExerciseVariant } from '../types';
import type { Difficulty, Equipment, MuscleGroup } from '../types/constants';
import type {
  DatabaseExercise,
  DatabaseExerciseVariant,
  DatabaseInstructionStep,
  DatabaseExerciseTips,
  DatabaseExerciseMedia,
} from '../types/database';

import { transformExercise, transformExerciseVariant } from './exerciseMappers';

export class ExerciseDataAggregators {
  /**
   * Aggregate exercise data from separate database queries
   */
  aggregateExerciseData(
    exercises: DatabaseExercise[],
    variants: DatabaseExerciseVariant[],
    steps: DatabaseInstructionStep[],
    tips: DatabaseExerciseTips[],
    media: DatabaseExerciseMedia[]
  ): Exercise[] {
    const transformedExercises: Exercise[] = [];

    for (const exercise of exercises) {
      const exerciseVariants = variants.filter(
        (v: DatabaseExerciseVariant) => v.exercise_id === exercise.id
      );
      const transformedVariants: ExerciseVariant[] = [];

      for (const variant of exerciseVariants) {
        const variantSteps = steps.filter(
          (s: DatabaseInstructionStep) => s.exercise_variant_id === variant.id
        );
        const variantTips = tips.find(
          (t: DatabaseExerciseTips) => t.exercise_variant_id === variant.id
        );
        const variantMedia = media.find(
          (m: DatabaseExerciseMedia) => m.exercise_variant_id === variant.id
        );

        transformedVariants.push(
          transformExerciseVariant(
            variant,
            variantSteps,
            variantTips,
            variantMedia
          )
        );
      }

      transformedExercises.push(
        transformExercise(exercise, transformedVariants)
      );
    }

    return transformedExercises;
  }

  /**
   * Filter variants by search criteria
   */
  filterVariantsByCriteria(
    variants: unknown[],
    criteria: {
      difficulty?: Difficulty;
      equipment?: Equipment;
      muscleGroup?: MuscleGroup;
    }
  ): unknown[] {
    return variants.filter((variant: unknown) => {
      const typedVariant = variant as {
        difficulty?: string;
        equipment?: string[];
        muscle_groups?: string[];
      };
      if (
        criteria.difficulty &&
        typedVariant.difficulty !== criteria.difficulty
      ) {
        return false;
      }
      if (
        criteria.equipment &&
        !typedVariant.equipment?.includes(criteria.equipment)
      ) {
        return false;
      }
      if (
        criteria.muscleGroup &&
        !typedVariant.muscle_groups?.includes(criteria.muscleGroup)
      ) {
        return false;
      }
      return true;
    });
  }

  /**
   * Transform joined exercise data from search results
   */
  transformJoinedExerciseData(
    exercises: unknown[],
    criteria?: {
      difficulty?: Difficulty;
      equipment?: Equipment;
      muscleGroup?: MuscleGroup;
    }
  ): Exercise[] {
    const filteredExercises: Exercise[] = [];

    for (const exercise of exercises) {
      const typedExercise = exercise as { exercise_variants?: unknown[] };
      const variants = typedExercise.exercise_variants || [];
      const filteredVariants = criteria
        ? this.filterVariantsByCriteria(variants, criteria)
        : variants;

      if (filteredVariants.length > 0) {
        const transformedVariants: ExerciseVariant[] = filteredVariants.map(
          (variant: unknown) => {
            const typedVariant = variant as {
              exercise_instruction_steps?: unknown[];
              exercise_tips?: unknown[];
              exercise_media?: unknown[];
            };
            const steps = (typedVariant.exercise_instruction_steps ||
              []) as DatabaseInstructionStep[];
            const tips = typedVariant.exercise_tips?.[0] as
              | DatabaseExerciseTips
              | undefined;
            const media = typedVariant.exercise_media?.[0] as
              | DatabaseExerciseMedia
              | undefined;

            return transformExerciseVariant(
              variant as DatabaseExerciseVariant,
              steps,
              tips,
              media
            );
          }
        );

        filteredExercises.push(
          transformExercise(exercise as DatabaseExercise, transformedVariants)
        );
      }
    }

    return filteredExercises;
  }

  /**
   * Transform user favorites data
   */
  transformUserFavoritesData(favorites: unknown[]): Exercise[] {
    const exercises: Exercise[] = [];

    for (const favorite of favorites) {
      const typedFavorite = favorite as { exercises?: unknown };
      const exercise = typedFavorite.exercises;
      if (
        exercise &&
        typeof exercise === 'object' &&
        !Array.isArray(exercise)
      ) {
        const typedExercise = exercise as { exercise_variants?: unknown[] };
        const variants = typedExercise.exercise_variants || [];
        const transformedVariants: ExerciseVariant[] = variants.map(
          (variant: unknown) => {
            const typedVariant = variant as {
              exercise_instruction_steps?: unknown[];
              exercise_tips?: unknown[];
              exercise_media?: unknown[];
            };
            const steps = (typedVariant.exercise_instruction_steps ||
              []) as DatabaseInstructionStep[];
            const tips = typedVariant.exercise_tips?.[0] as
              | DatabaseExerciseTips
              | undefined;
            const media = typedVariant.exercise_media?.[0] as
              | DatabaseExerciseMedia
              | undefined;

            return transformExerciseVariant(
              variant as DatabaseExerciseVariant,
              steps,
              tips,
              media
            );
          }
        );

        const transformedExercise = transformExercise(
          exercise as DatabaseExercise,
          transformedVariants
        );
        transformedExercise.isFavorite = true;
        exercises.push(transformedExercise);
      }
    }

    return exercises;
  }
}

// Export a singleton instance
export const exerciseDataAggregators = new ExerciseDataAggregators();
