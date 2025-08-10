import { useState, useEffect } from 'react';
import {
  UserType,
  CreateUserTypeRequest,
  UpdateUserTypeRequest,
} from '../types';

export const useUserTypes = (): {
  userTypes: UserType[];
  loading: boolean;
  error: string | null;
  fetchUserTypes: () => Promise<void>;
  createUserType: (userType: CreateUserTypeRequest) => Promise<UserType>;
  updateUserType: (
    id: string,
    updates: UpdateUserTypeRequest
  ) => Promise<UserType>;
  deleteUserType: (id: string) => Promise<void>;
} => {
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserTypes = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/user-types');
      if (!response.ok) {
        throw new Error('Failed to fetch user types');
      }
      const data = await response.json();
      setUserTypes(data.userTypes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createUserType = async (
    userType: CreateUserTypeRequest
  ): Promise<UserType> => {
    const response = await fetch('/api/admin/user-types', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userType),
    });

    if (!response.ok) {
      throw new Error('Failed to create user type');
    }

    const data = await response.json();
    await fetchUserTypes(); // Refresh the list
    return data.userType;
  };

  const updateUserType = async (
    id: string,
    updates: UpdateUserTypeRequest
  ): Promise<UserType> => {
    const response = await fetch('/api/admin/user-types', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...updates }),
    });

    if (!response.ok) {
      throw new Error('Failed to update user type');
    }

    const data = await response.json();
    await fetchUserTypes(); // Refresh the list
    return data.userType;
  };

  const deleteUserType = async (id: string): Promise<void> => {
    const response = await fetch(`/api/admin/user-types?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete user type');
    }

    await fetchUserTypes(); // Refresh the list
  };

  useEffect(() => {
    fetchUserTypes();
  }, []);

  return {
    userTypes,
    loading,
    error,
    fetchUserTypes,
    createUserType,
    updateUserType,
    deleteUserType,
  };
};
