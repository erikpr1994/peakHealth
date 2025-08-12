import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function GET(): Promise<NextResponse> {
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

    // Validate required claims structure and provide defaults for missing fields
    const validationErrors: string[] = [];
    const enrichedMetadata = { ...appMetadata };

    if (!appMetadata.user_types || !Array.isArray(appMetadata.user_types)) {
      validationErrors.push('user_types must be an array');
      enrichedMetadata.user_types = [
        appMetadata.primary_user_type || 'regular',
      ];
    }

    if (
      !appMetadata.primary_user_type ||
      typeof appMetadata.primary_user_type !== 'string'
    ) {
      validationErrors.push('primary_user_type must be a string');
      enrichedMetadata.primary_user_type = 'regular';
    }

    if (
      !appMetadata.subscription_tier ||
      typeof appMetadata.subscription_tier !== 'string'
    ) {
      validationErrors.push('subscription_tier must be a string');
      // Try to derive subscription tier from groups, fallback to 'free'
      const subscriptionGroups = ['free', 'basic', 'premium', 'pro'];
      const userSubscriptionGroup = appMetadata.groups?.find((group: string) =>
        subscriptionGroups.includes(group)
      );
      enrichedMetadata.subscription_tier = userSubscriptionGroup || 'free';
    }

    if (!appMetadata.groups || !Array.isArray(appMetadata.groups)) {
      validationErrors.push('groups must be an array');
      enrichedMetadata.groups = ['early_access'];
    }

    if (
      !appMetadata.permissions ||
      typeof appMetadata.permissions !== 'object'
    ) {
      validationErrors.push('permissions must be an object');
      enrichedMetadata.permissions = {};
    }

    if (!appMetadata.features || !Array.isArray(appMetadata.features)) {
      validationErrors.push('features must be an array');
      enrichedMetadata.features = [];
    }

    if (
      !appMetadata.data_access_rules ||
      typeof appMetadata.data_access_rules !== 'object'
    ) {
      validationErrors.push('data_access_rules must be an object');
      enrichedMetadata.data_access_rules = {};
    }

    // If validation fails, log the error but don't fail the request
    // This allows for graceful degradation during the transition
    if (validationErrors.length > 0) {
      // eslint-disable-next-line no-console
      console.warn('JWT claims validation failed:', validationErrors);
      // eslint-disable-next-line no-console
      console.warn('User app_metadata:', appMetadata);
      // eslint-disable-next-line no-console
      console.warn('Enriched metadata with defaults:', enrichedMetadata);
    }

    // Add legacy support for backward compatibility during transition
    // This ensures existing code doesn't break while we migrate
    const userWithLegacySupport = {
      ...user,
      app_metadata: {
        ...enrichedMetadata,
        // Legacy support - use new claims if available, fallback to defaults
        roles: enrichedMetadata.user_types || [
          enrichedMetadata.primary_user_type || 'regular',
        ],
        groups: enrichedMetadata.groups || ['early_access'],
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

export async function PUT(request: NextRequest): Promise<NextResponse> {
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

export async function PATCH(request: NextRequest): Promise<NextResponse> {
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

    const { action } = await request.json();

    if (action === 'regenerate_jwt_claims') {
      // Import the admin client for JWT claims regeneration
      const { createAdminClient } = await import('@/lib/supabase/admin');
      const adminClient = await createAdminClient();

      if (!adminClient) {
        return NextResponse.json(
          { error: 'Admin client not available' },
          { status: 503 }
        );
      }

      try {
        // Generate new JWT claims for the user
        const { data: claims, error: claimsError } = await adminClient.rpc(
          'generate_user_jwt_claims',
          { user_id_param: user.id }
        );

        if (claimsError) {
          // eslint-disable-next-line no-console
          console.error('Failed to generate JWT claims:', claimsError);
          return NextResponse.json(
            { error: 'Failed to generate JWT claims' },
            { status: 500 }
          );
        }

        if (!claims) {
          return NextResponse.json(
            { error: 'No claims generated' },
            { status: 500 }
          );
        }

        // Update the user's app_metadata with the generated claims
        const { data: updatedUser, error: updateError } =
          await adminClient.auth.admin.updateUserById(user.id, {
            app_metadata: claims,
          });

        if (updateError) {
          // eslint-disable-next-line no-console
          console.error('Failed to update user app_metadata:', updateError);
          return NextResponse.json(
            { error: 'Failed to update user metadata' },
            { status: 500 }
          );
        }

        // eslint-disable-next-line no-console
        console.log('Successfully regenerated JWT claims for user:', user.id);

        return NextResponse.json({
          success: true,
          message: 'JWT claims regenerated successfully',
          user: updatedUser.user,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('JWT claims regeneration error:', error);
        return NextResponse.json(
          { error: 'Failed to regenerate JWT claims' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('PATCH user API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
