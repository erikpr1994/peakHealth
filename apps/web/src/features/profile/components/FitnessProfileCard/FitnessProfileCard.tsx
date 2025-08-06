import {
  Award,
  Clock,
  Dumbbell,
  User,
  Target,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import React from 'react';

import { UserProfile } from '../../types/profile';

import styles from './FitnessProfileCard.module.css';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface FitnessProfileCardProps {
  profile: UserProfile;
}

export const FitnessProfileCard = ({ profile }: FitnessProfileCardProps) => {
  const handleRetakeOnboarding = () => {
    // Clear onboarding data to trigger onboarding flow again
    if (typeof window !== 'undefined') {
      localStorage.removeItem('peak-health-onboarding-complete');
      localStorage.removeItem('peak-health-onboarding-data');
      window.location.reload(); // Reload to trigger onboarding
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // If no profile data exists, show empty state
  if (!profile.fitness_level && !profile.goals?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Fitness Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={styles.emptyState}>
            No fitness profile data available. Complete the onboarding to get
            personalized recommendations.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetakeOnboarding}
            className={styles.retakeButton}
          >
            <RefreshCw className={styles.buttonIcon} />
            Take Onboarding Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className={styles.header}>
        <CardTitle>Fitness Profile</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRetakeOnboarding}
          className={styles.retakeButton}
        >
          <RefreshCw className={styles.buttonIcon} />
          Retake Quiz
        </Button>
      </CardHeader>
      <CardContent className={styles.content}>
        <div className={styles.grid}>
          {profile.fitness_level && (
            <div>
              <CustomLabel className={styles.label}>
                <Award className={styles.icon} />
                Fitness Level
              </CustomLabel>
              <Badge variant="secondary" className={styles.badge}>
                {profile.fitness_level}
              </Badge>
            </div>
          )}

          {profile.time_available && (
            <div>
              <CustomLabel className={styles.label}>
                <Clock className={styles.icon} />
                Time Available
              </CustomLabel>
              <Badge variant="outline" className={styles.badge}>
                {profile.time_available}
              </Badge>
            </div>
          )}

          {profile.equipment_access && (
            <div>
              <CustomLabel className={styles.label}>
                <Dumbbell className={styles.icon} />
                Equipment Access
              </CustomLabel>
              <Badge variant="outline" className={styles.badge}>
                {profile.equipment_access}
              </Badge>
            </div>
          )}

          {profile.experience && (
            <div>
              <CustomLabel className={styles.label}>
                <User className={styles.icon} />
                Experience
              </CustomLabel>
              <Badge variant="outline" className={styles.badge}>
                {profile.experience}
              </Badge>
            </div>
          )}
        </div>

        <Separator className={styles.separator} />

        {profile.goals && profile.goals.length > 0 && (
          <div>
            <CustomLabel className={styles.label}>
              <Target className={styles.icon} />
              Fitness Goals
            </CustomLabel>
            <div className={styles.badgeContainer}>
              {profile.goals.map((goal, index) => (
                <Badge key={index} className={styles.badge}>
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {profile.workout_types && profile.workout_types.length > 0 && (
          <div>
            <CustomLabel className={styles.label}>
              <Sparkles className={styles.icon} />
              Preferred Workout Types
            </CustomLabel>
            <div className={styles.badgeContainer}>
              {profile.workout_types.map((type, index) => (
                <Badge key={index} variant="secondary" className={styles.badge}>
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {profile.limitations && (
          <div>
            <CustomLabel className={styles.label}>
              Physical Considerations
            </CustomLabel>
            <p className={styles.textBox}>{profile.limitations}</p>
          </div>
        )}

        {profile.motivation && (
          <div>
            <CustomLabel className={styles.label}>Motivation</CustomLabel>
            <p className={styles.textBox}>{profile.motivation}</p>
          </div>
        )}

        {profile.onboarding_completed_at && (
          <div className={styles.completedAt}>
            Profile created: {formatDate(profile.onboarding_completed_at)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Custom Label component for consistency
const CustomLabel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${styles.labelText} ${className || ''}`}>{children}</div>
  );
};
