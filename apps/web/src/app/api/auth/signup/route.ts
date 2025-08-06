import { NextRequest, NextResponse } from 'next/server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 503 }
      );
    }

    const { email, password, user_metadata, roles, groups } =
      await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate that user_metadata contains a name field
    if (
      !user_metadata ||
      !user_metadata.name ||
      typeof user_metadata.name !== 'string' ||
      user_metadata.name.trim() === ''
    ) {
      return NextResponse.json(
        { error: 'Name is required in user_metadata' },
        { status: 400 }
      );
    }

    // Create user with basic auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: user_metadata,
      },
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Signup error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // If roles or groups are provided, update the user's app_metadata using admin client
    if (data.user && (roles || groups)) {
      try {
        const adminClient = createAdminClient();

        const app_metadata: Record<string, unknown> = {};
        if (roles) app_metadata.roles = roles;
        if (groups) app_metadata.groups = groups;

        const { data: updatedUser, error: updateError } =
          await adminClient.auth.admin.updateUserById(data.user.id, {
            app_metadata,
          });

        if (updateError) {
          // eslint-disable-next-line no-console
          console.error('Failed to update user app_metadata:', updateError);
          // Don't fail the signup, just log the error and continue
        } else if (updatedUser.user) {
          // Return the updated user with app_metadata
          return NextResponse.json({
            user: updatedUser.user,
            session: data.session,
          });
        }
      } catch (adminError) {
        // eslint-disable-next-line no-console
        console.error('Admin client error:', adminError);
        // Don't fail the signup, just log the error and continue
      }
    }

    return NextResponse.json({
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Signup API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
