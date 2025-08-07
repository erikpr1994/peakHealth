'use client';

import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  User,
  Crown,
  Key,
  Star,
} from 'lucide-react';
import React, { useState } from 'react';

import { UserMetadata } from '../../types/profile';

import styles from './PersonalInfoCard.module.css';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/features/auth/context/AuthContext';

interface PersonalInfoCardProps {
  user: {
    id: string;
    email?: string;
    user_metadata: UserMetadata;
    created_at?: string;
  };
  onUpdateMetadata: (metadata: Record<string, unknown>) => Promise<boolean>;
  isUpdating?: boolean;
}

export const PersonalInfoCard = ({
  user,
  onUpdateMetadata,
  isUpdating = false,
}: PersonalInfoCardProps) => {
  const {
    mutateUser,
    userTypes,
    primaryUserType,
    subscriptionTier,
    userGroups,
    permissions,
    features,
  } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.user_metadata.name || '',
    display_name: user.user_metadata.display_name || '',
    phone: user.user_metadata.phone || '',
    location: user.user_metadata.location || '',
    birth_date: user.user_metadata.birth_date || '',
    bio: user.user_metadata.bio || '',
  });

  // Update form data when user data changes
  React.useEffect(() => {
    setFormData({
      name: user.user_metadata.name || '',
      display_name: user.user_metadata.display_name || '',
      phone: user.user_metadata.phone || '',
      location: user.user_metadata.location || '',
      birth_date: user.user_metadata.birth_date || '',
      bio: user.user_metadata.bio || '',
    });
  }, [user.user_metadata]);

  const handleSave = async () => {
    const success = await onUpdateMetadata({
      name: formData.name,
      display_name: formData.display_name,
      phone: formData.phone,
      location: formData.location,
      birth_date: formData.birth_date,
      bio: formData.bio,
    });

    if (success) {
      // Refresh user data to reflect the updated metadata
      await mutateUser();
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.user_metadata.name || '',
      display_name: user.user_metadata.display_name || '',
      phone: user.user_metadata.phone || '',
      location: user.user_metadata.location || '',
      birth_date: user.user_metadata.birth_date || '',
      bio: user.user_metadata.bio || '',
    });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const displayName =
    formData.display_name ||
    formData.name ||
    (user.email ? user.email.split('@')[0] : 'User');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className={styles.content}>
        <div className={styles.avatarSection}>
          <Avatar className={styles.avatar}>
            <AvatarImage
              src={user.user_metadata.avatar_url || `/api/placeholder/80/80`}
              alt={displayName}
            />
            <AvatarFallback className={styles.avatarFallback}>
              {displayName
                .split(' ')
                .map(n => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className={styles.nameSection}>
            {isEditing ? (
              <div className={styles.editNameFields}>
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
                <div>
                  <Label htmlFor="display_name">Display Name</Label>
                  <Input
                    id="display_name"
                    value={formData.display_name}
                    onChange={e =>
                      setFormData({ ...formData, display_name: e.target.value })
                    }
                  />
                </div>
              </div>
            ) : (
              <div>
                <h3 className={styles.displayName}>{displayName}</h3>
                <p className={styles.memberSince}>
                  Peak Health Member since{' '}
                  {user.created_at
                    ? new Date(user.created_at).getFullYear()
                    : '2024'}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.formGrid}>
          <div>
            <Label htmlFor="email" className={styles.label}>
              <Mail className={styles.icon} />
              Email
            </Label>
            <p className={styles.value}>{user.email || 'Not provided'}</p>
          </div>

          <div>
            <Label htmlFor="phone" className={styles.label}>
              <Phone className={styles.icon} />
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
              <p className={styles.value}>{formData.phone || 'Not provided'}</p>
            )}
          </div>

          <div>
            <Label htmlFor="location" className={styles.label}>
              <MapPin className={styles.icon} />
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
              <p className={styles.value}>
                {formData.location || 'Not provided'}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="birth_date" className={styles.label}>
              <Calendar className={styles.icon} />
              Birth Date
            </Label>
            {isEditing ? (
              <Input
                id="birth_date"
                type="date"
                value={formData.birth_date}
                onChange={e =>
                  setFormData({ ...formData, birth_date: e.target.value })
                }
              />
            ) : (
              <p className={styles.value}>
                {formData.birth_date
                  ? formatDate(formData.birth_date)
                  : 'Not provided'}
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
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className={styles.bioTextarea}
              rows={3}
            />
          ) : (
            <p className={styles.value}>{formData.bio || 'No bio provided'}</p>
          )}
        </div>

        {/* User Types and Subscription Section */}
        <div>
          <Label className={styles.label}>
            <User className={styles.icon} />
            User Types & Subscription
          </Label>
          <div className={styles.rolesGroupsContainer}>
            {userTypes.length > 0 && (
              <div className={styles.roleGroupSection}>
                <span className={styles.roleGroupLabel}>User Types:</span>
                <div className={styles.roleGroupTags}>
                  {userTypes.map((userType, index) => (
                    <span
                      key={index}
                      className={`${styles.roleGroupTag} ${
                        userType === primaryUserType ? styles.primaryTag : ''
                      }`}
                    >
                      {userType}
                      {userType === primaryUserType && (
                        <Crown className={styles.primaryIcon} />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {subscriptionTier && (
              <div className={styles.roleGroupSection}>
                <span className={styles.roleGroupLabel}>Subscription:</span>
                <div className={styles.roleGroupTags}>
                  <span
                    className={`${styles.roleGroupTag} ${styles.subscriptionTag}`}
                  >
                    {subscriptionTier}
                  </span>
                </div>
              </div>
            )}
            {userGroups.length > 0 && (
              <div className={styles.roleGroupSection}>
                <span className={styles.roleGroupLabel}>Groups:</span>
                <div className={styles.roleGroupTags}>
                  {userGroups.map((group, index) => (
                    <span key={index} className={styles.roleGroupTag}>
                      {group}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {userTypes.length === 0 &&
              userGroups.length === 0 &&
              !subscriptionTier && (
                <p className={styles.value}>No user types or groups assigned</p>
              )}
          </div>
        </div>

        {/* Permissions Section */}
        {Object.keys(permissions).length > 0 && (
          <div>
            <Label className={styles.label}>
              <Key className={styles.icon} />
              Permissions
            </Label>
            <div className={styles.permissionsContainer}>
              {Object.entries(permissions).map(
                ([permission, hasPermission]) => (
                  <span
                    key={permission}
                    className={`${styles.permissionTag} ${
                      hasPermission
                        ? styles.activePermission
                        : styles.inactivePermission
                    }`}
                  >
                    {permission.replace(/_/g, ' ')}
                  </span>
                )
              )}
            </div>
          </div>
        )}

        {/* Features Section */}
        {features.length > 0 && (
          <div>
            <Label className={styles.label}>
              <Star className={styles.icon} />
              Features
            </Label>
            <div className={styles.featuresContainer}>
              {features.map((feature, index) => (
                <span key={index} className={styles.featureTag}>
                  {feature.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className={styles.actions}>
          {isEditing ? (
            <>
              <Button
                onClick={handleSave}
                disabled={isUpdating}
                className={styles.saveButton}
              >
                <Save className={styles.buttonIcon} />
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className={styles.editButton}
            >
              <Edit2 className={styles.buttonIcon} />
              Edit Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
