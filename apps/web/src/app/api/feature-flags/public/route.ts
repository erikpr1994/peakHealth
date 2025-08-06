import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }

    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';

    // Get public feature flags (no authentication required)
    const { data: featureFlags, error } = await supabase
      .from('feature_flags')
      .select(`
        *,
        feature_flag_environments!inner(*)
      `)
      .eq('feature_flag_environments.environment', environment)
      .eq('feature_flag_environments.enabled', true)
      .eq('is_public', true);

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching public feature flags:', error);
      return NextResponse.json(
        { error: 'Failed to fetch feature flags' },
        { status: 500 }
      );
    }

    return NextResponse.json({ featureFlags: featureFlags || [] });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Public feature flags API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
