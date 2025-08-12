import {
  DatabaseRoutineResponse,
  DatabaseWorkout,
  DatabaseSection,
  DatabaseExercise,
  DatabaseSet,
  DatabaseRoutine,
} from '../types/database';
import {
  RoutineData,
  WorkoutDay,
  StrengthWorkout,
  RunningWorkout,
  WorkoutSection,
  Exercise,
  WorkoutSet,
  Routine,
  ProgressionMethod,
} from '../types';
import { SetType, RepType } from '@/features/workout/SetManagement';

// Type guards for validation
export function isValidWorkoutType(
  type: string
): type is 'strength' | 'running' {
  return type === 'strength' || type === 'running';
}

export function isValidSectionType(
  type: string
): type is 'warmup' | 'basic' | 'cooldown' | 'emom' | 'tabata' | 'amrap' {
  return ['warmup', 'basic', 'cooldown', 'emom', 'tabata', 'amrap'].includes(
    type
  );
}

export function isValidDifficulty(
  difficulty: string
): difficulty is 'Beginner' | 'Intermediate' | 'Advanced' {
  return ['Beginner', 'Intermediate', 'Advanced'].includes(difficulty);
}

export function isValidGoal(
  goal: string
): goal is 'Strength' | 'Hypertrophy' | 'Endurance' | 'Weight Loss' {
  return ['Strength', 'Hypertrophy', 'Endurance', 'Weight Loss'].includes(goal);
}

export function isValidProgressionMethod(
  method: string
): method is ProgressionMethod {
  return [
    'linear',
    'dual',
    'inverse-pyramid',
    'myo-reps',
    'widowmaker',
    'amrap',
  ].includes(method);
}

export function isValidSetType(type: string): type is SetType {
  return ['warmup', 'normal', 'failure', 'dropset'].includes(type);
}

export function isValidRepType(type: string): type is RepType {
  return ['fixed', 'range'].includes(type);
}

// Safe transformation functions
export function transformDatabaseSet(set: DatabaseSet): WorkoutSet {
  return {
    id: set.id,
    setNumber: set.setNumber,
    setType: isValidSetType(set.setType) ? set.setType : 'normal',
    repType: isValidRepType(set.repType || 'fixed')
      ? (set.repType as RepType)
      : 'fixed',
    reps: set.reps,
    weight: set.weight,
    rpe: set.rpe,
    notes: set.notes || '',
  };
}

export function transformDatabaseExercise(
  exercise: DatabaseExercise
): Exercise {
  return {
    id: exercise.id,
    name: exercise.name,
    category: exercise.category || undefined,
    muscleGroups: exercise.muscle_groups || [],
    exerciseId: exercise.exerciseLibraryId,
    variantId: exercise.exerciseLibraryId, // For now, treat as variant ID
    sets: exercise.sets?.map(transformDatabaseSet) || [],
    restTimer: exercise.rest_timer || '90s',
    restAfter: exercise.rest_after || '2 min',
    notes: exercise.notes || '',
    progressionMethod: exercise.progression_method
      ? isValidProgressionMethod(exercise.progression_method)
        ? (exercise.progression_method as ProgressionMethod)
        : undefined
      : undefined,
    hasApproachSets: exercise.has_approach_sets || false,
    emomReps:
      typeof exercise.emom_reps === 'number' ? exercise.emom_reps : undefined,
  };
}

export function transformDatabaseSection(
  section: DatabaseSection
): WorkoutSection {
  const sectionType = isValidSectionType(section.type) ? section.type : 'basic';

  return {
    id: section.id,
    name: section.name,
    type: sectionType,
    exercises: section.exercises?.map(transformDatabaseExercise) || [],
    restAfter: section.rest_after || '2 min',
    emomDuration: section.emom_duration,
  };
}

export function transformDatabaseWorkout(
  workout: DatabaseWorkout
): StrengthWorkout | RunningWorkout | null {
  if (!isValidWorkoutType(workout.type)) {
    return null;
  }

  const baseWorkout = {
    id: workout.id,
    name: workout.name,
    type: workout.type as 'strength' | 'running',
    objective: workout.objective || '',
    schedule: {
      repeatPattern: workout.schedule?.repeatPattern || '',
      repeatValue: workout.schedule?.repeatValue || '',
      selectedDays: workout.schedule?.selectedDays || [],
      time: workout.schedule?.time || '',
    },
    sections: workout.sections?.map(transformDatabaseSection) || [],
  };

  if (workout.type === 'strength') {
    return baseWorkout as StrengthWorkout;
  } else if (workout.type === 'running') {
    return {
      ...baseWorkout,
      type: 'running',
      trailRunningData: workout.trail_running_data,
    } as RunningWorkout;
  }

  return null;
}

export function transformDatabaseRoutineToRoutineData(
  data: DatabaseRoutineResponse
): RoutineData {
  // Validate routine data
  if (!isValidDifficulty(data.routine.difficulty)) {
    throw new Error(`Invalid difficulty: ${data.routine.difficulty}`);
  }

  if (!isValidGoal(data.routine.goal)) {
    throw new Error(`Invalid goal: ${data.routine.goal}`);
  }

  // Calculate weekly schedule from workout configs
  const calculateWeeklySchedule = (workouts: DatabaseWorkout[]): boolean[] => {
    const schedule = new Array(7).fill(false);

    workouts?.forEach((workout: DatabaseWorkout) => {
      if (workout.schedule?.selectedDays) {
        workout.schedule.selectedDays.forEach((day: string) => {
          const dayIndex = [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
          ].indexOf(day.toLowerCase());
          if (dayIndex !== -1) {
            schedule[dayIndex] = true;
          }
        });
      }
    });

    return schedule;
  };

  // Calculate estimated duration
  const estimatedDuration =
    data.workouts?.reduce((total: number, workout: DatabaseWorkout) => {
      return (
        total +
        (workout.sections?.reduce(
          (sectionTotal: number, section: DatabaseSection) => {
            return (
              sectionTotal +
              (section.exercises?.reduce(
                (exerciseTotal: number, exercise: DatabaseExercise) => {
                  return exerciseTotal + (exercise.sets?.length || 0) * 2; // Rough estimate: 2 minutes per set
                },
                0
              ) || 0)
            );
          },
          0
        ) || 0)
      );
    }, 0) || 0;

  // Calculate workouts per week based on schedule
  const calculateWorkoutsPerWeek = (workouts: DatabaseWorkout[]): number => {
    const uniqueDays = new Set<string>();
    workouts?.forEach((workout: DatabaseWorkout) => {
      if (workout.schedule?.selectedDays) {
        workout.schedule.selectedDays.forEach((day: string) => {
          uniqueDays.add(day.toLowerCase());
        });
      }
    });
    return uniqueDays.size;
  };

  const workoutsPerWeek = calculateWorkoutsPerWeek(data.workouts || []);
  const totalWorkoutsForDuration =
    workoutsPerWeek * (data.routine.duration || 12);

  // Transform workout days
  const workoutDays: WorkoutDay[] = (data.workouts || []).map(
    (workout: DatabaseWorkout) => ({
      id: workout.id,
      name: workout.name,
      estimatedTime: `${Math.max(30, Math.min(estimatedDuration, 90))} min`,
      difficulty: data.routine.difficulty,
      exercises:
        workout.sections?.flatMap(
          (section: DatabaseSection) =>
            section.exercises?.map((exercise: DatabaseExercise) => ({
              id: exercise.id,
              name: exercise.name,
              muscleGroups: exercise.muscle_groups || [],
              exerciseId: exercise.exerciseLibraryId || '',
              variantId: exercise.exerciseLibraryId || '',
              sets:
                exercise.sets?.map((set: DatabaseSet) => ({
                  reps: set.reps?.toString() || '',
                  weight: set.weight?.toString() || '',
                  duration: set.duration?.toString() || '',
                  restTime: set.rest_time || '90s',
                })) || [],
              notes: exercise.notes || '',
            })) || []
        ) || [],
    })
  );

  // Safe date parsing
  const parseDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'Unknown';

    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
    } catch {
      // Error handling without console.log
    }
    return 'Unknown';
  };

  return {
    id: data.routine.id,
    name: data.routine.name,
    description: data.routine.description,
    duration: data.routine.duration || 12,
    daysPerWeek: data.routine.days_per_week || 3,
    difficulty: data.routine.difficulty,
    goal: data.routine.goal,
    isActive: data.routine.is_active,
    isFavorite: data.routine.is_favorite,
    progress: {
      currentWeek:
        workoutsPerWeek > 0
          ? Math.floor(
              (data.routine.completed_workouts || 0) / workoutsPerWeek
            ) + 1
          : 1,
      totalWeeks: data.routine.duration || 12,
      completedWorkouts: data.routine.completed_workouts || 0,
      totalWorkouts: totalWorkoutsForDuration,
    },
    schedule: calculateWeeklySchedule(data.workouts || []),
    workoutDays,
    createdDate: parseDate(data.routine.created_at),
    lastModified: parseDate(data.routine.updated_at),
  };
}

export function transformDatabaseRoutineToRoutine(
  routine: DatabaseRoutine
): Routine {
  // Validate routine data
  if (!isValidDifficulty(routine.difficulty)) {
    throw new Error(`Invalid difficulty: ${routine.difficulty}`);
  }

  if (!isValidGoal(routine.goal)) {
    throw new Error(`Invalid goal: ${routine.goal}`);
  }

  return {
    id: routine.id,
    name: routine.name || '',
    description: routine.description || '',
    daysPerWeek: routine.days_per_week || 3,
    difficulty: routine.difficulty,
    goal: routine.goal,
    isActive: routine.is_active ?? false,
    isFavorite: routine.is_favorite ?? false,
    schedule: routine.schedule || [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    progress: {
      current: routine.completed_workouts ?? 0,
      total: routine.total_workouts ?? 0,
    },
    lastUsed: routine.last_used || undefined,
    objectives: routine.objectives || [],
    totalWorkouts: routine.total_workouts ?? 0,
    completedWorkouts: routine.completed_workouts ?? 0,
    estimatedDuration: routine.estimated_duration || '45-60 min',
  };
}
