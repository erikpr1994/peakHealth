'use client';

import React, { useState } from 'react';

import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';

import { CreateUserTypeRequest } from '../types';

interface AddUserTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (userType: CreateUserTypeRequest) => void;
  trigger?: React.ReactNode;
}

export const AddUserTypeDialog = ({
  open,
  onOpenChange,
  onSave,
  trigger,
}: AddUserTypeDialogProps): React.JSX.Element => {
  const [formData, setFormData] = useState<CreateUserTypeRequest>({
    name: '',
    displayName: '',
    description: '',
    permissions: [],
    isActive: true,
    isDefault: false,
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      name: '',
      displayName: '',
      description: '',
      permissions: [],
      isActive: true,
      isDefault: false,
    });
    onOpenChange(false);
  };

  const handleInputChange = (
    field: keyof CreateUserTypeRequest,
    value: string | boolean
  ): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User Type</DialogTitle>
          <DialogDescription>
            Create a new user type with specific permissions and access levels.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              placeholder="e.g., premium_user"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={formData.displayName}
              onChange={e => handleInputChange('displayName', e.target.value)}
              placeholder="e.g., Premium User"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={e => handleInputChange('description', e.target.value)}
              placeholder="Describe what this user type is for..."
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create User Type</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
