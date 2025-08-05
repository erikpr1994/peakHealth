import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      // Don't log expected auth session missing errors
      if (error.message.includes('Auth session missing')) {
        return NextResponse.json(
          { error: 'Not authenticated' },
          { status: 401 }
        );
      }
      console.error('Supabase auth error:', error);
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Add fallback values for backward compatibility
    const userWithFallbacks = {
      ...user,
      app_metadata: {
        roles: user.app_metadata?.roles || ['basic'],
        groups: user.app_metadata?.groups || ['free'],
        ...user.app_metadata,
      },
    };

    return NextResponse.json({
      user: userWithFallbacks,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { user_metadata } = await request.json();

    if (!user_metadata || typeof user_metadata !== 'object') {
      return NextResponse.json(
        { error: 'Invalid user_metadata provided' },
        { status: 400 }
      );
    }

    // Update user metadata using Supabase's updateUser method
    const { data, error } = await supabase.auth.updateUser({
      data: user_metadata,
    });

    if (error) {
      console.error('Error updating user metadata:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      user: data.user,
      message: 'User metadata updated successfully',
    });
  } catch (error) {
    console.error('Error updating user metadata:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
