'use client';

import { Plus, Edit, Trash2, Shield } from 'lucide-react';
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

interface SubscriptionTier {
  id: string;
  name: string;
  displayName: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  permissions: string[];
  features: string[];
  isActive: boolean;
  userCount: number;
}

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
  const [tiers, setTiers] = useState<SubscriptionTier[]>([
    {
      id: '1',
      name: 'free',
      displayName: 'Free',
      price: 0,
      billingCycle: 'monthly',
      permissions: ['basic_workouts', 'limited_analytics'],
      features: ['Basic workout tracking', 'Limited analytics'],
      isActive: true,
      userCount: 1247,
    },
    {
      id: '2',
      name: 'pro',
      displayName: 'Pro',
      price: 19.99,
      billingCycle: 'monthly',
      permissions: ['advanced_workouts', 'full_analytics', 'custom_routines'],
      features: ['Advanced workouts', 'Full analytics', 'Custom routines'],
      isActive: true,
      userCount: 892,
    },
    {
      id: '3',
      name: 'premium',
      displayName: 'Premium',
      price: 39.99,
      billingCycle: 'monthly',
      permissions: [
        'advanced_workouts',
        'full_analytics',
        'custom_routines',
        'personal_trainer',
        'priority_support',
      ],
      features: [
        'Advanced workouts',
        'Full analytics',
        'Custom routines',
        'Personal trainer access',
        'Priority support',
      ],
      isActive: true,
      userCount: 456,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(
    null
  );

  const availablePermissions = AVAILABLE_PERMISSIONS;

  const handleEditPermissions = (tier: SubscriptionTier) => {
    setSelectedTier(tier);
    setIsPermissionsDialogOpen(true);
  };

  const handleUpdatePermissions = (tierId: string, permissions: string[]) => {
    setTiers(prev =>
      prev.map(tier => (tier.id === tierId ? { ...tier, permissions } : tier))
    );
    setIsPermissionsDialogOpen(false);
    setSelectedTier(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Subscription Tiers</h1>
          <Badge variant="outline">{scopeInfo.label}</Badge>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Tier
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subscription Tier</DialogTitle>
              <DialogDescription>
                Create a new subscription tier with pricing and permissions.
              </DialogDescription>
            </DialogHeader>
            {/* Add tier form would go here */}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button>Create Tier</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 space-y-6">
        {/* Subscription Tiers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tier</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tiers.map(tier => (
                  <TableRow key={tier.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{tier.displayName}</div>
                        <div className="text-sm text-muted-foreground">
                          {tier.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          ${tier.price}/{tier.billingCycle}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {tier.billingCycle === 'yearly'
                            ? 'Billed annually'
                            : 'Billed monthly'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{tier.userCount} users</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {tier.permissions.slice(0, 2).map(permission => (
                          <Badge
                            key={permission}
                            variant="outline"
                            className="text-xs"
                          >
                            {permission}
                          </Badge>
                        ))}
                        {tier.permissions.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{tier.permissions.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={tier.isActive ? 'default' : 'secondary'}>
                        {tier.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditPermissions(tier)}
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

        {/* Permissions Management Dialog */}
        <Dialog
          open={isPermissionsDialogOpen}
          onOpenChange={setIsPermissionsDialogOpen}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Manage Permissions - {selectedTier?.displayName}
              </DialogTitle>
              <DialogDescription>
                Configure which permissions and features are available for this
                subscription tier.
              </DialogDescription>
            </DialogHeader>
            {selectedTier && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availablePermissions.map(permission => (
                    <div
                      key={permission.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg"
                    >
                      <Switch
                        id={permission.id}
                        checked={selectedTier.permissions.includes(
                          permission.id
                        )}
                        onCheckedChange={checked => {
                          const newPermissions = checked
                            ? [...selectedTier.permissions, permission.id]
                            : selectedTier.permissions.filter(
                                p => p !== permission.id
                              );
                          handleUpdatePermissions(
                            selectedTier.id,
                            newPermissions
                          );
                        }}
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
              <Button
                variant="outline"
                onClick={() => setIsPermissionsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsPermissionsDialogOpen(false)}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Tier Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Manage subscription tiers, pricing plans, and associated
              permissions. Configure which features and capabilities are
              available to users based on their subscription level. This
              directly impacts revenue generation and user experience across the
              platform.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
