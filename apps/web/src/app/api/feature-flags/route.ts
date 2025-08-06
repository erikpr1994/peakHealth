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

    // Get user roles and groups from app_metadata
    const userRoles = user?.app_metadata?.roles || ['basic'];
    const userGroups = user?.app_metadata?.groups || ['free'];

    // Get feature flags for the environment
    const { data: featureFlags, error } = await supabase
      .from('feature_flags')
      .select(
        `
        *,
        feature_flag_environments!inner(*),
        feature_flag_user_roles(*),
        feature_flag_user_groups(*)
      `
      )
      .eq('feature_flag_environments.environment', environment)
      .eq('feature_flag_environments.enabled', true);

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching feature flags:', error);
      return NextResponse.json(
        { error: 'Failed to fetch feature flags' },
        { status: 500 }
      );
    }

    // Filter feature flags based on user roles and groups
    const filteredFlags =
      featureFlags?.filter(flag => {
        // Check if user has required role
        const hasRequiredRole = flag.feature_flag_user_roles?.some(
          (role: Record<string, unknown>) =>
            userRoles.includes(role.role as string)
        );

        // Check if user has required group
        const hasRequiredGroup = flag.feature_flag_user_groups?.some(
          (group: Record<string, unknown>) =>
            userGroups.includes(group.group as string)
        );

        // If no specific roles or groups are set, allow access
        const noRoleRestrictions = !flag.feature_flag_user_roles?.length;
        const noGroupRestrictions = !flag.feature_flag_user_groups?.length;

        return (
          (noRoleRestrictions || hasRequiredRole) &&
          (noGroupRestrictions || hasRequiredGroup)
        );
      }) || [];

    return NextResponse.json({ featureFlags: filteredFlags });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Feature flags API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
