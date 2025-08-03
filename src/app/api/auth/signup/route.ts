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

    // Get user types and groups if user exists
    let userTypes = [];
    let userGroups = [];

    if (data.user) {
      const [typesResponse, groupsResponse] = await Promise.all([
        supabase.rpc('get_user_types', { user_id: data.user.id }),
        supabase.rpc('get_user_groups', { user_id: data.user.id }),
      ]);

      if (!typesResponse.error) {
        userTypes = typesResponse.data || [];
      }

      if (!groupsResponse.error) {
        userGroups = groupsResponse.data || [];
      }
    }

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          ...data.user,
          userTypes,
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
