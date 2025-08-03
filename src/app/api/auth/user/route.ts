import { NextResponse } from 'next/server';

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

    // Extract user roles and groups from Supabase's built-in user_metadata
    // Default to basic user if no roles/groups are set
    let userRoles = ['basic'];
    let userGroups = ['free'];

    if (user.user_metadata) {
      userRoles = user.user_metadata.roles || userRoles;
      userGroups = user.user_metadata.groups || userGroups;
    }

    return NextResponse.json({
      user: {
        ...user,
        userRoles,
        userGroups,
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
