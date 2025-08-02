import { NextRequest, NextResponse } from 'next/server';

import { exerciseService } from '@/features/exercises/services/exerciseService';
import type {
  Category,
  Difficulty,
  Equipment,
  MuscleGroup,
} from '@/features/exercises/types/constants';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const searchTerm = searchParams.get('searchTerm') || undefined;
    const category = (searchParams.get('category') as Category) || undefined;
    const difficulty =
      (searchParams.get('difficulty') as Difficulty) || undefined;
    const equipment = (searchParams.get('equipment') as Equipment) || undefined;
    const muscleGroup =
      (searchParams.get('muscleGroup') as MuscleGroup) || undefined;

    const exercises = await exerciseService.searchExercises({
      searchTerm,
      category,
      difficulty,
      equipment,
      muscleGroup,
    });

    return NextResponse.json({ exercises });
  } catch (error) {
    console.error('Error searching exercises:', error);
    return NextResponse.json(
      { error: 'Failed to search exercises' },
      { status: 500 }
    );
  }
}
