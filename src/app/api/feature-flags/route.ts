import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      // Don't log expected auth session missing errors
      if (userError && userError.message.includes('Auth session missing')) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';

    const flagsResponse = await supabase.rpc('get_user_feature_flags', {
      user_id: user.id,
      environment_param: environment,
    });

    if (flagsResponse.error) throw flagsResponse.error;

    return NextResponse.json({
      flags: flagsResponse.data,
    });
  } catch (error: unknown) {
    console.error('Error fetching feature flags:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal Server Error', details: errorMessage },
      { status: 500 }
    );
  }
}
