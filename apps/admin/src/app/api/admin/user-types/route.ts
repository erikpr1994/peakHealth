import { NextRequest, NextResponse } from 'next/server';

import { UserTypesService } from '../../../../features/user-types-management/services/userTypesService';

const userTypesService = new UserTypesService();

export async function GET(): Promise<NextResponse> {
  try {
    const userTypes = await userTypesService.getUserTypes();
    return NextResponse.json({ userTypes });
  } catch (error) {
    console.error('User types API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user types' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { name, displayName, description, permissions, isActive, isDefault } =
      await request.json();

    if (!name || !displayName) {
      return NextResponse.json(
        { error: 'name and displayName are required' },
        { status: 400 }
      );
    }

    const userType = await userTypesService.createUserType({
      name,
      displayName,
      description: description || '',
      permissions: permissions || [],
      isActive,
      isDefault,
    });

    return NextResponse.json({ userType });
  } catch (error) {
    console.error('User types API error:', error);
    return NextResponse.json(
      { error: 'Failed to create user type' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const { id, displayName, description, permissions, isActive, isDefault } =
      await request.json();

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const userType = await userTypesService.updateUserType(id, {
      displayName,
      description,
      permissions,
      isActive,
      isDefault,
    });

    return NextResponse.json({ userType });
  } catch (error) {
    console.error('User types API error:', error);
    return NextResponse.json(
      { error: 'Failed to update user type' },
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

    await userTypesService.deleteUserType(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('User types API error:', error);
    return NextResponse.json(
      { error: 'Failed to delete user type' },
      { status: 500 }
    );
  }
}
