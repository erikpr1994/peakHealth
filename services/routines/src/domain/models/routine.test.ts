import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import { UserCreatedRoutineModel } from './routine';

describe('UserCreatedRoutine Model', () => {
  // Connect to a test database before running tests
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test-routines');
  });

  // Disconnect after tests are complete
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a valid user created routine', async () => {
    const routineData = {
      _id: new mongoose.Types.ObjectId().toString(),
      name: 'My First Routine',
      difficulty: 'intermediate',
      goal: 'strength',
      duration: 4,
      objectives: ['Build strength', 'Improve form'],
      workouts: [
        {
          _id: new mongoose.Types.ObjectId().toString(),
          name: 'Day 1: Upper Body',
          orderIndex: 0,
          type: 'strength',
          sections: [
            {
              _id: new mongoose.Types.ObjectId().toString(),
              name: 'Warm-up',
              orderIndex: 0,
              type: 'strength',
              exercises: [
                {
                  exerciseId: new mongoose.Types.ObjectId().toString(),
                  sets: [
                    {
                      setType: 'warmup',
                      repType: 'fixed',
                      reps: 10,
                      weight: null,
                      restSeconds: 60,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      schemaVersion: '1.0',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: new mongoose.Types.ObjectId().toString(),
      createdBy: new mongoose.Types.ObjectId().toString(),
      routineType: 'user-created',
      isActive: true,
      isFavorite: false,
      completedWorkouts: 0,
      totalWorkouts: 1,
    };

    const routine = new UserCreatedRoutineModel(routineData);
    const savedRoutine = await routine.save();

    expect(savedRoutine._id).toBeDefined();
    expect(savedRoutine.name).toBe(routineData.name);
    expect(savedRoutine.difficulty).toBe(routineData.difficulty);
    expect(savedRoutine.goal).toBe(routineData.goal);
    expect(savedRoutine.workouts.length).toBe(1);
    expect(savedRoutine.workouts[0].sections.length).toBe(1);
    expect(savedRoutine.routineType).toBe('user-created');
  });

  it('should validate required fields', async () => {
    const invalidRoutine = new UserCreatedRoutineModel({
      // Missing required fields
    });

    await expect(invalidRoutine.save()).rejects.toThrow();
  });

  it('should validate enum fields', async () => {
    const routineWithInvalidEnum = new UserCreatedRoutineModel({
      _id: new mongoose.Types.ObjectId().toString(),
      name: 'Invalid Routine',
      difficulty: 'super-hard', // Invalid enum value
      goal: 'strength',
      duration: 4,
      objectives: [],
      workouts: [],
      schemaVersion: '1.0',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: new mongoose.Types.ObjectId().toString(),
      createdBy: new mongoose.Types.ObjectId().toString(),
      routineType: 'user-created',
      isActive: true,
      isFavorite: false,
      completedWorkouts: 0,
      totalWorkouts: 0,
    });

    await expect(routineWithInvalidEnum.save()).rejects.toThrow();
  });
});
