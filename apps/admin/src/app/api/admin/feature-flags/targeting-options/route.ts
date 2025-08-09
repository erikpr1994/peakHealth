import { NextResponse } from 'next/server';

import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const adminClient = createAdminClient();
    if (!adminClient) {
      return NextResponse.json(
        { error: 'Admin client not available' },
        { status: 503 }
      );
    }

    // Get user types
    const { data: userTypes, error: userTypesError } = await adminClient
      .from('user_types')
      .select('name, display_name')
      .eq('is_active', true)
      .order('display_name');

    if (userTypesError) {
      // Continue with empty array
    }

    // Get subscription tiers
    const { data: subscriptionTiers, error: subscriptionTiersError } =
      await adminClient
        .from('subscription_tiers')
        .select('name, display_name')
        .eq('is_active', true)
        .order('display_name');

    if (subscriptionTiersError) {
      // Continue with empty array
    }

    // Get users for specific targeting
    let users: any[] = [];
    try {
      const { data: usersData, error: usersError } =
        await adminClient.auth.admin.listUsers();
      if (!usersError) {
        users = usersData.users || [];
      }
    } catch {
      // ignore and continue
    }

    return NextResponse.json({
      userTypes: userTypes || [],
      subscriptionTiers: subscriptionTiers || [],
      // userGroups removed
      users:
        users?.map(user => ({
          id: user.id,
          email: user.email,
          displayName: user.email,
        })) || [],
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
