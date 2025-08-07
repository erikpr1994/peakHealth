'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserDefaultsManagementProps {
  scopeInfo: {
    scope: string;
    label: string;
    color: string;
  };
}

export const UserDefaultsManagement = ({
  scopeInfo,
}: UserDefaultsManagementProps) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">User Defaults</h1>
          <Badge variant="outline">{scopeInfo.label}</Badge>
        </div>
        <Button>Update Defaults</Button>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>System User Defaults</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Configure system-wide default settings for new users. This
              includes default user types, subscription tiers, and group
              assignments that are automatically applied to new user
              registrations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
