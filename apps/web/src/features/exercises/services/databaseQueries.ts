import type {
  DatabaseExercise,
  DatabaseExerciseVariant,
  DatabaseInstructionStep,
  DatabaseExerciseTips,
  DatabaseExerciseMedia,
} from '../types/database';

import { createClient } from '@/lib/supabase/server';

export class ExerciseDatabaseQueries {
  /**
   * Fetch all exercises with their related data
   */
  async fetchExercisesWithRelatedData(): Promise<{
    exercises: DatabaseExercise[];
    variants: DatabaseExerciseVariant[];
    steps: DatabaseInstructionStep[];
    tips: DatabaseExerciseTips[];
    media: DatabaseExerciseMedia[];
  }> {
    const supabase = await createClient();

    // Get all exercises
    const { data: exercises, error: exercisesError } = await supabase
      .from('exercises')
      .select('*')
      .order('name');

    if (exercisesError) throw exercisesError;
    if (!exercises)
      return { exercises: [], variants: [], steps: [], tips: [], media: [] };

    // Get all variants for these exercises
    const exerciseIds = exercises.map((e: DatabaseExercise) => e.id);
    const { data: variants, error: variantsError } = await supabase
      .from('exercise_variants')
      .select('*')
      .in('exercise_id', exerciseIds)
      .order('name');

    if (variantsError) throw variantsError;

    // Get instruction steps for all variants
    const variantIds =
      variants?.map((v: DatabaseExerciseVariant) => v.id) || [];
    const { data: steps, error: stepsError } = await supabase
      .from('exercise_instruction_steps')
      .select('*')
      .in('exercise_variant_id', variantIds)
      .order('step_order');

    if (stepsError) throw stepsError;

    // Get tips for all variants
    const { data: tips, error: tipsError } = await supabase
      .from('exercise_tips')
      .select('*')
      .in('exercise_variant_id', variantIds);

    if (tipsError) throw tipsError;

    // Get media for all variants
    const { data: media, error: mediaError } = await supabase
      .from('exercise_media')
      .select('*')
      .in('exercise_variant_id', variantIds);

    if (mediaError) throw mediaError;

    return {
      exercises: exercises || [],
      variants: variants || [],
      steps: steps || [],
      tips: tips || [],
      media: media || [],
    };
  }

  /**
   * Fetch a single exercise with its related data
   */
  async fetchExerciseWithRelatedData(exerciseId: string): Promise<{
    exercise: DatabaseExercise | null;
    variants: DatabaseExerciseVariant[];
    steps: DatabaseInstructionStep[];
    tips: DatabaseExerciseTips[];
    media: DatabaseExerciseMedia[];
  }> {
    const supabase = await createClient();

    // Get the exercise
    const { data: exercise, error: exerciseError } = await supabase
      .from('exercises')
      .select('*')
      .eq('id', exerciseId)
      .single();

    if (exerciseError) throw exerciseError;
    if (!exercise)
      return { exercise: null, variants: [], steps: [], tips: [], media: [] };

    // Get all variants for this exercise
    const { data: variants, error: variantsError } = await supabase
      .from('exercise_variants')
      .select('*')
      .eq('exercise_id', exerciseId)
      .order('name');

    if (variantsError) throw variantsError;

    // Get instruction steps for all variants
    const variantIds =
      variants?.map((v: DatabaseExerciseVariant) => v.id) || [];
    const { data: steps, error: stepsError } = await supabase
      .from('exercise_instruction_steps')
      .select('*')
      .in('exercise_variant_id', variantIds)
      .order('step_order');

    if (stepsError) throw stepsError;

    // Get tips for all variants
    const { data: tips, error: tipsError } = await supabase
      .from('exercise_tips')
      .select('*')
      .in('exercise_variant_id', variantIds);

    if (tipsError) throw tipsError;

    // Get media for all variants
    const { data: media, error: mediaError } = await supabase
      .from('exercise_media')
      .select('*')
      .in('exercise_variant_id', variantIds);

    if (mediaError) throw mediaError;

    return {
      exercise,
      variants: variants || [],
      steps: steps || [],
      tips: tips || [],
      media: media || [],
    };
  }

  /**
   * Search exercises with joins
   */
  async searchExercisesWithJoins(
    searchTerm?: string,
    category?: string
  ): Promise<unknown[]> {
    const supabase = await createClient();

    let query = supabase.from('exercises').select(`
        *,
        exercise_variants (
          *,
          exercise_instruction_steps (*),
          exercise_tips (*),
          exercise_media (*)
        )
      `);

    // Apply filters
    if (searchTerm) {
      query = query.or(
        `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
      );
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;

    return data || [];
  }

  /**
   * Fetch user favorites with exercise data
   */
  async fetchUserFavorites(userId: string): Promise<unknown[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('user_exercise_favorites')
      .select(
        `
        exercise_id,
        exercises (
          *,
          exercise_variants (
            *,
            exercise_instruction_steps (*),
            exercise_tips (*),
            exercise_media (*)
          )
        )
      `
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * Add exercise to user favorites
   */
  async addToFavorites(userId: string, exerciseId: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from('user_exercise_favorites').insert({
      user_id: userId,
      exercise_id: exerciseId,
    });

    if (error) throw error;
  }

  /**
   * Remove exercise from user favorites
   */
  async removeFromFavorites(userId: string, exerciseId: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
      .from('user_exercise_favorites')
      .delete()
      .eq('user_id', userId)
      .eq('exercise_id', exerciseId);

    if (error) throw error;
  }
}

// Export a singleton instance
export const exerciseDatabaseQueries = new ExerciseDatabaseQueries();
