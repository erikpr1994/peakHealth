import { describe, it, expect } from 'vitest';
import {
  generateInversePyramidSets,
  generateWaveLoadingSets,
  type InversePyramidConfig,
  type WaveLoadingConfig,
} from './progressionGenerators';

describe('Progression Generators', () => {
  describe('generateInversePyramidSets', () => {
    const validConfig: InversePyramidConfig = {
      numberOfSets: 4,
      startWeight: 100,
      endWeight: 70,
      startReps: 5,
      endReps: 12,
    };

    it('generates correct number of sets', () => {
      const sets = generateInversePyramidSets(validConfig);
      expect(sets).toHaveLength(4);
    });

    it('generates sets with decreasing weight and increasing reps', () => {
      const sets = generateInversePyramidSets(validConfig);

      // Weight should decrease progressively
      expect(sets[0].weight).toBeGreaterThan(sets[1].weight || 0);
      expect(sets[1].weight).toBeGreaterThan(sets[2].weight || 0);
      expect(sets[2].weight).toBeGreaterThan(sets[3].weight || 0);

      // Reps should increase progressively
      expect(sets[0].reps).toBeLessThan(sets[1].reps || 0);
      expect(sets[1].reps).toBeLessThan(sets[2].reps || 0);
      expect(sets[2].reps).toBeLessThan(sets[3].reps || 0);
    });

    it('rounds weight and reps to integers', () => {
      const sets = generateInversePyramidSets(validConfig);
      sets.forEach(set => {
        expect(Number.isInteger(set.weight)).toBe(true);
        expect(Number.isInteger(set.reps)).toBe(true);
      });
    });

    it('throws error for invalid number of sets', () => {
      expect(() =>
        generateInversePyramidSets({ ...validConfig, numberOfSets: 1 })
      ).toThrow('Inverse pyramid requires at least 2 sets');
    });

    it('throws error when start weight is not greater than end weight', () => {
      expect(() =>
        generateInversePyramidSets({
          ...validConfig,
          startWeight: 70,
          endWeight: 100,
        })
      ).toThrow(
        'Start weight must be greater than end weight for inverse pyramid'
      );
    });

    it('throws error when start reps is not less than end reps', () => {
      expect(() =>
        generateInversePyramidSets({
          ...validConfig,
          startReps: 12,
          endReps: 5,
        })
      ).toThrow('Start reps must be less than end reps for inverse pyramid');
    });
  });

  describe('generateWaveLoadingSets', () => {
    const validConfig: WaveLoadingConfig = {
      numberOfWaves: 3,
      setsPerWave: 2,
      baseWeight: 100,
      weightIncrement: 10,
      baseReps: 8,
      repsDecrement: 1,
    };

    it('generates correct number of sets', () => {
      const sets = generateWaveLoadingSets(validConfig);
      expect(sets).toHaveLength(6); // 3 waves × 2 sets per wave
    });

    it('generates sets with increasing weight and decreasing reps per wave', () => {
      const sets = generateWaveLoadingSets(validConfig);

      // First wave: 100 lbs × 8 reps (2 sets)
      expect(sets[0].weight).toBe(100);
      expect(sets[0].reps).toBe(8);
      expect(sets[1].weight).toBe(100);
      expect(sets[1].reps).toBe(8);

      // Second wave: 110 lbs × 7 reps (2 sets)
      expect(sets[2].weight).toBe(110);
      expect(sets[2].reps).toBe(7);
      expect(sets[3].weight).toBe(110);
      expect(sets[3].reps).toBe(7);

      // Third wave: 120 lbs × 6 reps (2 sets)
      expect(sets[4].weight).toBe(120);
      expect(sets[4].reps).toBe(6);
      expect(sets[5].weight).toBe(120);
      expect(sets[5].reps).toBe(6);
    });

    it('rounds weight and reps to integers', () => {
      const sets = generateWaveLoadingSets(validConfig);
      sets.forEach(set => {
        expect(Number.isInteger(set.weight)).toBe(true);
        expect(Number.isInteger(set.reps)).toBe(true);
      });
    });

    it('throws error for invalid number of waves', () => {
      expect(() =>
        generateWaveLoadingSets({ ...validConfig, numberOfWaves: 0 })
      ).toThrow('Wave loading requires at least 1 wave');
    });

    it('throws error for invalid sets per wave', () => {
      expect(() =>
        generateWaveLoadingSets({ ...validConfig, setsPerWave: 0 })
      ).toThrow('Each wave must have at least 1 set');
    });

    it('throws error for negative weight increment', () => {
      expect(() =>
        generateWaveLoadingSets({ ...validConfig, weightIncrement: -5 })
      ).toThrow('Weight increment must be non-negative');
    });

    it('throws error for negative reps decrement', () => {
      expect(() =>
        generateWaveLoadingSets({ ...validConfig, repsDecrement: -1 })
      ).toThrow('Reps decrement must be non-negative');
    });

    it('throws error when reps would become negative', () => {
      expect(() =>
        generateWaveLoadingSets({
          ...validConfig,
          numberOfWaves: 5,
          baseReps: 3,
          repsDecrement: 1,
        })
      ).toThrow(
        'Base reps (3) must be greater than total reps decrement (4) to ensure all sets have positive rep counts'
      );
    });
  });
});
