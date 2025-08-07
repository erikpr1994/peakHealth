'use client';
import {
  Flag,
  Search,
  Plus,
  Edit,
  Trash2,
  Users,
  Calendar,
  BarChart3,
  Target,
  Globe,
  Loader2,
  Code,
  TestTube,
  Rocket,
} from 'lucide-react';
import { useState, useEffect } from 'react';

import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Checkbox } from './ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';

// Types
interface FeatureFlag {
  id: string;
  name: string;
  display_name: string;
  description: string;
  category?: string;
  is_public: boolean;
  is_global: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  feature_flag_environments: FeatureFlagEnvironment[];
  feature_flag_user_roles: FeatureFlagUserRole[];
  feature_flag_user_groups: FeatureFlagUserGroup[];
  feature_flag_user_types: FeatureFlagUserType[];
  feature_flag_subscription_tiers: FeatureFlagSubscriptionTier[];
  feature_flag_users: FeatureFlagUser[];
}

interface FeatureFlagEnvironment {
  id: string;
  feature_flag_id: string;
  environment: string;
  is_enabled: boolean;
  rollout_percentage: number;
  created_at: string;
  updated_at: string;
}

interface FeatureFlagUserRole {
  id: string;
  feature_flag_id: string;
  environment: string;
  role_name: string;
  is_enabled: boolean;
  created_at: string;
}

interface FeatureFlagUserGroup {
  id: string;
  feature_flag_id: string;
  environment: string;
  group_name: string;
  is_enabled: boolean;
  created_at: string;
}

interface FeatureFlagUserType {
  id: string;
  feature_flag_id: string;
  user_type_name: string;
  created_at: string;
  updated_at: string;
}

interface FeatureFlagSubscriptionTier {
  id: string;
  feature_flag_id: string;
  subscription_tier_name: string;
  created_at: string;
  updated_at: string;
}

interface FeatureFlagUser {
  id: string;
  feature_flag_id: string;
  user_id: string;
  created_at: string;
}

interface TargetingOptions {
  userTypes: Array<{ name: string; display_name: string }>;
  subscriptionTiers: Array<{ name: string; display_name: string }>;
  userGroups: Array<{ name: string; displayName: string }>;
  userRoles: Array<{ name: string; displayName: string }>;
  users: Array<{ id: string; email: string; displayName: string }>;
}

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'analytics', label: 'Analytics & Reporting' },
  { value: 'ui_ux', label: 'UI/UX Features' },
  { value: 'ai_ml', label: 'AI & Machine Learning' },
  { value: 'corporate', label: 'Corporate Features' },
  { value: 'integrations', label: 'Integrations' },
  { value: 'performance', label: 'Performance' },
];

// const platforms = [
//   { value: 'web', label: 'Web App' },
//   { value: 'mobile', label: 'Mobile App' },
//   { value: 'api', label: 'API' },
// ];

interface FeatureFlagsProps {
  scopeInfo: unknown;
}

const getEnvironmentIcon = (env: string) => {
  switch (env) {
    case 'development':
      return Code;
    case 'staging':
      return TestTube;
    case 'production':
      return Rocket;
    default:
      return Globe;
  }
};

const getEnvironmentColor = (env: string) => {
  switch (env) {
    case 'development':
      return 'outline';
    case 'staging':
      return 'secondary';
    case 'production':
      return 'default';
    default:
      return 'outline';
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const FeatureFlags = ({ scopeInfo }: FeatureFlagsProps) => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([]);
  const [targetingOptions, setTargetingOptions] =
    useState<TargetingOptions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEnvironment, setSelectedEnvironment] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingFlag, setEditingFlag] = useState<FeatureFlag | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form state for creating/editing
  const [formData, setFormData] = useState({
    name: '',
    displayName: '',
    description: '',
    category: '',
    isPublic: false,
    isGlobal: false,
    environments: {
      development: { enabled: false, rolloutPercentage: 0 },
      staging: { enabled: false, rolloutPercentage: 0 },
      production: { enabled: false, rolloutPercentage: 0 },
    },
    userTypes: [] as string[],
    subscriptionTiers: [] as string[],
    userRoles: [] as Array<{
      roleName: string;
      environments: string[];
      isEnabled: boolean;
    }>,
    userGroups: [] as Array<{
      groupName: string;
      environments: string[];
      isEnabled: boolean;
    }>,
    users: [] as string[],
  });

  // Load feature flags and targeting options
  useEffect(() => {
    loadFeatureFlags();
    loadTargetingOptions();
  }, []);

  const loadFeatureFlags = async () => {
    try {
      const response = await fetch('/api/admin/feature-flags');
      if (!response.ok) {
        throw new Error('Failed to fetch feature flags');
      }
      const data = await response.json();
      setFeatureFlags(data.featureFlags || []);
    } catch {
      toast.error('Failed to load feature flags');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTargetingOptions = async () => {
    try {
      const response = await fetch(
        '/api/admin/feature-flags/targeting-options'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch targeting options');
      }
      const data = await response.json();
      setTargetingOptions(data);
    } catch {
      // Error handled by toast
    }
  };

  const createFeatureFlag = async () => {
    try {
      const response = await fetch('/api/admin/feature-flags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          displayName: formData.displayName,
          description: formData.description,
          isPublic: formData.isPublic,
          isGlobal: formData.isGlobal,
          environments: formData.environments,
          userTypes: formData.userTypes,
          subscriptionTiers: formData.subscriptionTiers,
          userRoles: formData.userRoles,
          userGroups: formData.userGroups,
          users: formData.users,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create feature flag');
      }

      toast.success('Feature flag created successfully');
      setIsCreateDialogOpen(false);
      resetForm();
      loadFeatureFlags();
    } catch {
      toast.error('Failed to create feature flag');
    }
  };

  const updateFeatureFlag = async () => {
    if (!editingFlag) return;

    try {
      const response = await fetch('/api/admin/feature-flags', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingFlag.id,
          name: formData.name,
          displayName: formData.displayName,
          description: formData.description,
          isPublic: formData.isPublic,
          isGlobal: formData.isGlobal,
          environments: formData.environments,
          userTypes: formData.userTypes,
          subscriptionTiers: formData.subscriptionTiers,
          userRoles: formData.userRoles,
          userGroups: formData.userGroups,
          users: formData.users,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update feature flag');
      }

      toast.success('Feature flag updated successfully');
      setIsEditDialogOpen(false);
      resetForm();
      loadFeatureFlags();
    } catch {
      toast.error('Failed to update feature flag');
    }
  };

  const deleteFeatureFlag = async (id: string) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/admin/feature-flags?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete feature flag');
      }

      toast.success('Feature flag deleted successfully');
      loadFeatureFlags();
    } catch {
      toast.error('Failed to delete feature flag');
    } finally {
      setIsDeleting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      displayName: '',
      description: '',
      category: '',
      isPublic: false,
      isGlobal: false,
      environments: {
        development: { enabled: false, rolloutPercentage: 0 },
        staging: { enabled: false, rolloutPercentage: 0 },
        production: { enabled: false, rolloutPercentage: 0 },
      },
      userTypes: [],
      subscriptionTiers: [],
      userRoles: [],
      userGroups: [],
      users: [],
    });
  };

  const handleEditFlag = (flag: FeatureFlag) => {
    setEditingFlag(flag);

    // Convert database structure to form structure
    const environments = {
      development: { enabled: false, rolloutPercentage: 0 },
      staging: { enabled: false, rolloutPercentage: 0 },
      production: { enabled: false, rolloutPercentage: 0 },
    };
    flag.feature_flag_environments.forEach(env => {
      (
        environments as Record<
          string,
          { enabled: boolean; rolloutPercentage: number }
        >
      )[env.environment] = {
        enabled: env.is_enabled,
        rolloutPercentage: env.rollout_percentage,
      };
    });

    setFormData({
      name: flag.name,
      displayName: flag.display_name,
      description: flag.description,
      category: flag.category || '',
      isPublic: flag.is_public,
      isGlobal: flag.is_global,
      environments,
      userTypes: flag.feature_flag_user_types.map(ut => ut.user_type_name),
      subscriptionTiers: flag.feature_flag_subscription_tiers.map(
        st => st.subscription_tier_name
      ),
      userRoles: (() => {
        const roleMap = new Map<
          string,
          { roleName: string; environments: string[]; isEnabled: boolean }
        >();
        flag.feature_flag_user_roles.forEach(ur => {
          if (!roleMap.has(ur.role_name)) {
            roleMap.set(ur.role_name, {
              roleName: ur.role_name,
              environments: [],
              isEnabled: ur.is_enabled,
            });
          }
          roleMap.get(ur.role_name)!.environments.push(ur.environment);
        });
        return Array.from(roleMap.values());
      })(),
      userGroups: (() => {
        const groupMap = new Map<
          string,
          { groupName: string; environments: string[]; isEnabled: boolean }
        >();
        flag.feature_flag_user_groups.forEach(ug => {
          if (!groupMap.has(ug.group_name)) {
            groupMap.set(ug.group_name, {
              groupName: ug.group_name,
              environments: [],
              isEnabled: ug.is_enabled,
            });
          }
          groupMap.get(ug.group_name)!.environments.push(ug.environment);
        });
        return Array.from(groupMap.values());
      })(),
      users: flag.feature_flag_users.map(uu => uu.user_id),
    });

    setIsEditDialogOpen(true);
  };

  const handleFormChange = (field: string, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEnvironmentChange = (
    env: string,
    field: string,
    value: unknown
  ) => {
    setFormData(prev => ({
      ...prev,
      environments: {
        ...prev.environments,
        [env]: {
          ...prev.environments[env as keyof typeof prev.environments],
          [field]: value,
        },
      },
    }));
  };

  const filteredFlags = featureFlags.filter(flag => {
    const matchesSearch =
      flag.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flag.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flag.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || flag.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Action Bar */}
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
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="flag-name">Feature Name (Identifier)</Label>
                    <Input
                      id="flag-name"
                      placeholder="feature_name_identifier"
                      value={formData.name}
                      onChange={e => handleFormChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input
                      id="display-name"
                      placeholder="User-friendly feature name"
                      value={formData.displayName}
                      onChange={e =>
                        handleFormChange('displayName', e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={value =>
                        handleFormChange('category', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map(category => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
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
                    onChange={e =>
                      handleFormChange('description', e.target.value)
                    }
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is-public"
                      checked={formData.isPublic}
                      onCheckedChange={checked =>
                        handleFormChange('isPublic', checked)
                      }
                    />
                    <Label htmlFor="is-public">Public Flag</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is-global"
                      checked={formData.isGlobal}
                      onCheckedChange={checked =>
                        handleFormChange('isGlobal', checked)
                      }
                    />
                    <Label htmlFor="is-global">Global Flag</Label>
                  </div>
                </div>

                {/* Environment Configurations */}
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
                      <TabsTrigger
                        value="staging"
                        className="flex items-center gap-2"
                      >
                        <TestTube className="h-4 w-4" />
                        Staging
                      </TabsTrigger>
                      <TabsTrigger
                        value="production"
                        className="flex items-center gap-2"
                      >
                        <Rocket className="h-4 w-4" />
                        Production
                      </TabsTrigger>
                    </TabsList>

                    {['development', 'staging', 'production'].map(env => (
                      <TabsContent
                        key={env}
                        value={env}
                        className="space-y-4 border rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <Label>Enable in {env}</Label>
                          <Switch
                            checked={
                              formData.environments[
                                env as keyof typeof formData.environments
                              ].enabled
                            }
                            onCheckedChange={checked =>
                              handleEnvironmentChange(env, 'enabled', checked)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Rollout Percentage</Label>
                          <div className="px-3">
                            <Slider
                              value={[
                                formData.environments[
                                  env as keyof typeof formData.environments
                                ].rolloutPercentage,
                              ]}
                              max={100}
                              step={1}
                              onValueChange={value =>
                                handleEnvironmentChange(
                                  env,
                                  'rolloutPercentage',
                                  value[0]
                                )
                              }
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {
                              formData.environments[
                                env as keyof typeof formData.environments
                              ].rolloutPercentage
                            }
                            % of users will see this feature
                          </p>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>

                {/* Targeting Options */}
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
                              checked={formData.userTypes.includes(
                                userType.name
                              )}
                              onCheckedChange={checked => {
                                const newUserTypes = checked
                                  ? [...formData.userTypes, userType.name]
                                  : formData.userTypes.filter(
                                      t => t !== userType.name
                                    );
                                handleFormChange('userTypes', newUserTypes);
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
                              checked={formData.subscriptionTiers.includes(
                                tier.name
                              )}
                              onCheckedChange={checked => {
                                const newTiers = checked
                                  ? [...formData.subscriptionTiers, tier.name]
                                  : formData.subscriptionTiers.filter(
                                      t => t !== tier.name
                                    );
                                handleFormChange('subscriptionTiers', newTiers);
                              }}
                            />
                            <Label
                              htmlFor={`tier-${tier.name}`}
                              className="text-sm"
                            >
                              {tier.display_name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>User Roles</Label>
                      <div className="space-y-3 max-h-32 overflow-y-auto">
                        {targetingOptions.userRoles.map(role => {
                          const existingRole = formData.userRoles.find(
                            r => r.roleName === role.name
                          );
                          return (
                            <div
                              key={role.name}
                              className="border rounded-lg p-3 space-y-3"
                            >
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id={`role-${role.name}`}
                                  checked={!!existingRole}
                                  onCheckedChange={checked => {
                                    if (checked) {
                                      const newRoles = [
                                        ...formData.userRoles,
                                        {
                                          roleName: role.name,
                                          environments: [
                                            'development',
                                            'staging',
                                            'production',
                                          ],
                                          isEnabled: true,
                                        },
                                      ];
                                      handleFormChange('userRoles', newRoles);
                                    } else {
                                      const newRoles =
                                        formData.userRoles.filter(
                                          r => r.roleName !== role.name
                                        );
                                      handleFormChange('userRoles', newRoles);
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor={`role-${role.name}`}
                                  className="text-sm font-medium"
                                >
                                  {role.displayName}
                                </Label>
                              </div>
                              {existingRole && (
                                <div className="ml-6 space-y-2">
                                  <div className="flex items-center space-x-4">
                                    <Label className="text-xs">
                                      Environments:
                                    </Label>
                                    {[
                                      'development',
                                      'staging',
                                      'production',
                                    ].map(env => (
                                      <div
                                        key={env}
                                        className="flex items-center space-x-2"
                                      >
                                        <Checkbox
                                          id={`role-${role.name}-${env}`}
                                          checked={existingRole.environments.includes(
                                            env
                                          )}
                                          onCheckedChange={checked => {
                                            const newRoles =
                                              formData.userRoles.map(r =>
                                                r.roleName === role.name
                                                  ? {
                                                      ...r,
                                                      environments: checked
                                                        ? [
                                                            ...r.environments,
                                                            env,
                                                          ]
                                                        : r.environments.filter(
                                                            e => e !== env
                                                          ),
                                                    }
                                                  : r
                                              );
                                            handleFormChange(
                                              'userRoles',
                                              newRoles
                                            );
                                          }}
                                        />
                                        <Label
                                          htmlFor={`role-${role.name}-${env}`}
                                          className="text-xs capitalize"
                                        >
                                          {env}
                                        </Label>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`role-${role.name}-enabled`}
                                      checked={existingRole.isEnabled}
                                      onCheckedChange={checked => {
                                        const newRoles = formData.userRoles.map(
                                          r =>
                                            r.roleName === role.name
                                              ? { ...r, isEnabled: checked }
                                              : r
                                        );
                                        handleFormChange('userRoles', newRoles);
                                      }}
                                    />
                                    <Label
                                      htmlFor={`role-${role.name}-enabled`}
                                      className="text-xs"
                                    >
                                      Enabled
                                    </Label>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>User Groups</Label>
                      <div className="space-y-3 max-h-32 overflow-y-auto">
                        {targetingOptions.userGroups.map(group => {
                          const existingGroup = formData.userGroups.find(
                            g => g.groupName === group.name
                          );
                          return (
                            <div
                              key={group.name}
                              className="border rounded-lg p-3 space-y-3"
                            >
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id={`group-${group.name}`}
                                  checked={!!existingGroup}
                                  onCheckedChange={checked => {
                                    if (checked) {
                                      const newGroups = [
                                        ...formData.userGroups,
                                        {
                                          groupName: group.name,
                                          environments: [
                                            'development',
                                            'staging',
                                            'production',
                                          ],
                                          isEnabled: true,
                                        },
                                      ];
                                      handleFormChange('userGroups', newGroups);
                                    } else {
                                      const newGroups =
                                        formData.userGroups.filter(
                                          g => g.groupName !== group.name
                                        );
                                      handleFormChange('userGroups', newGroups);
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor={`group-${group.name}`}
                                  className="text-sm font-medium"
                                >
                                  {group.displayName}
                                </Label>
                              </div>
                              {existingGroup && (
                                <div className="ml-6 space-y-2">
                                  <div className="flex items-center space-x-4">
                                    <Label className="text-xs">
                                      Environments:
                                    </Label>
                                    {[
                                      'development',
                                      'staging',
                                      'production',
                                    ].map(env => (
                                      <div
                                        key={env}
                                        className="flex items-center space-x-2"
                                      >
                                        <Checkbox
                                          id={`group-${group.name}-${env}`}
                                          checked={existingGroup.environments.includes(
                                            env
                                          )}
                                          onCheckedChange={checked => {
                                            const newGroups =
                                              formData.userGroups.map(g =>
                                                g.groupName === group.name
                                                  ? {
                                                      ...g,
                                                      environments: checked
                                                        ? [
                                                            ...g.environments,
                                                            env,
                                                          ]
                                                        : g.environments.filter(
                                                            e => e !== env
                                                          ),
                                                    }
                                                  : g
                                              );
                                            handleFormChange(
                                              'userGroups',
                                              newGroups
                                            );
                                          }}
                                        />
                                        <Label
                                          htmlFor={`group-${group.name}-${env}`}
                                          className="text-xs capitalize"
                                        >
                                          {env}
                                        </Label>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`group-${group.name}-enabled`}
                                      checked={existingGroup.isEnabled}
                                      onCheckedChange={checked => {
                                        const newGroups =
                                          formData.userGroups.map(g =>
                                            g.groupName === group.name
                                              ? { ...g, isEnabled: checked }
                                              : g
                                          );
                                        handleFormChange(
                                          'userGroups',
                                          newGroups
                                        );
                                      }}
                                    />
                                    <Label
                                      htmlFor={`group-${group.name}-enabled`}
                                      className="text-xs"
                                    >
                                      Enabled
                                    </Label>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

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
                  <Button onClick={createFeatureFlag}>
                    Create Feature Flag
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
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
          onValueChange={setSelectedEnvironment}
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

      {/* Feature Flags List */}
      <div className="space-y-4">
        {filteredFlags.map(flag => (
          <Card key={flag.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{flag.display_name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {flag.is_public ? 'Public' : 'Private'}
                    </Badge>
                    {flag.is_global && (
                      <Badge variant="secondary" className="text-xs">
                        Global
                      </Badge>
                    )}
                    {flag.category && (
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.value === flag.category)
                          ?.label || flag.category}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {flag.description}
                  </p>

                  {/* Technical Details */}
                  <div className="flex items-center gap-6 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                        {flag.name}
                      </span>
                    </div>
                  </div>

                  {/* Environment Status Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['development', 'staging', 'production'].map(env => {
                      const envConfig = flag.feature_flag_environments.find(
                        e => e.environment === env
                      );
                      const EnvIcon = getEnvironmentIcon(env);

                      return (
                        <div
                          key={env}
                          className="border rounded-lg p-4 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <EnvIcon className="h-4 w-4" />
                              <span className="text-sm font-medium capitalize">
                                {env}
                              </span>
                              <Badge
                                variant={getEnvironmentColor(env)}
                                className="text-xs"
                              >
                                {envConfig?.is_enabled ? 'Enabled' : 'Disabled'}
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Rollout:
                              </span>
                              <span>{envConfig?.rollout_percentage || 0}%</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditFlag(flag)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Feature Flag</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{flag.display_name}"?
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteFeatureFlag(flag.id)}
                          disabled={isDeleting}
                        >
                          {isDeleting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'Delete'
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Created {formatDate(flag.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Updated {formatDate(flag.updated_at)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Flag Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Flags</p>
                <p className="text-xl font-semibold">{featureFlags.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Rocket className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Production Active
                </p>
                <p className="text-xl font-semibold">
                  {
                    featureFlags.filter(f =>
                      f.feature_flag_environments.some(
                        e => e.environment === 'production' && e.is_enabled
                      )
                    ).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TestTube className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Staging Tests</p>
                <p className="text-xl font-semibold">
                  {
                    featureFlags.filter(f =>
                      f.feature_flag_environments.some(
                        e => e.environment === 'staging' && e.is_enabled
                      )
                    ).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Public Flags</p>
                <p className="text-xl font-semibold">
                  {featureFlags.filter(f => f.is_public).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Feature Flag Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Feature Flag</DialogTitle>
            <DialogDescription>
              Modify environment configurations and audience targeting for this
              feature flag.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Feature Name</Label>
                <Input
                  value={formData.name}
                  onChange={e => handleFormChange('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Display Name</Label>
                <Input
                  value={formData.displayName}
                  onChange={e =>
                    handleFormChange('displayName', e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={value => handleFormChange('category', value)}
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
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={e => handleFormChange('description', e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-is-public"
                  checked={formData.isPublic}
                  onCheckedChange={checked =>
                    handleFormChange('isPublic', checked)
                  }
                />
                <Label htmlFor="edit-is-public">Public Flag</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-is-global"
                  checked={formData.isGlobal}
                  onCheckedChange={checked =>
                    handleFormChange('isGlobal', checked)
                  }
                />
                <Label htmlFor="edit-is-global">Global Flag</Label>
              </div>
            </div>

            {/* Environment Configurations */}
            <div className="space-y-4">
              <Label>Environment Configurations</Label>
              <Tabs defaultValue="production" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="development"
                    className="flex items-center gap-2"
                  >
                    <Code className="h-4 w-4" />
                    Development
                  </TabsTrigger>
                  <TabsTrigger
                    value="staging"
                    className="flex items-center gap-2"
                  >
                    <TestTube className="h-4 w-4" />
                    Staging
                  </TabsTrigger>
                  <TabsTrigger
                    value="production"
                    className="flex items-center gap-2"
                  >
                    <Rocket className="h-4 w-4" />
                    Production
                  </TabsTrigger>
                </TabsList>

                {['development', 'staging', 'production'].map(env => (
                  <TabsContent
                    key={env}
                    value={env}
                    className="space-y-4 border rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <Label>Enable in {env}</Label>
                      <Switch
                        checked={
                          formData.environments[
                            env as keyof typeof formData.environments
                          ].enabled
                        }
                        onCheckedChange={checked =>
                          handleEnvironmentChange(env, 'enabled', checked)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Rollout Percentage:{' '}
                        {
                          formData.environments[
                            env as keyof typeof formData.environments
                          ].rolloutPercentage
                        }
                        %
                      </Label>
                      <div className="px-3">
                        <Slider
                          value={[
                            formData.environments[
                              env as keyof typeof formData.environments
                            ].rolloutPercentage,
                          ]}
                          max={100}
                          step={1}
                          onValueChange={value =>
                            handleEnvironmentChange(
                              env,
                              'rolloutPercentage',
                              value[0]
                            )
                          }
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {
                          formData.environments[
                            env as keyof typeof formData.environments
                          ].rolloutPercentage
                        }
                        % of targeted users will see this feature
                      </p>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Targeting Options */}
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
                          id={`edit-usertype-${userType.name}`}
                          checked={formData.userTypes.includes(userType.name)}
                          onCheckedChange={checked => {
                            const newUserTypes = checked
                              ? [...formData.userTypes, userType.name]
                              : formData.userTypes.filter(
                                  t => t !== userType.name
                                );
                            handleFormChange('userTypes', newUserTypes);
                          }}
                        />
                        <Label
                          htmlFor={`edit-usertype-${userType.name}`}
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
                          id={`edit-tier-${tier.name}`}
                          checked={formData.subscriptionTiers.includes(
                            tier.name
                          )}
                          onCheckedChange={checked => {
                            const newTiers = checked
                              ? [...formData.subscriptionTiers, tier.name]
                              : formData.subscriptionTiers.filter(
                                  t => t !== tier.name
                                );
                            handleFormChange('subscriptionTiers', newTiers);
                          }}
                        />
                        <Label
                          htmlFor={`edit-tier-${tier.name}`}
                          className="text-sm"
                        >
                          {tier.display_name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>User Roles</Label>
                  <div className="space-y-3 max-h-32 overflow-y-auto">
                    {targetingOptions.userRoles.map(role => {
                      const existingRole = formData.userRoles.find(
                        r => r.roleName === role.name
                      );
                      return (
                        <div
                          key={role.name}
                          className="border rounded-lg p-3 space-y-3"
                        >
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={`edit-role-${role.name}`}
                              checked={!!existingRole}
                              onCheckedChange={checked => {
                                if (checked) {
                                  const newRoles = [
                                    ...formData.userRoles,
                                    {
                                      roleName: role.name,
                                      environments: [
                                        'development',
                                        'staging',
                                        'production',
                                      ],
                                      isEnabled: true,
                                    },
                                  ];
                                  handleFormChange('userRoles', newRoles);
                                } else {
                                  const newRoles = formData.userRoles.filter(
                                    r => r.roleName !== role.name
                                  );
                                  handleFormChange('userRoles', newRoles);
                                }
                              }}
                            />
                            <Label
                              htmlFor={`edit-role-${role.name}`}
                              className="text-sm font-medium"
                            >
                              {role.displayName}
                            </Label>
                          </div>
                          {existingRole && (
                            <div className="ml-6 space-y-2">
                              <div className="flex items-center space-x-4">
                                <Label className="text-xs">Environments:</Label>
                                {['development', 'staging', 'production'].map(
                                  env => (
                                    <div
                                      key={env}
                                      className="flex items-center space-x-2"
                                    >
                                      <Checkbox
                                        id={`edit-role-${role.name}-${env}`}
                                        checked={existingRole.environments.includes(
                                          env
                                        )}
                                        onCheckedChange={checked => {
                                          const newRoles =
                                            formData.userRoles.map(r =>
                                              r.roleName === role.name
                                                ? {
                                                    ...r,
                                                    environments: checked
                                                      ? [...r.environments, env]
                                                      : r.environments.filter(
                                                          e => e !== env
                                                        ),
                                                  }
                                                : r
                                            );
                                          handleFormChange(
                                            'userRoles',
                                            newRoles
                                          );
                                        }}
                                      />
                                      <Label
                                        htmlFor={`edit-role-${role.name}-${env}`}
                                        className="text-xs capitalize"
                                      >
                                        {env}
                                      </Label>
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`edit-role-${role.name}-enabled`}
                                  checked={existingRole.isEnabled}
                                  onCheckedChange={checked => {
                                    const newRoles = formData.userRoles.map(
                                      r =>
                                        r.roleName === role.name
                                          ? { ...r, isEnabled: checked }
                                          : r
                                    );
                                    handleFormChange('userRoles', newRoles);
                                  }}
                                />
                                <Label
                                  htmlFor={`edit-role-${role.name}-enabled`}
                                  className="text-xs"
                                >
                                  Enabled
                                </Label>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>User Groups</Label>
                  <div className="space-y-3 max-h-32 overflow-y-auto">
                    {targetingOptions.userGroups.map(group => {
                      const existingGroup = formData.userGroups.find(
                        g => g.groupName === group.name
                      );
                      return (
                        <div
                          key={group.name}
                          className="border rounded-lg p-3 space-y-3"
                        >
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={`edit-group-${group.name}`}
                              checked={!!existingGroup}
                              onCheckedChange={checked => {
                                if (checked) {
                                  const newGroups = [
                                    ...formData.userGroups,
                                    {
                                      groupName: group.name,
                                      environments: [
                                        'development',
                                        'staging',
                                        'production',
                                      ],
                                      isEnabled: true,
                                    },
                                  ];
                                  handleFormChange('userGroups', newGroups);
                                } else {
                                  const newGroups = formData.userGroups.filter(
                                    g => g.groupName !== group.name
                                  );
                                  handleFormChange('userGroups', newGroups);
                                }
                              }}
                            />
                            <Label
                              htmlFor={`edit-group-${group.name}`}
                              className="text-sm font-medium"
                            >
                              {group.displayName}
                            </Label>
                          </div>
                          {existingGroup && (
                            <div className="ml-6 space-y-2">
                              <div className="flex items-center space-x-4">
                                <Label className="text-xs">Environments:</Label>
                                {['development', 'staging', 'production'].map(
                                  env => (
                                    <div
                                      key={env}
                                      className="flex items-center space-x-2"
                                    >
                                      <Checkbox
                                        id={`edit-group-${group.name}-${env}`}
                                        checked={existingGroup.environments.includes(
                                          env
                                        )}
                                        onCheckedChange={checked => {
                                          const newGroups =
                                            formData.userGroups.map(g =>
                                              g.groupName === group.name
                                                ? {
                                                    ...g,
                                                    environments: checked
                                                      ? [...g.environments, env]
                                                      : g.environments.filter(
                                                          e => e !== env
                                                        ),
                                                  }
                                                : g
                                            );
                                          handleFormChange(
                                            'userGroups',
                                            newGroups
                                          );
                                        }}
                                      />
                                      <Label
                                        htmlFor={`edit-group-${group.name}-${env}`}
                                        className="text-xs capitalize"
                                      >
                                        {env}
                                      </Label>
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`edit-group-${group.name}-enabled`}
                                  checked={existingGroup.isEnabled}
                                  onCheckedChange={checked => {
                                    const newGroups = formData.userGroups.map(
                                      g =>
                                        g.groupName === group.name
                                          ? { ...g, isEnabled: checked }
                                          : g
                                    );
                                    handleFormChange('userGroups', newGroups);
                                  }}
                                />
                                <Label
                                  htmlFor={`edit-group-${group.name}-enabled`}
                                  className="text-xs"
                                >
                                  Enabled
                                </Label>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

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
              <Button onClick={updateFeatureFlag}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
