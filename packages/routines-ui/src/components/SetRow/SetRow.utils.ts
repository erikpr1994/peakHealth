import type {
  WorkoutSet,
  StrengthSet,
  BodyweightSet,
  MobilitySet,
  Exercise,
} from '@peakhealth/routines-types';

export function isDualProgression(exercise: Exercise | undefined): boolean {
  if (!exercise) return false;
  if (exercise.type !== 'strength') return false;
  return (
    'progressionMethod' in exercise &&
    exercise.progressionMethod === 'dual-linear'
  );
}

export function hasWeight(set: WorkoutSet): set is StrengthSet {
  return 'weight' in set;
}

export function hasRpe(set: WorkoutSet): set is StrengthSet | BodyweightSet {
  return 'rpe' in set;
}

export function hasReps(
  set: WorkoutSet
): set is StrengthSet | BodyweightSet | MobilitySet {
  return 'reps' in set;
}

export function hasDuration(
  set: WorkoutSet
): set is StrengthSet | BodyweightSet | MobilitySet {
  return 'duration' in set;
}
