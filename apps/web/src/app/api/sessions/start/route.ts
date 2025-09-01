import { NextRequest, NextResponse } from 'next/server';

import { DATA_ACCESS_LEVELS } from '@/lib/data-access';
import { createClient } from '@/lib/supabase/server';
import {
  StartSessionPayload,
  validateStartSessionPayload,
  validateWorkoutAccess,
} from '@/lib/validation/workout-sessions';

/**
 * POST /api/sessions/start
 * Starts a new workout session for the authenticated user
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

    // Validate request payload
    const payload = await request.json() as StartSessionPayload;
    const validationError = validateStartSessionPayload(payload);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { routineId, notes } = payload;

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
        status: 'in-progress', // Add status field to track session state
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
    });
  } catch (error) {
    // Log error to server console
    console.error('Start workout session API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
