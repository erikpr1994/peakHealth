import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }

    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Login error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Set cross-domain cookies for session management
    const response = NextResponse.json({
      user: data.user,
      session: data.session,
    });

    // Set auth token cookie that can be accessed across subdomains
    if (data.session?.access_token) {
      response.cookies.set('auth-token', data.session.access_token, {
        domain:
          process.env.NODE_ENV === 'development'
            ? 'localhost'
            : '.peakhealth.es',
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
