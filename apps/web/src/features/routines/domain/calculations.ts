import type {
  StrengthWorkout,
  RunningWorkout,
  ProgressionMethod,
} from '../types';
import type { WorkoutSet, SetType, RepType } from '../components/SetManagement';

/**
 * Calculate the estimated duration of a workout based on its sections and exercises
 */
export const calculateWorkoutDuration = (
  workout: StrengthWorkout | RunningWorkout
): string => {
  let totalMinutes = 0;

  // Calculate time for each section
  workout.sections.forEach(section => {
    // Base time for section
    totalMinutes += 5; // 5 minutes base per section

    // Add time for exercises
    section.exercises.forEach(exercise => {
      if (section.type === 'emom' && exercise.emomReps) {
        // EMOM: 1 minute per rep target
        totalMinutes += exercise.emomReps;
      } else if (section.type === 'tabata') {
        // TABATA: 4 minutes fixed
        totalMinutes += 4;
      } else {
        // Regular exercises: estimate based on sets
        const setTime = exercise.sets.length * 2; // 2 minutes per set
        totalMinutes += setTime;
      }

      // Add rest time between sets
      if (exercise.restTimer) {
        const restMinutes = parseRestTime(exercise.restTimer);
        totalMinutes += restMinutes * (exercise.sets.length - 1); // Rest between sets
      }

      // Add rest time after exercise
      if (exercise.restAfter) {
        totalMinutes += parseRestTime(exercise.restAfter);
      }
    });

    // Add rest time after section
    if (section.restAfter) {
      totalMinutes += parseRestTime(section.restAfter);
    }
  });

  // Format the duration
  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  } else {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
};

/**
 * Parse a time string and convert it to minutes
 */
export const parseRestTime = (timeString: string): number => {
  const timeStr = timeString.toLowerCase().trim();

  if (timeStr.includes('min') || timeStr.includes('m')) {
    const match = timeStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  if (timeStr.includes('sec') || timeStr.includes('s')) {
    const match = timeStr.match(/(\d+)/);
    return match ? Math.ceil(parseInt(match[1]) / 60) : 0;
  }

  // Default: assume minutes if no unit specified
  const match = timeStr.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
};

/**
 * Helper function to duplicate sets for unilateral exercises
 */
const duplicateSetsForUnilateral = (
  baseSets: WorkoutSet[],
  isUnilateral: boolean,
  unilateralMode: 'alternating' | 'sequential' | 'simultaneous'
): WorkoutSet[] => {
  if (!isUnilateral) {
    return baseSets;
  }

  switch (unilateralMode) {
    case 'alternating':
      // For alternating, each set is performed on both sides (left + right)
      // The reps count represents the total reps for both sides combined
      return baseSets.map((set, index) => ({
        ...set,
        id: `${set.id}-${index + 1}`,
        setNumber: index + 1,
        isUnilateral: true,
        unilateralSide: 'both' as const,
      }));

    case 'sequential':
      // For sequential, sets alternate between left and right sides
      return baseSets.map((set, index) => ({
        ...set,
        id: `${set.id}-${index + 1}`,
        setNumber: index + 1,
        isUnilateral: true,
        unilateralSide: index % 2 === 0 ? 'left' : 'right',
      }));

    case 'simultaneous':
      // For simultaneous, all sets are performed on both sides
      return baseSets.map((set, index) => ({
        ...set,
        id: `${set.id}-${index + 1}`,
        setNumber: index + 1,
        isUnilateral: true,
        unilateralSide: 'both' as const,
      }));

    default:
      return baseSets;
  }
};

/**
 * Generate sets based on the specified progression method
 */
export const generateSetsForProgression = (
  progressionMethod: ProgressionMethod,
  isUnilateral?: boolean,
  unilateralMode?: 'alternating' | 'sequential' | 'simultaneous'
): WorkoutSet[] => {
  const baseSets = ((): WorkoutSet[] => {
    switch (progressionMethod) {
      case 'linear':
        return [
          {
            id: '1',
            setNumber: 1,
            setType: 'normal' as SetType,
            repType: 'fixed' as RepType,
            reps: 12,
            weight: 0,
            rpe: null,
            notes: '',
          },
          {
            id: '2',
            setNumber: 2,
            setType: 'normal' as SetType,
            repType: 'fixed' as RepType,
            reps: 10,
            weight: 0,
            rpe: null,
            notes: '',
          },
          {
            id: '3',
            setNumber: 3,
            setType: 'normal' as SetType,
            repType: 'fixed' as RepType,
            reps: 8,
            weight: 0,
            rpe: null,
            notes: '',
          },
          {
            id: '4',
            setNumber: 4,
            setType: 'normal' as SetType,
            repType: 'fixed' as RepType,
            reps: 6,
            weight: 0,
            rpe: null,
            notes: '',
          },
        ];

      case 'dual':
        return [
          {
            id: '1',
            setNumber: 1,
            setType: 'normal' as SetType,
            repType: 'range' as RepType,
            reps: null,
            repsMin: 6,
            repsMax: 8,
            weight: 0,
            rpe: null,
            notes: '',
          },
          {
            id: '2',
            setNumber: 2,
            setType: 'normal' as SetType,
            repType: 'range' as RepType,
            reps: null,
            repsMin: 6,
            repsMax: 8,
            weight: 0,
            rpe: null,
            notes: '',
          },
          {
            id: '3',
            setNumber: 3,
            setType: 'normal' as SetType,
            repType: 'range' as RepType,
            reps: null,
            repsMin: 6,
            repsMax: 8,
            weight: 0,
            rpe: null,
            notes: '',
          },
          {
            id: '4',
            setNumber: 4,
            setType: 'normal' as SetType,
            repType: 'range' as RepType,
            reps: null,
            repsMin: 6,
            repsMax: 8,
            weight: 0,
            rpe: null,
            notes: '',
          },
        ];

      case 'inverse-pyramid':
        return [
          {
            id: '1',
            setNumber: 1,
            setType: 'normal' as SetType,
            repType: 'fixed' as RepType,
            reps: 6,
            weight: 0,
            rpe: null,
            notes: '',
          },
          {
            id: '2',
            setNumber: 2,
            setType: 'normal' as SetType,
            repType: 'fixed' as RepType,
            reps: 8,
            weight: 0,
            rpe: null,
            notes: '',
          },
          {
            id: '3',
            setNumber: 3,
            setType: 'normal' as SetType,
            repType: 'fixed' as RepType,
            reps: 10,
            weight: 0,
            rpe: null,
            notes: '',
          },
          {
            id: '4',
            setNumber: 4,
            setType: 'normal' as SetType,
            repType: 'fixed' as RepType,
            reps: 12,
            weight: 0,
            rpe: null,
            notes: '',
          },
        ];

      case 'myo-reps':
        return [
          {
            id: '1',
            setNumber: 1,
            setType: 'normal',
            repType: 'fixed',
            reps: 15,
            weight: 0,
            rpe: null,
            notes: 'Activation set',
          },
          {
            id: '2',
            setNumber: 2,
            setType: 'normal',
            repType: 'fixed',
            reps: 5,
            weight: 0,
            rpe: null,
            notes: 'Myo-rep 1',
          },
          {
            id: '3',
            setNumber: 3,
            setType: 'normal',
            repType: 'fixed',
            reps: 5,
            weight: 0,
            rpe: null,
            notes: 'Myo-rep 2',
          },
          {
            id: '4',
            setNumber: 4,
            setType: 'normal',
            repType: 'fixed',
            reps: 5,
            weight: 0,
            rpe: null,
            notes: 'Myo-rep 3',
          },
          {
            id: '5',
            setNumber: 5,
            setType: 'normal',
            repType: 'fixed',
            reps: 5,
            weight: 0,
            rpe: null,
            notes: 'Myo-rep 4',
          },
        ];

      case 'widowmaker':
        return [
          {
            id: '1',
            setNumber: 1,
            setType: 'warmup',
            repType: 'fixed',
            reps: 8,
            weight: 0,
            rpe: null,
            notes: 'Warmup set - 60% of target weight',
          },
          {
            id: '2',
            setNumber: 2,
            setType: 'failure',
            repType: 'fixed',
            reps: 20,
            weight: 0,
            rpe: null,
            notes: 'Widowmaker set - 20 reps to failure',
          },
        ];

      case 'amrap':
        return [
          {
            id: '1',
            setNumber: 1,
            setType: 'normal',
            repType: 'fixed',
            reps: 8,
            weight: 0,
            rpe: null,
            notes: 'Regular set 1',
          },
          {
            id: '2',
            setNumber: 2,
            setType: 'normal',
            repType: 'fixed',
            reps: 8,
            weight: 0,
            rpe: null,
            notes: 'Regular set 2',
          },
          {
            id: '3',
            setNumber: 3,
            setType: 'failure',
            repType: 'fixed',
            reps: null,
            weight: 0,
            rpe: null,
            notes: 'AMRAP - As many reps as possible',
          },
        ];

      default:
        return [
          {
            id: '1',
            setNumber: 1,
            setType: 'normal' as SetType,
            repType: 'fixed' as RepType,
            reps: 10,
            weight: 0,
            rpe: null,
            notes: '',
          },
          {
            id: '2',
            setNumber: 2,
            setType: 'normal' as SetType,
            repType: 'fixed' as RepType,
            reps: 10,
            weight: 0,
            rpe: null,
            notes: '',
          },
          {
            id: '3',
            setNumber: 3,
            setType: 'normal' as SetType,
            repType: 'fixed' as RepType,
            reps: 10,
            weight: 0,
            rpe: null,
            notes: '',
          },
        ];
    }
  })();

  // Apply unilateral set duplication if needed
  return duplicateSetsForUnilateral(
    baseSets,
    isUnilateral || false,
    unilateralMode || 'simultaneous'
  );
};

/**
 * Add warmup approach sets to the beginning of a workout
 */
export const addApproachSets = (sets: WorkoutSet[]): WorkoutSet[] => {
  // Find the first set with a valid weight (normal, failure, or dropset)
  const firstSetWithWeight = sets.find(set => {
    const hasValidSetType = ['normal', 'failure', 'dropset'].includes(
      set.setType
    );
    const hasWeight = set.weight && set.weight > 0;
    return hasValidSetType && hasWeight;
  });

  // Get the weight from the first set
  let baseWeight = 0;
  if (firstSetWithWeight && firstSetWithWeight.weight) {
    baseWeight = firstSetWithWeight.weight;
  }

  const approachSets: WorkoutSet[] = [
    {
      id: 'approach-1',
      setNumber: 1,
      setType: 'warmup' as SetType,
      repType: 'fixed',
      reps: 8,
      weight: baseWeight > 0 ? Math.round(baseWeight * 0.4) : 0,
      rpe: null,
      notes: 'Approach set 1 (40%)',
    },
    {
      id: 'approach-2',
      setNumber: 2,
      setType: 'warmup' as SetType,
      repType: 'fixed',
      reps: 6,
      weight: baseWeight > 0 ? Math.round(baseWeight * 0.6) : 0,
      rpe: null,
      notes: 'Approach set 2 (60%)',
    },
    {
      id: 'approach-3',
      setNumber: 3,
      setType: 'warmup' as SetType,
      repType: 'fixed',
      reps: 4,
      weight: baseWeight > 0 ? Math.round(baseWeight * 0.8) : 0,
      rpe: null,
      notes: 'Approach set 3 (80%)',
    },
  ];

  return [...approachSets, ...sets];
};
