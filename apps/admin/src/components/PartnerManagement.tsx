'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PartnerManagementProps {
  scopeInfo: {
    scope: string;
    label: string;
    color: string;
  };
}

export const PartnerManagement = ({ scopeInfo }: PartnerManagementProps) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Partner Management</h1>
          <Badge variant="outline">{scopeInfo.label}</Badge>
        </div>
        <Button>Add Partner</Button>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Partnerships</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Manage business partnerships, collaborations, and strategic
              relationships. This interface allows you to track and manage all
              partner relationships and their associated benefits.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
