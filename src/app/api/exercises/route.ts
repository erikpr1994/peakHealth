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

    const searchTerm = searchParams.get('search') || undefined;
    const category = (searchParams.get('category') as Category) || undefined;
    const difficulty =
      (searchParams.get('difficulty') as Difficulty) || undefined;
    const equipment = (searchParams.get('equipment') as Equipment) || undefined;
    const muscleGroup =
      (searchParams.get('muscleGroup') as MuscleGroup) || undefined;

    // If any filter is present, do a filtered search
    if (searchTerm || category || difficulty || equipment || muscleGroup) {
      const searchResults = await exerciseService.searchExercises({
        searchTerm,
        category,
        difficulty,
        equipment,
        muscleGroup,
      });
      return NextResponse.json({ exercises: searchResults });
    }

    // Otherwise, return all exercises
    const exercises = await exerciseService.getAllExercises();
    return NextResponse.json({ exercises });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch exercises' },
      { status: 500 }
    );
  }
}
