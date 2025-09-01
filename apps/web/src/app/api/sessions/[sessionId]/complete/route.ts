import { NextRequest, NextResponse } from 'next/server';

import { DATA_ACCESS_LEVELS } from '@/lib/data-access';
import { createClient } from '@/lib/supabase/server';
import {
  CompleteSessionPayload,
  validateCompleteSessionPayload,
  validateSessionOwnership,
  validateSessionState,
  validateWorkoutAccess,
} from '@/lib/validation/workout-sessions';

/**
 * POST /api/sessions/:id/complete
 * Marks a workout session as completed
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
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

    const { sessionId } = params;

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
    const stateError = validateSessionState(session, 'complete');
    if (stateError) {
      return NextResponse.json({ error: stateError }, { status: 400 });
    }

    // Validate request payload
    const payload = await request.json() as CompleteSessionPayload;
    const validationError = validateCompleteSessionPayload(payload);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { durationMinutes, notes } = payload;
    const completedAt = new Date().toISOString();

    // Update the workout session to mark it as completed
    const { data: updatedSession, error: updateError } = await supabase
      .from('workout_sessions')
      .update({
        completed_at: completedAt,
        duration_minutes: durationMinutes,
        notes: notes || session?.notes,
        status: 'completed',
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (updateError) {
      // Log error to server console
      console.error('Error completing workout session:', updateError);
      return NextResponse.json(
        { error: 'Failed to complete workout session' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      session: updatedSession,
      message: 'Workout session completed successfully',
    });
  } catch (error) {
    // Log error to server console
    console.error('Complete workout session API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
