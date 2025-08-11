import { StrengthWorkout, RunningWorkout, ProgressionMethod } from '../types';

// Import the WorkoutSet type from the workout module
import { WorkoutSet, SetType } from '@/features/workout/SetManagement';

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

const parseRestTime = (timeString: string): number => {
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

export const generateSetsForProgression = (
  progressionMethod: ProgressionMethod
): WorkoutSet[] => {
  switch (progressionMethod) {
    case 'linear':
      return [
        {
          id: '1',
          setNumber: 1,
          setType: 'normal',
          repType: 'fixed',
          reps: 12,
          weight: 0,
          rpe: null,
          notes: '',
        },
        {
          id: '2',
          setNumber: 2,
          setType: 'normal',
          repType: 'fixed',
          reps: 10,
          weight: 0,
          rpe: null,
          notes: '',
        },
        {
          id: '3',
          setNumber: 3,
          setType: 'normal',
          repType: 'fixed',
          reps: 8,
          weight: 0,
          rpe: null,
          notes: '',
        },
        {
          id: '4',
          setNumber: 4,
          setType: 'normal',
          repType: 'fixed',
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
          setType: 'normal',
          repType: 'range',
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
          setType: 'normal',
          repType: 'range',
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
          setType: 'normal',
          repType: 'range',
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
          setType: 'normal',
          repType: 'range',
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
          setType: 'normal',
          repType: 'fixed',
          reps: 6,
          weight: 0,
          rpe: null,
          notes: '',
        },
        {
          id: '2',
          setNumber: 2,
          setType: 'normal',
          repType: 'fixed',
          reps: 8,
          weight: 0,
          rpe: null,
          notes: '',
        },
        {
          id: '3',
          setNumber: 3,
          setType: 'normal',
          repType: 'fixed',
          reps: 10,
          weight: 0,
          rpe: null,
          notes: '',
        },
        {
          id: '4',
          setNumber: 4,
          setType: 'normal',
          repType: 'fixed',
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
          setType: 'normal',
          repType: 'fixed',
          reps: 10,
          weight: 0,
          rpe: null,
          notes: '',
        },
        {
          id: '2',
          setNumber: 2,
          setType: 'normal',
          repType: 'fixed',
          reps: 10,
          weight: 0,
          rpe: null,
          notes: '',
        },
        {
          id: '3',
          setNumber: 3,
          setType: 'normal',
          repType: 'fixed',
          reps: 10,
          weight: 0,
          rpe: null,
          notes: '',
        },
      ];
  }
};

export const addApproachSets = (sets: WorkoutSet[]): WorkoutSet[] => {
  const approachSets: WorkoutSet[] = [
    {
      id: 'approach-1',
      setNumber: 1,
      setType: 'warmup' as SetType,
      repType: 'fixed',
      reps: 8,
      weight: 0,
      rpe: null,
      notes: 'Approach set 1',
    },
    {
      id: 'approach-2',
      setNumber: 2,
      setType: 'warmup' as SetType,
      repType: 'fixed',
      reps: 6,
      weight: 0,
      rpe: null,
      notes: 'Approach set 2',
    },
    {
      id: 'approach-3',
      setNumber: 3,
      setType: 'warmup' as SetType,
      repType: 'fixed',
      reps: 4,
      weight: 0,
      rpe: null,
      notes: 'Approach set 3',
    },
  ];

  return [...approachSets, ...sets];
};
