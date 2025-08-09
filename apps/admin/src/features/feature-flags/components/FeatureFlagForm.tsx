'use client';

import { Code, Rocket, TestTube } from 'lucide-react';
import React from 'react';

import {
  EnvironmentKey,
  FeatureFlagFormData,
  TargetingOptions,
} from '../types';
import { categories } from '../utils';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  formData: FeatureFlagFormData;
  targetingOptions: TargetingOptions | null;
  onFormChange: (field: keyof FeatureFlagFormData, value: unknown) => void;
  onEnvironmentChange: (
    env: EnvironmentKey,
    field: keyof FeatureFlagFormData['environments']['development'],
    value: unknown
  ) => void;
};

export const FeatureFlagForm: React.FC<Props> = ({
  formData,
  targetingOptions,
  onFormChange,
  onEnvironmentChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="flag-name">Feature Name (Identifier)</Label>
          <Input
            id="flag-name"
            placeholder="feature_name_identifier"
            value={formData.name}
            onChange={e => onFormChange('name', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="display-name">Display Name</Label>
          <Input
            id="display-name"
            placeholder="User-friendly feature name"
            value={formData.displayName}
            onChange={e => onFormChange('displayName', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={value => onFormChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.slice(1).map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe what this feature does and its purpose..."
          rows={3}
          value={formData.description}
          onChange={e => onFormChange('description', e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="is-public"
            checked={formData.isPublic}
            onCheckedChange={checked => onFormChange('isPublic', checked)}
          />
          <Label htmlFor="is-public">Public Flag</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="is-global"
            checked={formData.isGlobal}
            onCheckedChange={checked => onFormChange('isGlobal', checked)}
          />
          <Label htmlFor="is-global">Global Flag</Label>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Environment Configurations</Label>
        <Tabs defaultValue="development" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="development"
              className="flex items-center gap-2"
            >
              <Code className="h-4 w-4" />
              Development
            </TabsTrigger>
            <TabsTrigger value="staging" className="flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              Staging
            </TabsTrigger>
            <TabsTrigger value="production" className="flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              Production
            </TabsTrigger>
          </TabsList>

          {(['development', 'staging', 'production'] as EnvironmentKey[]).map(
            env => (
              <TabsContent
                key={env}
                value={env}
                className="space-y-4 border rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <Label>Enable in {env}</Label>
                  <Switch
                    checked={formData.environments[env].enabled}
                    onCheckedChange={checked =>
                      onEnvironmentChange(env, 'enabled', checked)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Rollout Percentage</Label>
                  <div className="px-3">
                    <Slider
                      value={[formData.environments[env].rolloutPercentage]}
                      max={100}
                      step={1}
                      onValueChange={value =>
                        onEnvironmentChange(env, 'rolloutPercentage', value[0])
                      }
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formData.environments[env].rolloutPercentage}% of users
                    will see this feature
                  </p>
                </div>
              </TabsContent>
            )
          )}
        </Tabs>
      </div>

      {targetingOptions && (
        <div className="space-y-4">
          <Label>Targeting Options</Label>

          <div className="space-y-3">
            <Label>User Types</Label>
            <div className="grid grid-cols-2 gap-3 max-h-32 overflow-y-auto">
              {targetingOptions.userTypes.map(userType => (
                <div
                  key={userType.name}
                  className="flex items-center space-x-3 p-3 border rounded-lg"
                >
                  <Checkbox
                    id={`usertype-${userType.name}`}
                    checked={formData.userTypes.includes(userType.name)}
                    onCheckedChange={checked => {
                      const newUserTypes = checked
                        ? [...formData.userTypes, userType.name]
                        : formData.userTypes.filter(t => t !== userType.name);
                      onFormChange('userTypes', newUserTypes);
                    }}
                  />
                  <Label
                    htmlFor={`usertype-${userType.name}`}
                    className="text-sm"
                  >
                    {userType.display_name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Subscription Tiers</Label>
            <div className="grid grid-cols-2 gap-3 max-h-32 overflow-y-auto">
              {targetingOptions.subscriptionTiers.map(tier => (
                <div
                  key={tier.name}
                  className="flex items-center space-x-3 p-3 border rounded-lg"
                >
                  <Checkbox
                    id={`tier-${tier.name}`}
                    checked={formData.subscriptionTiers.includes(tier.name)}
                    onCheckedChange={checked => {
                      const newTiers = checked
                        ? [...formData.subscriptionTiers, tier.name]
                        : formData.subscriptionTiers.filter(
                            t => t !== tier.name
                          );
                      onFormChange('subscriptionTiers', newTiers);
                    }}
                  />
                  <Label htmlFor={`tier-${tier.name}`} className="text-sm">
                    {tier.display_name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureFlagForm;
