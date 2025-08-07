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

    const { data: featureFlags, error } = await adminClient
      .from('feature_flags')
      .select(
        `
        *,
        feature_flag_environments (*),
        feature_flag_user_roles (*),
        feature_flag_user_groups (*),
        feature_flag_user_types (*),
        feature_flag_subscription_tiers (*),
        feature_flag_users (*)
      `
      )
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch feature flags' },
        { status: 500 }
      );
    }

    return NextResponse.json({ featureFlags });
  } catch (error) {
    console.error('Feature flags API error:', error);
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

    const {
      name,
      displayName,
      description,
      category,
      isPublic,
      isGlobal,
      environments,
      userRoles,
      userGroups,
      userTypes,
      subscriptionTiers,
      users,
    } = await request.json();

    if (!name || !displayName) {
      return NextResponse.json(
        { error: 'name and displayName are required' },
        { status: 400 }
      );
    }

    // Start a transaction
    const { data: featureFlag, error: flagError } = await adminClient
      .from('feature_flags')
      .insert({
        name,
        display_name: displayName,
        description: description || '',
        category: category || null,
        is_public: isPublic || false,
        is_global: isGlobal || false,
        created_by: null, // TODO: Get from auth context
      })
      .select()
      .single();

    if (flagError) {
      return NextResponse.json(
        { error: 'Failed to create feature flag' },
        { status: 500 }
      );
    }

    // Insert environment configurations
    if (environments && Object.keys(environments).length > 0) {
      const environmentData = Object.entries(environments).map(
        ([env, config]: [string, unknown]) => {
          const typedConfig = config as {
            enabled?: boolean;
            rolloutPercentage?: number;
          };
          return {
            feature_flag_id: featureFlag.id,
            environment: env,
            is_enabled: typedConfig.enabled || false,
            rollout_percentage: typedConfig.rolloutPercentage || 0,
          };
        }
      );

      const { error: envError } = await adminClient
        .from('feature_flag_environments')
        .insert(environmentData);

      if (envError) {
        // Continue anyway, the main flag was created
      }
    }

    // Insert user role targeting
    if (userRoles && userRoles.length > 0) {
      const roleData = userRoles.flatMap((role: unknown) => {
        const typedRole = role as {
          environments: string[];
          roleName: string;
          isEnabled?: boolean;
        };
        return typedRole.environments.map((env: string) => ({
          feature_flag_id: featureFlag.id,
          environment: env,
          role_name: typedRole.roleName,
          is_enabled: typedRole.isEnabled || false,
        }));
      });

      if (roleData.length > 0) {
        const { error: roleError } = await adminClient
          .from('feature_flag_user_roles')
          .insert(roleData);

        if (roleError) {
          // Continue anyway, the main flag was created
        }
      }
    }

    // Insert user group targeting
    if (userGroups && userGroups.length > 0) {
      const groupData = userGroups.flatMap((group: unknown) => {
        const typedGroup = group as {
          environments: string[];
          groupName: string;
          isEnabled?: boolean;
        };
        return typedGroup.environments.map((env: string) => ({
          feature_flag_id: featureFlag.id,
          environment: env,
          group_name: typedGroup.groupName,
          is_enabled: typedGroup.isEnabled || false,
        }));
      });

      if (groupData.length > 0) {
        const { error: groupError } = await adminClient
          .from('feature_flag_user_groups')
          .insert(groupData);

        if (groupError) {
          // Continue anyway, the main flag was created
        }
      }
    }

    // Insert user type targeting
    if (userTypes && userTypes.length > 0) {
      const userTypeData = userTypes.map((userType: string) => ({
        feature_flag_id: featureFlag.id,
        user_type_name: userType,
      }));

      const { error: userTypeError } = await adminClient
        .from('feature_flag_user_types')
        .insert(userTypeData);

      if (userTypeError) {
        // Continue anyway, the main flag was created
      }
    }

    // Insert subscription tier targeting
    if (subscriptionTiers && subscriptionTiers.length > 0) {
      const subscriptionData = subscriptionTiers.map((tier: string) => ({
        feature_flag_id: featureFlag.id,
        subscription_tier_name: tier,
      }));

      const { error: subscriptionError } = await adminClient
        .from('feature_flag_subscription_tiers')
        .insert(subscriptionData);

      if (subscriptionError) {
        // Continue anyway, the main flag was created
      }
    }

    // Insert specific user targeting
    if (users && users.length > 0) {
      const userData = users.map((userId: string) => ({
        feature_flag_id: featureFlag.id,
        user_id: userId,
      }));

      const { error: userError } = await adminClient
        .from('feature_flag_users')
        .insert(userData);

      if (userError) {
        // Continue anyway, the main flag was created
      }
    }

    return NextResponse.json({ featureFlag });
  } catch (error) {
    console.error('Feature flags API error:', error);
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
      id,
      name,
      displayName,
      description,
      category,
      isPublic,
      isGlobal,
      environments,
      userRoles,
      userGroups,
      userTypes,
      subscriptionTiers,
      users,
    } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    // Update the main feature flag
    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (displayName !== undefined) updateData.display_name = displayName;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (isPublic !== undefined) updateData.is_public = isPublic;
    if (isGlobal !== undefined) updateData.is_global = isGlobal;
    updateData.updated_at = new Date().toISOString();

    const { data: featureFlag, error: flagError } = await adminClient
      .from('feature_flags')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (flagError) {
      console.error('Error updating feature flag:', flagError);
      return NextResponse.json(
        { error: 'Failed to update feature flag' },
        { status: 500 }
      );
    }

    // Update environment configurations
    if (environments) {
      // Delete existing environment configs
      await adminClient
        .from('feature_flag_environments')
        .delete()
        .eq('feature_flag_id', id);

      // Insert new environment configs
      const environmentData = Object.entries(environments).map(
        ([env, config]: [string, any]) => ({
          feature_flag_id: id,
          environment: env,
          is_enabled: config.enabled || false,
          rollout_percentage: config.rolloutPercentage || 0,
        })
      );

      if (environmentData.length > 0) {
        const { error: envError } = await adminClient
          .from('feature_flag_environments')
          .insert(environmentData);

        if (envError) {
          console.error('Error updating environment configs:', envError);
        }
      }
    }

    // Update user role targeting
    if (userRoles !== undefined) {
      // Delete existing user role targeting
      await adminClient
        .from('feature_flag_user_roles')
        .delete()
        .eq('feature_flag_id', id);

      // Insert new user role targeting
      if (userRoles.length > 0) {
        const roleData = userRoles.flatMap((role: any) =>
          role.environments.map((env: string) => ({
            feature_flag_id: id,
            environment: env,
            role_name: role.roleName,
            is_enabled: role.isEnabled || false,
          }))
        );

        if (roleData.length > 0) {
          const { error: roleError } = await adminClient
            .from('feature_flag_user_roles')
            .insert(roleData);

          if (roleError) {
            console.error('Error updating user role targeting:', roleError);
          }
        }
      }
    }

    // Update user group targeting
    if (userGroups !== undefined) {
      // Delete existing user group targeting
      await adminClient
        .from('feature_flag_user_groups')
        .delete()
        .eq('feature_flag_id', id);

      // Insert new user group targeting
      if (userGroups.length > 0) {
        const groupData = userGroups.flatMap((group: any) =>
          group.environments.map((env: string) => ({
            feature_flag_id: id,
            environment: env,
            group_name: group.groupName,
            is_enabled: group.isEnabled || false,
          }))
        );

        if (groupData.length > 0) {
          const { error: groupError } = await adminClient
            .from('feature_flag_user_groups')
            .insert(groupData);

          if (groupError) {
            console.error('Error updating user group targeting:', groupError);
          }
        }
      }
    }

    // Update user type targeting
    if (userTypes !== undefined) {
      // Delete existing user type targeting
      await adminClient
        .from('feature_flag_user_types')
        .delete()
        .eq('feature_flag_id', id);

      // Insert new user type targeting
      if (userTypes.length > 0) {
        const userTypeData = userTypes.map((userType: string) => ({
          feature_flag_id: id,
          user_type_name: userType,
        }));

        const { error: userTypeError } = await adminClient
          .from('feature_flag_user_types')
          .insert(userTypeData);

        if (userTypeError) {
          console.error('Error updating user type targeting:', userTypeError);
        }
      }
    }

    // Update subscription tier targeting
    if (subscriptionTiers !== undefined) {
      // Delete existing subscription tier targeting
      await adminClient
        .from('feature_flag_subscription_tiers')
        .delete()
        .eq('feature_flag_id', id);

      // Insert new subscription tier targeting
      if (subscriptionTiers.length > 0) {
        const subscriptionData = subscriptionTiers.map((tier: string) => ({
          feature_flag_id: id,
          subscription_tier_name: tier,
        }));

        const { error: subscriptionError } = await adminClient
          .from('feature_flag_subscription_tiers')
          .insert(subscriptionData);

        if (subscriptionError) {
          console.error(
            'Error updating subscription tier targeting:',
            subscriptionError
          );
        }
      }
    }

    // Update specific user targeting
    if (users !== undefined) {
      // Delete existing user targeting
      await adminClient
        .from('feature_flag_users')
        .delete()
        .eq('feature_flag_id', id);

      // Insert new user targeting
      if (users.length > 0) {
        const userData = users.map((userId: string) => ({
          feature_flag_id: id,
          user_id: userId,
        }));

        const { error: userError } = await adminClient
          .from('feature_flag_users')
          .insert(userData);

        if (userError) {
          console.error('Error updating user targeting:', userError);
        }
      }
    }

    return NextResponse.json({ featureFlag });
  } catch (error) {
    console.error('Feature flags API error:', error);
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
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'id parameter is required' },
        { status: 400 }
      );
    }

    // Delete related records first (cascade should handle this, but being explicit)
    await adminClient
      .from('feature_flag_environments')
      .delete()
      .eq('feature_flag_id', id);

    await adminClient
      .from('feature_flag_user_roles')
      .delete()
      .eq('feature_flag_id', id);

    await adminClient
      .from('feature_flag_user_groups')
      .delete()
      .eq('feature_flag_id', id);

    await adminClient
      .from('feature_flag_user_types')
      .delete()
      .eq('feature_flag_id', id);

    await adminClient
      .from('feature_flag_subscription_tiers')
      .delete()
      .eq('feature_flag_id', id);

    await adminClient
      .from('feature_flag_users')
      .delete()
      .eq('feature_flag_id', id);

    // Delete the main feature flag
    const { error } = await adminClient
      .from('feature_flags')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting feature flag:', error);
      return NextResponse.json(
        { error: 'Failed to delete feature flag' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Feature flags API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
