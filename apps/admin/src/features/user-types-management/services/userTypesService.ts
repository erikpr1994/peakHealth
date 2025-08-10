import { createAdminClient } from '../../../lib/supabase/admin';
import {
  UserType,
  UserGroup,
  CreateUserTypeRequest,
  UpdateUserTypeRequest,
  CreateUserGroupRequest,
  UpdateUserGroupRequest,
} from '../types';

export class UserTypesService {
  private supabase = createAdminClient();

  async getUserTypes(): Promise<UserType[]> {
    if (!this.supabase) {
      throw new Error('Supabase client not available');
    }

    const { data, error } = await this.supabase
      .from('user_types')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch user types: ${error.message}`);
    }

    return (
      data?.map(item => ({
        id: item.id,
        name: item.name,
        displayName: item.display_name,
        description: item.description,
        permissions: item.permissions ? Object.keys(item.permissions) : [],
        isActive: item.is_active,
        userCount: 0, // TODO: Implement user count query separately
        isDefault: item.is_default,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })) || []
    );
  }

  async getUserType(id: string): Promise<UserType | null> {
    if (!this.supabase) {
      throw new Error('Supabase client not available');
    }

    const { data, error } = await this.supabase
      .from('user_types')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch user type: ${error.message}`);
    }

    return {
      id: data.id,
      name: data.name,
      displayName: data.display_name,
      description: data.description,
      permissions: data.permissions ? Object.keys(data.permissions) : [],
      isActive: data.is_active,
      userCount: 0, // TODO: Implement user count query separately
      isDefault: data.is_default,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  async createUserType(userType: CreateUserTypeRequest): Promise<UserType> {
    if (!this.supabase) {
      throw new Error('Supabase client not available');
    }

    const { data, error } = await this.supabase
      .from('user_types')
      .insert({
        name: userType.name,
        display_name: userType.displayName,
        description: userType.description,
        permissions: userType.permissions,
        is_active: userType.isActive ?? true,
        is_default: userType.isDefault ?? false,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create user type: ${error.message}`);
    }

    return {
      id: data.id,
      name: data.name,
      displayName: data.display_name,
      description: data.description,
      permissions: data.permissions ? Object.keys(data.permissions) : [],
      isActive: data.is_active,
      userCount: 0,
      isDefault: data.is_default,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  async updateUserType(
    id: string,
    updates: UpdateUserTypeRequest
  ): Promise<UserType> {
    if (!this.supabase) {
      throw new Error('Supabase client not available');
    }

    const updateData: Record<string, unknown> = {};
    if (updates.displayName !== undefined) {
      updateData.display_name = updates.displayName;
    }
    if (updates.description !== undefined) {
      updateData.description = updates.description;
    }
    if (updates.permissions !== undefined) {
      updateData.permissions = updates.permissions;
    }
    if (updates.isActive !== undefined) {
      updateData.is_active = updates.isActive;
    }
    if (updates.isDefault !== undefined) {
      updateData.is_default = updates.isDefault;
    }

    const { data, error } = await this.supabase
      .from('user_types')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update user type: ${error.message}`);
    }

    return {
      id: data.id,
      name: data.name,
      displayName: data.display_name,
      description: data.description,
      permissions: data.permissions ? Object.keys(data.permissions) : [],
      isActive: data.is_active,
      userCount: 0, // Will be fetched separately if needed
      isDefault: data.is_default,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  async deleteUserType(id: string): Promise<void> {
    if (!this.supabase) {
      throw new Error('Supabase client not available');
    }

    const { error } = await this.supabase
      .from('user_types')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete user type: ${error.message}`);
    }
  }

  async getUserGroups(): Promise<UserGroup[]> {
    if (!this.supabase) {
      throw new Error('Supabase client not available');
    }

    const { data, error } = await this.supabase
      .from('user_groups')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch user groups: ${error.message}`);
    }

    return (
      data?.map(item => ({
        id: item.id,
        name: item.name,
        displayName: item.display_name,
        description: item.description,
        permissions: item.permissions ? Object.keys(item.permissions) : [],
        isActive: item.is_active,
        userCount: 0, // TODO: Implement user count query separately
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })) || []
    );
  }

  async createUserGroup(userGroup: CreateUserGroupRequest): Promise<UserGroup> {
    if (!this.supabase) {
      throw new Error('Supabase client not available');
    }

    const { data, error } = await this.supabase
      .from('user_groups')
      .insert({
        name: userGroup.name,
        display_name: userGroup.displayName,
        description: userGroup.description,
        permissions: userGroup.permissions,
        is_active: userGroup.isActive ?? true,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create user group: ${error.message}`);
    }

    return {
      id: data.id,
      name: data.name,
      displayName: data.display_name,
      description: data.description,
      permissions: data.permissions ? Object.keys(data.permissions) : [],
      isActive: data.is_active,
      userCount: 0,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  async updateUserGroup(
    id: string,
    updates: UpdateUserGroupRequest
  ): Promise<UserGroup> {
    if (!this.supabase) {
      throw new Error('Supabase client not available');
    }

    const updateData: Record<string, unknown> = {};
    if (updates.displayName !== undefined) {
      updateData.display_name = updates.displayName;
    }
    if (updates.description !== undefined) {
      updateData.description = updates.description;
    }
    if (updates.permissions !== undefined) {
      updateData.permissions = updates.permissions;
    }
    if (updates.isActive !== undefined) {
      updateData.is_active = updates.isActive;
    }

    const { data, error } = await this.supabase
      .from('user_groups')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update user group: ${error.message}`);
    }

    return {
      id: data.id,
      name: data.name,
      displayName: data.display_name,
      description: data.description,
      permissions: data.permissions ? Object.keys(data.permissions) : [],
      isActive: data.is_active,
      userCount: 0, // Will be fetched separately if needed
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  async deleteUserGroup(id: string): Promise<void> {
    if (!this.supabase) {
      throw new Error('Supabase client not available');
    }

    const { error } = await this.supabase
      .from('user_groups')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete user group: ${error.message}`);
    }
  }
}
