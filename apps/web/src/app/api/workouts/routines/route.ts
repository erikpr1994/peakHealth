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

    // Get user's workout routines using the database function
    const { data: routines, error: routinesError } = await supabase.rpc(
      'get_user_workout_routines',
      { user_id_param: user.id }
    );

    if (routinesError) {
      // eslint-disable-next-line no-console
      console.error('Error fetching workout routines:', routinesError);
      return NextResponse.json(
        { error: 'Failed to fetch workout routines' },
        { status: 500 }
      );
    }

    return NextResponse.json({ routines: routines || [] });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Workout routines API error:', error);
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
        { error: 'Insufficient permissions to create workout routines' },
        { status: 403 }
      );
    }

    const {
      name,
      description,
      schedule,
      isActive = true,
    } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Routine name is required' },
        { status: 400 }
      );
    }

    // Create new workout routine
    const { data: routine, error: routineError } = await supabase
      .from('workout_routines')
      .insert({
        user_id: user.id,
        name,
        description,
        schedule,
        is_active: isActive,
      })
      .select()
      .single();

    if (routineError) {
      // eslint-disable-next-line no-console
      console.error('Error creating workout routine:', routineError);
      return NextResponse.json(
        { error: 'Failed to create workout routine' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      routine,
      message: 'Workout routine created successfully',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Create workout routine API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
