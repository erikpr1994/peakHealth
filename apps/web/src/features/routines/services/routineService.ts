import { createClient } from '@/lib/supabase/client';

import { Routine, StrengthWorkout, RunningWorkout } from '../types';
import { DatabaseRoutineResponse } from '../types/database';

export interface CreateRoutineData {
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss';
  duration: number;
  daysPerWeek: number;
  schedule: boolean[];
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
  schedule?: boolean[];
  objectives?: string[];
}

export class RoutineService {
  private supabase = createClient();

  async getUserRoutines(): Promise<Routine[]> {
    try {
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

      // Transform data to match frontend types
      return (routines || []).map(
        (routine: DatabaseRoutineResponse['routine']) => {
          return {
            id: routine.id,
            name: routine.name || '',
            description: routine.description || '',
            daysPerWeek: routine.days_per_week || 3,
            difficulty: routine.difficulty || 'Beginner',
            goal: routine.goal || 'Strength',
            isActive: routine.is_active ?? false,
            isFavorite: routine.is_favorite ?? false,
            schedule: routine.schedule || [
              false,
              false,
              false,
              false,
              false,
              false,
              false,
            ],
            progress: {
              current: routine.completed_workouts ?? 0,
              total: routine.total_workouts ?? 0,
            },
            lastUsed: routine.last_used,
            objectives: routine.objectives || [],
            totalWorkouts: routine.total_workouts ?? 0,
            completedWorkouts: routine.completed_workouts ?? 0,
            estimatedDuration: routine.estimated_duration || '45-60 min',
          };
        }
      );
    } catch (error) {
      console.error('Error fetching user routines:', error);
      throw error;
    }
  }

  async setActiveRoutine(routineId: string): Promise<void> {
    try {
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
        console.error('Error deactivating routines:', deactivateError);
        throw deactivateError;
      }

      // Then activate the selected routine
      const { error: updateError } = await this.supabase
        .from('routines')
        .update({ is_active: true })
        .eq('id', routineId)
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Error activating routine:', updateError);
        throw updateError;
      }
    } catch (error) {
      console.error('Error setting active routine:', error);
      throw error;
    }
  }

  async getRoutineById(routineId: string): Promise<any> {
    try {
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
    } catch (error) {
      console.error('Error fetching routine:', error);
      throw error;
    }
  }

  async createRoutine(routineData: CreateRoutineData): Promise<any> {
    try {
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
        schedule,
        objectives,
        strengthWorkouts,
        runningWorkouts,
      } = routineData;

      // Basic validation
      if (!name || !difficulty || !goal || !daysPerWeek) {
        throw new Error('Missing required fields');
      }

      // Start a transaction
      const { data: routine, error: routineError } = await this.supabase
        .from('routines')
        .insert({
          user_id: user.id,
          name,
          description,
          difficulty,
          goal,
          days_per_week: daysPerWeek,
          schedule: schedule || [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ],
          objectives: objectives ? [objectives] : [],
        })
        .select()
        .single();

      if (routineError) {
        console.error('Error creating routine:', routineError);
        throw new Error('Failed to create routine');
      }

      // Insert strength workouts
      if (strengthWorkouts && strengthWorkouts.length > 0) {
        for (let i = 0; i < strengthWorkouts.length; i++) {
          const workout = strengthWorkouts[i];

          const { data: workoutData, error: workoutError } = await this.supabase
            .from('workouts')
            .insert({
              routine_id: routine.id,
              name: workout.name,
              type: 'strength',
              objective: workout.objective,
              schedule: workout.schedule,
              order_index: i,
            })
            .select()
            .single();

          if (workoutError) {
            console.error('Error creating strength workout:', workoutError);
            continue;
          }

          // Insert sections for this workout
          if (workout.sections && workout.sections.length > 0) {
            for (let j = 0; j < workout.sections.length; j++) {
              const section = workout.sections[j];

              const { data: sectionData, error: sectionError } =
                await this.supabase
                  .from('workout_sections')
                  .insert({
                    workout_id: workoutData.id,
                    name: section.name,
                    type: section.type,
                    order_index: j,
                    rest_after: section.restAfter,
                    emom_duration: section.emomDuration,
                  })
                  .select()
                  .single();

              if (sectionError) {
                console.error('Error creating section:', sectionError);
                continue;
              }

              // Insert exercises for this section
              if (section.exercises && section.exercises.length > 0) {
                for (let k = 0; k < section.exercises.length; k++) {
                  const exercise = section.exercises[k];

                  const { data: exerciseData, error: exerciseError } =
                    await this.supabase
                      .from('routine_exercises')
                      .insert({
                        section_id: sectionData.id,
                        name: exercise.name,
                        category: exercise.category,
                        muscle_groups: exercise.muscleGroups,
                        order_index: k,
                        rest_timer: exercise.restTimer,
                        rest_after: exercise.restAfter,
                        progression_method: exercise.progressionMethod,
                        has_approach_sets: exercise.hasApproachSets,
                        emom_reps: exercise.emomReps,
                      })
                      .select()
                      .single();

                  if (exerciseError) {
                    console.error('Error creating exercise:', exerciseError);
                    continue;
                  }

                  // Insert sets for this exercise
                  if (exercise.sets && exercise.sets.length > 0) {
                    for (let l = 0; l < exercise.sets.length; l++) {
                      const set = exercise.sets[l];

                      await this.supabase.from('exercise_sets').insert({
                        exercise_id: exerciseData.id,
                        set_number: l + 1,
                        reps: set.reps,
                        weight: set.weight,
                        notes: set.notes,
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }

      // Insert running workouts
      if (runningWorkouts && runningWorkouts.length > 0) {
        for (let i = 0; i < runningWorkouts.length; i++) {
          const workout = runningWorkouts[i];

          const { data: workoutData, error: workoutError } = await this.supabase
            .from('workouts')
            .insert({
              routine_id: routine.id,
              name: workout.name,
              type: workout.type,
              objective: workout.objective,
              schedule: workout.schedule,
              order_index: strengthWorkouts ? strengthWorkouts.length + i : i,
            })
            .select()
            .single();

          if (workoutError) {
            console.error('Error creating running workout:', workoutError);
            continue;
          }

          // Insert trail running data if present
          if (workout.trailRunningData) {
            await this.supabase.from('trail_running_data').insert({
              workout_id: workoutData.id,
              name: workout.trailRunningData.name,
              description: workout.trailRunningData.description,
              difficulty: workout.trailRunningData.difficulty,
              estimated_duration: workout.trailRunningData.estimatedDuration,
              target_distance: workout.trailRunningData.targetDistance,
              elevation_gain: workout.trailRunningData.elevationGain,
            });
          }

          // Insert sections for this workout
          if (workout.sections && workout.sections.length > 0) {
            for (let j = 0; j < workout.sections.length; j++) {
              const section = workout.sections[j];

              const { data: sectionData, error: sectionError } =
                await this.supabase
                  .from('workout_sections')
                  .insert({
                    workout_id: workoutData.id,
                    name: section.name,
                    type: section.type,
                    order_index: j,
                    rest_after: section.restAfter,
                    emom_duration: section.emomDuration,
                  })
                  .select()
                  .single();

              if (sectionError) {
                console.error('Error creating section:', sectionError);
                continue;
              }

              // Insert exercises for this section
              if (section.exercises && section.exercises.length > 0) {
                for (let k = 0; k < section.exercises.length; k++) {
                  const exercise = section.exercises[k];

                  const { data: exerciseData, error: exerciseError } =
                    await this.supabase
                      .from('routine_exercises')
                      .insert({
                        section_id: sectionData.id,
                        name: exercise.name,
                        category: exercise.category,
                        muscle_groups: exercise.muscleGroups,
                        order_index: k,
                        rest_timer: exercise.restTimer,
                        rest_after: exercise.restAfter,
                        emom_reps: exercise.emomReps,
                      })
                      .select()
                      .single();

                  if (exerciseError) {
                    console.error('Error creating exercise:', exerciseError);
                    continue;
                  }

                  // Insert sets for this exercise
                  if (exercise.sets && exercise.sets.length > 0) {
                    for (let l = 0; l < exercise.sets.length; l++) {
                      const set = exercise.sets[l];

                      await this.supabase.from('exercise_sets').insert({
                        exercise_id: exerciseData.id,
                        set_number: l + 1,
                        reps: set.reps,
                        weight: set.weight,
                        notes: set.notes,
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }

      return {
        success: true,
        routine: routine,
        message: 'Routine created successfully',
      };
    } catch (error) {
      console.error('Error creating routine:', error);
      throw error;
    }
  }

  async updateRoutine(
    routineId: string,
    routineData: UpdateRoutineData
  ): Promise<any> {
    try {
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
        days_per_week: routineData.daysPerWeek,
        schedule: routineData.schedule,
        objectives: routineData.objectives,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    } catch (error) {
      console.error('Error updating routine:', error);
      throw error;
    }
  }

  async deleteRoutine(routineId: string): Promise<void> {
    try {
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

      const response = await this.supabase.rpc('delete_routine', {
        routine_id_param: routineId,
      });

      if (response.error) {
        throw response.error;
      }
    } catch (error) {
      console.error('Error deleting routine:', error);
      throw error;
    }
  }

  async toggleRoutineFavorite(routineId: string): Promise<void> {
    try {
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

      // First get current favorite status
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
    } catch (error) {
      console.error('Error toggling routine favorite:', error);
      throw error;
    }
  }

  async updateRoutineProgress(
    routineId: string,
    completedWorkoutsIncrement: number = 1
  ): Promise<void> {
    try {
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

      const { error } = await this.supabase.rpc('update_routine_progress', {
        routine_id_param: routineId,
        completed_workouts_increment: completedWorkoutsIncrement,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating routine progress:', error);
      throw error;
    }
  }
}

export const routineService = new RoutineService();
