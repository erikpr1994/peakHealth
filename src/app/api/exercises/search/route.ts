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

    // Handle multiple values for filters
    const difficulties = searchParams.getAll('difficulty') as Difficulty[];
    const equipment = searchParams.getAll('equipment') as Equipment[];
    const muscleGroups = searchParams.getAll('muscleGroup') as MuscleGroup[];

    const exercises = await exerciseService.searchExercises({
      searchTerm,
      category,
      difficulties: difficulties.length > 0 ? difficulties : undefined,
      equipment: equipment.length > 0 ? equipment : undefined,
      muscleGroups: muscleGroups.length > 0 ? muscleGroups : undefined,
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
