'use client';

import React from 'react';

import styles from './Profile.module.css';

import {
  ActivityStatsCard,
  AchievementsCard,
  FitnessProfileCard,
  PersonalInfoCard,
  useUserProfile,
  useProfileUpdate,
} from './index';

import { useAuth } from '@/features/auth/context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const { profile, stats, achievements, error } = useUserProfile();
  const {
    updateUserMetadata,
    isUpdating,
    error: updateError,
  } = useProfileUpdate();

  // Note: Loading state is now handled by loading.tsx file convention

  // Error state
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Profile</h1>
        </div>
        <div className={styles.errorState}>
          <p>Error loading profile: {error.message}</p>
        </div>
      </div>
    );
  }

  // Note: Route protection is handled by middleware - authenticated users only
  if (!user) {
    return null; // This shouldn't happen due to middleware, but TypeScript safety
  }

  // Default stats if none available
  const defaultStats = {
    user_id: user.id,
    total_workouts: 0,
    days_active: 0,
    hours_trained: 0,
    achievements_count: 0,
    last_updated: new Date(),
  };

  const displayStats = stats || defaultStats;
  const displayAchievements = achievements || [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Profile</h1>
        {updateError && (
          <div className={styles.errorMessage}>Error: {updateError}</div>
        )}
      </div>

      <div className={styles.content}>
        {/* Profile Information */}
        <div className={styles.mainContent}>
          <PersonalInfoCard
            user={user}
            onUpdateMetadata={updateUserMetadata}
            isUpdating={isUpdating}
          />

          {/* Fitness Profile */}
          {profile && <FitnessProfileCard profile={profile} />}
        </div>

        {/* Stats Sidebar */}
        <div className={styles.sidebar}>
          <ActivityStatsCard stats={displayStats} />
          <AchievementsCard achievements={displayAchievements} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
