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

      // If user doesn't exist in database, return a specific error code
      if (
        authError.message.includes('User from sub claim in JWT does not exist')
      ) {
        return NextResponse.json(
          {
            error: 'User not found in database',
            code: 'USER_NOT_FOUND',
            shouldRedirect: true,
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: 'Authentication error' },
        { status: 401 }
      );
    }

    // Get user roles and groups from app_metadata (JWT claims)
    // Provide fallback values if JWT claims are missing
    const userRoles = user.app_metadata?.user_types || [];
    const userGroups = user.app_metadata?.groups || [];

    console.log('JWT Claims - user_types:', userRoles);
    console.log('JWT Claims - groups:', userGroups);

    // Call the database function with proper parameters
    const { data: featureFlags, error } = await supabase.rpc(
      'get_user_feature_flags',
      {
        user_id: user.id,
        environment_param: environment,
        user_roles: userRoles,
        user_groups: userGroups,
      }
    );

    if (error) {
      console.error('Database function error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch feature flags' },
        { status: 500 }
      );
    }

    console.log(`Found ${featureFlags?.length || 0} feature flags for user`);
    return NextResponse.json({ featureFlags: featureFlags || [] });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Feature flags API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
