'use client';

import { Card } from '@/components/ui/card';
import { Dumbbell, Activity } from 'lucide-react';
import DetailedWorkoutView from './DetailedWorkoutView';
import { StrengthWorkout, RunningWorkout } from '@/features/routines-old/types';
import styles from './DetailedWorkoutsList.module.css';

interface DetailedWorkoutsListProps {
  strengthWorkouts: StrengthWorkout[];
  runningWorkouts: RunningWorkout[];
  routineId: string;
}

const DetailedWorkoutsList = ({
  strengthWorkouts,
  runningWorkouts,
  routineId,
}: DetailedWorkoutsListProps): React.ReactElement => {
  return (
    <div className={styles.workoutsContainer}>
      {/* Strength Workouts */}
      {strengthWorkouts.length > 0 && (
        <div className={styles.workoutSection}>
          <div className={styles.workoutSectionHeader}>
            <Dumbbell
              className={`${styles.workoutSectionIcon} ${styles.strengthIcon}`}
            />
            <h2 className={styles.workoutSectionTitle}>
              Strength Workouts ({strengthWorkouts.length})
            </h2>
          </div>
          <div className={styles.workoutSectionContent}>
            {strengthWorkouts.map(workout => (
              <DetailedWorkoutView
                key={workout.id}
                workout={workout}
                routineId={routineId}
              />
            ))}
          </div>
        </div>
      )}

      {/* Running Workouts */}
      {runningWorkouts.length > 0 && (
        <div className={styles.workoutSection}>
          <div className={styles.workoutSectionHeader}>
            <Activity
              className={`${styles.workoutSectionIcon} ${styles.runningIcon}`}
            />
            <h2 className={styles.workoutSectionTitle}>
              Running Workouts ({runningWorkouts.length})
            </h2>
          </div>
          <div className={styles.workoutSectionContent}>
            {runningWorkouts.map(workout => (
              <DetailedWorkoutView
                key={workout.id}
                workout={workout}
                routineId={routineId}
              />
            ))}
          </div>
        </div>
      )}

      {/* No workouts message */}
      {strengthWorkouts.length === 0 && runningWorkouts.length === 0 && (
        <Card className={styles.emptyState}>
          <div className="text-gray-500">
            <Dumbbell className={styles.emptyStateIcon} />
            <h3 className={styles.emptyStateTitle}>No workouts added yet</h3>
            <p className={styles.emptyStateDescription}>
              This routine doesn't have any workouts configured.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DetailedWorkoutsList;
