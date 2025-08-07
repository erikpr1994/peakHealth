import { NextResponse } from 'next/server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const adminClient = createAdminClient();
    if (!adminClient) {
      return NextResponse.json(
        { error: 'Admin client not available' },
        { status: 503 }
      );
    }

    // Get current user assignments
    const { data: assignments, error: assignmentsError } =
      await adminClient.rpc('get_user_assignments', { user_id_param: user.id });

    if (assignmentsError) {
      console.error('Error getting user assignments:', assignmentsError);
      return NextResponse.json(
        { error: 'Failed to get user assignments' },
        { status: 500 }
      );
    }

    // Generate new JWT claims
    const { data: claims, error: claimsError } = await adminClient.rpc(
      'generate_user_jwt_claims',
      { user_id_param: user.id }
    );

    if (claimsError) {
      console.error('Error generating JWT claims:', claimsError);
      return NextResponse.json(
        { error: 'Failed to generate JWT claims' },
        { status: 500 }
      );
    }

    // Update user's app_metadata with new claims
    const { data: updatedUser, error: updateError } =
      await adminClient.auth.admin.updateUserById(user.id, {
        app_metadata: claims,
      });

    if (updateError) {
      console.error('Error updating user app_metadata:', updateError);
      return NextResponse.json(
        { error: 'Failed to update user metadata' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'JWT claims updated successfully',
      currentClaims: user.app_metadata,
      newClaims: claims,
      assignments: assignments,
      user: updatedUser.user,
    });
  } catch (error) {
    console.error('Fix JWT claims API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const adminClient = createAdminClient();
    if (!adminClient) {
      return NextResponse.json(
        { error: 'Admin client not available' },
        { status: 503 }
      );
    }

    // Get current user assignments
    const { data: assignments, error: assignmentsError } =
      await adminClient.rpc('get_user_assignments', { user_id_param: user.id });

    if (assignmentsError) {
      console.error('Error getting user assignments:', assignmentsError);
      return NextResponse.json(
        { error: 'Failed to get user assignments' },
        { status: 500 }
      );
    }

    // Generate JWT claims (without updating)
    const { data: claims, error: claimsError } = await adminClient.rpc(
      'generate_user_jwt_claims',
      { user_id_param: user.id }
    );

    if (claimsError) {
      console.error('Error generating JWT claims:', claimsError);
      return NextResponse.json(
        { error: 'Failed to generate JWT claims' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      currentClaims: user.app_metadata,
      generatedClaims: claims,
      assignments: assignments,
      needsUpdate: JSON.stringify(user.app_metadata) !== JSON.stringify(claims),
    });
  } catch (error) {
    console.error('Check JWT claims API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
