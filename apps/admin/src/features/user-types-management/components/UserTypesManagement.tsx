'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

import { useUserTypes } from '../hooks/useUserTypes';
import { useUserGroups } from '../hooks/useUserGroups';
import { UserType, UserGroup, CreateUserTypeRequest } from '../types';
import { AddUserTypeDialog } from './AddUserTypeDialog';
import { UserTypesTable } from './UserTypesTable';
import { UserGroupsSection } from './UserGroupsSection';

interface UserTypesManagementProps {
  scopeInfo: {
    scope: string;
    label: string;
    color: string;
  };
}

export const UserTypesManagement = ({
  scopeInfo,
}: UserTypesManagementProps): React.JSX.Element => {
  const {
    userTypes,
    loading: userTypesLoading,
    error: userTypesError,
    createUserType,
    updateUserType,
    deleteUserType,
  } = useUserTypes();

  const {
    userGroups,
    loading: userGroupsLoading,
    error: userGroupsError,
    deleteUserGroup,
  } = useUserGroups();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleCreateUserType = async (
    userType: CreateUserTypeRequest
  ): Promise<void> => {
    try {
      await createUserType(userType);
    } catch (error) {
      console.error('Failed to create user type:', error);
    }
  };

  const handleUpdateUserTypePermissions = async (
    userTypeId: string,
    permissions: Record<string, boolean>
  ): Promise<void> => {
    try {
      await updateUserType(userTypeId, { permissions });
    } catch (error) {
      console.error('Failed to update user type permissions:', error);
    }
  };

  const handleEditUserType = (userType: UserType): void => {
    // TODO: Implement edit user type functionality
    console.log('Edit user type:', userType);
  };

  const handleDeleteUserType = async (userType: UserType): Promise<void> => {
    try {
      await deleteUserType(userType.id);
    } catch (error) {
      console.error('Failed to delete user type:', error);
    }
  };

  const handleAddGroup = (): void => {
    // TODO: Implement add group functionality
    console.log('Add group');
  };

  const handleEditGroup = (group: UserGroup): void => {
    // TODO: Implement edit group functionality
    console.log('Edit group:', group);
  };

  const handleDeleteGroup = async (group: UserGroup): Promise<void> => {
    try {
      await deleteUserGroup(group.id);
    } catch (error) {
      console.error('Failed to delete user group:', error);
    }
  };

  if (userTypesLoading || userGroupsLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (userTypesError || userGroupsError) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">
            Error: {userTypesError || userGroupsError}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">User Types & Groups</h1>
          <Badge variant="outline">{scopeInfo.label}</Badge>
        </div>
        <AddUserTypeDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSave={handleCreateUserType}
          trigger={
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User Type
            </Button>
          }
        />
      </div>

      <div className="mt-6 space-y-6">
        <UserTypesTable
          userTypes={userTypes}
          onEditPermissions={handleUpdateUserTypePermissions}
          onEdit={handleEditUserType}
          onDelete={handleDeleteUserType}
        />

        <UserGroupsSection
          userGroups={userGroups}
          onAddGroup={handleAddGroup}
          onEditGroup={handleEditGroup}
          onDeleteGroup={handleDeleteGroup}
        />

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Permission System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The permission system works across three levels: User Types, User
              Groups, and Subscription Tiers. Users inherit permissions from all
              three sources, creating a comprehensive access control system.
              User Types define role-based permissions, Groups provide
              feature-based access, and Subscription Tiers control premium
              features based on payment level.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
