"use client";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  Target,
  Clock,
  Dumbbell,
  Award,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import React, { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { OnboardingData } from "@/types/app";

interface ProfileProps {
  onboardingData?: OnboardingData | null;
}

export default function Profile({ onboardingData }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: onboardingData?.name || "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio:
      onboardingData?.motivation ||
      "Passionate about fitness and helping others achieve their health goals.",
    birthDate: "1990-05-15",
  });

  const handleSave = () => {
    // In a real app, this would save to a backend
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: onboardingData?.name || "Alex Johnson",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      bio:
        onboardingData?.motivation ||
        "Passionate about fitness and helping others achieve their health goals.",
      birthDate: "1990-05-15",
    });
    setIsEditing(false);
  };

  const handleRetakeOnboarding = () => {
    // Clear onboarding data to trigger onboarding flow again
    if (typeof window !== "undefined") {
      localStorage.removeItem("peak-health-onboarding-complete");
      localStorage.removeItem("peak-health-onboarding-data");
      window.location.reload(); // Reload to trigger onboarding
    }
  };

  // Mock stats
  const stats = [
    { label: "Total Workouts", value: "142", icon: Dumbbell },
    { label: "Days Active", value: "89", icon: Calendar },
    { label: "Achievements", value: "23", icon: Award },
    { label: "Hours Trained", value: "78", icon: Clock },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
          className="flex items-center gap-2"
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    src="/api/placeholder/80/80"
                    alt={formData.name}
                  />
                  <AvatarFallback className="text-lg">
                    {formData.name
                      .split(" ")
                      .map(n => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={e =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold">{formData.name}</h3>
                      <p className="text-gray-600">
                        Peak Health Member since 2024
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={e =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-gray-900 mt-1">{formData.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={e =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-gray-900 mt-1">{formData.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={e =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-gray-900 mt-1">{formData.location}</p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="birthDate"
                    className="flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Birth Date
                  </Label>
                  {isEditing ? (
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={e =>
                        setFormData({ ...formData, birthDate: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-gray-900 mt-1">
                      {formatDate(formData.birthDate)}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={e =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    className="mt-1"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-900 mt-1">{formData.bio}</p>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-3">
                  <Button
                    onClick={handleSave}
                    className="flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Fitness Preferences from Onboarding */}
          {onboardingData && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Fitness Profile</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetakeOnboarding}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retake Quiz
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4" />
                      Fitness Level
                    </Label>
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      {onboardingData.fitnessLevel}
                    </Badge>
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4" />
                      Time Available
                    </Label>
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {onboardingData.timeAvailable}
                    </Badge>
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-3">
                      <Dumbbell className="w-4 h-4" />
                      Equipment Access
                    </Label>
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {onboardingData.equipmentAccess}
                    </Badge>
                  </div>

                  <div>
                    <Label className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4" />
                      Experience
                    </Label>
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {onboardingData.experience}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4" />
                    Fitness Goals
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {onboardingData.goals.map((goal, index) => (
                      <Badge key={index} className="text-sm px-3 py-1">
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4" />
                    Preferred Workout Types
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {onboardingData.workoutTypes.map((type, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm px-3 py-1"
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                {onboardingData.limitations && (
                  <div>
                    <Label className="mb-2 block">
                      Physical Considerations
                    </Label>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {onboardingData.limitations}
                    </p>
                  </div>
                )}

                <div>
                  <Label className="mb-2 block">Motivation</Label>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {onboardingData.motivation}
                  </p>
                </div>

                <div className="text-xs text-gray-500">
                  Profile created:{" "}
                  {formatDate(onboardingData.completedAt.toString())}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-gray-600">
                        {stat.label}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {stat.value}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Award className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">30-Day Streak</p>
                  <p className="text-xs text-gray-600">Completed yesterday</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Goal Crusher</p>
                  <p className="text-xs text-gray-600">Reached weekly target</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Strength Builder</p>
                  <p className="text-xs text-gray-600">New personal record</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
