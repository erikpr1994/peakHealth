import { describe, it, expect } from 'vitest';
import { generateInversePyramidSets } from './progressionGenerators';

describe('generateInversePyramidSets', () => {
  it('should generate inverse pyramid sets with decreasing weight and increasing reps', () => {
    const config = {
      numberOfSets: 4,
      startWeight: 100,
      endWeight: 70,
      startReps: 5,
      endReps: 12,
    };

    const sets = generateInversePyramidSets(config);

    expect(sets).toHaveLength(4);

    // First set: highest weight, lowest reps
    expect(sets[0]).toEqual({ weight: 100, reps: 5 });

    // Last set: lowest weight, highest reps
    expect(sets[3]).toEqual({ weight: 70, reps: 12 });

    // Weight should decrease progressively
    expect(sets[0].weight).toBeGreaterThan(sets[1].weight!);
    expect(sets[1].weight).toBeGreaterThan(sets[2].weight!);
    expect(sets[2].weight).toBeGreaterThan(sets[3].weight!);

    // Reps should increase progressively
    expect(sets[0].reps).toBeLessThan(sets[1].reps!);
    expect(sets[1].reps).toBeLessThan(sets[2].reps!);
    expect(sets[2].reps).toBeLessThan(sets[3].reps!);
  });

  it('should round weight and reps to nearest integers', () => {
    const config = {
      numberOfSets: 3,
      startWeight: 100,
      endWeight: 80,
      startReps: 5,
      endReps: 10,
    };

    const sets = generateInversePyramidSets(config);

    sets.forEach(set => {
      expect(Number.isInteger(set.weight)).toBe(true);
      expect(Number.isInteger(set.reps)).toBe(true);
    });
  });

  it('should throw error for less than 2 sets', () => {
    const config = {
      numberOfSets: 1,
      startWeight: 100,
      endWeight: 80,
      startReps: 5,
      endReps: 10,
    };

    expect(() => generateInversePyramidSets(config)).toThrow(
      'Inverse pyramid requires at least 2 sets'
    );
  });

  it('should throw error when start weight is not greater than end weight', () => {
    const config = {
      numberOfSets: 3,
      startWeight: 80,
      endWeight: 100,
      startReps: 5,
      endReps: 10,
    };

    expect(() => generateInversePyramidSets(config)).toThrow(
      'Start weight must be greater than end weight for inverse pyramid'
    );
  });

  it('should throw error when start reps is not less than end reps', () => {
    const config = {
      numberOfSets: 3,
      startWeight: 100,
      endWeight: 80,
      startReps: 10,
      endReps: 5,
    };

    expect(() => generateInversePyramidSets(config)).toThrow(
      'Start reps must be less than end reps for inverse pyramid'
    );
  });

  it('should handle edge case with exactly 2 sets', () => {
    const config = {
      numberOfSets: 2,
      startWeight: 100,
      endWeight: 80,
      startReps: 5,
      endReps: 10,
    };

    const sets = generateInversePyramidSets(config);

    expect(sets).toHaveLength(2);
    expect(sets[0]).toEqual({ weight: 100, reps: 5 });
    expect(sets[1]).toEqual({ weight: 80, reps: 10 });
  });
});
