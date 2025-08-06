import { NextResponse } from 'next/server';

import { exerciseService } from '@/features/exercises/services/exerciseService';

export async function GET() {
  try {
    // eslint-disable-next-line no-console
    console.log('Fetching exercises...');

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
