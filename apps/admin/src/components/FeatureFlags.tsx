'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import {
  Flag,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Calendar,
  Settings,
  BarChart3,
  Target,
  Globe,
  Smartphone,
  Monitor,
  Code,
  TestTube,
  Rocket,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
} from 'lucide-react';

// Updated feature flags data structure with environment-specific configurations
const featureFlags = [
  {
    id: 1,
    name: 'advanced_analytics_dashboard',
    displayName: 'Advanced Analytics Dashboard',
    description:
      'Enhanced analytics with predictive insights and custom reports for trainers and administrators',
    category: 'analytics',
    createdAt: '2024-11-15T10:00:00Z',
    updatedAt: '2024-12-20T14:30:00Z',
    createdBy: 'Product Team',
    dependencies: [],
    environments: {
      development: {
        enabled: true,
        rolloutPercentage: 100,
        targetAudiences: ['all_users'],
        conditions: {
          userTypes: ['all'],
          platforms: ['web', 'mobile'],
        },
      },
      staging: {
        enabled: true,
        rolloutPercentage: 100,
        targetAudiences: ['beta_users', 'internal_staff'],
        conditions: {
          userTypes: ['premium', 'corporate'],
          platforms: ['web', 'mobile'],
        },
      },
      production: {
        enabled: true,
        rolloutPercentage: 100,
        targetAudiences: ['trainers', 'admins'],
        conditions: {
          userTypes: ['premium', 'corporate'],
          platforms: ['web', 'mobile'],
        },
      },
    },
  },
  {
    id: 2,
    name: 'dark_mode_mobile',
    displayName: 'Dark Mode for Mobile',
    description:
      'Dark theme support for mobile applications to improve user experience in low light conditions',
    category: 'ui_ux',
    createdAt: '2024-12-01T09:15:00Z',
    updatedAt: '2024-12-22T11:20:00Z',
    createdBy: 'Mobile Team',
    dependencies: ['theme_system_v2'],
    environments: {
      development: {
        enabled: true,
        rolloutPercentage: 100,
        targetAudiences: ['all_users'],
        conditions: {
          userTypes: ['all'],
          platforms: ['mobile'],
        },
      },
      staging: {
        enabled: true,
        rolloutPercentage: 50,
        targetAudiences: ['beta_users'],
        conditions: {
          userTypes: ['all'],
          platforms: ['mobile'],
        },
      },
      production: {
        enabled: false,
        rolloutPercentage: 0,
        targetAudiences: [],
        conditions: {
          userTypes: ['all'],
          platforms: ['mobile'],
        },
      },
    },
  },
  {
    id: 3,
    name: 'ai_workout_recommendations',
    displayName: 'AI Workout Recommendations',
    description:
      'Machine learning powered workout suggestions based on user performance and goals',
    category: 'ai_ml',
    createdAt: '2024-12-10T16:45:00Z',
    updatedAt: '2024-12-22T09:30:00Z',
    createdBy: 'AI Team',
    dependencies: ['user_analytics_v3', 'recommendation_engine'],
    environments: {
      development: {
        enabled: true,
        rolloutPercentage: 100,
        targetAudiences: ['internal_staff'],
        conditions: {
          userTypes: ['premium'],
          platforms: ['web', 'mobile'],
        },
      },
      staging: {
        enabled: false,
        rolloutPercentage: 0,
        targetAudiences: [],
        conditions: {
          userTypes: ['premium'],
          platforms: ['web', 'mobile'],
        },
      },
      production: {
        enabled: false,
        rolloutPercentage: 0,
        targetAudiences: [],
        conditions: {
          userTypes: ['premium'],
          platforms: ['web', 'mobile'],
        },
      },
    },
  },
  {
    id: 4,
    name: 'corporate_team_challenges',
    displayName: 'Corporate Team Challenges',
    description:
      'Team-based fitness challenges and competitions for corporate wellness programs',
    category: 'corporate',
    createdAt: '2024-11-20T11:00:00Z',
    updatedAt: '2024-12-18T13:45:00Z',
    createdBy: 'Enterprise Team',
    dependencies: ['team_management_v2'],
    environments: {
      development: {
        enabled: true,
        rolloutPercentage: 100,
        targetAudiences: ['internal_staff'],
        conditions: {
          userTypes: ['corporate'],
          platforms: ['web'],
        },
      },
      staging: {
        enabled: true,
        rolloutPercentage: 100,
        targetAudiences: ['corporate_beta'],
        conditions: {
          userTypes: ['corporate'],
          platforms: ['web'],
        },
      },
      production: {
        enabled: true,
        rolloutPercentage: 75,
        targetAudiences: ['corporate_users'],
        conditions: {
          userTypes: ['corporate'],
          platforms: ['web'],
        },
      },
    },
  },
  {
    id: 5,
    name: 'voice_workout_coaching',
    displayName: 'Voice Workout Coaching',
    description:
      'Real-time voice guidance and coaching during workouts with personalized instructions',
    category: 'ai_ml',
    createdAt: '2024-12-05T14:20:00Z',
    updatedAt: '2024-12-15T10:15:00Z',
    createdBy: 'Voice Team',
    dependencies: ['speech_recognition', 'tts_engine'],
    environments: {
      development: {
        enabled: true,
        rolloutPercentage: 100,
        targetAudiences: ['internal_staff'],
        conditions: {
          userTypes: ['premium'],
          platforms: ['mobile'],
        },
      },
      staging: {
        enabled: true,
        rolloutPercentage: 25,
        targetAudiences: ['beta_users'],
        conditions: {
          userTypes: ['premium'],
          platforms: ['mobile'],
        },
      },
      production: {
        enabled: false,
        rolloutPercentage: 0,
        targetAudiences: [],
        conditions: {
          userTypes: ['premium'],
          platforms: ['mobile'],
        },
      },
    },
  },
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'analytics', label: 'Analytics & Reporting' },
  { value: 'ui_ux', label: 'UI/UX Features' },
  { value: 'ai_ml', label: 'AI & Machine Learning' },
  { value: 'corporate', label: 'Corporate Features' },
  { value: 'integrations', label: 'Integrations' },
  { value: 'performance', label: 'Performance' },
];

const audiences = [
  {
    value: 'all_users',
    label: 'All Users',
    count: 18456,
    description: 'Every registered user',
  },
  {
    value: 'internal_staff',
    label: 'Internal Staff',
    count: 25,
    description: 'Peak Health employees',
  },
  {
    value: 'beta_users',
    label: 'Beta Users',
    count: 234,
    description: 'Users in beta programs',
  },
  {
    value: 'trainers',
    label: 'Trainers',
    count: 48,
    description: 'Certified fitness trainers',
  },
  {
    value: 'admins',
    label: 'Administrators',
    count: 12,
    description: 'Platform administrators',
  },
  {
    value: 'corporate_users',
    label: 'Corporate Users',
    count: 1456,
    description: 'Corporate wellness program users',
  },
  {
    value: 'corporate_beta',
    label: 'Corporate Beta',
    count: 89,
    description: 'Corporate beta testers',
  },
  {
    value: 'premium_users',
    label: 'Premium Users',
    count: 4567,
    description: 'Paid subscription users',
  },
  {
    value: 'free_users',
    label: 'Free Users',
    count: 13889,
    description: 'Free tier users',
  },
];

const userTypes = [
  { value: 'all', label: 'All User Types' },
  { value: 'free', label: 'Free Tier' },
  { value: 'premium', label: 'Premium' },
  { value: 'corporate', label: 'Corporate' },
];

const platforms = [
  { value: 'web', label: 'Web App' },
  { value: 'mobile', label: 'Mobile App' },
  { value: 'api', label: 'API' },
];

interface FeatureFlagsProps {
  scopeInfo: any;
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

export function FeatureFlags({ scopeInfo }: FeatureFlagsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEnvironment, setSelectedEnvironment] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingFlag, setEditingFlag] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Form state for editing
  const [editForm, setEditForm] = useState({
    displayName: '',
    description: '',
    category: '',
    environments: {},
  });

  const filteredFlags = featureFlags.filter(flag => {
    const matchesSearch =
      flag.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flag.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flag.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || flag.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEditFlag = (flag: any) => {
    setEditingFlag({ ...flag });
    setEditForm({
      displayName: flag.displayName,
      description: flag.description,
      category: flag.category,
      environments: { ...flag.environments },
    });
    setIsEditDialogOpen(true);
  };

  const toggleEnvironmentStatus = (flagId: number, environment: string) => {
    // In a real app, this would update the backend
    console.log(`Toggling ${environment} status for flag ${flagId}`);
  };

  const updateRolloutPercentage = (
    flagId: number,
    environment: string,
    percentage: number
  ) => {
    // In a real app, this would update the backend
    console.log(
      `Updating ${environment} rollout to ${percentage}% for flag ${flagId}`
    );
  };

  const handleEditFormChange = (field: string, value: any) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEnvironmentChange = (env: string, field: string, value: any) => {
    setEditForm(prev => ({
      ...prev,
      environments: {
        ...prev.environments,
        [env]: {
          ...(prev.environments as any)[env],
          [field]: value,
        },
      },
    }));
  };

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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input
                      id="display-name"
                      placeholder="User-friendly feature name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this feature does and its purpose..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
                          <Switch />
                        </div>

                        <div className="space-y-2">
                          <Label>Rollout Percentage</Label>
                          <div className="px-3">
                            <Slider defaultValue={[0]} max={100} step={1} />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            0% of users will see this feature
                          </p>
                        </div>

                        {env === 'production' && (
                          <div className="space-y-3">
                            <Label>Target Audiences (Production Only)</Label>
                            <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto">
                              {audiences.map(audience => (
                                <div
                                  key={audience.value}
                                  className="flex items-center space-x-3 p-3 border rounded-lg"
                                >
                                  <Checkbox id={`${env}-${audience.value}`} />
                                  <div className="flex-1">
                                    <Label
                                      htmlFor={`${env}-${audience.value}`}
                                      className="text-sm"
                                    >
                                      {audience.label}
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                      {audience.count.toLocaleString()} users •{' '}
                                      {audience.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="space-y-3">
                          <Label>Platform Targeting</Label>
                          <div className="flex flex-wrap gap-2">
                            {platforms.map(platform => (
                              <div
                                key={platform.value}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`${env}-platform-${platform.value}`}
                                />
                                <Label
                                  htmlFor={`${env}-platform-${platform.value}`}
                                  className="text-sm"
                                >
                                  {platform.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label>User Type Targeting</Label>
                          <div className="flex flex-wrap gap-2">
                            {userTypes.slice(1).map(userType => (
                              <div
                                key={userType.value}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`${env}-usertype-${userType.value}`}
                                />
                                <Label
                                  htmlFor={`${env}-usertype-${userType.value}`}
                                  className="text-sm"
                                >
                                  {userType.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Save as Draft
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>
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
                    <h3 className="font-medium">{flag.displayName}</h3>
                    <Badge variant="outline" className="text-xs">
                      {categories.find(c => c.value === flag.category)?.label}
                    </Badge>
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

                    {flag.dependencies.length > 0 && (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        <span>{flag.dependencies.length} dependencies</span>
                      </div>
                    )}
                  </div>

                  {/* Environment Status Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(flag.environments).map(([env, config]) => {
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
                                {config.enabled ? 'Enabled' : 'Disabled'}
                              </Badge>
                            </div>
                            <Switch
                              checked={config.enabled}
                              onCheckedChange={() =>
                                toggleEnvironmentStatus(flag.id, env)
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Rollout:
                              </span>
                              <span>{config.rolloutPercentage}%</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Audiences:
                              </span>
                              <span>{config.targetAudiences.length}</span>
                            </div>

                            {env === 'production' && config.enabled && (
                              <div className="pt-2 border-t">
                                <div className="flex flex-wrap gap-1">
                                  {config.targetAudiences
                                    .slice(0, 2)
                                    .map(audienceValue => {
                                      const audience = audiences.find(
                                        a => a.value === audienceValue
                                      );
                                      return (
                                        <Badge
                                          key={audienceValue}
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          {audience?.label}
                                        </Badge>
                                      );
                                    })}
                                  {config.targetAudiences.length > 2 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      +{config.targetAudiences.length - 2} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}
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
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span>Created by {flag.createdBy}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Created {formatDate(flag.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Updated {formatDate(flag.updatedAt)}</span>
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
                    featureFlags.filter(f => f.environments.production.enabled)
                      .length
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
                    featureFlags.filter(f => f.environments.staging.enabled)
                      .length
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
                <p className="text-sm text-muted-foreground">
                  Avg Production Rollout
                </p>
                <p className="text-xl font-semibold">
                  {Math.round(
                    featureFlags.reduce(
                      (sum, f) =>
                        sum + f.environments.production.rolloutPercentage,
                      0
                    ) / featureFlags.length
                  )}
                  %
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
          {editingFlag && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Feature Name</Label>
                  <Input
                    value={editingFlag.name}
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Display Name</Label>
                  <Input
                    value={editForm.displayName}
                    onChange={e =>
                      handleEditFormChange('displayName', e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={editForm.description}
                  onChange={e =>
                    handleEditFormChange('description', e.target.value)
                  }
                  rows={3}
                />
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

                  {Object.entries(editForm.environments).map(
                    ([env, config]) => (
                      <TabsContent
                        key={env}
                        value={env}
                        className="space-y-4 border rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <Label>Enable in {env}</Label>
                          <Switch
                            checked={(config as any).enabled}
                            onCheckedChange={checked =>
                              handleEnvironmentChange(env, 'enabled', checked)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>
                            Rollout Percentage:{' '}
                            {(config as any).rolloutPercentage}%
                          </Label>
                          <div className="px-3">
                            <Slider
                              value={[(config as any).rolloutPercentage]}
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
                            {(config as any).rolloutPercentage}% of targeted
                            users will see this feature
                          </p>
                        </div>

                        {env === 'production' && (
                          <div className="space-y-3">
                            <Label>Target Audiences (Production Only)</Label>
                            <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto">
                              {audiences.map(audience => (
                                <div
                                  key={audience.value}
                                  className="flex items-center space-x-3 p-3 border rounded-lg"
                                >
                                  <Checkbox
                                    id={`edit-${env}-${audience.value}`}
                                    checked={(
                                      config as any
                                    ).targetAudiences.includes(audience.value)}
                                    onCheckedChange={checked => {
                                      const newAudiences = checked
                                        ? [
                                            ...(config as any).targetAudiences,
                                            audience.value,
                                          ]
                                        : (
                                            config as any
                                          ).targetAudiences.filter(
                                            (a: string) => a !== audience.value
                                          );
                                      handleEnvironmentChange(
                                        env,
                                        'targetAudiences',
                                        newAudiences
                                      );
                                    }}
                                  />
                                  <div className="flex-1">
                                    <Label
                                      htmlFor={`edit-${env}-${audience.value}`}
                                      className="text-sm"
                                    >
                                      {audience.label}
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                      {audience.count.toLocaleString()} users •{' '}
                                      {audience.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </TabsContent>
                    )
                  )}
                </Tabs>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsEditDialogOpen(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
