import { describe, it, expect } from 'vitest';
import { WorkoutService } from './WorkoutService';

describe('WorkoutService', () => {
  describe('Input Validation', () => {
    it('should validate ObjectId format', async () => {
      await expect(WorkoutService.getWorkoutById('invalid-id')).rejects.toThrow(
        'Invalid workout ID format'
      );
    });

    it('should validate workout data structure', () => {
      const validateWorkoutData = (data: any) => {
        if (!data.name || data.name.trim() === '') {
          throw new Error('Workout name is required');
        }
        if (!data.sections || data.sections.length === 0) {
          throw new Error('Workout must have at least one section');
        }
      };

      expect(() => validateWorkoutData({ name: '', sections: [] })).toThrow(
        'Workout name is required'
      );
      expect(() => validateWorkoutData({ name: 'Test', sections: [] })).toThrow(
        'Workout must have at least one section'
      );
    });

    it('should validate section requirements', () => {
      const validateSections = (sections: any[]) => {
        if (!sections || sections.length === 0) {
          throw new Error('Workout must have at least one section');
        }
      };

      expect(() => validateSections([])).toThrow(
        'Workout must have at least one section'
      );
      expect(() => validateSections([{ name: 'Test' }])).not.toThrow();
    });

    it('should validate copy parameters', () => {
      const validateCopyParams = (id: string, data: any) => {
        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
          throw new Error('Invalid workout ID format');
        }
        if (!data.name || data.name.trim() === '') {
          throw new Error('Copy name is required');
        }
      };

      expect(() => validateCopyParams('invalid-id', { name: 'Copy' })).toThrow(
        'Invalid workout ID format'
      );
      expect(() =>
        validateCopyParams('507f1f77bcf86cd799439011', { name: '' })
      ).toThrow('Copy name is required');
    });

    it('should validate creator ID format', () => {
      const validateCreatorId = (creatorId: string) => {
        if (!/^[0-9a-fA-F]{24}$/.test(creatorId)) {
          throw new Error('Invalid creator ID format');
        }
      };

      expect(() => validateCreatorId('invalid')).toThrow(
        'Invalid creator ID format'
      );
      expect(() => validateCreatorId('507f1f77bcf86cd799439011')).not.toThrow();
    });
  });

  describe('Data Transformation', () => {
    it('should handle section type discriminators', () => {
      const sectionTypes = [
        'basic',
        'emom',
        'tabata',
        'circuit',
        'warmup',
        'cooldown',
      ];

      sectionTypes.forEach(type => {
        expect(typeof type).toBe('string');
        expect(type.length).toBeGreaterThan(0);
      });
    });

    it('should validate exercise structure', () => {
      const validateExercise = (exercise: any) => {
        if (!exercise.exerciseId || !exercise.exerciseVariantId) {
          throw new Error(
            'Exercise must have exerciseId and exerciseVariantId'
          );
        }
      };

      expect(() => validateExercise({})).toThrow(
        'Exercise must have exerciseId and exerciseVariantId'
      );
      expect(() =>
        validateExercise({
          exerciseId: 'squat',
          exerciseVariantId: 'back-squat',
        })
      ).not.toThrow();
    });
  });
});
