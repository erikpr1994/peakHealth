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

    // Extract user roles and groups from app_metadata with fallback values
    // Default to basic user if no roles/groups are set
    const userRoles = data.user?.app_metadata?.roles || ['basic'];
    const userGroups = data.user?.app_metadata?.groups || ['free'];

    // Add fallback values to app_metadata for backward compatibility
    const userWithFallbacks = {
      ...data.user,
      app_metadata: {
        ...data.user?.app_metadata,
        roles: userRoles,
        groups: userGroups,
      },
    };

    return NextResponse.json({
      user: userWithFallbacks,
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
