'use client';

import React, { useState } from 'react';
import { Edit, Trash2, Shield } from 'lucide-react';

import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';

import { UserType } from '../types';
import { PermissionsDialog } from './PermissionsDialog';

interface UserTypesTableProps {
  userTypes: UserType[];
  onEditPermissions: (
    userTypeId: string,
    permissions: Record<string, boolean>
  ) => void;
  onEdit: (userType: UserType) => void;
  onDelete: (userType: UserType) => void;
}

export const UserTypesTable = ({
  userTypes,
  onEditPermissions,
  onEdit,
  onDelete,
}: UserTypesTableProps): React.JSX.Element => {
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(
    null
  );

  const handleEditPermissions = (userType: UserType): void => {
    setSelectedUserType(userType);
    setIsPermissionsDialogOpen(true);
  };

  const handleSavePermissions = (
    permissions: Record<string, boolean>
  ): void => {
    if (selectedUserType) {
      onEditPermissions(selectedUserType.id, permissions);
    }
  };

  const handleClosePermissionsDialog = (): void => {
    setIsPermissionsDialogOpen(false);
    setSelectedUserType(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Types</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userTypes.map(userType => (
                <TableRow key={userType.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{userType.displayName}</div>
                      <div className="text-sm text-muted-foreground">
                        {userType.name}
                      </div>
                      {userType.isDefault && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          Default
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground max-w-xs">
                      {userType.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {userType.userCount} users
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {Object.keys(userType.permissions || {})
                        .slice(0, 2)
                        .map(permission => (
                          <Badge
                            key={permission}
                            variant="outline"
                            className="text-xs"
                          >
                            {permission}
                          </Badge>
                        ))}
                      {Object.keys(userType.permissions || {}).length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{Object.keys(userType.permissions || {}).length - 2}{' '}
                          more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={userType.isActive ? 'default' : 'secondary'}
                    >
                      {userType.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditPermissions(userType)}
                      >
                        <Shield className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(userType)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(userType)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedUserType && (
        <PermissionsDialog
          open={isPermissionsDialogOpen}
          onOpenChange={setIsPermissionsDialogOpen}
          userType={selectedUserType}
          onClose={handleClosePermissionsDialog}
          onSave={handleSavePermissions}
        />
      )}
    </>
  );
};
