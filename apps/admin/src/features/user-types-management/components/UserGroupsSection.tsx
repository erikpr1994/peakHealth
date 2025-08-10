'use client';

import React from 'react';
import { Plus, Users } from 'lucide-react';

import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

import { UserGroup } from '../types';

interface UserGroupsSectionProps {
  userGroups: UserGroup[];
  onAddGroup: () => void;
  onEditGroup: (group: UserGroup) => void;
  onDeleteGroup: (group: UserGroup) => void;
}

export const UserGroupsSection = ({
  userGroups,
  onAddGroup,
  onEditGroup,
  onDeleteGroup,
}: UserGroupsSectionProps): React.JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Groups</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Manage user groups for targeted permissions and features
          </p>
          <Button variant="outline" size="sm" onClick={onAddGroup}>
            <Plus className="w-4 h-4 mr-2" />
            Add Group
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userGroups.map(group => (
            <div
              key={group.id}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onEditGroup(group)}
            >
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4" />
                <h4 className="font-medium">{group.displayName}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {group.description}
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{group.userCount} users</Badge>
                <Badge
                  variant={group.isActive ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {group.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          ))}
          {userGroups.length === 0 && (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No user groups created yet</p>
              <p className="text-sm">Create your first group to get started</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
