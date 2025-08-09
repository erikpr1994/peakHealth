import { NextResponse, type NextRequest } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Logout error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Create response; Supabase SSR helper already expired its cookies via signOut.
    // Only clear any custom app cookies here.
    const response = NextResponse.json({ success: true });
    response.cookies.delete('auth-token');
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Logout API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
