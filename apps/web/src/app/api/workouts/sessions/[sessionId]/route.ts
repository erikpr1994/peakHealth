import { NextRequest, NextResponse } from 'next/server';

import { DATA_ACCESS_LEVELS } from '@/lib/data-access';
import { createClient } from '@/lib/supabase/server';
import {
  ExercisePerformance,
  UpdateSessionPayload,
  validateSessionOwnership,
  validateSessionState,
  validateUpdateSessionPayload,
  validateWorkoutAccess,
} from '@/lib/validation/workout-sessions';

/**
 * PUT /api/workouts/sessions/:id
 * Updates a workout session with performance data
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }

    // Authenticate user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Check data access permissions for workout data (need write access)
    const userDataAccessRules = user.app_metadata?.data_access_rules || {};
    const accessError = validateWorkoutAccess(
      userDataAccessRules,
      DATA_ACCESS_LEVELS.FULL
    );

    if (accessError) {
      return NextResponse.json({ error: accessError }, { status: 403 });
    }

    const { sessionId } = await params;

    // Validate session ownership
    const { session, error: ownershipError } = await validateSessionOwnership(
      supabase,
      sessionId,
      user.id
    );

    if (ownershipError) {
      return NextResponse.json({ error: ownershipError }, { status: 404 });
    }

    // Validate session state
    const stateError = validateSessionState(session, 'update');
    if (stateError) {
      return NextResponse.json({ error: stateError }, { status: 400 });
    }

    // Validate request payload
    const payload = await request.json() as UpdateSessionPayload;
    const validationError = validateUpdateSessionPayload(payload);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { notes, exercises } = payload;

    // Update the workout session
    const updateData: Record<string, unknown> = {};
    
    if (notes !== undefined) {
      updateData.notes = notes;
    }
    
    // Only update if there are fields to update
    let updatedSession = session;
    if (Object.keys(updateData).length > 0) {
      const { data: updated, error: updateError } = await supabase
        .from('workout_sessions')
        .update(updateData)
        .eq('id', sessionId)
        .select()
        .single();

      if (updateError) {
        // Log error to server console
        console.error('Error updating workout session:', updateError);
        return NextResponse.json(
          { error: 'Failed to update workout session' },
          { status: 500 }
        );
      }
      
      updatedSession = updated;
    }

    // If exercises data is provided, save the exercise performance
    if (exercises && Array.isArray(exercises)) {
      // First, check if there are existing exercises for this session
      const { data: existingExercises } = await supabase
        .from('workout_session_exercises')
        .select('id, exercise_variant_id')
        .eq('workout_session_id', sessionId);
      
      // If there are existing exercises, delete them before inserting new ones
      if (existingExercises && existingExercises.length > 0) {
        await supabase
          .from('workout_session_exercises')
          .delete()
          .eq('workout_session_id', sessionId);
      }
      
      // Insert new exercise data
      const exerciseData = exercises.map((exercise: ExercisePerformance) => ({
        workout_session_id: sessionId,
        exercise_variant_id: exercise.exerciseVariantId,
        exercise_order: exercise.exerciseOrder,
        sets_completed: exercise.setsCompleted || 0,
        reps_completed: exercise.repsCompleted || 0,
        weight_kg: exercise.weightKg,
        rest_time_seconds: exercise.restTimeSeconds,
        notes: exercise.notes,
      }));

      const { error: exercisesError } = await supabase
        .from('workout_session_exercises')
        .insert(exerciseData);

      if (exercisesError) {
        // Log error to server console
        console.error('Error saving exercise data:', exercisesError);
        return NextResponse.json(
          { error: 'Failed to save exercise performance data' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      session: updatedSession,
      message: 'Workout session updated successfully',
    });
  } catch (error) {
    // Log error to server console
    console.error('Update workout session API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Check data access permissions for workout data
    const userDataAccessRules = user.app_metadata?.data_access_rules || {};

    if (
      !canAccessOwnWorkouts(DATA_ACCESS_LEVELS.READ_ONLY, userDataAccessRules)
    ) {
      return NextResponse.json(
        { error: 'Insufficient permissions to access workout data' },
        { status: 403 }
      );
    }

    const { sessionId } = await params;

    // Get the workout session with related data
    const { data: session, error: sessionError } = await supabase
      .from('workout_sessions')
      .select(
        `
        *,
        workout_routines (
          id,
          name,
          description
        ),
        workout_session_exercises (
          *,
          exercise_variants (
            *,
            exercises (
              id,
              name,
              category
            )
          )
        )
      `
      )
      .eq('id', sessionId)
      .eq('user_id', user.id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Workout session not found or access denied' },
        { status: 404 }
      );
    }

    return NextResponse.json({ session });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Get workout session API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
