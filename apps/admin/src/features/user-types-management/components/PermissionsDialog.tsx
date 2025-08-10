'use client';

import React, { useState } from 'react';

import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';

import { AVAILABLE_PERMISSIONS } from '../../../lib/permissions-config';
import { UserType } from '../types';

interface PermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userType: UserType;
  onClose: () => void;
  onSave?: (permissions: Record<string, boolean>) => void;
}

export const PermissionsDialog = ({
  open,
  onOpenChange,
  userType,
  onClose,
  onSave,
}: PermissionsDialogProps): React.JSX.Element => {
  const [pendingPermissions, setPendingPermissions] = useState<
    Record<string, boolean>
  >(userType.permissions || {});

  const handlePermissionToggle = (
    permissionId: string,
    checked: boolean
  ): void => {
    setPendingPermissions(prev => ({
      ...prev,
      [permissionId]: checked,
    }));
  };

  const handleSave = (): void => {
    onSave?.(pendingPermissions);
    onClose();
  };

  const handleCancel = (): void => {
    setPendingPermissions(userType.permissions || {});
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Manage Permissions - {userType.displayName}</DialogTitle>
          <DialogDescription>
            Configure which permissions and features are available for this user
            type. These permissions will be inherited by users assigned to this
            type.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AVAILABLE_PERMISSIONS.map(permission => (
              <div
                key={permission.id}
                className="flex items-center space-x-3 p-3 border rounded-lg"
              >
                <Switch
                  id={permission.id}
                  checked={pendingPermissions[permission.id] || false}
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
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
