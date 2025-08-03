import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      console.error('Supabase auth error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Get user roles and groups from user_metadata
    let userRoles = [];
    let userGroups = [];

    if (data.user) {
      const { data: metadata } = await supabase
        .from('user_metadata')
        .select('roles, groups')
        .eq('user_id', data.user.id)
        .single();

      if (metadata) {
        userRoles = metadata.roles || [];
        userGroups = metadata.groups || [];
      }
    }

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          ...data.user,
          userRoles,
          userGroups,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
