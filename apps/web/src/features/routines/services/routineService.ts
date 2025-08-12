import { createClient } from '@/lib/supabase/client';

import { Routine, StrengthWorkout, RunningWorkout } from '../types';
import { DatabaseRoutineResponse, DatabaseRoutine } from '../types/database';
import { transformDatabaseRoutineToRoutine } from '../utils/dataTransformers';

export interface CreateRoutineData {
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss';
  duration: number;
  daysPerWeek: number;
  objectives: string[];
  strengthWorkouts: StrengthWorkout[];
  runningWorkouts: RunningWorkout[];
}

export interface UpdateRoutineData {
  name?: string;
  description?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  goal?: 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss';
  duration?: number;
  daysPerWeek?: number;
  objectives?: string[];
}

export class RoutineService {
  private supabase = createClient();

  async getUserRoutines(): Promise<Routine[]> {
    if (!this.supabase) {
      throw new Error('Database connection not available');
    }

    const {
      data: { user },
      error: authError,
    } = await this.supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('Not authenticated');
    }

    const { data: routines, error } = await this.supabase
      .from('routines')
      .select(
        `
        *,
        workouts (
          id,
          name,
          type,
          objective,
          order_index
        )
      `
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Transform data to match frontend types using safe transformation
    return (routines || []).map((routine: DatabaseRoutine): Routine => {
      return transformDatabaseRoutineToRoutine(routine);
    });
  }

  async setActiveRoutine(routineId: string): Promise<void> {
    if (!this.supabase) {
      throw new Error('Database connection not available');
    }

    const {
      data: { user },
      error: authError,
    } = await this.supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('Not authenticated');
    }

    // First, deactivate all other routines
    const { error: deactivateError } = await this.supabase
      .from('routines')
      .update({ is_active: false })
      .eq('user_id', user.id);

    if (deactivateError) {
      // Error handling without console.log
      throw deactivateError;
    }

    // Then activate the selected routine
    const { error: updateError } = await this.supabase
      .from('routines')
      .update({ is_active: true })
      .eq('id', routineId)
      .eq('user_id', user.id);

    if (updateError) {
      // Error handling without console.log
      throw updateError;
    }
  }

  async getRoutineById(routineId: string): Promise<DatabaseRoutineResponse> {
    if (!this.supabase) {
      throw new Error('Database connection not available');
    }

    const {
      data: { user },
      error: authError,
    } = await this.supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('Not authenticated');
    }

    // First, let's check if the routine exists and belongs to the user
    const { data: routineCheck, error: checkError } = await this.supabase
      .from('routines')
      .select('id, user_id')
      .eq('id', routineId)
      .eq('user_id', user.id)
      .single();

    if (checkError) {
      if (checkError.code === 'PGRST116') {
        throw new Error('Routine not found');
      }
      throw checkError;
    }

    if (!routineCheck) {
      throw new Error('Routine not found');
    }

    // Now try to get the complete routine data
    const { data: routineData, error } = await this.supabase.rpc(
      'get_complete_routine',
      { routine_id_param: routineId }
    );

    if (error) {
      throw error;
    }

    if (!routineData) {
      throw new Error('Routine not found');
    }

    return routineData;
  }

  async createRoutine(routineData: CreateRoutineData): Promise<{
    success: boolean;
    routine: DatabaseRoutine;
    message: string;
  }> {
    if (!this.supabase) {
      throw new Error('Database connection not available');
    }

    const {
      data: { user },
      error: authError,
    } = await this.supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('Not authenticated');
    }

    const {
      name,
      description,
      difficulty,
      goal,
      daysPerWeek,
      objectives,
      strengthWorkouts,
      runningWorkouts,
    } = routineData;

    // Basic validation
    if (!name || !difficulty || !goal || !daysPerWeek) {
      throw new Error('Missing required fields');
    }

    // Prepare routine data for RPC function
    const routineDataForRpc = {
      userId: user.id,
      name,
      description,
      difficulty,
      goal,
      daysPerWeek,
      objectives: objectives || [],
      isActive: false,
      isFavorite: false,
    };

    // Prepare strength workouts data for RPC function
    const strengthWorkoutsForRpc = (strengthWorkouts || []).map(
      (workout, index) => ({
        name: workout.name,
        type: 'strength',
        objective: workout.objective,
        schedule: workout.schedule,
        orderIndex: index,
        sections: (workout.sections || []).map((section, sectionIndex) => ({
          name: section.name,
          type: section.type,
          orderIndex: sectionIndex,
          restAfter: section.restAfter,
          emomDuration: section.emomDuration,
          exercises: (section.exercises || []).map(
            (exercise, exerciseIndex) => ({
              name: exercise.name,
              category: exercise.category,
              muscleGroups: exercise.muscleGroups,
              exerciseId: exercise.exerciseId,
              variantId: exercise.variantId,
              orderIndex: exerciseIndex,
              restTimer: exercise.restTimer,
              restAfter: exercise.restAfter,
              progressionMethod: exercise.progressionMethod,
              hasApproachSets: exercise.hasApproachSets,
              emomReps: exercise.emomReps,
              sets: (exercise.sets || []).map((set, setIndex) => ({
                setNumber: setIndex + 1,
                reps: set.reps,
                weight: set.weight,
                notes: set.notes,
              })),
            })
          ),
        })),
      })
    );

    // Prepare running workouts data for RPC function
    const runningWorkoutsForRpc = (runningWorkouts || []).map(
      (workout, index) => ({
        name: workout.name,
        type: workout.type,
        objective: workout.objective,
        schedule: workout.schedule,
        orderIndex: (strengthWorkouts?.length || 0) + index,
        sections: (workout.sections || []).map((section, sectionIndex) => ({
          name: section.name,
          type: section.type,
          orderIndex: sectionIndex,
          restAfter: section.restAfter,
          emomDuration: section.emomDuration,
          exercises: (section.exercises || []).map(
            (exercise, exerciseIndex) => ({
              name: exercise.name,
              category: exercise.category,
              muscleGroups: exercise.muscleGroups,
              exerciseId: exercise.exerciseId,
              variantId: exercise.variantId,
              orderIndex: exerciseIndex,
              restTimer: exercise.restTimer,
              restAfter: exercise.restAfter,
              emomReps: exercise.emomReps,
              sets: (exercise.sets || []).map((set, setIndex) => ({
                setNumber: setIndex + 1,
                reps: set.reps,
                weight: set.weight,
                notes: set.notes,
              })),
            })
          ),
        })),
        trailRunningData: workout.trailRunningData,
      })
    );

    // Call the comprehensive RPC function for atomic routine creation
    const { data: result, error } = await this.supabase.rpc(
      'create_complete_routine',
      {
        routine_data: routineDataForRpc,
        strength_workouts_data: strengthWorkoutsForRpc,
        running_workouts_data: runningWorkoutsForRpc,
      }
    );

    if (error) {
      // Error handling without console.log
      throw new Error(`Failed to create routine: ${error.message}`);
    }

    if (!result || !result.success) {
      throw new Error('Routine creation failed');
    }

    // Fetch the created routine to return
    const { data: createdRoutine, error: fetchError } = await this.supabase
      .from('routines')
      .select('*')
      .eq('id', result.routineId)
      .single();

    if (fetchError || !createdRoutine) {
      throw new Error('Failed to fetch created routine');
    }

    return {
      success: true,
      routine: createdRoutine,
      message: result.message || 'Routine created successfully',
    };
  }

  async updateRoutine(
    routineId: string,
    routineData: UpdateRoutineData
  ): Promise<DatabaseRoutineResponse> {
    if (!this.supabase) {
      throw new Error('Database connection not available');
    }

    const {
      data: { user },
      error: authError,
    } = await this.supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('Not authenticated');
    }

    const response = await this.supabase.rpc('update_routine', {
      routine_id_param: routineId,
      name: routineData.name,
      description: routineData.description,
      difficulty: routineData.difficulty,
      goal: routineData.goal,
      duration: routineData.duration,
      days_per_week: routineData.daysPerWeek,
      // Schedule is calculated dynamically, not stored
      objectives: routineData.objectives,
    });

    if (response.error) {
      throw response.error;
    }

    return response.data;
  }

  async deleteRoutine(routineId: string): Promise<void> {
    if (!this.supabase) {
      throw new Error('Database connection not available');
    }

    const {
      data: { user },
      error: authError,
    } = await this.supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('Not authenticated');
    }

    // Use the RPC function for proper cascading deletion
    const { data: result, error } = await this.supabase.rpc('delete_routine', {
      routine_id_param: routineId,
    });

    if (error) {
      throw error;
    }

    if (!result || !result.success) {
      throw new Error(result?.message || 'Failed to delete routine');
    }
  }

  async toggleRoutineFavorite(routineId: string): Promise<void> {
    if (!this.supabase) {
      throw new Error('Database connection not available');
    }

    const {
      data: { user },
      error: authError,
    } = await this.supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('Not authenticated');
    }

    // First, get the current favorite status
    const { data: routine, error: fetchError } = await this.supabase
      .from('routines')
      .select('is_favorite')
      .eq('id', routineId)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !routine) {
      throw new Error('Routine not found');
    }

    // Toggle the favorite status
    const { error: updateError } = await this.supabase
      .from('routines')
      .update({ is_favorite: !routine.is_favorite })
      .eq('id', routineId)
      .eq('user_id', user.id);

    if (updateError) {
      throw updateError;
    }
  }

  async updateRoutineProgress(
    routineId: string,
    completedWorkoutsIncrement: number = 1
  ): Promise<void> {
    if (!this.supabase) {
      throw new Error('Database connection not available');
    }

    const {
      data: { user },
      error: authError,
    } = await this.supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('Not authenticated');
    }

    // Use the RPC function for proper incremental progress tracking
    const { error } = await this.supabase.rpc('update_routine_progress', {
      routine_id_param: routineId,
      completed_workouts_increment: completedWorkoutsIncrement,
    });

    if (error) {
      throw error;
    }
  }

  async getHistoricalWorkouts(): Promise<{
    deletedRoutines: Record<string, unknown>[];
    orphanedWorkouts: Record<string, unknown>[];
  }> {
    if (!this.supabase) {
      throw new Error('Database connection not available');
    }

    const {
      data: { user },
      error: authError,
    } = await this.supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('Not authenticated');
    }

    // Get deleted routines for this user
    const { data: deletedRoutines, error: deletedRoutinesError } =
      await this.supabase
        .from('deleted_routines')
        .select('*')
        .eq('user_id', user.id)
        .order('deleted_at', { ascending: false });

    if (deletedRoutinesError) {
      throw deletedRoutinesError;
    }

    // Get orphaned workouts (workouts with NULL routine_id)
    const { data: orphanedWorkouts, error: orphanedWorkoutsError } =
      await this.supabase
        .from('workouts')
        .select(
          `
        *,
        workout_sections (
          id,
          name,
          type,
          order_index,
          rest_after,
          emom_duration,
          notes
        )
      `
        )
        .is('routine_id', null)
        .order('created_at', { ascending: false });

    if (orphanedWorkoutsError) {
      throw orphanedWorkoutsError;
    }

    return {
      deletedRoutines: deletedRoutines || [],
      orphanedWorkouts: orphanedWorkouts || [],
    };
  }
}

export const routineService = new RoutineService();
