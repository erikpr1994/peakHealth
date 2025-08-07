import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function GET(): Promise<NextResponse> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Get current session
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Session error:', error);
      return NextResponse.json(
        { error: 'Failed to get session' },
        { status: 500 }
      );
    }

    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Get user data
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      // eslint-disable-next-line no-console
      console.error('User error:', userError);
      return NextResponse.json(
        { error: 'Failed to get user data' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        user,
        session: {
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
