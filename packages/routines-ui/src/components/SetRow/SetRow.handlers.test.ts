import { describe, it, expect } from 'vitest';
import type { StrengthSet, WorkoutSet } from '@peakhealth/routines-types';
import {
  buildHandleDurationChange,
  buildHandleRepsChange,
  buildHandleRepsMaxChange,
  buildHandleRepsMinChange,
  buildHandleRpeChange,
  buildHandleSetTypeChange,
  buildHandleWeightChange,
} from './SetRow.handlers';

function createStrengthSet(): StrengthSet {
  return {
    _id: 's1',
    setNumber: 1,
    setType: 'working',
    repType: 'fixed',
    reps: 8,
    weight: 100,
    rpe: 8,
  };
}

describe('SetRow.handlers', () => {
  it('buildHandleSetTypeChange updates setType', () => {
    const updates: Partial<WorkoutSet>[] = [];
    const updateSet = (u: Partial<WorkoutSet>) => updates.push(u);
    const fn = buildHandleSetTypeChange(updateSet);
    fn('drop');
    expect(updates[0]).toEqual({ setType: 'drop' });
  });

  it('buildHandleRepsChange updates reps if available', () => {
    const set = createStrengthSet();
    const updates: Partial<WorkoutSet>[] = [];
    const fn = buildHandleRepsChange(set, u => updates.push(u));
    fn(12);
    expect(updates[0]).toEqual({ reps: 12 });
  });

  it('buildHandleRepsMinChange updates repsMin if present', () => {
    const set: StrengthSet = { ...createStrengthSet(), repsMin: 5 };
    const updates: Partial<WorkoutSet>[] = [];
    const fn = buildHandleRepsMinChange(set, u => updates.push(u));
    fn(6);
    expect(updates[0]).toEqual({ repsMin: 6 });
  });

  it('buildHandleRepsMaxChange updates repsMax if present', () => {
    const set: StrengthSet = { ...createStrengthSet(), repsMax: 10 };
    const updates: Partial<WorkoutSet>[] = [];
    const fn = buildHandleRepsMaxChange(set, u => updates.push(u));
    fn(11);
    expect(updates[0]).toEqual({ repsMax: 11 });
  });

  it('buildHandleWeightChange updates weight if available', () => {
    const set = createStrengthSet();
    const updates: Partial<WorkoutSet>[] = [];
    const fn = buildHandleWeightChange(set, u => updates.push(u));
    fn(135);
    expect(updates[0]).toEqual({ weight: 135 });
  });

  it('buildHandleRpeChange updates rpe if available', () => {
    const set = createStrengthSet();
    const updates: Partial<WorkoutSet>[] = [];
    const fn = buildHandleRpeChange(set, u => updates.push(u));
    fn(9);
    expect(updates[0]).toEqual({ rpe: 9 });
  });

  it('buildHandleDurationChange updates duration if available', () => {
    const set: StrengthSet = { ...createStrengthSet(), duration: 30 };
    const updates: Partial<WorkoutSet>[] = [];
    const fn = buildHandleDurationChange(set, u => updates.push(u));
    fn(45);
    expect(updates[0]).toEqual({ duration: 45 });
  });
});
