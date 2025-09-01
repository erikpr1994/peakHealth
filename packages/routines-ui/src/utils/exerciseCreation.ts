import type { ExerciseLibraryExercise } from '../components/ExerciseLibraryModal/ExerciseLibraryModal.types';
import type { ProgressionMethod } from '@peakhealth/routines-types';

export interface ExerciseConfig {
  restBetweenSets: string;
  notes: string;
  progressionMethod?: ProgressionMethod;
}

export const EXERCISE_DEFAULTS = {
  warmup: {
    restBetweenSets: '60s',
    notes: '',
  },
  mainStrength: {
    restBetweenSets: '120s',
    notes: '',
    progressionMethod: 'linear' as const,
  },
} as const;

export function createExercise(
  exercise: ExerciseLibraryExercise,
  config: ExerciseConfig,
  orderIndex: number
) {
  return {
    _id: globalThis.crypto.randomUUID(),
    exerciseId: exercise.id,
    exerciseVariantId: exercise.id, // Using the same ID for now
    orderIndex,
    type: 'strength' as const,
    sets: [],
    ...config,
  };
}
