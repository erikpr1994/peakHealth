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
import { Separator } from '../../../components/ui/separator';

import {
  AVAILABLE_PERMISSIONS,
  getPermissionsByCategory,
} from '../../../lib/permissions-config';
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

  const permissionsByCategory = getPermissionsByCategory();

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

  const getCategoryIcon = (category: string): string => {
    switch (category) {
      case 'Workouts':
        return '💪';
      case 'Analytics':
        return '📊';
      case 'Business':
        return '💼';
      case 'Support':
        return '🛟';
      case 'Administration':
        return '⚙️';
      case 'Features':
        return '🚀';
      default:
        return '🔧';
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Workouts':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'Analytics':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'Business':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'Support':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'Administration':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'Features':
        return 'bg-indigo-50 border-indigo-200 text-indigo-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const selectedCount =
    Object.values(pendingPermissions).filter(Boolean).length;
  const totalCount = AVAILABLE_PERMISSIONS.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">🔐</span>
            Manage Permissions - {userType.displayName}
          </DialogTitle>
          <DialogDescription>
            Configure which permissions and features are available for this user
            type.
            <span className="font-medium text-foreground ml-1">
              {selectedCount} of {totalCount} permissions selected
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          {Object.entries(permissionsByCategory).map(
            ([category, permissions]) => (
              <div key={category} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getCategoryIcon(category)}</span>
                  <h3 className="font-semibold text-lg">{category}</h3>
                  <Badge
                    variant="outline"
                    className={`${getCategoryColor(category)} border`}
                  >
                    {permissions.length} permissions
                  </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {permissions.map(permission => (
                    <div
                      key={permission.id}
                      className={`p-4 border rounded-lg transition-all duration-200 hover:shadow-sm ${
                        pendingPermissions[permission.id]
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Switch
                          id={permission.id}
                          checked={pendingPermissions[permission.id] || false}
                          onCheckedChange={checked =>
                            handlePermissionToggle(permission.id, checked)
                          }
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Label
                              htmlFor={permission.id}
                              className="font-medium text-sm cursor-pointer"
                            >
                              {permission.name}
                            </Label>
                            {permission.isPremium && (
                              <Badge variant="secondary" className="text-xs">
                                Premium
                              </Badge>
                            )}
                            {permission.isAdmin && (
                              <Badge variant="destructive" className="text-xs">
                                Admin
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />
              </div>
            )
          )}
        </div>

        <DialogFooter className="flex-shrink-0 pt-4 border-t">
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {selectedCount}
              </span>{' '}
              permissions selected
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
