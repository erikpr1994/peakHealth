import type { StrengthSet } from '@peakhealth/routines-types';

export interface InversePyramidConfig {
  numberOfSets: number;
  startWeight: number;
  endWeight: number;
  startReps: number;
  endReps: number;
}

export interface WaveLoadingConfig {
  numberOfWaves: number;
  setsPerWave: number;
  baseWeight: number;
  weightIncrement: number;
  baseReps: number;
  repsDecrement: number;
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

/**
 * Generates wave loading sets based on the provided configuration.
 * Wave loading involves multiple waves where each wave increases in weight
 * and decreases in reps, with the final wave being the heaviest.
 */
export function generateWaveLoadingSets(
  config: WaveLoadingConfig
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
  const {
    numberOfWaves,
    setsPerWave,
    baseWeight,
    weightIncrement,
    baseReps,
    repsDecrement,
  } = config;

  if (numberOfWaves < 1) {
    throw new Error('Wave loading requires at least 1 wave');
  }

  if (setsPerWave < 1) {
    throw new Error('Each wave must have at least 1 set');
  }

  if (weightIncrement < 0) {
    throw new Error('Weight increment must be non-negative');
  }

  if (repsDecrement < 0) {
    throw new Error('Reps decrement must be non-negative');
  }

  // Validate that reps won't become negative across all waves
  const maxRepsDecrement = (numberOfWaves - 1) * repsDecrement;
  if (baseReps <= maxRepsDecrement) {
    throw new Error(
      `Base reps (${baseReps}) must be greater than total reps decrement (${maxRepsDecrement}) to ensure all sets have positive rep counts`
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

  for (let wave = 0; wave < numberOfWaves; wave++) {
    const waveWeight = baseWeight + wave * weightIncrement;
    const waveReps = baseReps - wave * repsDecrement;

    for (let set = 0; set < setsPerWave; set++) {
      sets.push({
        weight: Math.round(waveWeight),
        reps: Math.round(waveReps),
      });
    }
  }

  return sets;
}
