"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Key,
  Mail,
  Shield,
  Eye,
  EyeOff,
  Trash2,
  User,
  Globe,
  FileText,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
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
} from "@/components/ui/alert-dialog";
import { OnboardingData } from "@/types/app";

interface AccountSettingsProps {
  onboardingData?: OnboardingData | null;
}

export default function AccountSettings({
  onboardingData,
}: AccountSettingsProps) {
  const router = useRouter();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [email, setEmail] = useState("alex.johnson@email.com");
  const [newEmail, setNewEmail] = useState("");

  const [personalInfo, setPersonalInfo] = useState({
    name: onboardingData?.name || "Alex Johnson",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate about fitness and healthy living. Always looking to push my limits and achieve new goals.",
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    workoutsVisible: false,
    statsVisible: true,
    allowMessages: true,
    showLocation: false,
    showPhone: false,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    workoutReminders: true,
    achievementAlerts: true,
    weeklyReports: false,
    socialUpdates: true,
    marketingEmails: false,
  });

  const handlePasswordChange = () => {
    // Validate passwords match
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match");
      return;
    }

    // In a real app, this would make an API call
    console.log("Changing password...");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleEmailChange = () => {
    // In a real app, this would send verification email
    console.log("Changing email from", email, "to", newEmail);
    setEmail(newEmail);
    setNewEmail("");
  };

  const handleDeleteAccount = () => {
    // In a real app, this would make an API call
    console.log("Deleting account...");
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => router.push("/profile")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
          <p className="text-gray-500 mt-2">
            Manage your account security, privacy, and personal information
          </p>
        </div>
      </div>

      {/* Two-column layout for larger screens */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Personal Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">Personal Information</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={personalInfo.name}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, name: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, phone: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={personalInfo.location}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      location: e.target.value,
                    })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={personalInfo.bio}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, bio: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <Button>Update Personal Info</Button>
            </div>
          </Card>

          {/* Change Password */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Key className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">Change Password</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords({ ...passwords, current: e.target.value })
                    }
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={passwords.new}
                    onChange={(e) =>
                      setPasswords({ ...passwords, new: e.target.value })
                    }
                    placeholder="Enter new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords({ ...passwords, confirm: e.target.value })
                    }
                    placeholder="Confirm new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                onClick={handlePasswordChange}
                disabled={
                  !passwords.current || !passwords.new || !passwords.confirm
                }
              >
                Update Password
              </Button>
            </div>
          </Card>

          {/* Change Email */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">Email Address</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Current Email</Label>
                <p className="mt-1 text-gray-700">{email}</p>
              </div>

              <div>
                <Label htmlFor="newEmail">New Email Address</Label>
                <Input
                  id="newEmail"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email address"
                  className="mt-1"
                />
              </div>

              <Button onClick={handleEmailChange} disabled={!newEmail}>
                Update Email
              </Button>

              <p className="text-sm text-gray-500">
                A verification email will be sent to your new email address.
              </p>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Privacy Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">Privacy Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Profile Visibility</Label>
                  <p className="text-sm text-gray-500">
                    Allow others to find and view your profile
                  </p>
                </div>
                <Switch
                  checked={privacySettings.profileVisible}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({
                      ...privacySettings,
                      profileVisible: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Workout History</Label>
                  <p className="text-sm text-gray-500">
                    Show your workout history to other users
                  </p>
                </div>
                <Switch
                  checked={privacySettings.workoutsVisible}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({
                      ...privacySettings,
                      workoutsVisible: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Statistics</Label>
                  <p className="text-sm text-gray-500">
                    Share your fitness statistics publicly
                  </p>
                </div>
                <Switch
                  checked={privacySettings.statsVisible}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({
                      ...privacySettings,
                      statsVisible: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow Messages</Label>
                  <p className="text-sm text-gray-500">
                    Let other users send you messages
                  </p>
                </div>
                <Switch
                  checked={privacySettings.allowMessages}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({
                      ...privacySettings,
                      allowMessages: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Location</Label>
                  <p className="text-sm text-gray-500">
                    Display your location on your profile
                  </p>
                </div>
                <Switch
                  checked={privacySettings.showLocation}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({
                      ...privacySettings,
                      showLocation: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Phone Number</Label>
                  <p className="text-sm text-gray-500">
                    Display your phone number to other users
                  </p>
                </div>
                <Switch
                  checked={privacySettings.showPhone}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({
                      ...privacySettings,
                      showPhone: checked,
                    })
                  }
                />
              </div>
            </div>
          </Card>

          {/* Notification Preferences */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">
                Notification Preferences
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">
                    Receive general notifications via email
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      emailNotifications: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Workout Reminders</Label>
                  <p className="text-sm text-gray-500">
                    Get reminders for scheduled workouts
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.workoutReminders}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      workoutReminders: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Achievement Alerts</Label>
                  <p className="text-sm text-gray-500">
                    Notifications for fitness milestones and achievements
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.achievementAlerts}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      achievementAlerts: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-gray-500">
                    Receive weekly progress and summary reports
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.weeklyReports}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      weeklyReports: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Social Updates</Label>
                  <p className="text-sm text-gray-500">
                    Notifications about your fitness community
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.socialUpdates}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      socialUpdates: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-gray-500">
                    Promotional content and feature updates
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      marketingEmails: checked,
                    })
                  }
                />
              </div>
            </div>
          </Card>

          {/* Account Data */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">Account Data</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">
                  Download Your Data
                </h4>
                <p className="text-sm text-gray-500 mb-3">
                  Download a copy of all your data including workouts, progress,
                  and settings.
                </p>
                <Button variant="outline">Request Data Export</Button>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium text-gray-900">Account Created</h4>
                <p className="text-sm text-gray-500">
                  Member since March 15, 2024
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900">Last Activity</h4>
                <p className="text-sm text-gray-500">
                  Last seen today at 2:30 PM
                </p>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-red-200">
            <div className="flex items-center gap-2 mb-4">
              <Trash2 className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-red-600">
                Danger Zone
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Delete Account</h4>
                <p className="text-sm text-gray-500 mb-3">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove all your data from our
                        servers including:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>All your workout routines and history</li>
                          <li>Personal fitness statistics</li>
                          <li>Gym memberships and custom gyms</li>
                          <li>Profile information and preferences</li>
                        </ul>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Yes, delete my account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
