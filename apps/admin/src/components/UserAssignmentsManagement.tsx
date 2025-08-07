'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserAssignmentsManagementProps {
  scopeInfo: {
    scope: string;
    label: string;
    color: string;
  };
}

export const UserAssignmentsManagement = ({
  scopeInfo,
}: UserAssignmentsManagementProps) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">User Assignments</h1>
          <Badge variant="outline">{scopeInfo.label}</Badge>
        </div>
        <Button>Manage Assignments</Button>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>User Assignments Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Manage user assignments to types, groups, and subscription tiers.
              This interface allows you to assign users to different
              classifications and manage their relationships.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
