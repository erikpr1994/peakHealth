import { NextResponse } from 'next/server';

import { exerciseService } from '@/features/exercises/services/exerciseService';
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

    // Check data access permissions for workout data (exercises are part of workout system)
    const userDataAccessRules = user.app_metadata?.data_access_rules || {};

    if (
      !canAccessOwnWorkouts(DATA_ACCESS_LEVELS.READ_ONLY, userDataAccessRules)
    ) {
      return NextResponse.json(
        { error: 'Insufficient permissions to access exercise data' },
        { status: 403 }
      );
    }

    const exercises = await exerciseService.getAllExercises();

    return NextResponse.json({ exercises: exercises || [] });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Exercises API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exercises' },
      { status: 500 }
    );
  }
}
