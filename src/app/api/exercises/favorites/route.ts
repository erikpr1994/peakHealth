import { NextRequest, NextResponse } from 'next/server';

import { exerciseService } from '@/features/exercises/services/exerciseService';

export async function POST(request: NextRequest) {
  try {
    const { userId, exerciseId } = await request.json();

    if (!userId || !exerciseId) {
      return NextResponse.json(
        { error: 'User ID and Exercise ID are required' },
        { status: 400 }
      );
    }

    await exerciseService.addToFavorites(userId, exerciseId);

    return NextResponse.json({ success: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error adding to favorites:', error);
    return NextResponse.json(
      { error: 'Failed to add to favorites' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const exerciseId = searchParams.get('exerciseId');

    if (!userId || !exerciseId) {
      return NextResponse.json(
        { error: 'User ID and Exercise ID are required' },
        { status: 400 }
      );
    }

    await exerciseService.removeFromFavorites(userId, exerciseId);

    return NextResponse.json({ success: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error removing from favorites:', error);
    return NextResponse.json(
      { error: 'Failed to remove from favorites' },
      { status: 500 }
    );
  }
}
