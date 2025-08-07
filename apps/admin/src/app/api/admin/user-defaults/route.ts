/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';

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

    const { data: userDefaults, error } = await adminClient
      .from('user_defaults')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user defaults:', error);
      return NextResponse.json(
        { error: 'Failed to fetch user defaults' },
        { status: 500 }
      );
    }

    return NextResponse.json({ userDefaults });
  } catch (error) {
    console.error('User defaults API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const adminClient = createAdminClient();
    if (!adminClient) {
      return NextResponse.json(
        { error: 'Admin client not available' },
        { status: 503 }
      );
    }

    const { defaultUserTypes, defaultSubscriptionTier, defaultGroups } =
      await request.json();

    // Deactivate all current defaults
    await adminClient
      .from('user_defaults')
      .update({ is_active: false })
      .eq('is_active', true);

    // Create new default configuration
    const { data: userDefault, error } = await adminClient
      .from('user_defaults')
      .insert({
        default_user_types: defaultUserTypes || ['regular'],
        default_subscription_tier: defaultSubscriptionTier || 'free',
        default_groups: defaultGroups || ['early_access'],
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error updating user defaults:', error);
      return NextResponse.json(
        { error: 'Failed to update user defaults' },
        { status: 500 }
      );
    }

    return NextResponse.json({ userDefault });
  } catch (error) {
    console.error('User defaults API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
