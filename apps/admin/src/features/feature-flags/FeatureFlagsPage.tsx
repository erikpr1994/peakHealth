'use client';

import { Loader2, Plus, BarChart3, Search } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import FeatureFlagCard from './components/FeatureFlagCard';
import FeatureFlagForm from './components/FeatureFlagForm';
import {
  useFeatureFlagCrud,
  useFeatureFlagsData,
  emptyFormState,
  convertFlagToFormState,
} from './hooks';
import { FeatureFlag, FeatureFlagFormData, EnvironmentKey } from './types';
import { categories } from './utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = { scopeInfo?: unknown };

export const FeatureFlagsPage: React.FC<Props> = ({ scopeInfo }) => {
  const { featureFlags, targetingOptions, isLoading, reload } =
    useFeatureFlagsData();
  const { createFeatureFlag, updateFeatureFlag, deleteFeatureFlag } =
    useFeatureFlagCrud(reload);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEnvironment, setSelectedEnvironment] = useState<
    EnvironmentKey | 'all'
  >('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingFlag, setEditingFlag] = useState<FeatureFlag | null>(null);
  const [formData, setFormData] = useState<FeatureFlagFormData>(emptyFormState);

  const handleFormChange = (
    field: keyof FeatureFlagFormData,
    value: unknown
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEnvironmentChange = (
    env: EnvironmentKey,
    field: keyof FeatureFlagFormData['environments']['development'],
    value: unknown
  ) => {
    setFormData(prev => ({
      ...prev,
      environments: {
        ...prev.environments,
        [env]: { ...prev.environments[env], [field]: value },
      },
    }));
  };

  const handleEditFlag = (flag: FeatureFlag) => {
    setEditingFlag(flag);
    setFormData(convertFlagToFormState(flag));
    setIsEditDialogOpen(true);
  };

  const filteredFlags = useMemo(
    () =>
      featureFlags
        .filter(flag => {
          const matchesSearch =
            flag.display_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            flag.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            flag.name.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesCategory =
            selectedCategory === 'all' || flag.category === selectedCategory;
          return matchesSearch && matchesCategory;
        })
        .sort((a, b) => a.display_name.localeCompare(b.display_name)),
    [featureFlags, searchQuery, selectedCategory]
  );

  const resetForm = () => setFormData(emptyFormState);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">
            Manage feature rollouts, A/B testing, and controlled releases across
            development, staging, and production environments.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Feature Flag
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Feature Flag</DialogTitle>
                <DialogDescription>
                  Create a new feature flag with environment-specific
                  configurations and audience targeting.
                </DialogDescription>
              </DialogHeader>
              <FeatureFlagForm
                formData={formData}
                targetingOptions={targetingOptions}
                onFormChange={handleFormChange}
                onEnvironmentChange={handleEnvironmentChange}
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreateDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    await createFeatureFlag(formData);
                    setIsCreateDialogOpen(false);
                    resetForm();
                  }}
                >
                  Create Feature Flag
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search feature flags..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedEnvironment}
          onValueChange={v => setSelectedEnvironment(v as any)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Environments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Environments</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="staging">Staging</SelectItem>
            <SelectItem value="production">Production</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredFlags.map(flag => (
          <FeatureFlagCard
            key={flag.id}
            flag={flag}
            isDeleting={isDeleting}
            onEdit={handleEditFlag}
            onDelete={async id => {
              setIsDeleting(true);
              await deleteFeatureFlag(id);
              setIsDeleting(false);
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t">
        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2">
              <Badge className="text-xs">Total Flags</Badge>
              <div className="text-xl font-semibold">{featureFlags.length}</div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2">
              <Badge className="text-xs">Production Active</Badge>
              <div className="text-xl font-semibold">
                {
                  featureFlags.filter(f =>
                    f.feature_flag_environments.some(
                      e => e.environment === 'production' && e.is_enabled
                    )
                  ).length
                }
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2">
              <Badge className="text-xs">Staging Tests</Badge>
              <div className="text-xl font-semibold">
                {
                  featureFlags.filter(f =>
                    f.feature_flag_environments.some(
                      e => e.environment === 'staging' && e.is_enabled
                    )
                  ).length
                }
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2">
              <Badge className="text-xs">Public Flags</Badge>
              <div className="text-xl font-semibold">
                {featureFlags.filter(f => f.is_public).length}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Feature Flag</DialogTitle>
            <DialogDescription>
              Modify environment configurations and audience targeting for this
              feature flag.
            </DialogDescription>
          </DialogHeader>

          <FeatureFlagForm
            formData={formData}
            targetingOptions={targetingOptions}
            onFormChange={handleFormChange}
            onEnvironmentChange={handleEnvironmentChange}
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!editingFlag) return;
                await updateFeatureFlag(editingFlag.id, formData);
                setIsEditDialogOpen(false);
                resetForm();
              }}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeatureFlagsPage;
