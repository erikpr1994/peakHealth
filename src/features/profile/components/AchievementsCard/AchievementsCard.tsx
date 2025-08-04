import React from 'react';

import { UserAchievement } from '../../types/profile';

import styles from './AchievementsCard.module.css';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AchievementsCardProps {
  achievements: UserAchievement[];
}

export const AchievementsCard = ({ achievements }: AchievementsCardProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getAchievementColor = (achievementType: string) => {
    switch (achievementType) {
      case 'first_workout':
        return styles.yellow;
      case 'workout_streak_10':
        return styles.orange;
      case 'days_active_30':
        return styles.blue;
      case 'hours_trained_50':
        return styles.green;
      default:
        return styles.default;
    }
  };

  if (achievements.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={styles.emptyState}>
            No achievements yet. Start working out to earn your first badge!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Achievements</CardTitle>
      </CardHeader>
      <CardContent className={styles.content}>
        {achievements.slice(0, 3).map(achievement => (
          <div key={achievement.id} className={styles.achievementItem}>
            <div
              className={`${styles.achievementIcon} ${getAchievementColor(achievement.achievement_type)}`}
            >
              <span className={styles.iconText}>{achievement.icon}</span>
            </div>
            <div className={styles.achievementInfo}>
              <p className={styles.achievementTitle}>{achievement.title}</p>
              <p className={styles.achievementDate}>
                Earned {formatDate(achievement.earned_at)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
