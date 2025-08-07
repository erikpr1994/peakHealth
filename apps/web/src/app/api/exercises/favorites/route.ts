import { NextRequest, NextResponse } from 'next/server';

import { exerciseService } from '@/features/exercises/services/exerciseService';
import { canAccessOwnWorkouts, DATA_ACCESS_LEVELS } from '@/lib/data-access';
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

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if user is accessing their own favorites or has permission to access others
    const userDataAccessRules = user.app_metadata?.data_access_rules || {};

    if (userId !== user.id) {
      // User is trying to access someone else's favorites
      // This would require client data access permissions
      return NextResponse.json(
        { error: "Insufficient permissions to access other users' favorites" },
        { status: 403 }
      );
    }

    // Check data access permissions for own workout data
    if (
      !canAccessOwnWorkouts(DATA_ACCESS_LEVELS.READ_ONLY, userDataAccessRules)
    ) {
      return NextResponse.json(
        { error: 'Insufficient permissions to access workout data' },
        { status: 403 }
      );
    }

    const favorites = await exerciseService.getUserFavoriteExercises(userId);

    return NextResponse.json({ exercises: favorites });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching user favorites:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user favorites' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const { userId, exerciseId } = await request.json();

    if (!userId || !exerciseId) {
      return NextResponse.json(
        { error: 'User ID and Exercise ID are required' },
        { status: 400 }
      );
    }

    // Check if user is modifying their own favorites
    if (userId !== user.id) {
      return NextResponse.json(
        { error: "Insufficient permissions to modify other users' favorites" },
        { status: 403 }
      );
    }

    // Check data access permissions for own workout data (need write access)
    const userDataAccessRules = user.app_metadata?.data_access_rules || {};

    if (!canAccessOwnWorkouts(DATA_ACCESS_LEVELS.FULL, userDataAccessRules)) {
      return NextResponse.json(
        { error: 'Insufficient permissions to modify workout data' },
        { status: 403 }
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

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const exerciseId = searchParams.get('exerciseId');

    if (!userId || !exerciseId) {
      return NextResponse.json(
        { error: 'User ID and Exercise ID are required' },
        { status: 400 }
      );
    }

    // Check if user is modifying their own favorites
    if (userId !== user.id) {
      return NextResponse.json(
        { error: "Insufficient permissions to modify other users' favorites" },
        { status: 403 }
      );
    }

    // Check data access permissions for own workout data (need write access)
    const userDataAccessRules = user.app_metadata?.data_access_rules || {};

    if (!canAccessOwnWorkouts(DATA_ACCESS_LEVELS.FULL, userDataAccessRules)) {
      return NextResponse.json(
        { error: 'Insufficient permissions to modify workout data' },
        { status: 403 }
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
