import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Extract user roles and groups from Supabase's built-in user_metadata
    // Default to basic user if no roles/groups are set
    let userRoles = ['basic'];
    let userGroups = ['free'];

    if (data.user && data.user.user_metadata) {
      userRoles = data.user.user_metadata.roles || userRoles;
      userGroups = data.user.user_metadata.groups || userGroups;
    }

    return NextResponse.json({
      user: {
        ...data.user,
        userRoles,
        userGroups,
      },
      session: data.session,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
