import { NextRequest, NextResponse } from 'next/server';

import { UserTypesService } from '../../../../features/user-types-management/services/userTypesService';

const userTypesService = new UserTypesService();

export async function GET(): Promise<NextResponse> {
  try {
    const userGroups = await userTypesService.getUserGroups();
    return NextResponse.json({ userGroups });
  } catch (error) {
    console.error('User groups API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user groups' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { name, displayName, description, permissions, isActive } =
      await request.json();

    if (!name || !displayName) {
      return NextResponse.json(
        { error: 'name and displayName are required' },
        { status: 400 }
      );
    }

    const userGroup = await userTypesService.createUserGroup({
      name,
      displayName,
      description: description || '',
      permissions: permissions || [],
      isActive,
    });

    return NextResponse.json({ userGroup });
  } catch (error) {
    console.error('User groups API error:', error);
    return NextResponse.json(
      { error: 'Failed to create user group' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const { id, displayName, description, permissions, isActive } =
      await request.json();

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const userGroup = await userTypesService.updateUserGroup(id, {
      displayName,
      description,
      permissions,
      isActive,
    });

    return NextResponse.json({ userGroup });
  } catch (error) {
    console.error('User groups API error:', error);
    return NextResponse.json(
      { error: 'Failed to update user group' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'id parameter is required' },
        { status: 400 }
      );
    }

    await userTypesService.deleteUserGroup(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('User groups API error:', error);
    return NextResponse.json(
      { error: 'Failed to delete user group' },
      { status: 500 }
    );
  }
}
