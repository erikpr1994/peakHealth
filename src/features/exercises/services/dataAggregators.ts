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
      difficulties?: Difficulty[];
      equipment?: Equipment[];
      muscleGroups?: MuscleGroup[];
    }
  ): unknown[] {
    return variants.filter((variant: unknown) => {
      const typedVariant = variant as {
        difficulty?: string;
        equipment?: string[];
        muscle_groups?: string[];
      };

      // Check difficulty filter
      if (
        criteria.difficulties &&
        criteria.difficulties.length > 0 &&
        !criteria.difficulties.includes(typedVariant.difficulty as Difficulty)
      ) {
        return false;
      }

      // Check equipment filter
      if (
        criteria.equipment &&
        criteria.equipment.length > 0 &&
        !criteria.equipment.some(eq => typedVariant.equipment?.includes(eq))
      ) {
        return false;
      }

      // Check muscle group filter
      if (
        criteria.muscleGroups &&
        criteria.muscleGroups.length > 0 &&
        !criteria.muscleGroups.some(mg =>
          typedVariant.muscle_groups?.includes(mg)
        )
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
      difficulties?: Difficulty[];
      equipment?: Equipment[];
      muscleGroups?: MuscleGroup[];
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
