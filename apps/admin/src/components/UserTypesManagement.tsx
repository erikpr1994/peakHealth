'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  return (
    <div className="p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">User Types & Groups</h1>
          <Badge variant="outline">{scopeInfo.label}</Badge>
        </div>
        <Button>Add User Type</Button>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>User Types & Groups Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Manage user types, groups, and their permissions. This interface
              allows you to create and configure different user classifications
              and their associated access rights.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
