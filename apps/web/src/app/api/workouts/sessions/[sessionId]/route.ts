import { NextRequest, NextResponse } from 'next/server';

import { canAccessOwnWorkouts, DATA_ACCESS_LEVELS } from '@/lib/data-access';
import { createClient } from '@/lib/supabase/server';

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

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Check data access permissions for workout data (need write access)
    const userDataAccessRules = user.app_metadata?.data_access_rules || {};

    if (!canAccessOwnWorkouts(DATA_ACCESS_LEVELS.FULL, userDataAccessRules)) {
      return NextResponse.json(
        { error: 'Insufficient permissions to update workout sessions' },
        { status: 403 }
      );
    }

    const { sessionId } = await params;
    const { completedAt, durationMinutes, notes, exercises } =
      await request.json();

    // Verify the session belongs to the user
    const { data: session, error: sessionError } = await supabase
      .from('workout_sessions')
      .select('id, user_id')
      .eq('id', sessionId)
      .eq('user_id', user.id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Workout session not found or access denied' },
        { status: 404 }
      );
    }

    // Update the workout session
    const { data: updatedSession, error: updateError } = await supabase
      .from('workout_sessions')
      .update({
        completed_at: completedAt || new Date().toISOString(),
        duration_minutes: durationMinutes,
        notes: notes,
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (updateError) {
      // eslint-disable-next-line no-console
      console.error('Error updating workout session:', updateError);
      return NextResponse.json(
        { error: 'Failed to update workout session' },
        { status: 500 }
      );
    }

    // If exercises data is provided, save the exercise performance
    if (exercises && Array.isArray(exercises)) {
      const exerciseData = exercises.map((exercise: any) => ({
        workout_session_id: sessionId,
        exercise_variant_id: exercise.exerciseVariantId,
        exercise_order: exercise.exerciseOrder,
        sets_completed: exercise.setsCompleted,
        reps_completed: exercise.repsCompleted,
        weight_kg: exercise.weightKg,
        rest_time_seconds: exercise.restTimeSeconds,
        notes: exercise.notes,
      }));

      const { error: exercisesError } = await supabase
        .from('workout_session_exercises')
        .insert(exerciseData);

      if (exercisesError) {
        // eslint-disable-next-line no-console
        console.error('Error saving exercise data:', exercisesError);
        // Don't fail the entire request, just log the error
      }
    }

    return NextResponse.json({
      success: true,
      session: updatedSession,
      message: 'Workout session completed successfully',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Complete workout session API error:', error);
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
