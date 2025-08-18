'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Calendar, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Card } from '@/components/ui/card';
import styles from './DetailedWorkoutView.module.css';

interface WorkoutSet {
  id: string;
  setNumber: number;
  setType: string;
  repType: string;
  reps: number | null;
  weight: number | null;
  rpe: number | null;
  notes: string;
  restTime?: string;
  duration?: number;
}

interface WorkoutExercise {
  id: string;
  name: string;
  category?: string;
  muscleGroups?: string[];
  exerciseId?: string;
  variantId?: string;
  sets: WorkoutSet[];
  restTimer: string;
  restAfter: string;
  notes: string;
  progressionMethod?: string;
  hasApproachSets?: boolean;
  emomReps?: number;
}

interface WorkoutSection {
  id: string;
  name: string;
  type: string;
  exercises: WorkoutExercise[];
  restAfter: string;
  emomDuration?: number;
}

interface DetailedWorkout {
  id: string;
  name: string;
  type: 'strength' | 'running' | 'trail-running' | 'swimming' | 'cycling';
  objective: string;
  schedule: {
    repeatPattern: string;
    repeatValue: string;
    selectedDays: string[];
    time: string;
  };
  sections: WorkoutSection[];
}

interface DetailedWorkoutViewProps {
  workout: DetailedWorkout;
  routineId: string;
}

const DetailedWorkoutView = ({
  workout,
  routineId,
}: DetailedWorkoutViewProps): React.ReactElement => {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  const toggleSection = (sectionId: string): void => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const formatTime = (time: string): string => {
    if (!time) return 'Not set';
    return time;
  };

  const formatSchedule = (schedule: DetailedWorkout['schedule']): string => {
    const { repeatPattern, repeatValue, selectedDays, time } = schedule;
    const days =
      selectedDays.length > 0 ? selectedDays.join(', ') : 'No days selected';
    const pattern = repeatValue
      ? `Every ${repeatValue} ${repeatPattern}`
      : repeatPattern;
    return `${pattern} • ${days} • ${formatTime(time)}`;
  };

  const getSectionTypeClass = (type: string): string => {
    switch (type) {
      case 'warmup':
        return styles.sectionTypeWarmup;
      case 'basic':
        return styles.sectionTypeBasic;
      case 'cooldown':
        return styles.sectionTypeCooldown;
      case 'emom':
        return styles.sectionTypeEmom;
      case 'tabata':
        return styles.sectionTypeTabata;
      case 'amrap':
        return styles.sectionTypeAmrap;
      default:
        return styles.sectionTypeDefault;
    }
  };

  const formatSetInfo = (set: WorkoutSet): string => {
    const parts = [];

    if (set.reps !== null) {
      parts.push(`${set.reps} reps`);
    }

    if (set.weight !== null) {
      parts.push(`${set.weight} kg`);
    }

    if (set.rpe !== null) {
      parts.push(`RPE ${set.rpe}`);
    }

    return parts.join(' • ');
  };

  const getSetLabel = (set: WorkoutSet): string => {
    // If there's a specific set type, use it
    if (set.notes && set.notes.trim() !== '') {
      return set.notes;
    }

    // For basic sets, show "Set X"
    return `Set ${set.setNumber}`;
  };

  const handleExerciseClick = (exerciseId: string, variantId: string): void => {
    // Navigate directly to the exercise variant page which will be intercepted by the modal
    router.push(`/exercises/${exerciseId}/variants/${variantId}`);
  };

  return (
    <Card className={styles.workoutCard}>
      <div className={styles.workoutHeader}>
        <div className="flex-1">
          <h3 className={styles.workoutTitle}>{workout.name}</h3>
          <div className={styles.workoutMeta}>
            <div className={styles.metaItem}>
              <Target className="w-4 h-4" />
              <span>{workout.objective}</span>
            </div>
            <div className={styles.metaItem}>
              <Calendar className="w-4 h-4" />
              <span>{formatSchedule(workout.schedule)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {workout.sections.map(section => (
          <div key={section.id} className={styles.sectionContainer}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center gap-3">
                {expandedSections.has(section.id) ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
                <div>
                  <h4 className={styles.sectionTitle}>{section.name}</h4>
                  <div className={styles.sectionMeta}>
                    <span
                      className={`${styles.sectionType} ${getSectionTypeClass(section.type)}`}
                    >
                      {section.type.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600">
                      {section.exercises.length} exercises
                    </span>
                    {section.restAfter && (
                      <span className="text-sm text-gray-600">
                        Rest: {section.restAfter}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {expandedSections.has(section.id) && (
              <div className={styles.sectionContent}>
                {section.exercises.map(exercise => (
                  <div
                    key={exercise.id}
                    className={styles.exerciseCard}
                    onClick={() =>
                      handleExerciseClick(
                        exercise.exerciseId || exercise.id,
                        exercise.variantId || exercise.id
                      )
                    }
                  >
                    <div className={styles.exerciseHeader}>
                      <h5 className={styles.exerciseTitle}>{exercise.name}</h5>
                      <div className={styles.muscleGroups}>
                        {exercise.muscleGroups?.map(group => (
                          <span key={group} className={styles.muscleGroupTag}>
                            {group}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.exerciseDetails}>
                      {exercise.progressionMethod && (
                        <div className={styles.exerciseDetail}>
                          Progression: {exercise.progressionMethod}
                        </div>
                      )}
                      {exercise.restTimer && (
                        <div className={styles.exerciseDetail}>
                          Rest between sets: {exercise.restTimer}
                        </div>
                      )}
                      {exercise.restAfter && (
                        <div className={styles.exerciseDetail}>
                          Rest after exercise: {exercise.restAfter}
                        </div>
                      )}
                      {exercise.emomReps && (
                        <div className={styles.exerciseDetail}>
                          EMOM reps: {exercise.emomReps}
                        </div>
                      )}
                      {exercise.notes && (
                        <div className={styles.exerciseNotes}>
                          "{exercise.notes}"
                        </div>
                      )}
                    </div>

                    <div className={styles.setsContainer}>
                      {exercise.sets.map(set => (
                        <div key={set.id} className={styles.setItem}>
                          <div className={styles.setInfo}>
                            <span className={styles.setNumber}>
                              {getSetLabel(set)}
                            </span>
                            <span className={styles.setDetails}>
                              {formatSetInfo(set)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DetailedWorkoutView;
