import type { StrengthSet } from '@peakhealth/routines-types';

export interface InversePyramidConfig {
  numberOfSets: number;
  startWeight: number;
  endWeight: number;
  startReps: number;
  endReps: number;
}

/**
 * Generates inverse pyramid sets based on the provided configuration.
 * In an inverse pyramid, weight decreases while reps increase.
 */
export function generateInversePyramidSets(
  config: InversePyramidConfig
): Omit<
  StrengthSet,
  | '_id'
  | 'setNumber'
  | 'setType'
  | 'repType'
  | 'notes'
  | 'restAfter'
  | 'unilateralSide'
>[] {
  const { numberOfSets, startWeight, endWeight, startReps, endReps } = config;

  if (numberOfSets < 2) {
    throw new Error('Inverse pyramid requires at least 2 sets');
  }

  if (startWeight <= endWeight) {
    throw new Error(
      'Start weight must be greater than end weight for inverse pyramid'
    );
  }

  if (startReps >= endReps) {
    throw new Error(
      'Start reps must be less than end reps for inverse pyramid'
    );
  }

  const sets: Omit<
    StrengthSet,
    | '_id'
    | 'setNumber'
    | 'setType'
    | 'repType'
    | 'notes'
    | 'restAfter'
    | 'unilateralSide'
  >[] = [];

  for (let i = 0; i < numberOfSets; i++) {
    // Calculate weight: starts high, decreases to low
    const weightProgress = i / (numberOfSets - 1);
    const weight = startWeight - weightProgress * (startWeight - endWeight);

    // Calculate reps: starts low, increases to high
    const repsProgress = i / (numberOfSets - 1);
    const reps = startReps + repsProgress * (endReps - startReps);

    sets.push({
      weight: Math.round(weight),
      reps: Math.round(reps),
    });
  }

  return sets;
}
