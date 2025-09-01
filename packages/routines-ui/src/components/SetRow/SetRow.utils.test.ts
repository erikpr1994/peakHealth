import { describe, it, expect } from 'vitest';
import type {
  StrengthSet,
  BodyweightSet,
  MobilitySet,
  StrengthExercise,
} from '@peakhealth/routines-types';
import {
  hasDuration,
  hasRpe,
  hasWeight,
  isDualProgression,
  hasReps,
} from './SetRow.utils';

describe('SetRow.utils', () => {
  const strengthSet: StrengthSet = {
    _id: 's1',
    setNumber: 1,
    setType: 'working',
    repType: 'fixed',
    reps: 10,
    weight: 100,
    rpe: 8,
  };

  const bodyweightSet: BodyweightSet = {
    _id: 'b1',
    setNumber: 1,
    setType: 'working',
    repType: 'fixed',
    reps: 15,
    rpe: 7,
  };

  const mobilitySet: MobilitySet = {
    _id: 'm1',
    setNumber: 1,
    setType: 'working',
    repType: 'time',
    duration: 60,
  };

  it('hasWeight detects StrengthSet only', () => {
    expect(hasWeight(strengthSet)).toBe(true);
    expect(hasWeight(bodyweightSet as unknown as StrengthSet)).toBe(false);
    expect(hasWeight(mobilitySet as unknown as StrengthSet)).toBe(false);
  });

  it('hasRpe detects Strength and Bodyweight', () => {
    expect(hasRpe(strengthSet)).toBe(true);
    expect(hasRpe(bodyweightSet)).toBe(true);
    expect(hasRpe(mobilitySet as unknown as BodyweightSet)).toBe(false);
  });

  it('hasReps detects sets with reps property', () => {
    expect(hasReps(strengthSet)).toBe(true);
    expect(hasReps(bodyweightSet)).toBe(true);
    expect(hasReps(mobilitySet as unknown as StrengthSet)).toBe(false);
  });

  it('hasDuration detects sets with duration', () => {
    expect(hasDuration(strengthSet as unknown as MobilitySet)).toBe(false);
    expect(hasDuration(bodyweightSet as unknown as MobilitySet)).toBe(false);
    expect(hasDuration(mobilitySet)).toBe(true);
  });

  it('isDualProgression detects strength with dual-linear', () => {
    const strengthExercise: StrengthExercise = {
      _id: 'e1',
      exerciseId: 'eid',
      exerciseVariantId: 'vid',
      orderIndex: 0,
      type: 'strength',
      sets: [],
      progressionMethod: 'dual-linear',
    };
    expect(isDualProgression(strengthExercise)).toBe(true);
    expect(
      isDualProgression({ ...strengthExercise, progressionMethod: 'linear' })
    ).toBe(false);
    expect(isDualProgression(undefined)).toBe(false);
  });
});
