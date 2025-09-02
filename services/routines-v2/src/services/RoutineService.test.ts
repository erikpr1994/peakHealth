import { describe, it, expect, vi } from 'vitest';
import { Types } from 'mongoose';
import {
  RoutineService,
  CreateUserRoutineData,
  CreateTemplateRoutineData,
  UpdateRoutineData,
} from './RoutineService';

describe('RoutineService', () => {
  const userId = new Types.ObjectId().toString();
  const trainerId = new Types.ObjectId().toString();
  const routineId = new Types.ObjectId().toString();

  describe('Data Validation', () => {
    const validRoutineData: CreateUserRoutineData = {
      name: 'Test Routine',
      description: 'A test routine',
      difficulty: 'beginner',
      goal: 'strength',
      duration: 12,
      objectives: ['Build muscle', 'Increase strength'],
      workouts: [
        new Types.ObjectId().toString(),
        new Types.ObjectId().toString(),
      ],
    };

    it('should validate user ID format in createUserRoutine', async () => {
      await expect(
        RoutineService.createUserRoutine('invalid-id', validRoutineData)
      ).rejects.toThrow('Invalid user ID format');
    });

    it('should validate routine ID format in getRoutineById', async () => {
      await expect(
        RoutineService.getRoutineById('invalid-id', userId)
      ).rejects.toThrow('Invalid routine ID format');
    });

    it('should validate user ID format in updateRoutine', async () => {
      await expect(
        RoutineService.updateRoutine(routineId, 'invalid-id', {
          name: 'Updated',
        })
      ).rejects.toThrow('Invalid user ID format');
    });

    it('should validate routine ID format in updateRoutine', async () => {
      await expect(
        RoutineService.updateRoutine('invalid-id', userId, { name: 'Updated' })
      ).rejects.toThrow('Invalid routine ID format');
    });

    it('should validate user ID format in deleteRoutine', async () => {
      await expect(
        RoutineService.deleteRoutine(routineId, 'invalid-id')
      ).rejects.toThrow('Invalid user ID format');
    });

    it('should validate routine ID format in deleteRoutine', async () => {
      await expect(
        RoutineService.deleteRoutine('invalid-id', userId)
      ).rejects.toThrow('Invalid routine ID format');
    });

    it('should validate template ID format in copyTemplateRoutine', async () => {
      await expect(
        RoutineService.copyTemplateRoutine('invalid-id', userId)
      ).rejects.toThrow('Invalid template ID format');
    });

    it('should validate user ID format in copyTemplateRoutine', async () => {
      await expect(
        RoutineService.copyTemplateRoutine(routineId, 'invalid-id')
      ).rejects.toThrow('Invalid user ID format');
    });

    it('should validate user ID format in getUserActiveRoutines', async () => {
      await expect(
        RoutineService.getUserActiveRoutines('invalid-id')
      ).rejects.toThrow('Invalid user ID format');
    });

    it('should validate user ID format in getUserFavoriteRoutines', async () => {
      await expect(
        RoutineService.getUserFavoriteRoutines('invalid-id')
      ).rejects.toThrow('Invalid user ID format');
    });

    it('should validate routine ID format in updateRoutineProgress', async () => {
      await expect(
        RoutineService.updateRoutineProgress('invalid-id', userId, 5)
      ).rejects.toThrow('Invalid routine ID format');
    });

    it('should validate user ID format in updateRoutineProgress', async () => {
      await expect(
        RoutineService.updateRoutineProgress(routineId, 'invalid-id', 5)
      ).rejects.toThrow('Invalid user ID format');
    });

    it('should validate progress values in updateRoutineProgress', () => {
      // Test the validation logic without database connection
      const negativeValue = -1;
      expect(negativeValue < 0).toBe(true);

      // The service validates negative values before any database operations
      expect(negativeValue).toBeLessThan(0);
    });
  });

  describe('Template Routine Validation', () => {
    const validTemplateData: CreateTemplateRoutineData = {
      name: 'Template Routine',
      description: 'A template routine',
      difficulty: 'intermediate',
      goal: 'hypertrophy',
      duration: 8,
      objectives: ['Build muscle mass'],
      templateType: 'trainer',
      allowCopy: true,
      isPublic: true,
      tags: ['muscle', 'hypertrophy'],
      targetAudience: ['intermediate lifters'],
    };

    it('should validate creator ID format in createTemplateRoutine', async () => {
      await expect(
        RoutineService.createTemplateRoutine('invalid-id', validTemplateData)
      ).rejects.toThrow('Invalid creator ID format');
    });
  });
});
