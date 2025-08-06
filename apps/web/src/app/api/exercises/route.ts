import { NextResponse } from 'next/server';

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

    // eslint-disable-next-line no-console
    console.log('Fetching exercises...');

    const { data: exercises, error } = await supabase
      .from('exercises')
      .select('*')
      .order('name');

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching exercises:', error);
      return NextResponse.json(
        { error: 'Failed to fetch exercises' },
        { status: 500 }
      );
    }

    return NextResponse.json({ exercises: exercises || [] });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Exercises API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
