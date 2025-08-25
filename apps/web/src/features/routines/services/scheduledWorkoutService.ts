import { createClient } from '@/lib/supabase/client';
import type {
  ScheduledWorkout,
  DatabaseScheduledWorkout,
  CreateScheduledWorkoutData,
  UpdateScheduledWorkoutData,
} from '../types/scheduledWorkout';

export class ScheduledWorkoutService {
  private supabase = createClient();

  /**
   * Generate scheduled workouts for a routine
   */
  async generateScheduledWorkouts(data: CreateScheduledWorkoutData): Promise<{
    success: boolean;
    count: number;
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

    try {
      // Call the database function to generate scheduled workouts
      const { data: result, error } = await this.supabase.rpc(
        'generate_scheduled_workouts',
        {
          routine_id_param: data.routineId,
          start_date_param:
            data.startDate || new Date().toISOString().split('T')[0],
          weeks_ahead_param: data.weeksAhead || 4,
        }
      );

      if (error) {
        throw error;
      }

      return {
        success: true,
        count: result || 0,
        message: `Generated ${result || 0} scheduled workouts`,
      };
    } catch (error) {
      return {
        success: false,
        count: 0,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to generate scheduled workouts',
      };
    }
  }

  /**
   * Clear scheduled workouts for a routine
   */
  async clearScheduledWorkouts(routineId: string): Promise<{
    success: boolean;
    count: number;
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

    try {
      // Call the database function to clear scheduled workouts
      const { data: result, error } = await this.supabase.rpc(
        'clear_scheduled_workouts',
        {
          routine_id_param: routineId,
        }
      );

      if (error) {
        throw error;
      }

      return {
        success: true,
        count: result || 0,
        message: `Cleared ${result || 0} scheduled workouts`,
      };
    } catch (error) {
      return {
        success: false,
        count: 0,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to clear scheduled workouts',
      };
    }
  }

  /**
   * Get scheduled workouts for a user
   */
  async getScheduledWorkouts(filters?: {
    routineId?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
  }): Promise<ScheduledWorkout[]> {
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

    let query = this.supabase
      .from('scheduled_workouts')
      .select('*')
      .eq('user_id', user.id)
      .order('scheduled_date', { ascending: true })
      .order('scheduled_time', { ascending: true });

    if (filters?.routineId) {
      query = query.eq('routine_id', filters.routineId);
    }

    if (filters?.startDate) {
      query = query.gte('scheduled_date', filters.startDate);
    }

    if (filters?.endDate) {
      query = query.lte('scheduled_date', filters.endDate);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return (data || []).map(this.transformDatabaseScheduledWorkout);
  }

  /**
   * Update a scheduled workout
   */
  async updateScheduledWorkout(
    scheduledWorkoutId: string,
    updates: UpdateScheduledWorkoutData
  ): Promise<ScheduledWorkout> {
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

    // Verify the scheduled workout belongs to the user
    const { data: existingWorkout, error: checkError } = await this.supabase
      .from('scheduled_workouts')
      .select('id')
      .eq('id', scheduledWorkoutId)
      .eq('user_id', user.id)
      .single();

    if (checkError || !existingWorkout) {
      throw new Error('Scheduled workout not found or access denied');
    }

    const updateData: Partial<DatabaseScheduledWorkout> = {};

    if (updates.status !== undefined) {
      updateData.status = updates.status;
    }

    if (updates.completedAt !== undefined) {
      updateData.completed_at = updates.completedAt;
    }

    if (updates.durationMinutes !== undefined) {
      updateData.duration_minutes = updates.durationMinutes;
    }

    if (updates.notes !== undefined) {
      updateData.notes = updates.notes;
    }

    const { data, error } = await this.supabase
      .from('scheduled_workouts')
      .update(updateData)
      .eq('id', scheduledWorkoutId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return this.transformDatabaseScheduledWorkout(data);
  }

  /**
   * Delete a scheduled workout
   */
  async deleteScheduledWorkout(scheduledWorkoutId: string): Promise<void> {
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

    // Verify the scheduled workout belongs to the user
    const { data: existingWorkout, error: checkError } = await this.supabase
      .from('scheduled_workouts')
      .select('id')
      .eq('id', scheduledWorkoutId)
      .eq('user_id', user.id)
      .single();

    if (checkError || !existingWorkout) {
      throw new Error('Scheduled workout not found or access denied');
    }

    const { error } = await this.supabase
      .from('scheduled_workouts')
      .delete()
      .eq('id', scheduledWorkoutId);

    if (error) {
      throw error;
    }
  }

  /**
   * Check if user has an active routine
   */
  async hasActiveRoutine(): Promise<{
    hasActive: boolean;
    activeRoutineId?: string;
    activeRoutineName?: string;
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

    const { data, error } = await this.supabase
      .from('routines')
      .select('id, name')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return {
      hasActive: !!data,
      activeRoutineId: data?.id,
      activeRoutineName: data?.name,
    };
  }

  /**
   * Transform database scheduled workout to frontend format
   */
  private transformDatabaseScheduledWorkout(
    dbWorkout: DatabaseScheduledWorkout
  ): ScheduledWorkout {
    return {
      id: dbWorkout.id,
      userId: dbWorkout.user_id,
      routineId: dbWorkout.routine_id,
      workoutId: dbWorkout.workout_id,
      scheduledDate: dbWorkout.scheduled_date,
      scheduledTime: dbWorkout.scheduled_time,
      status: dbWorkout.status,
      completedAt: dbWorkout.completed_at,
      durationMinutes: dbWorkout.duration_minutes,
      notes: dbWorkout.notes,
      createdAt: dbWorkout.created_at,
      updatedAt: dbWorkout.updated_at,
    };
  }
}
