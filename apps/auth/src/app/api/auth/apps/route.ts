import { getUserAccessibleApps } from '@peakhealth/auth-utils';
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

    // Get current user
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      // eslint-disable-next-line no-console
      console.error('User error:', error);
      return NextResponse.json(
        { error: 'Failed to get user data' },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get accessible apps for the user
    const accessibleApps = getUserAccessibleApps(user);

    return NextResponse.json(
      {
        apps: accessibleApps,
        user: {
          id: user.id,
          email: user.email,
          user_metadata: user.user_metadata,
          app_metadata: user.app_metadata,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Apps error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
