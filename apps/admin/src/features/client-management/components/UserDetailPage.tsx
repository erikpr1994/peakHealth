'use client';

import { ArrowLeft, Edit, Save, User, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Avatar, AvatarFallback } from '../../../components/ui/avatar';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Separator } from '../../../components/ui/separator';
import { Textarea } from '../../../components/ui/textarea';
import { getClientById, updateClient } from '../api/clientApi';

import type { Client, UpdateClientData } from '../types';

interface UserDetailPageProps {
  userId: string;
}

export const UserDetailPage = ({
  userId,
}: UserDetailPageProps): React.JSX.Element => {
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UpdateClientData>({});

  useEffect(() => {
    const fetchClient = async (): Promise<void> => {
      try {
        const clientData = await getClientById(userId);
        if (clientData) {
          setClient(clientData);
          setEditData({
            groups: clientData.groups,
            profile: clientData.profile,
            subscription_tier: clientData.subscription_tier,
            user_type: clientData.primary_user_type,
          });
        }
      } catch (error) {
        console.error('Error fetching client:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [userId]);

  const handleSave = async (): Promise<void> => {
    if (!client) return;

    setSaving(true);
    try {
      const updatedClient = await updateClient(userId, editData);
      setClient(updatedClient);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating client:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = (): void => {
    if (client) {
      setEditData({
        groups: client.groups,
        profile: client.profile,
        subscription_tier: client.subscription_tier,
        user_type: client.primary_user_type,
      });
    }
    setIsEditing(false);
  };

  const updateProfileField = (
    field: keyof NonNullable<Client['profile']>,
    value: string | string[]
  ): void => {
    setEditData(prev => ({
      ...prev,
      profile: {
        ...(prev.profile || {}),
        [field]: value,
      },
    }));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Client not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Client Details</h1>
            <p className="text-muted-foreground">
              Manage client information and settings
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={saving}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-muted text-muted-foreground text-lg">
                    {client.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={client.email}
                        disabled
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="userType">User Type</Label>
                        {isEditing ? (
                          <Input
                            id="userType"
                            value={editData.user_type || ''}
                            onChange={e =>
                              setEditData(prev => ({
                                ...prev,
                                user_type: e.target.value,
                              }))
                            }
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 p-2 bg-muted rounded-md">
                            {client.primary_user_type || 'Not assigned'}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="subscription">Subscription Tier</Label>
                        {isEditing ? (
                          <Input
                            id="subscription"
                            value={editData.subscription_tier || ''}
                            onChange={e =>
                              setEditData(prev => ({
                                ...prev,
                                subscription_tier: e.target.value,
                              }))
                            }
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 p-2 bg-muted rounded-md">
                            {client.subscription_tier || 'Free'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={editData.profile?.bio || ''}
                    onChange={e => updateProfileField('bio', e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                ) : (
                  <div className="mt-1 p-2 bg-muted rounded-md">
                    {client.profile?.bio || 'No bio provided'}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fitnessLevel">Fitness Level</Label>
                  {isEditing ? (
                    <Input
                      id="fitnessLevel"
                      value={editData.profile?.fitness_level || ''}
                      onChange={e =>
                        updateProfileField('fitness_level', e.target.value)
                      }
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 p-2 bg-muted rounded-md">
                      {client.profile?.fitness_level || 'Not specified'}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  {isEditing ? (
                    <Input
                      id="experience"
                      value={editData.profile?.experience || ''}
                      onChange={e =>
                        updateProfileField('experience', e.target.value)
                      }
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 p-2 bg-muted rounded-md">
                      {client.profile?.experience || 'Not specified'}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timeAvailable">Time Available</Label>
                  {isEditing ? (
                    <Input
                      id="timeAvailable"
                      value={editData.profile?.time_available || ''}
                      onChange={e =>
                        updateProfileField('time_available', e.target.value)
                      }
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 p-2 bg-muted rounded-md">
                      {client.profile?.time_available || 'Not specified'}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="equipmentAccess">Equipment Access</Label>
                  {isEditing ? (
                    <Input
                      id="equipmentAccess"
                      value={editData.profile?.equipment_access || ''}
                      onChange={e =>
                        updateProfileField('equipment_access', e.target.value)
                      }
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 p-2 bg-muted rounded-md">
                      {client.profile?.equipment_access || 'Not specified'}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="goals">Goals</Label>
                {isEditing ? (
                  <Input
                    id="goals"
                    value={editData.profile?.goals?.join(', ') || ''}
                    onChange={e =>
                      updateProfileField(
                        'goals',
                        e.target.value.split(', ').filter(Boolean)
                      )
                    }
                    className="mt-1"
                    placeholder="Enter goals separated by commas"
                  />
                ) : (
                  <div className="mt-1 p-2 bg-muted rounded-md">
                    {client.profile?.goals?.length
                      ? client.profile.goals.join(', ')
                      : 'No goals specified'}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="workoutTypes">Workout Types</Label>
                {isEditing ? (
                  <Input
                    id="workoutTypes"
                    value={editData.profile?.workout_types?.join(', ') || ''}
                    onChange={e =>
                      updateProfileField(
                        'workout_types',
                        e.target.value.split(', ').filter(Boolean)
                      )
                    }
                    className="mt-1"
                    placeholder="Enter workout types separated by commas"
                  />
                ) : (
                  <div className="mt-1 p-2 bg-muted rounded-md">
                    {client.profile?.workout_types?.length
                      ? client.profile.workout_types.join(', ')
                      : 'No workout types specified'}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="limitations">Limitations</Label>
                {isEditing ? (
                  <Textarea
                    id="limitations"
                    value={editData.profile?.limitations || ''}
                    onChange={e =>
                      updateProfileField('limitations', e.target.value)
                    }
                    className="mt-1"
                    rows={2}
                  />
                ) : (
                  <div className="mt-1 p-2 bg-muted rounded-md">
                    {client.profile?.limitations || 'No limitations specified'}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="motivation">Motivation</Label>
                {isEditing ? (
                  <Textarea
                    id="motivation"
                    value={editData.profile?.motivation || ''}
                    onChange={e =>
                      updateProfileField('motivation', e.target.value)
                    }
                    className="mt-1"
                    rows={2}
                  />
                ) : (
                  <div className="mt-1 p-2 bg-muted rounded-md">
                    {client.profile?.motivation || 'No motivation specified'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Account Status</span>
                <Badge
                  variant={
                    client.profile?.onboarding_completed_at
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {client.profile?.onboarding_completed_at
                    ? 'Active'
                    : 'Inactive'}
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Member Since</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(client.created_at).toLocaleDateString()}
                </span>
              </div>
              {client.profile?.onboarding_completed_at && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Onboarding Completed
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(
                        client.profile.onboarding_completed_at
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Statistics Card */}
          {client.stats && (
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Workouts</span>
                  <span className="text-sm font-bold">
                    {client.stats.total_workouts}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Days Active</span>
                  <span className="text-sm font-bold">
                    {client.stats.days_active}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Hours Trained</span>
                  <span className="text-sm font-bold">
                    {client.stats.hours_trained}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Achievements</span>
                  <span className="text-sm font-bold">
                    {client.stats.achievements_count}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Groups Card */}
          {client.groups && client.groups.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {client.groups.map(group => (
                    <Badge key={group} variant="outline">
                      {group}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
