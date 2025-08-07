import { NextRequest, NextResponse } from 'next/server';

import { canAccessOwnWorkouts, DATA_ACCESS_LEVELS } from '@/lib/data-access';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
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
      // eslint-disable-next-line no-console
      console.error('Error fetching workout sessions:', sessionsError);
      return NextResponse.json(
        { error: 'Failed to fetch workout sessions' },
        { status: 500 }
      );
    }

    return NextResponse.json({ sessions: sessions || [] });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Workout sessions API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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
        { error: 'Insufficient permissions to create workout sessions' },
        { status: 403 }
      );
    }

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
      })
      .select()
      .single();

    if (sessionError) {
      // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
    console.error('Create workout session API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
