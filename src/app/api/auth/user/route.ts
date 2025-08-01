import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    console.log('User API request received');
    const supabase = await createClient();
    console.log('Supabase client created for user fetch');

    console.log('Calling supabase.auth.getUser...');
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    console.log('getUser response:', { user: !!user, error: error?.message });

    if (error) {
      console.error('Supabase auth error:', error);
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (!user) {
      console.log('No user found');
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    console.log('User found, returning user data');
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
