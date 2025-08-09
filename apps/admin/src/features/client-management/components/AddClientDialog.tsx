'use client';

import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';
import { addClient } from '../api/clients';
import type { AddClientData } from '../types';

interface AddClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClientAdded: () => void;
}

export const AddClientDialog = ({
  open,
  onOpenChange,
  onClientAdded,
}: AddClientDialogProps): React.JSX.Element => {
  const [formData, setFormData] = useState({
    email: '',
    user_type: '',
    subscription_tier: '',
    goals: '',
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (): Promise<void> => {
    if (!formData.email) return;

    setIsLoading(true);
    try {
      const clientData: AddClientData = {
        email: formData.email,
        user_type: formData.user_type || undefined,
        subscription_tier: formData.subscription_tier || undefined,
        profile: {
          goals: formData.goals
            ? formData.goals.split('\n').filter(g => g.trim())
            : undefined,
          bio: formData.notes || undefined,
        },
      };

      await addClient(clientData);
      setFormData({
        email: '',
        user_type: '',
        subscription_tier: '',
        goals: '',
        notes: '',
      });
      onOpenChange(false);
      onClientAdded();
    } catch (error) {
      console.error('Error adding client:', error);
      // TODO: Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Create a new client profile by entering their basic information and
            initial goals.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="client@email.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="user_type">User Type</Label>
              <Select
                value={formData.user_type}
                onValueChange={(value: string) =>
                  setFormData({ ...formData, user_type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular User</SelectItem>
                  <SelectItem value="trainer">Trainer</SelectItem>
                  <SelectItem value="physio">Physiotherapist</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="subscription_tier">Subscription Tier</Label>
              <Select
                value={formData.subscription_tier}
                onValueChange={(value: string) =>
                  setFormData({ ...formData, subscription_tier: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="pro">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="goals">Initial Goals (one per line)</Label>
            <Textarea
              id="goals"
              value={formData.goals}
              onChange={e =>
                setFormData({ ...formData, goals: e.target.value })
              }
              placeholder="e.g., Lose 10 lbs&#10;Improve cardiovascular health&#10;Build strength"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={e =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Any additional notes about the client..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!formData.email || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Client'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
