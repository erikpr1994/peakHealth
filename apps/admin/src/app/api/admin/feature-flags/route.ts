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
          environments: Array<{ environment: string; isEnabled: boolean }>;
          roleName: string;
        };
        return typedRole.environments.map(envConfig => ({
          feature_flag_id: featureFlag.id,
          environment: envConfig.environment,
          role_name: typedRole.roleName,
          is_enabled: envConfig.isEnabled,
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
      let groupData: Array<{
        feature_flag_id: string;
        environment: string;
        group_name: string;
        is_enabled: boolean;
      }> = [];

      // Handle both array of strings and array of objects
      if (userGroups.length > 0 && typeof userGroups[0] === 'string') {
        // If userGroups is an array of strings, convert to default object format
        groupData = userGroups.flatMap((groupName: string) =>
          ['development', 'staging', 'production'].map((env: string) => ({
            feature_flag_id: featureFlag.id,
            environment: env,
            group_name: groupName,
            is_enabled: true, // Default to enabled for string arrays
          }))
        );
      } else if (userGroups.length > 0) {
        // If userGroups is already an array of objects with the expected structure
        groupData = userGroups.flatMap((group: unknown) => {
          const typedGroup = group as {
            environments: Array<{ environment: string; isEnabled: boolean }>;
            groupName: string;
          };
          return typedGroup.environments.map(envConfig => ({
            feature_flag_id: featureFlag.id,
            environment: envConfig.environment,
            group_name: typedGroup.groupName,
            is_enabled: envConfig.isEnabled,
          }));
        });
      }

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
      const { error: deleteEnvError } = await adminClient
        .from('feature_flag_environments')
        .delete()
        .eq('feature_flag_id', id);

      if (deleteEnvError) {
        console.error(
          'Error deleting existing environment configs:',
          deleteEnvError
        );
        return NextResponse.json(
          { error: 'Failed to update environment configurations' },
          { status: 500 }
        );
      }

      // Insert new environment configs
      const environmentData = Object.entries(environments).map(
        ([env, config]: [string, unknown]) => {
          const typedConfig = config as {
            enabled?: boolean;
            rolloutPercentage?: number;
          };
          return {
            feature_flag_id: id,
            environment: env,
            is_enabled: typedConfig.enabled || false,
            rollout_percentage: typedConfig.rolloutPercentage || 0,
          };
        }
      );

      if (environmentData.length > 0) {
        const { error: envError } = await adminClient
          .from('feature_flag_environments')
          .insert(environmentData);

        if (envError) {
          console.error('Error updating environment configs:', envError);
          return NextResponse.json(
            { error: 'Failed to update environment configurations' },
            { status: 500 }
          );
        }
      }
    }

    // Update user role targeting
    if (userRoles !== undefined) {
      // Delete existing user role targeting
      const { error: deleteRoleError } = await adminClient
        .from('feature_flag_user_roles')
        .delete()
        .eq('feature_flag_id', id);

      if (deleteRoleError) {
        console.error(
          'Error deleting existing user role targeting:',
          deleteRoleError
        );
        return NextResponse.json(
          { error: 'Failed to update user role targeting' },
          { status: 500 }
        );
      }

      // Insert new user role targeting
      if (userRoles.length > 0) {
        const roleData = userRoles.flatMap((role: unknown) => {
          const typedRole = role as {
            environments: Array<{ environment: string; isEnabled: boolean }>;
            roleName: string;
          };
          return typedRole.environments.map(envConfig => ({
            feature_flag_id: id,
            environment: envConfig.environment,
            role_name: typedRole.roleName,
            is_enabled: envConfig.isEnabled,
          }));
        });

        if (roleData.length > 0) {
          const { error: roleError } = await adminClient
            .from('feature_flag_user_roles')
            .insert(roleData);

          if (roleError) {
            console.error('Error updating user role targeting:', roleError);
            return NextResponse.json(
              { error: 'Failed to update user role targeting' },
              { status: 500 }
            );
          }
        }
      }
    }

    // Update user group targeting
    if (userGroups !== undefined) {
      // Delete existing user group targeting
      const { error: deleteGroupError } = await adminClient
        .from('feature_flag_user_groups')
        .delete()
        .eq('feature_flag_id', id);

      if (deleteGroupError) {
        console.error(
          'Error deleting existing user group targeting:',
          deleteGroupError
        );
        return NextResponse.json(
          { error: 'Failed to update user group targeting' },
          { status: 500 }
        );
      }

      // Insert new user group targeting
      if (userGroups.length > 0) {
        let groupData: Array<{
          feature_flag_id: string;
          environment: string;
          group_name: string;
          is_enabled: boolean;
        }> = [];

        // Handle both array of strings and array of objects
        if (typeof userGroups[0] === 'string') {
          // If userGroups is an array of strings, convert to default object format
          groupData = userGroups.flatMap((groupName: string) =>
            ['development', 'staging', 'production'].map((env: string) => ({
              feature_flag_id: id,
              environment: env,
              group_name: groupName,
              is_enabled: true, // Default to enabled for string arrays
            }))
          );
        } else {
          // If userGroups is already an array of objects with the expected structure
          groupData = userGroups.flatMap((group: unknown) => {
            const typedGroup = group as {
              environments: Array<{ environment: string; isEnabled: boolean }>;
              groupName: string;
            };
            return typedGroup.environments.map(envConfig => ({
              feature_flag_id: id,
              environment: envConfig.environment,
              group_name: typedGroup.groupName,
              is_enabled: envConfig.isEnabled,
            }));
          });
        }

        if (groupData.length > 0) {
          const { error: groupError } = await adminClient
            .from('feature_flag_user_groups')
            .insert(groupData);

          if (groupError) {
            console.error('Error updating user group targeting:', groupError);
            return NextResponse.json(
              { error: 'Failed to update user group targeting' },
              { status: 500 }
            );
          }
        }
      }
    }

    // Update user type targeting
    if (userTypes !== undefined) {
      // Delete existing user type targeting
      const { error: deleteUserTypeError } = await adminClient
        .from('feature_flag_user_types')
        .delete()
        .eq('feature_flag_id', id);

      if (deleteUserTypeError) {
        console.error(
          'Error deleting existing user type targeting:',
          deleteUserTypeError
        );
        return NextResponse.json(
          { error: 'Failed to update user type targeting' },
          { status: 500 }
        );
      }

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
          return NextResponse.json(
            { error: 'Failed to update user type targeting' },
            { status: 500 }
          );
        }
      }
    }

    // Update subscription tier targeting
    if (subscriptionTiers !== undefined) {
      // Delete existing subscription tier targeting
      const { error: deleteSubscriptionError } = await adminClient
        .from('feature_flag_subscription_tiers')
        .delete()
        .eq('feature_flag_id', id);

      if (deleteSubscriptionError) {
        console.error(
          'Error deleting existing subscription tier targeting:',
          deleteSubscriptionError
        );
        return NextResponse.json(
          { error: 'Failed to update subscription tier targeting' },
          { status: 500 }
        );
      }

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
          return NextResponse.json(
            { error: 'Failed to update subscription tier targeting' },
            { status: 500 }
          );
        }
      }
    }

    // Update specific user targeting
    if (users !== undefined) {
      // Delete existing user targeting
      const { error: deleteUserError } = await adminClient
        .from('feature_flag_users')
        .delete()
        .eq('feature_flag_id', id);

      if (deleteUserError) {
        console.error(
          'Error deleting existing user targeting:',
          deleteUserError
        );
        return NextResponse.json(
          { error: 'Failed to update user targeting' },
          { status: 500 }
        );
      }

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
          return NextResponse.json(
            { error: 'Failed to update user targeting' },
            { status: 500 }
          );
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
