import { describe, it, expect } from 'vitest';
import { generateSetsForProgression } from '../domain/calculations';
import type { WorkoutSet } from '@/features/routines/components/SetManagement';

describe('workoutCalculations', () => {
  describe('generateSetsForProgression', () => {
    it('generates linear progression sets correctly', () => {
      const sets = generateSetsForProgression('linear');

      expect(sets).toHaveLength(4);
      expect(sets[0]).toEqual({
        id: '1',
        setNumber: 1,
        setType: 'normal',
        repType: 'fixed',
        reps: 12,
        weight: 0,
        rpe: null,
        notes: '',
      });
    });

    it('generates dual progression sets correctly', () => {
      const sets = generateSetsForProgression('dual');

      expect(sets).toHaveLength(4);
      expect(sets[0]).toEqual({
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
      });
    });
  });
});
