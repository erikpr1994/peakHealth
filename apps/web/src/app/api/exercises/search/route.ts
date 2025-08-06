import { NextRequest, NextResponse } from 'next/server';

import { exerciseService } from '@/features/exercises/services/exerciseService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const muscleGroup = searchParams.get('muscleGroup') || '';
    const equipment = searchParams.get('equipment') || '';
    const difficulty = searchParams.get('difficulty') || '';

    const exercises = await exerciseService.searchExercises({
      searchTerm: query,
      category: category as any,
      difficulties: difficulty ? [difficulty as any] : undefined,
      equipment: equipment ? [equipment as any] : undefined,
      muscleGroups: muscleGroup ? [muscleGroup as any] : undefined,
    });

    return NextResponse.json({ exercises: exercises || [] });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Exercise search API error:', error);
    return NextResponse.json(
      { error: 'Failed to search exercises' },
      { status: 500 }
    );
  }
}
