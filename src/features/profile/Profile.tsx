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

interface ProfileProps {
  onboardingData?: unknown | null;
}

const Profile = ({ onboardingData }: ProfileProps) => {
  const { user } = useAuth();
  const { profile, stats, achievements, isLoading, error } = useUserProfile();
  const {
    updateUserMetadata,
    isUpdating,
    error: updateError,
  } = useProfileUpdate();

  const handleRetakeOnboarding = () => {
    // Clear onboarding data to trigger onboarding flow again
    if (typeof window !== 'undefined') {
      localStorage.removeItem('peak-health-onboarding-complete');
      localStorage.removeItem('peak-health-onboarding-data');
      window.location.reload(); // Reload to trigger onboarding
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Profile</h1>
        </div>
        <div className={styles.loadingState}>
          <p>Loading profile data...</p>
        </div>
      </div>
    );
  }

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

  // No user state
  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Profile</h1>
        </div>
        <div className={styles.errorState}>
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
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
          {profile && (
            <FitnessProfileCard
              profile={profile}
              onRetakeOnboarding={handleRetakeOnboarding}
            />
          )}
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
