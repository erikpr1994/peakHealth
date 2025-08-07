'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SubscriptionTiersManagementProps {
  scopeInfo: {
    scope: string;
    label: string;
    color: string;
  };
}

export const SubscriptionTiersManagement = ({
  scopeInfo,
}: SubscriptionTiersManagementProps) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Subscription Tiers</h1>
          <Badge variant="outline">{scopeInfo.label}</Badge>
        </div>
        <Button>Add Tier</Button>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Manage subscription tiers and pricing plans. This interface allows
              you to create, configure, and manage different subscription levels
              with their associated features and pricing.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
