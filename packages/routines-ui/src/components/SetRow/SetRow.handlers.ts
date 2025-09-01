import type { WorkoutSet } from '@peakhealth/routines-types';
import { hasDuration, hasReps, hasRpe, hasWeight } from './SetRow.utils';

export type UpdateSetFn = (updates: Partial<WorkoutSet>) => void;

export function buildHandleSetTypeChange(updateSet: UpdateSetFn) {
  return (setType: WorkoutSet['setType']) => updateSet({ setType });
}

export function buildHandleRepsChange(set: WorkoutSet, updateSet: UpdateSetFn) {
  return (reps: number) => {
    if (hasReps(set)) updateSet({ reps });
  };
}

export function buildHandleRepsMinChange(
  set: WorkoutSet,
  updateSet: UpdateSetFn
) {
  return (repsMin: number) => {
    if ('repsMin' in set) updateSet({ repsMin });
  };
}

export function buildHandleRepsMaxChange(
  set: WorkoutSet,
  updateSet: UpdateSetFn
) {
  return (repsMax: number) => {
    if ('repsMax' in set) updateSet({ repsMax });
  };
}

export function buildHandleWeightChange(
  set: WorkoutSet,
  updateSet: UpdateSetFn
) {
  return (weight: number) => {
    if (hasWeight(set)) updateSet({ weight });
  };
}

export function buildHandleRpeChange(set: WorkoutSet, updateSet: UpdateSetFn) {
  return (rpe: number) => {
    if (hasRpe(set)) updateSet({ rpe });
  };
}

export function buildHandleDurationChange(
  set: WorkoutSet,
  updateSet: UpdateSetFn
) {
  return (duration: number) => {
    if (hasDuration(set)) updateSet({ duration });
  };
}
