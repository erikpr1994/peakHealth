import { useState, useEffect } from 'react';
import {
  UserGroup,
  CreateUserGroupRequest,
  UpdateUserGroupRequest,
} from '../types';

export const useUserGroups = (): {
  userGroups: UserGroup[];
  loading: boolean;
  error: string | null;
  fetchUserGroups: () => Promise<void>;
  createUserGroup: (userGroup: CreateUserGroupRequest) => Promise<UserGroup>;
  updateUserGroup: (
    id: string,
    updates: UpdateUserGroupRequest
  ) => Promise<UserGroup>;
  deleteUserGroup: (id: string) => Promise<void>;
} => {
  const [userGroups, setUserGroups] = useState<UserGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserGroups = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/user-groups');
      if (!response.ok) {
        throw new Error('Failed to fetch user groups');
      }
      const data = await response.json();
      setUserGroups(data.userGroups);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createUserGroup = async (
    userGroup: CreateUserGroupRequest
  ): Promise<UserGroup> => {
    const response = await fetch('/api/admin/user-groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userGroup),
    });

    if (!response.ok) {
      throw new Error('Failed to create user group');
    }

    const data = await response.json();
    await fetchUserGroups(); // Refresh the list
    return data.userGroup;
  };

  const updateUserGroup = async (
    id: string,
    updates: UpdateUserGroupRequest
  ): Promise<UserGroup> => {
    const response = await fetch('/api/admin/user-groups', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...updates }),
    });

    if (!response.ok) {
      throw new Error('Failed to update user group');
    }

    const data = await response.json();
    await fetchUserGroups(); // Refresh the list
    return data.userGroup;
  };

  const deleteUserGroup = async (id: string): Promise<void> => {
    const response = await fetch(`/api/admin/user-groups?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete user group');
    }

    await fetchUserGroups(); // Refresh the list
  };

  useEffect(() => {
    fetchUserGroups();
  }, []);

  return {
    userGroups,
    loading,
    error,
    fetchUserGroups,
    createUserGroup,
    updateUserGroup,
    deleteUserGroup,
  };
};
