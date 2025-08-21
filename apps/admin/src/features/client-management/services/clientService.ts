import { createAdminClient } from '../../../lib/supabase/admin';

import type {
  Client,
  ClientListResponse,
  ClientFilters,
  AddClientData,
  UpdateClientData,
  AssignProgramData,
} from '../types';

export async function getClients(
  filters: ClientFilters = {},
  page: number = 1,
  pageSize: number = 20
): Promise<ClientListResponse> {
  const supabase = createAdminClient();
  if (!supabase) {
    throw new Error('Supabase admin client not available');
  }

  // Get users from auth.users using admin client
  const { data: users, error: usersError } =
    await supabase.auth.admin.listUsers();

  if (usersError) {
     
    console.error('Error fetching users:', usersError);
    throw new Error('Failed to fetch users');
  }

  // Get profiles and stats sequentially for better compatibility
  const userIds = users.users.map(user => user.id);
  const profilesResult = await supabase
    .from('profiles')
    .select('*')
    .in('id', userIds);
  const statsResult = await supabase
    .from('user_stats')
    .select('*')
    .in('user_id', userIds);

  if (profilesResult.error) {
     
    console.error('Error fetching profiles:', profilesResult.error);
  }

  if (statsResult.error) {
     
    console.error('Error fetching user stats:', statsResult.error);
  }

  // Create a map of profiles by user ID
  const profilesMap = new Map();
  (profilesResult.data || []).forEach((profile: Record<string, unknown>) => {
    profilesMap.set(profile.id as string, profile);
  });

  // Create a map of stats by user ID
  const statsMap = new Map();
  (statsResult.data || []).forEach((stats: Record<string, unknown>) => {
    statsMap.set(stats.user_id as string, stats);
  });

  // Transform users to match our Client interface
  const clients: Client[] = users.users.map(user => ({
    created_at: user.created_at,
    email: user.email || '',
    id: user.id,
    profile: profilesMap.get(user.id) || undefined,
    stats: statsMap.get(user.id) || undefined,
    updated_at: user.updated_at,
  }));

  // Apply filters
  let filteredClients = clients;

  if (filters.search && filters.search.length > 0) {
    const searchTerm = filters.search.toLowerCase();
    filteredClients = filteredClients.filter(client =>
      client.email.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.status === 'active') {
    filteredClients = filteredClients.filter(
      client => client.profile?.onboarding_completed_at
    );
  } else if (filters.status === 'inactive') {
    filteredClients = filteredClients.filter(
      client => !client.profile?.onboarding_completed_at
    );
  }

  // Get total count
  const total = filteredClients.length;

  // Apply pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize;
  const paginatedClients = filteredClients.slice(from, to);

  // Get user assignments for each client sequentially
  const clientsWithAssignments = [];
  for (const client of paginatedClients) {
    const { data: assignments } = await supabase.rpc('get_user_assignments', {
      user_id_param: client.id,
    });

    if (assignments && assignments.length > 0) {
      const assignment = assignments[0];
      clientsWithAssignments.push({
        ...client,
        data_access_rules: assignment.data_access_rules || {},
        features: assignment.features || [],
        groups: assignment.groups || [],
        permissions: assignment.permissions || {},
        primary_user_type: assignment.primary_user_type,
        subscription_tier: assignment.subscription_tier,
        user_types: assignment.user_types || [],
      });
    } else {
      clientsWithAssignments.push(client);
    }
  }

  return {
    clients: clientsWithAssignments,
    page,
    pageSize,
    total,
  };
}

export async function getClientById(clientId: string): Promise<Client | null> {
  const supabase = createAdminClient();
  if (!supabase) {
    throw new Error('Supabase admin client not available');
  }

  // Get user from auth.users using admin client
  const { data: user, error: userError } =
    await supabase.auth.admin.getUserById(clientId);

  if (userError || !user.user) {
    console.error('Error fetching user:', userError);
    return null;
  }

  // Get profile and stats sequentially
  const profileResult = await supabase
    .from('profiles')
    .select('*')
    .eq('id', clientId)
    .single();
  const statsResult = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', clientId)
    .single();

  // Get user assignments
  const { data: assignments } = await supabase.rpc('get_user_assignments', {
    user_id_param: clientId,
  });

  const client: Client = {
    created_at: user.user.created_at,
    email: user.user.email || '',
    id: user.user.id,
    profile: profileResult.data || null,
    stats: statsResult.data || null,
    updated_at: user.user.updated_at,
  };

  if (assignments && assignments.length > 0) {
    const assignment = assignments[0];
    return {
      ...client,
      data_access_rules: assignment.data_access_rules || {},
      features: assignment.features || [],
      groups: assignment.groups || [],
      permissions: assignment.permissions || {},
      primary_user_type: assignment.primary_user_type,
      subscription_tier: assignment.subscription_tier,
      user_types: assignment.user_types || [],
    };
  }

  return client;
}

export async function addClient(clientData: AddClientData): Promise<Client> {
  const supabase = createAdminClient();
  if (!supabase) {
    throw new Error('Supabase admin client not available');
  }

  // Create user in auth.users using admin client
  const { data: user, error: userError } = await supabase.auth.admin.createUser(
    {
      email: clientData.email,
      email_confirm: true,
      password: 'temporary-password-123', // Should be changed by user
      user_metadata: {
        fullName: clientData.profile?.bio || clientData.email,
      },
    }
  );

  if (userError || !user.user) {
    console.error('Error creating user:', userError);
    throw new Error('Failed to create user');
  }

  const userId = user.user.id;

  // Insert profile data if provided
  if (clientData.profile) {
    const { error: profileError } = await supabase.from('profiles').upsert({
      id: userId,
      ...clientData.profile,
    });

    if (profileError) {
      console.error('Error creating profile:', profileError);
      throw new Error('Failed to create client profile');
    }
  }

  // Assign user type if provided
  if (clientData.user_type) {
    const { error: typeError } = await supabase
      .from('user_type_assignments')
      .insert({
        is_primary: true,
        reason: 'Admin assignment',
        user_id: userId,
        user_type_name: clientData.user_type,
      });

    if (typeError) {
      console.error('Error assigning user type:', typeError);
      throw new Error('Failed to assign user type');
    }
  }

  // Assign subscription tier if provided
  if (clientData.subscription_tier) {
    const { error: subscriptionError } = await supabase
      .from('subscription_assignments')
      .insert({
        reason: 'Admin assignment',
        subscription_tier_name: clientData.subscription_tier,
        user_id: userId,
      });

    if (subscriptionError) {
      console.error('Error assigning subscription:', subscriptionError);
      throw new Error('Failed to assign subscription tier');
    }
  }

  // Assign groups if provided
  if (clientData.groups && clientData.groups.length > 0) {
    const groupAssignments = clientData.groups.map(group => ({
      group_name: group,
      reason: 'Admin assignment',
      user_id: userId,
    }));

    const { error: groupError } = await supabase
      .from('user_group_assignments')
      .insert(groupAssignments);

    if (groupError) {
      console.error('Error assigning groups:', groupError);
      throw new Error('Failed to assign groups');
    }
  }

  // Return the created client
  const client = await getClientById(userId);
  if (!client) {
    throw new Error('Failed to retrieve created client');
  }

  return client;
}

export async function updateClient(
  clientId: string,
  updateData: UpdateClientData
): Promise<Client> {
  const supabase = createAdminClient();
  if (!supabase) {
    throw new Error('Supabase admin client not available');
  }

  // Update profile if provided
  if (updateData.profile) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update(updateData.profile)
      .eq('id', clientId);

    if (profileError) {
      console.error('Error updating profile:', profileError);
      throw new Error('Failed to update client profile');
    }
  }

  // Update user type if provided
  if (updateData.user_type) {
    // First, remove existing primary assignment
    await supabase
      .from('user_type_assignments')
      .update({ is_primary: false })
      .eq('user_id', clientId)
      .eq('is_primary', true);

    // Then add new assignment
    const { error: typeError } = await supabase
      .from('user_type_assignments')
      .insert({
        is_primary: true,
        reason: 'Admin update',
        user_id: clientId,
        user_type_name: updateData.user_type,
      });

    if (typeError) {
      console.error('Error updating user type:', typeError);
      throw new Error('Failed to update user type');
    }
  }

  // Update subscription tier if provided
  if (updateData.subscription_tier) {
    // End current subscription
    await supabase
      .from('subscription_assignments')
      .update({ effective_until: new Date().toISOString() })
      .eq('user_id', clientId)
      .is('effective_until', null);

    // Add new subscription
    const { error: subscriptionError } = await supabase
      .from('subscription_assignments')
      .insert({
        reason: 'Admin update',
        subscription_tier_name: updateData.subscription_tier,
        user_id: clientId,
      });

    if (subscriptionError) {
      console.error('Error updating subscription:', subscriptionError);
      throw new Error('Failed to update subscription tier');
    }
  }

  // Update groups if provided
  if (updateData.groups) {
    // End current group assignments
    await supabase
      .from('user_group_assignments')
      .update({ effective_until: new Date().toISOString() })
      .eq('user_id', clientId)
      .is('effective_until', null);

    // Add new group assignments
    if (updateData.groups.length > 0) {
      const groupAssignments = updateData.groups.map(group => ({
        group_name: group,
        reason: 'Admin update',
        user_id: clientId,
      }));

      const { error: groupError } = await supabase
        .from('user_group_assignments')
        .insert(groupAssignments);

      if (groupError) {
        console.error('Error updating groups:', groupError);
        throw new Error('Failed to update groups');
      }
    }
  }

  // Return the updated client
  const client = await getClientById(clientId);
  if (!client) {
    throw new Error('Failed to retrieve updated client');
  }

  return client;
}

export async function deleteClient(clientId: string): Promise<void> {
  const supabase = createAdminClient();
  if (!supabase) {
    throw new Error('Supabase admin client not available');
  }

  // Delete user from auth.users (this will cascade to related tables)
  const { error } = await supabase.auth.admin.deleteUser(clientId);

  if (error) {
    console.error('Error deleting client:', error);
    throw new Error('Failed to delete client');
  }
}

export async function assignProgram(
  programData: AssignProgramData
): Promise<void> {
  // This would integrate with the workout/program system
  // For now, we'll just log the assignment
  console.log('Assigning program:', programData);

  // TODO: Implement program assignment logic
  // This would involve:
  // 1. Creating a workout routine for the client
  // 2. Setting up the program schedule
  // 3. Adding the goals to the client's profile
  // 4. Creating any necessary notifications or reminders
}
