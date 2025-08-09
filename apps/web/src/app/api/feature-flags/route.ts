import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';
import { isValidUUID } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }

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

    // Validate user exists and has a valid UUID
    if (!user || !user.id || !isValidUUID(user.id)) {
      return NextResponse.json(
        { error: 'Invalid user or user ID' },
        { status: 400 }
      );
    }

    // Claims are read in the DB function; no need to pass or log here

    // Determine environment (default to development)
    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';

    // Call the database function with user and environment
    const { data: dbRows, error } = await supabase.rpc(
      'get_user_feature_flags',
      {
        user_id_param: user.id,
        environment_param: environment,
      }
    );

    if (error) {
      console.error('Database function error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch feature flags' },
        { status: 500 }
      );
    }

    // Normalize and de-duplicate by feature name; treat any targeting rule enabling the flag as enabled
    const featureFlags = Array.isArray(dbRows) ? dbRows : [];

    type DbRow = {
      feature_flag_id?: string;
      name: string;
      description?: string | null;
      is_enabled: boolean;
      rollout_percentage: number;
      environment: string;
      targeting_type?: string;
      targeting_value?: string | null;
    };

    const mergedByName: Record<string, DbRow> = {};
    for (const row of featureFlags as DbRow[]) {
      const existing = mergedByName[row.name];
      mergedByName[row.name] = existing
        ? {
            ...existing,
            is_enabled: existing.is_enabled || row.is_enabled,
            rollout_percentage:
              existing.rollout_percentage ?? row.rollout_percentage,
            environment: existing.environment ?? row.environment,
            description: existing.description ?? row.description,
            feature_flag_id: existing.feature_flag_id ?? row.feature_flag_id,
            targeting_type: existing.targeting_type ?? row.targeting_type,
            targeting_value: existing.targeting_value ?? row.targeting_value,
          }
        : (row as DbRow);
    }

    const result = Object.values(mergedByName);

    return NextResponse.json({ featureFlags: result });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
