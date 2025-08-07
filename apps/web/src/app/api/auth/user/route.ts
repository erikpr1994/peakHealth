import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

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
      error,
    } = await supabase.auth.getUser();

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Get user error:', error);

      // If user doesn't exist in database, return a specific error code
      if (error.message.includes('User from sub claim in JWT does not exist')) {
        return NextResponse.json(
          {
            error: 'User not found in database',
            code: 'USER_NOT_FOUND',
            shouldRedirect: true,
          },
          { status: 401 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json({ user: null });
    }

    // Validate and extract new JWT claims structure
    const appMetadata = user.app_metadata || {};

    // Validate required claims structure
    const validationErrors = [];

    if (!appMetadata.user_types || !Array.isArray(appMetadata.user_types)) {
      validationErrors.push('user_types must be an array');
    }

    if (
      !appMetadata.primary_user_type ||
      typeof appMetadata.primary_user_type !== 'string'
    ) {
      validationErrors.push('primary_user_type must be a string');
    }

    if (
      !appMetadata.subscription_tier ||
      typeof appMetadata.subscription_tier !== 'string'
    ) {
      validationErrors.push('subscription_tier must be a string');
    }

    if (!appMetadata.groups || !Array.isArray(appMetadata.groups)) {
      validationErrors.push('groups must be an array');
    }

    if (
      !appMetadata.permissions ||
      typeof appMetadata.permissions !== 'object'
    ) {
      validationErrors.push('permissions must be an object');
    }

    if (!appMetadata.features || !Array.isArray(appMetadata.features)) {
      validationErrors.push('features must be an array');
    }

    if (
      !appMetadata.data_access_rules ||
      typeof appMetadata.data_access_rules !== 'object'
    ) {
      validationErrors.push('data_access_rules must be an object');
    }

    // If validation fails, log the error but don't fail the request
    // This allows for graceful degradation during the transition
    if (validationErrors.length > 0) {
      // eslint-disable-next-line no-console
      console.warn('JWT claims validation failed:', validationErrors);
      // eslint-disable-next-line no-console
      console.warn('User app_metadata:', appMetadata);
    }

    // Add legacy support for backward compatibility during transition
    // This ensures existing code doesn't break while we migrate
    const userWithLegacySupport = {
      ...user,
      app_metadata: {
        ...appMetadata,
        // Legacy support - use new claims if available, fallback to defaults
        roles: appMetadata.user_types || [
          appMetadata.primary_user_type || 'regular',
        ],
        groups: appMetadata.groups || ['early_access'],
      },
    };

    return NextResponse.json({ user: userWithLegacySupport });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Get user API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
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
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { email, password, data, user_metadata, roles, groups } =
      await request.json();

    // Check if roles or groups are being updated (not supported via this endpoint for existing users)
    if (roles || groups) {
      return NextResponse.json(
        {
          error:
            'Roles and groups cannot be updated via this endpoint. Admin privileges required.',
          code: 'ADMIN_REQUIRED',
        },
        { status: 403 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (data) updateData.data = data;
    if (user_metadata) updateData.data = user_metadata;

    const { data: updatedUser, error } =
      await supabase.auth.updateUser(updateData);

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Update user error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: updatedUser.user });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Update user API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
