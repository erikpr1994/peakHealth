import { NextRequest, NextResponse } from 'next/server';

import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  try {
    const adminClient = createAdminClient();
    if (!adminClient) {
      return NextResponse.json(
        { error: 'Admin client not available' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId parameter is required' },
        { status: 400 }
      );
    }

    // Get user assignments using the RPC function
    const { data: assignments, error } = await adminClient.rpc(
      'get_user_assignments',
      { user_id_param: userId }
    );

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching user assignments:', error);
      return NextResponse.json(
        { error: 'Failed to fetch user assignments' },
        { status: 500 }
      );
    }

    return NextResponse.json({ assignments });
  } catch (error) {
    console.error('User assignments API error:', error);
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

    const { userId, assignmentType, assignmentName, reason } =
      await request.json();

    if (!userId || !assignmentType || !assignmentName) {
      return NextResponse.json(
        { error: 'userId, assignmentType, and assignmentName are required' },
        { status: 400 }
      );
    }

    let result;

    switch (assignmentType) {
      case 'user_type':
        result = await adminClient
          .from('user_type_assignments')
          .insert({
            user_id: userId,
            user_type_name: assignmentName,
            is_primary: false,
            reason: reason || 'Admin assignment',
          })
          .select();
        break;

      case 'subscription_tier':
        result = await adminClient
          .from('subscription_assignments')
          .insert({
            user_id: userId,
            subscription_tier_name: assignmentName,
            reason: reason || 'Admin assignment',
          })
          .select();
        break;

      case 'user_group':
        result = await adminClient
          .from('user_group_assignments')
          .insert({
            user_id: userId,
            group_name: assignmentName,
            reason: reason || 'Admin assignment',
          })
          .select();
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid assignment type' },
          { status: 400 }
        );
    }

    if (result.error) {
      // eslint-disable-next-line no-console
      console.error('Error creating assignment:', result.error);
      return NextResponse.json(
        { error: 'Failed to create assignment' },
        { status: 500 }
      );
    }

    return NextResponse.json({ assignment: result.data[0] });
  } catch (error) {
    console.error('User assignments API error:', error);
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
    const userId = searchParams.get('userId');
    const assignmentType = searchParams.get('assignmentType');
    const assignmentName = searchParams.get('assignmentName');

    if (!userId || !assignmentType || !assignmentName) {
      return NextResponse.json(
        { error: 'userId, assignmentType, and assignmentName are required' },
        { status: 400 }
      );
    }

    let result;

    switch (assignmentType) {
      case 'user_type':
        result = await adminClient
          .from('user_type_assignments')
          .delete()
          .eq('user_id', userId)
          .eq('user_type_name', assignmentName)
          .select();
        break;

      case 'subscription_tier':
        result = await adminClient
          .from('subscription_assignments')
          .delete()
          .eq('user_id', userId)
          .eq('subscription_tier_name', assignmentName)
          .select();
        break;

      case 'user_group':
        result = await adminClient
          .from('user_group_assignments')
          .delete()
          .eq('user_id', userId)
          .eq('group_name', assignmentName)
          .select();
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid assignment type' },
          { status: 400 }
        );
    }

    if (result.error) {
      // eslint-disable-next-line no-console
      console.error('Error deleting assignment:', result.error);
      return NextResponse.json(
        { error: 'Failed to delete assignment' },
        { status: 500 }
      );
    }

    return NextResponse.json({ deleted: result.data[0] });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('User assignments API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
