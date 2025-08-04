import { Dumbbell, Calendar, Award, Clock } from 'lucide-react';
import React from 'react';

import { UserStats } from '../../types/profile';

import styles from './ActivityStatsCard.module.css';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivityStatsCardProps {
  stats: UserStats;
}

export const ActivityStatsCard = ({ stats }: ActivityStatsCardProps) => {
  const statsData = [
    {
      label: 'Total Workouts',
      value: stats.total_workouts.toString(),
      icon: Dumbbell,
    },
    {
      label: 'Days Active',
      value: stats.days_active.toString(),
      icon: Calendar,
    },
    {
      label: 'Achievements',
      value: stats.achievements_count.toString(),
      icon: Award,
    },
    {
      label: 'Hours Trained',
      value: stats.hours_trained.toFixed(1),
      icon: Clock,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Stats</CardTitle>
      </CardHeader>
      <CardContent className={styles.content}>
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={styles.statItem}>
              <div className={styles.statInfo}>
                <div className={styles.statIcon}>
                  <Icon className={styles.icon} />
                </div>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
              <span className={styles.statValue}>{stat.value}</span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
