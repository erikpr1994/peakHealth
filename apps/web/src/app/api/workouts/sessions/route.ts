import { NextRequest, NextResponse } from 'next/server';

import { DATA_ACCESS_LEVELS } from '@/lib/data-access';
import { createClient } from '@/lib/supabase/server';
import { validateWorkoutAccess } from '@/lib/validation/workout-sessions';

/**
 * GET /api/workouts/sessions
 * Gets all workout sessions for the authenticated user
 */
export async function GET() {
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

    // Check data access permissions for workout data
    const userDataAccessRules = user.app_metadata?.data_access_rules || {};
    const accessError = validateWorkoutAccess(
      userDataAccessRules,
      DATA_ACCESS_LEVELS.READ_ONLY
    );

    if (accessError) {
      return NextResponse.json({ error: accessError }, { status: 403 });
    }

    // Get user's workout sessions
    const { data: sessions, error: sessionsError } = await supabase
      .from('workout_sessions')
      .select(
        `
        *,
        workout_routines (
          id,
          name,
          description
        )
      `
      )
      .eq('user_id', user.id)
      .order('started_at', { ascending: false });

    if (sessionsError) {
      // Log error to server console
      console.error('Error fetching workout sessions:', sessionsError);
      return NextResponse.json(
        { error: 'Failed to fetch workout sessions' },
        { status: 500 }
      );
    }

    return NextResponse.json({ sessions: sessions || [] });
  } catch (error) {
    // Log error to server console
    console.error('Workout sessions API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/workouts/sessions
 * This endpoint is deprecated. Use /api/sessions/start instead.
 */
export async function POST(request: NextRequest) {
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

    // This endpoint is deprecated, but we'll keep it for backward compatibility
    // with a warning message
    const { routineId, notes } = await request.json();

    if (!routineId) {
      return NextResponse.json(
        { error: 'Routine ID is required' },
        { status: 400 }
      );
    }

    // Verify the routine belongs to the user
    const { data: routine, error: routineError } = await supabase
      .from('workout_routines')
      .select('id')
      .eq('id', routineId)
      .eq('user_id', user.id)
      .single();

    if (routineError || !routine) {
      return NextResponse.json(
        { error: 'Routine not found or access denied' },
        { status: 404 }
      );
    }

    // Create new workout session
    const { data: session, error: sessionError } = await supabase
      .from('workout_sessions')
      .insert({
        user_id: user.id,
        routine_id: routineId,
        started_at: new Date().toISOString(),
        notes,
        status: 'in-progress',
      })
      .select()
      .single();

    if (sessionError) {
      // Log error to server console
      console.error('Error creating workout session:', sessionError);
      return NextResponse.json(
        { error: 'Failed to create workout session' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      session,
      message: 'Workout session started successfully',
      warning: 'This endpoint is deprecated. Use /api/sessions/start instead.',
    });
  } catch (error) {
    // Log error to server console
    console.error('Create workout session API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
