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

    const { data: userGroups, error } = await adminClient
      .from('user_groups')
      .select('*')
      .order('display_name');

    if (error) {
      console.error('Error fetching user groups:', error);
      return NextResponse.json(
        { error: 'Failed to fetch user groups' },
        { status: 500 }
      );
    }

    return NextResponse.json({ userGroups });
  } catch (error) {
    console.error('User groups API error:', error);
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

    const { name, displayName, description, permissions } =
      await request.json();

    if (!name || !displayName) {
      return NextResponse.json(
        { error: 'name and displayName are required' },
        { status: 400 }
      );
    }

    const { data: userGroup, error } = await adminClient
      .from('user_groups')
      .insert({
        name,
        display_name: displayName,
        description: description || '',
        permissions: permissions || {},
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user group:', error);
      return NextResponse.json(
        { error: 'Failed to create user group' },
        { status: 500 }
      );
    }

    return NextResponse.json({ userGroup });
  } catch (error) {
    console.error('User groups API error:', error);
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

    const { name, displayName, description, permissions, isActive } =
      await request.json();

    if (!name) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (displayName !== undefined) updateData.display_name = displayName;
    if (description !== undefined) updateData.description = description;
    if (permissions !== undefined) updateData.permissions = permissions;
    if (isActive !== undefined) updateData.is_active = isActive;

    const { data: userGroup, error } = await adminClient
      .from('user_groups')
      .update(updateData)
      .eq('name', name)
      .select()
      .single();

    if (error) {
      console.error('Error updating user group:', error);
      return NextResponse.json(
        { error: 'Failed to update user group' },
        { status: 500 }
      );
    }

    return NextResponse.json({ userGroup });
  } catch (error) {
    console.error('User groups API error:', error);
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
      .from('user_groups')
      .delete()
      .eq('name', name);

    if (error) {
      console.error('Error deleting user group:', error);
      return NextResponse.json(
        { error: 'Failed to delete user group' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('User groups API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
