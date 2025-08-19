import React, { useState } from 'react';
import { Play, Clock, Target, Users, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WorkoutPreparationProps, RoutineDetails } from './types';
import styles from './WorkoutPreparation.module.css';

const WorkoutPreparation = ({
  routineId,
  onStartWorkout,
  onNavigate,
}: WorkoutPreparationProps): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock routine details - in real app, fetch from database
  const routineDetails: RoutineDetails = {
    id: routineId,
    name: 'Full Body Split',
    description:
      'A comprehensive full-body workout targeting all major muscle groups with progressive overload principles.',
    difficulty: 'Intermediate',
    goal: 'Strength & Hypertrophy',
    estimatedDuration: '45-60 minutes',
    totalExercises: 8,
    totalSets: 24,
    muscleGroups: ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core'],
    equipment: ['Barbell', 'Dumbbells', 'Bench', 'Pull-up Bar'],
  };

  const handleStartWorkout = async (): Promise<void> => {
    setIsLoading(true);
    // In real app, create workout session here
    setTimeout(() => {
      setIsLoading(false);
      onStartWorkout();
    }, 500);
  };

  const handleGoBack = (): void => {
    onNavigate('routines');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <button onClick={handleGoBack} className={styles.backButton}>
            <ArrowLeft size={20} />
            Back to Routines
          </button>
          <div className={styles.logo}>
            <h1>Peak Health</h1>
          </div>
        </div>

        {/* Main Content */}
        <Card className={styles.mainCard}>
          <div className={styles.titleSection}>
            <h2>{routineDetails.name}</h2>
            <p>{routineDetails.description}</p>
          </div>

          {/* Routine Stats */}
          <div className={styles.statsGrid}>
            <div className={`${styles.statCard} ${styles.blue}`}>
              <Clock className={`${styles.statIcon} ${styles.blue}`} />
              <div className={styles.statLabel}>Duration</div>
              <div className={styles.statValue}>
                {routineDetails.estimatedDuration}
              </div>
            </div>
            <div className={`${styles.statCard} ${styles.green}`}>
              <Target className={`${styles.statIcon} ${styles.green}`} />
              <div className={styles.statLabel}>Exercises</div>
              <div className={styles.statValue}>
                {routineDetails.totalExercises}
              </div>
            </div>
            <div className={`${styles.statCard} ${styles.purple}`}>
              <Users className={`${styles.statIcon} ${styles.purple}`} />
              <div className={styles.statLabel}>Total Sets</div>
              <div className={styles.statValue}>{routineDetails.totalSets}</div>
            </div>
            <div className={`${styles.statCard} ${styles.orange}`}>
              <div className={styles.statLabel}>Difficulty</div>
              <Badge
                variant={
                  routineDetails.difficulty === 'Beginner'
                    ? 'default'
                    : routineDetails.difficulty === 'Intermediate'
                      ? 'secondary'
                      : 'destructive'
                }
              >
                {routineDetails.difficulty}
              </Badge>
            </div>
          </div>

          {/* Muscle Groups */}
          <div className={styles.section}>
            <h3>Target Muscle Groups</h3>
            <div className={styles.badgeContainer}>
              {routineDetails.muscleGroups.map(muscle => (
                <Badge key={muscle} variant="outline">
                  {muscle}
                </Badge>
              ))}
            </div>
          </div>

          {/* Equipment */}
          <div className={styles.section}>
            <h3>Required Equipment</h3>
            <div className={styles.badgeContainer}>
              {routineDetails.equipment.map(item => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div className={styles.section}>
            <h3>Workout Goal</h3>
            <p>{routineDetails.goal}</p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <Button variant="outline" onClick={handleGoBack}>
            Cancel
          </Button>
          <Button
            onClick={handleStartWorkout}
            disabled={isLoading}
            className={styles.startButton}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className={styles.loadingSpinner} />
                Starting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Play size={16} />
                Start Workout
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPreparation;
