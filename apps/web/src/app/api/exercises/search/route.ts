import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const muscleGroup = searchParams.get('muscleGroup') || '';
    const equipment = searchParams.get('equipment') || '';
    const difficulty = searchParams.get('difficulty') || '';

    let supabaseQuery = supabase.from('exercises').select('*').order('name');

    // Apply filters
    if (query) {
      supabaseQuery = supabaseQuery.ilike('name', `%${query}%`);
    }

    if (category) {
      supabaseQuery = supabaseQuery.eq('category', category);
    }

    if (muscleGroup) {
      supabaseQuery = supabaseQuery.contains('muscle_groups', [muscleGroup]);
    }

    if (equipment) {
      supabaseQuery = supabaseQuery.eq('equipment', equipment);
    }

    if (difficulty) {
      supabaseQuery = supabaseQuery.eq('difficulty', difficulty);
    }

    const { data: exercises, error } = await supabaseQuery;

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Error searching exercises:', error);
      return NextResponse.json(
        { error: 'Failed to search exercises' },
        { status: 500 }
      );
    }

    return NextResponse.json({ exercises: exercises || [] });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Exercise search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
