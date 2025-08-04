'use client';

import { Mail, Phone, MapPin, Calendar, Edit2, Save } from 'lucide-react';
import React, { useState } from 'react';

import { UserMetadata } from '../../types/profile';

import styles from './PersonalInfoCard.module.css';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.user_metadata.name || '',
    display_name: user.user_metadata.display_name || '',
    phone: user.user_metadata.phone || '',
    location: user.user_metadata.location || '',
    birth_date: user.user_metadata.birth_date || '',
    bio: user.user_metadata.bio || '',
  });

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
