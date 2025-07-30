import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Bell,
  Globe,
  Moon,
  Volume2,
  Shield,
  Database,
  Smartphone,
  Users,
  Dumbbell,
  TestTube2,
  Sparkles,
} from "lucide-react";

import { Page } from "@/types/app";

interface AppSettingsProps {
  onNavigate: (page: Page) => void;
  hasTrainer: boolean;
  onToggleTrainer: () => void;
  isClubMember: boolean;
  onToggleClubMembership: () => void;
  showWelcomeScreen: boolean;
  onToggleWelcomeScreen: () => void;
}

export default function AppSettings({
  onNavigate,
  hasTrainer,
  onToggleTrainer,
  isClubMember,
  onToggleClubMembership,
  showWelcomeScreen,
  onToggleWelcomeScreen,
}: AppSettingsProps) {
  // Mock settings state
  const [settings, setSettings] = useState({
    notifications: true,
    workoutReminders: true,
    achievementAlerts: true,
    soundEffects: true,
    hapticFeedback: true,
    darkMode: false,
    language: "en",
    units: "metric",
    autoBackup: true,
    dataSharing: false,
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    // In a real app, this would save to backend/localStorage
    console.log(`Setting ${key} changed to:`, value);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">App Settings</h1>
        <p className="text-gray-600 mt-1">
          Customize your Peak Health experience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="flex flex-col gap-1">
                <span>Push Notifications</span>
                <span className="text-sm text-gray-500">
                  Receive app notifications
                </span>
              </Label>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) =>
                  handleSettingChange("notifications", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="workout-reminders"
                className="flex flex-col gap-1"
              >
                <span>Workout Reminders</span>
                <span className="text-sm text-gray-500">
                  Get reminded about scheduled workouts
                </span>
              </Label>
              <Switch
                id="workout-reminders"
                checked={settings.workoutReminders}
                onCheckedChange={(checked) =>
                  handleSettingChange("workoutReminders", checked)
                }
                disabled={!settings.notifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="achievement-alerts"
                className="flex flex-col gap-1"
              >
                <span>Achievement Alerts</span>
                <span className="text-sm text-gray-500">
                  Celebrate your milestones
                </span>
              </Label>
              <Switch
                id="achievement-alerts"
                checked={settings.achievementAlerts}
                onCheckedChange={(checked) =>
                  handleSettingChange("achievementAlerts", checked)
                }
                disabled={!settings.notifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-effects" className="flex flex-col gap-1">
                <span>Sound Effects</span>
                <span className="text-sm text-gray-500">
                  Audio feedback during workouts
                </span>
              </Label>
              <Switch
                id="sound-effects"
                checked={settings.soundEffects}
                onCheckedChange={(checked) =>
                  handleSettingChange("soundEffects", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="haptic-feedback" className="flex flex-col gap-1">
                <span>Haptic Feedback</span>
                <span className="text-sm text-gray-500">
                  Vibration feedback on mobile
                </span>
              </Label>
              <Switch
                id="haptic-feedback"
                checked={settings.hapticFeedback}
                onCheckedChange={(checked) =>
                  handleSettingChange("hapticFeedback", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="flex flex-col gap-1">
                <span>Dark Mode</span>
                <span className="text-sm text-gray-500">
                  Switch to dark theme
                </span>
              </Label>
              <Switch
                id="dark-mode"
                checked={settings.darkMode}
                onCheckedChange={(checked) =>
                  handleSettingChange("darkMode", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Language & Units */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Language & Units
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={settings.language}
                onValueChange={(value) =>
                  handleSettingChange("language", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="it">Italiano</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Units</Label>
              <Select
                value={settings.units}
                onValueChange={(value) => handleSettingChange("units", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                  <SelectItem value="imperial">Imperial (lbs, ft)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Data & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-backup" className="flex flex-col gap-1">
                <span>Auto Backup</span>
                <span className="text-sm text-gray-500">
                  Automatically backup your data
                </span>
              </Label>
              <Switch
                id="auto-backup"
                checked={settings.autoBackup}
                onCheckedChange={(checked) =>
                  handleSettingChange("autoBackup", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="data-sharing" className="flex flex-col gap-1">
                <span>Anonymous Analytics</span>
                <span className="text-sm text-gray-500">
                  Help improve the app with usage data
                </span>
              </Label>
              <Switch
                id="data-sharing"
                checked={settings.dataSharing}
                onCheckedChange={(checked) =>
                  handleSettingChange("dataSharing", checked)
                }
              />
            </div>

            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                <Database className="w-4 h-4 mr-2" />
                Export My Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demo Features Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube2 className="w-5 h-5" />
            Demo Features
            <Badge variant="secondary" className="text-xs">
              For Testing
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Label htmlFor="trainer-toggle" className="flex flex-col gap-1">
                <span className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" />
                  Trainer Management
                </span>
                <span className="text-sm text-gray-600">
                  {hasTrainer
                    ? "You have a trainer (routines disabled)"
                    : "No trainer (can create routines)"}
                </span>
              </Label>
              <Switch
                id="trainer-toggle"
                checked={hasTrainer}
                onCheckedChange={onToggleTrainer}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <Label htmlFor="club-toggle" className="flex flex-col gap-1">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Club Membership
                </span>
                <span className="text-sm text-gray-600">
                  {isClubMember
                    ? "Member of clubs (events shown)"
                    : "Not a member (no events)"}
                </span>
              </Label>
              <Switch
                id="club-toggle"
                checked={isClubMember}
                onCheckedChange={onToggleClubMembership}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200 md:col-span-2">
              <Label htmlFor="welcome-screen" className="flex flex-col gap-1">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Welcome Screen
                </span>
                <span className="text-sm text-gray-600">
                  {showWelcomeScreen
                    ? "AI onboarding enabled (will show on next activation)"
                    : "AI onboarding disabled (skipped)"}
                </span>
              </Label>
              <Switch
                id="welcome-screen"
                checked={showWelcomeScreen}
                onCheckedChange={onToggleWelcomeScreen}
              />
            </div>
          </div>

          <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p className="font-medium mb-1">Demo Features Info:</p>
            <ul className="space-y-1 text-xs">
              <li>
                • <strong>Trainer Management:</strong> When enabled, routine
                creation is disabled and trainer info is shown
              </li>
              <li>
                • <strong>Club Membership:</strong> When enabled, club events
                appear on the dashboard with join functionality
              </li>
              <li>
                • <strong>Welcome Screen:</strong> When enabled, shows the AI
                onboarding flow immediately for testing
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle>About Peak Health</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Version</p>
              <p className="font-medium">1.0.0 Beta</p>
            </div>
            <div>
              <p className="text-gray-600">Build</p>
              <p className="font-medium">2024.01.15</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              Privacy Policy
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              Terms of Service
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
