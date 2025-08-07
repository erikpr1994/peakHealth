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
      if (usersError) {
        console.error('Error fetching users:', usersError);
        // Continue with empty array
      } else {
        users = usersData.users || [];
      }
    } catch (error) {
      console.error('Error in listUsers:', error);
      // Continue with empty array
    }

    // Get user groups (from user_metadata)
    const userGroups = new Set<string>();
    if (users) {
      users.forEach(user => {
        const groups = user.app_metadata?.groups || [];
        groups.forEach((group: string) => userGroups.add(group));
      });
    }

    // Get user roles (from user_metadata)
    const userRoles = new Set<string>();
    if (users) {
      users.forEach(user => {
        const roles = user.app_metadata?.roles || [];
        roles.forEach((role: string) => userRoles.add(role));
      });
    }

    return NextResponse.json({
      userTypes: userTypes || [],
      subscriptionTiers: subscriptionTiers || [],
      userGroups: Array.from(userGroups).map(name => ({
        name,
        displayName: name,
      })),
      userRoles: Array.from(userRoles).map(name => ({
        name,
        displayName: name,
      })),
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
