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

    const { data: subscriptionTiers, error } = await adminClient
      .from('subscription_tiers')
      .select('*')
      .order('display_name');

    if (error) {
      console.error('Error fetching subscription tiers:', error);
      return NextResponse.json(
        { error: 'Failed to fetch subscription tiers' },
        { status: 500 }
      );
    }

    return NextResponse.json({ subscriptionTiers });
  } catch (error) {
    console.error('Subscription tiers API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminClient = createAdminClient();
    if (!adminClient) {
      return NextResponse.json(
        { error: 'Admin client not available' },
        { status: 503 }
      );
    }

    const { name, displayName, description, features, price, billingCycle } =
      await request.json();

    if (!name || !displayName) {
      return NextResponse.json(
        { error: 'name and displayName are required' },
        { status: 400 }
      );
    }

    const { data: subscriptionTier, error } = await adminClient
      .from('subscription_tiers')
      .insert({
        name,
        display_name: displayName,
        description: description || '',
        features: features || [],
        price: price || 0,
        billing_cycle: billingCycle || 'monthly',
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating subscription tier:', error);
      return NextResponse.json(
        { error: 'Failed to create subscription tier' },
        { status: 500 }
      );
    }

    return NextResponse.json({ subscriptionTier });
  } catch (error) {
    console.error('Subscription tiers API error:', error);
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

    const {
      name,
      displayName,
      description,
      features,
      price,
      billingCycle,
      isActive,
    } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (displayName !== undefined) updateData.display_name = displayName;
    if (description !== undefined) updateData.description = description;
    if (features !== undefined) updateData.features = features;
    if (price !== undefined) updateData.price = price;
    if (billingCycle !== undefined) updateData.billing_cycle = billingCycle;
    if (isActive !== undefined) updateData.is_active = isActive;

    const { data: subscriptionTier, error } = await adminClient
      .from('subscription_tiers')
      .update(updateData)
      .eq('name', name)
      .select()
      .single();

    if (error) {
      console.error('Error updating subscription tier:', error);
      return NextResponse.json(
        { error: 'Failed to update subscription tier' },
        { status: 500 }
      );
    }

    return NextResponse.json({ subscriptionTier });
  } catch (error) {
    console.error('Subscription tiers API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const adminClient = createAdminClient();
    if (!adminClient) {
      return NextResponse.json(
        { error: 'Admin client not available' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json(
        { error: 'name parameter is required' },
        { status: 400 }
      );
    }

    const { error } = await adminClient
      .from('subscription_tiers')
      .delete()
      .eq('name', name);

    if (error) {
      console.error('Error deleting subscription tier:', error);
      return NextResponse.json(
        { error: 'Failed to delete subscription tier' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscription tiers API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
