import { NextRequest, NextResponse } from 'next/server';

import { exerciseService } from '@/features/exercises/services/exerciseService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ exerciseId: string }> }
) {
  try {
    const { exerciseId } = await params;

    if (!exerciseId) {
      return NextResponse.json(
        { error: 'Exercise ID is required' },
        { status: 400 }
      );
    }

    const exercise = await exerciseService.getExerciseById(exerciseId);

    if (!exercise) {
      return NextResponse.json(
        { error: 'Exercise not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ exercise });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in exercise API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exercise' },
      { status: 500 }
    );
  }
}
