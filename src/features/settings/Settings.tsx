import {
  User,
  CreditCard,
  Bell,
  Palette,
  Ruler,
  Shield,
  Smartphone,
  Zap,
  Download,
  DollarSign,
  Camera,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
import { Switch } from '@/components/ui/switch';
import { Page } from '@/types/app';

interface SettingsProps {
  onNavigate: (page: Page, exerciseId?: string) => void;
}

interface SidebarItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  badge?: string;
}

export default function Settings({ onNavigate: _onNavigate }: SettingsProps) {
  const [activeSection, setActiveSection] = useState('profile');
  const [fitnessGoals, setFitnessGoals] = useState([
    'Build Strength',
    'Gain Muscle',
    'Improve Endurance',
  ]);

  const sidebarSections: { title: string; items: SidebarItem[] }[] = [
    {
      title: 'PERSONAL',
      items: [
        { id: 'profile', name: 'Profile', icon: User, active: true },
        { id: 'account', name: 'Account', icon: CreditCard },
        { id: 'notifications', name: 'Notifications', icon: Bell },
      ],
    },
    {
      title: 'PREFERENCES',
      items: [
        { id: 'appearance', name: 'Appearance', icon: Palette },
        { id: 'units', name: 'Units & Measurements', icon: Ruler },
        { id: 'privacy', name: 'Privacy', icon: Shield },
      ],
    },
    {
      title: 'DATA & INTEGRATIONS',
      items: [
        { id: 'wearables', name: 'Wearables', icon: Smartphone, badge: 'New' },
        { id: 'connected', name: 'Connected Apps', icon: Zap },
        { id: 'export', name: 'Export Data', icon: Download },
      ],
    },
    {
      title: 'SUBSCRIPTION',
      items: [{ id: 'billing', name: 'Plan & Billing', icon: DollarSign }],
    },
  ];

  const handleGoalToggle = (goal: string) => {
    setFitnessGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const comingSoonFeatures = [
    {
      title: 'Mobile App Integration',
      description:
        'Sync your workouts and progress with our upcoming mobile application.',
      icon: Smartphone,
    },
    {
      title: 'Team Workouts',
      description: 'Create and join workout groups with friends and teammates.',
      icon: User,
    },
    {
      title: 'Coaching Features',
      description: 'Connect with fitness coaches or become a coach yourself.',
      icon: User,
    },
    {
      title: 'Advanced Analytics',
      description:
        'Gain deeper insights into your fitness data with AI-powered analytics.',
      icon: DollarSign,
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 mt-2">
          Manage your account preferences and configurations
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64">
          <Card className="p-4">
            <div className="space-y-6">
              {sidebarSections.map(section => (
                <div key={section.title}>
                  <h3 className="text-sm font-medium text-gray-500 mb-3 px-3">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map(item => {
                      const Icon = item.icon;
                      const isActive =
                        item.id === 'profile' && activeSection === 'profile';

                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                            isActive
                              ? 'bg-indigo-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                          {item.badge && (
                            <span className="ml-auto text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Profile Information */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Profile Information
              </h2>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Save Changes
              </Button>
            </div>

            {/* Avatar Section */}
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-indigo-600 hover:bg-indigo-700 p-0"
                >
                  <Camera className="w-3 h-3" />
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Alex Morgan
                </h3>
                <p className="text-gray-500 mb-3">Pro Member since July 2023</p>
                <div className="flex items-center gap-4 text-sm">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-indigo-600"
                  >
                    Change Photo
                  </Button>
                  <span className="text-gray-300">|</span>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-indigo-600"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Alex" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Morgan" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  defaultValue="alex.morgan@example.com"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  className="mt-2"
                />
              </div>
            </div>
          </Card>

          {/* Physical Information */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Physical Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label htmlFor="height">Height</Label>
                <div className="mt-2 flex">
                  <Input
                    id="height"
                    defaultValue="180"
                    className="rounded-r-none"
                  />
                  <span className="bg-gray-50 border border-l-0 border-gray-300 rounded-r-md px-3 flex items-center text-sm text-gray-500">
                    cm
                  </span>
                </div>
              </div>
              <div>
                <Label htmlFor="weight">Weight</Label>
                <div className="mt-2 flex">
                  <Input
                    id="weight"
                    defaultValue="75"
                    className="rounded-r-none"
                  />
                  <span className="bg-gray-50 border border-l-0 border-gray-300 rounded-r-md px-3 flex items-center text-sm text-gray-500">
                    kg
                  </span>
                </div>
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" defaultValue="32" className="mt-2" />
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="fitnessLevel">Fitness Level</Label>
              <Select defaultValue="beginner">
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Fitness Goals (Select up to 3)</Label>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Build Strength',
                  'Gain Muscle',
                  'Lose Weight',
                  'Improve Endurance',
                  'Increase Flexibility',
                  'General Health',
                ].map(goal => (
                  <div key={goal} className="flex items-center space-x-3">
                    <Checkbox
                      checked={fitnessGoals.includes(goal)}
                      onCheckedChange={() => handleGoalToggle(goal)}
                    />
                    <Label className="text-sm">{goal}</Label>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Preferences */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Preferences
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">
                    Workout Reminders
                  </h4>
                  <p className="text-sm text-gray-500">
                    Receive notifications before scheduled workouts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">
                    Weekly Progress Reports
                  </h4>
                  <p className="text-sm text-gray-500">
                    Receive weekly summary of your fitness activities
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">
                    Achievement Notifications
                  </h4>
                  <p className="text-sm text-gray-500">
                    Get notified when you reach fitness milestones
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">Dark Mode</h4>
                  <p className="text-sm text-gray-500">
                    Switch between light and dark themes
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* Coming Soon Features */}
          <Card className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Coming Soon Features</h2>
              <span className="bg-white text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                Beta
              </span>
            </div>

            <p className="text-indigo-100 mb-8">
              We&apos;re working on exciting new features to enhance your
              fitness journey. Stay tuned!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {comingSoonFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-4 h-4" />
                      <h4 className="font-medium">{feature.title}</h4>
                    </div>
                    <p className="text-sm text-white/90">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <Button className="bg-white text-indigo-600 hover:bg-gray-50">
                <Bell className="w-4 h-4 mr-2" />
                Notify Me When Available
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
