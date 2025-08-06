import { NextRequest, NextResponse } from 'next/server';

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

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Get user error:', error);

      // If user doesn't exist in database, return a specific error code
      if (error.message.includes('User from sub claim in JWT does not exist')) {
        return NextResponse.json(
          {
            error: 'User not found in database',
            code: 'USER_NOT_FOUND',
            shouldRedirect: true,
          },
          { status: 401 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json({ user: null });
    }

    // Extract user roles and groups from app_metadata with fallback values
    // Default to basic user if no roles/groups are set
    const userRoles = user.app_metadata?.roles || ['basic'];
    const userGroups = user.app_metadata?.groups || ['free'];

    // Add fallback values to app_metadata for backward compatibility
    const userWithFallbacks = {
      ...user,
      app_metadata: {
        ...user.app_metadata,
        roles: userRoles,
        groups: userGroups,
      },
    };

    return NextResponse.json({ user: userWithFallbacks });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Get user API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { email, password, data, roles, groups } = await request.json();

    // Check if roles or groups are being updated (not supported via this endpoint for existing users)
    if (roles || groups) {
      return NextResponse.json(
        {
          error:
            'Roles and groups cannot be updated via this endpoint. Admin privileges required.',
          code: 'ADMIN_REQUIRED',
        },
        { status: 403 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (data) updateData.data = data;

    const { data: updatedUser, error } =
      await supabase.auth.updateUser(updateData);

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Update user error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: updatedUser.user });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Update user API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
