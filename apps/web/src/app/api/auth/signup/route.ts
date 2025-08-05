import { NextRequest, NextResponse } from 'next/server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const {
      data: { user },
      error: signUpError,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json({ error: 'User not created' }, { status: 500 });
    }

    const supabaseAdmin = createAdminClient();
    const { error: adminError } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      {
        app_metadata: {
          roles: ['basic'],
          groups: ['free'],
        },
      }
    );

    if (adminError) {
      // Clean up the created user if admin update fails
      await supabaseAdmin.auth.admin.deleteUser(user.id);
      return NextResponse.json({ error: adminError.message }, { status: 400 });
    }

    // Fetch the updated user with the new app_metadata
    const { data: updatedUser, error: fetchError } =
      await supabaseAdmin.auth.admin.getUserById(user.id);

    if (fetchError || !updatedUser.user) {
      return NextResponse.json(
        { error: 'Failed to fetch updated user data' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: updatedUser.user,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
