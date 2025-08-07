import { NextResponse } from 'next/server';

import { exerciseService } from '@/features/exercises/services/exerciseService';
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

    // Exercises are part of the exercise library and should be accessible to all authenticated users
    // No need to check specific data access permissions for exercise library access

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
