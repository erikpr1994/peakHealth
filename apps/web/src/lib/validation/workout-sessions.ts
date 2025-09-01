import { SupabaseClient } from '@supabase/supabase-js';

import { canAccessOwnWorkouts, DATA_ACCESS_LEVELS } from '@/lib/data-access';

/**
 * Type for workout session data
 */
export interface WorkoutSession {
  id: string;
  user_id: string;
  routine_id: string;
  started_at: string;
  completed_at?: string;
  duration_minutes?: number;
  notes?: string;
  status?: string;
}

/**
 * Type for exercise performance data
 */
export interface ExercisePerformance {
  exerciseVariantId: string;
  exerciseOrder: number;
  setsCompleted?: number;
  repsCompleted?: number;
  weightKg?: number;
  restTimeSeconds?: number;
  notes?: string;
}

/**
 * Type for start session payload
 */
export interface StartSessionPayload {
  routineId: string;
  notes?: string;
}

/**
 * Type for update session payload
 */
export interface UpdateSessionPayload {
  notes?: string;
  exercises?: ExercisePerformance[];
}

/**
 * Type for complete session payload
 */
export interface CompleteSessionPayload {
  durationMinutes?: number;
  notes?: string;
}

/**
 * Validates that the user has access to their own workout data
 * @param userDataAccessRules The user's data access rules
 * @param requiredLevel The required access level
 * @returns An error message if validation fails, null otherwise
 */
export function validateWorkoutAccess(
  userDataAccessRules: Record<string, string>,
  requiredLevel = DATA_ACCESS_LEVELS.READ_ONLY
): string | null {
  if (!canAccessOwnWorkouts(requiredLevel, userDataAccessRules)) {
    return `Insufficient permissions to ${
      requiredLevel === DATA_ACCESS_LEVELS.READ_ONLY ? 'access' : 'modify'
    } workout data`;
  }
  return null;
}

/**
 * Validates that the user owns the specified workout session
 * @param supabase The Supabase client
 * @param sessionId The workout session ID
 * @param userId The user's ID
 * @returns An object containing the session data and any error
 */
export async function validateSessionOwnership(
  supabase: SupabaseClient,
  sessionId: string,
  userId: string
): Promise<{
  session: WorkoutSession | null;
  error: string | null;
}> {
  const { data: session, error: sessionError } = await supabase
    .from('workout_sessions')
    .select('id, user_id, status, notes, completed_at')
    .eq('id', sessionId)
    .eq('user_id', userId)
    .single();

  if (sessionError || !session) {
    return {
      session: null,
      error: 'Workout session not found or access denied',
    };
  }

  return { session, error: null };
}

/**
 * Validates the start session request payload
 * @param payload The request payload
 * @returns An error message if validation fails, null otherwise
 */
export function validateStartSessionPayload(
  payload: StartSessionPayload | null | undefined
): string | null {
  if (!payload) {
    return 'Request body is required';
  }

  if (!payload.routineId) {
    return 'Routine ID is required';
  }

  return null;
}

/**
 * Validates the update session request payload
 * @param payload The request payload
 * @returns An error message if validation fails, null otherwise
 */
export function validateUpdateSessionPayload(
  payload: UpdateSessionPayload | null | undefined
): string | null {
  if (!payload) {
    return 'Request body is required';
  }

  // Validate exercises array if provided
  if (payload.exercises) {
    if (!Array.isArray(payload.exercises)) {
      return 'Exercises must be an array';
    }

    for (const exercise of payload.exercises) {
      if (!exercise.exerciseVariantId) {
        return 'Exercise variant ID is required for each exercise';
      }
      if (typeof exercise.exerciseOrder !== 'number') {
        return 'Exercise order is required and must be a number';
      }
    }
  }

  return null;
}

/**
 * Validates the complete session request payload
 * @param payload The request payload
 * @returns An error message if validation fails, null otherwise
 */
export function validateCompleteSessionPayload(
  payload: CompleteSessionPayload | null | undefined
): string | null {
  if (!payload) {
    return 'Request body is required';
  }

  if (payload.durationMinutes && typeof payload.durationMinutes !== 'number') {
    return 'Duration minutes must be a number';
  }

  return null;
}

/**
 * Validates that the session is in a valid state for the requested operation
 * @param session The workout session
 * @param operation The operation being performed ('update' or 'complete')
 * @returns An error message if validation fails, null otherwise
 */
export function validateSessionState(
  session: WorkoutSession | null,
  operation: 'update' | 'complete'
): string | null {
  if (!session) {
    return 'Session not found';
  }

  if (operation === 'complete' && session.completed_at) {
    return 'Session is already completed';
  }

  return null;
}
