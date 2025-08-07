'use client';

import { Plus, Edit, Trash2, Shield, Users } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { AVAILABLE_PERMISSIONS } from '@/lib/permissions-config';

interface UserType {
  id: string;
  name: string;
  displayName: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  userCount: number;
  isDefault: boolean;
}

interface UserTypesManagementProps {
  scopeInfo: {
    scope: string;
    label: string;
    color: string;
  };
}

export const UserTypesManagement = ({
  scopeInfo,
}: UserTypesManagementProps) => {
  const [userTypes, setUserTypes] = useState<UserType[]>([
    {
      id: '1',
      name: 'regular',
      displayName: 'Regular User',
      description: 'Standard user with basic access',
      permissions: ['basic_workouts', 'limited_analytics'],
      isActive: true,
      userCount: 1247,
      isDefault: true,
    },
    {
      id: '2',
      name: 'trainer',
      displayName: 'Trainer',
      description: 'Certified fitness trainer with advanced features',
      permissions: [
        'advanced_workouts',
        'full_analytics',
        'custom_routines',
        'client_management',
      ],
      isActive: true,
      userCount: 156,
      isDefault: false,
    },
    {
      id: '3',
      name: 'admin',
      displayName: 'Administrator',
      description: 'System administrator with full access',
      permissions: [
        'advanced_workouts',
        'full_analytics',
        'custom_routines',
        'admin_panel',
        'user_management',
        'system_settings',
      ],
      isActive: true,
      userCount: 12,
      isDefault: false,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(
    null
  );
  const [pendingPermissions, setPendingPermissions] = useState<string[]>([]);

  const availablePermissions = AVAILABLE_PERMISSIONS;

  const handleEditPermissions = (userType: UserType) => {
    setSelectedUserType(userType);
    setPendingPermissions(userType.permissions);
    setIsPermissionsDialogOpen(true);
  };

  const handleUpdatePermissions = (
    userTypeId: string,
    permissions: string[]
  ) => {
    setUserTypes(prev =>
      prev.map(userType =>
        userType.id === userTypeId ? { ...userType, permissions } : userType
      )
    );
    setIsPermissionsDialogOpen(false);
    setSelectedUserType(null);
    setPendingPermissions([]);
  };

  const handleSavePermissions = () => {
    if (selectedUserType) {
      handleUpdatePermissions(selectedUserType.id, pendingPermissions);
    }
  };

  const handleCancelPermissions = () => {
    setIsPermissionsDialogOpen(false);
    setSelectedUserType(null);
    setPendingPermissions([]);
  };

  const handlePermissionToggle = (permissionId: string, checked: boolean) => {
    setPendingPermissions(prev =>
      checked ? [...prev, permissionId] : prev.filter(p => p !== permissionId)
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">User Types & Groups</h1>
          <Badge variant="outline">{scopeInfo.label}</Badge>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User Type</DialogTitle>
              <DialogDescription>
                Create a new user type with specific permissions and access
                levels.
              </DialogDescription>
            </DialogHeader>
            {/* Add user type form would go here */}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button>Create User Type</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 space-y-6">
        {/* User Types Table */}
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
                        <div className="font-medium">
                          {userType.displayName}
                        </div>
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
                        {userType.permissions.slice(0, 2).map(permission => (
                          <Badge
                            key={permission}
                            variant="outline"
                            className="text-xs"
                          >
                            {permission}
                          </Badge>
                        ))}
                        {userType.permissions.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{userType.permissions.length - 2} more
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
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
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

        {/* User Groups Section */}
        <Card>
          <CardHeader>
            <CardTitle>User Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Manage user groups for targeted permissions and features
              </p>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Group
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4" />
                  <h4 className="font-medium">Early Adopters</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Users who get early access to new features
                </p>
                <Badge variant="secondary">247 users</Badge>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4" />
                  <h4 className="font-medium">Beta Testers</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Users who test beta features and provide feedback
                </p>
                <Badge variant="secondary">89 users</Badge>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4" />
                  <h4 className="font-medium">Enterprise</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Enterprise clients with special features
                </p>
                <Badge variant="secondary">12 users</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Permissions Management Dialog */}
        <Dialog
          open={isPermissionsDialogOpen}
          onOpenChange={setIsPermissionsDialogOpen}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Manage Permissions - {selectedUserType?.displayName}
              </DialogTitle>
              <DialogDescription>
                Configure which permissions and features are available for this
                user type. These permissions will be inherited by users assigned
                to this type.
              </DialogDescription>
            </DialogHeader>
            {selectedUserType && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availablePermissions.map(permission => (
                    <div
                      key={permission.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg"
                    >
                      <Switch
                        id={permission.id}
                        checked={pendingPermissions.includes(permission.id)}
                        onCheckedChange={checked =>
                          handlePermissionToggle(permission.id, checked)
                        }
                      />
                      <div className="flex-1">
                        <Label htmlFor={permission.id} className="font-medium">
                          {permission.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {permission.description}
                        </p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {permission.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={handleCancelPermissions}>
                Cancel
              </Button>
              <Button onClick={handleSavePermissions}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
