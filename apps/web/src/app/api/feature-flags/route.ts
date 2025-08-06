import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }

    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';

    // Get user session to check roles and groups
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      // eslint-disable-next-line no-console
      console.error('Auth error in feature flags API:', authError);
      return NextResponse.json(
        { error: 'Authentication error' },
        { status: 401 }
      );
    }

    // Get user roles and groups from app_metadata (JWT claims)
    const userRoles = user?.app_metadata?.roles || ['basic'];
    const userGroups = user?.app_metadata?.groups || ['free'];

    // Use the database function to get user-specific feature flags with JWT claims filtering
    const { data: userFeatureFlags, error: userFlagsError } =
      await supabase.rpc('get_user_feature_flags', {
        user_id: user!.id,
        environment_param: environment,
        user_roles: userRoles,
        user_groups: userGroups,
      });

    if (userFlagsError) {
      // eslint-disable-next-line no-console
      console.error('Error fetching user feature flags:', userFlagsError);
      return NextResponse.json(
        { error: 'Failed to fetch user feature flags' },
        { status: 500 }
      );
    }

    // Get public feature flags (available to all users)
    const { data: publicFeatureFlags, error: publicFlagsError } = await supabase
      .from('feature_flags')
      .select('*')
      .eq('is_public', true);

    if (publicFlagsError) {
      // eslint-disable-next-line no-console
      console.error('Error fetching public feature flags:', publicFlagsError);
      return NextResponse.json(
        { error: 'Failed to fetch public feature flags' },
        { status: 500 }
      );
    }

    // Combine user-specific and public feature flags
    const allFeatureFlags = [
      ...(userFeatureFlags || []),
      ...(publicFeatureFlags || []),
    ];

    return NextResponse.json({ featureFlags: allFeatureFlags });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Feature flags API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
