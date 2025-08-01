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
      return NextResponse.json(
        {
          flags: {},
          userTypes: [],
          userGroups: [],
        },
        { status: 200 }
      );
    }
    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';

    const [flagsResponse, typesResponse, groupsResponse] = await Promise.all([
      supabase.rpc('get_user_feature_flags', {
        user_id: user.id,
        environment_param: environment,
      }),
      supabase.rpc('get_user_types', { user_id: user.id }),
      supabase.rpc('get_user_groups', { user_id: user.id }),
    ]);

    if (flagsResponse.error) throw flagsResponse.error;
    if (typesResponse.error) throw typesResponse.error;
    if (groupsResponse.error) throw groupsResponse.error;

    return NextResponse.json({
      flags: flagsResponse.data,
      userTypes: typesResponse.data,
      userGroups: groupsResponse.data,
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
