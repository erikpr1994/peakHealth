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
