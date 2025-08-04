import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();

  try {
    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';

    // Get public feature flags (no user required)
    const flagsResponse = await supabase.rpc('get_public_feature_flags', {
      environment_param: environment,
    });

    if (flagsResponse.error) {
      // If the function doesn't exist, return empty flags
      if (flagsResponse.error.message.includes('function "get_public_feature_flags" does not exist')) {
        return NextResponse.json({
          flags: [],
        });
      }
      throw flagsResponse.error;
    }

    return NextResponse.json({
      flags: flagsResponse.data || [],
    });
  } catch (error: unknown) {
    console.error('Error fetching public feature flags:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal Server Error', details: errorMessage },
      { status: 500 }
    );
  }
} 