import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

// Helper function to validate redirect URLs
function isValidRedirectUrl(url: string): boolean {
  try {
    const redirectUrl = new URL(url);
    const allowedDomains = [
      'localhost:3001', // web app
      'localhost:3002', // admin app
      'localhost:3003', // pro app
      'peakhealth.es',
      'admin.peakhealth.es',
      'pro.peakhealth.es',
    ];

    return allowedDomains.some(
      domain =>
        redirectUrl.hostname === domain || redirectUrl.hostname.endsWith(domain)
    );
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }

    const { email, password, redirect } = (await request.json()) as {
      email: string;
      password: string;
      redirect?: string;
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

    // If redirect is provided and valid, redirect there
    if (redirect && isValidRedirectUrl(redirect)) {
      return NextResponse.redirect(redirect);
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
