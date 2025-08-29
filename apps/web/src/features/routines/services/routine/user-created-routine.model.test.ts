import mongoose from 'mongoose';
import { UserCreatedRoutineModel } from './user-created-routine.model';
import type { UserCreatedRoutine } from '@peakhealth/routines-types';

// Mock data for testing
const mockWorkout = {
  _id: 'workout123',
  name: 'Push Day',
  orderIndex: 0,
  type: 'strength' as const,
  sections: [
    {
      _id: 'section123',
      name: 'Warm-up',
      orderIndex: 0,
      type: 'strength' as const,
      exercises: [],
    },
  ],
};

const mockRoutine: Partial<UserCreatedRoutine> = {
  _id: 'routine123',
  name: 'My Strength Routine',
  description: 'A custom strength routine',
  difficulty: 'intermediate' as const,
  goal: 'strength' as const,
  duration: 8, // 8 weeks
  objectives: ['Build upper body strength', 'Improve posture'],
  workouts: [mockWorkout],
  schemaVersion: '1.0',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  userId: 'user123',
  createdBy: 'user123',
  routineType: 'user-created' as const,
  isActive: true,
  isFavorite: false,
  completedWorkouts: 0,
  totalWorkouts: 1,
};

describe('UserCreatedRoutineModel', () => {
  beforeAll(async (): Promise<void> => {
    // Connect to a test database before running tests
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect('mongodb://localhost:27017/test_db');
    }
  });

  afterAll(async (): Promise<void> => {
    // Disconnect from the test database after tests
    await mongoose.connection.close();
  });

  beforeEach(async (): Promise<void> => {
    // Clear the collection before each test
    await UserCreatedRoutineModel.deleteMany({});
  });

  it('should create a new user-created routine', async (): Promise<void> => {
    const routine = new UserCreatedRoutineModel(mockRoutine);
    const savedRoutine = await routine.save();

    expect(savedRoutine._id).toBeDefined();
    expect(savedRoutine.name).toBe(mockRoutine.name);
    expect(savedRoutine.difficulty).toBe(mockRoutine.difficulty);
    expect(savedRoutine.routineType).toBe('user-created');
    expect(savedRoutine.workouts.length).toBe(1);
    expect(savedRoutine.totalWorkouts).toBe(1);
  });

  it('should automatically set totalWorkouts based on workouts array', async (): Promise<void> => {
    const routine = new UserCreatedRoutineModel({
      ...mockRoutine,
      workouts: [
        mockWorkout,
        { ...mockWorkout, _id: 'workout456', name: 'Pull Day' },
      ],
    });

    const savedRoutine = await routine.save();
    expect(savedRoutine.totalWorkouts).toBe(2);
  });

  it('should validate required fields', async (): Promise<void> => {
    const invalidRoutine = new UserCreatedRoutineModel({
      // Missing required fields
      name: 'Invalid Routine',
    });

    await expect(invalidRoutine.save()).rejects.toThrow();
  });

  it('should enforce enum values for difficulty and goal', async (): Promise<void> => {
    const invalidRoutine = new UserCreatedRoutineModel({
      ...mockRoutine,
      difficulty: 'expert', // Invalid value
      goal: 'get_huge', // Invalid value
    });

    await expect(invalidRoutine.save()).rejects.toThrow();
  });

  it('should enforce duration limits', async (): Promise<void> => {
    const invalidRoutine = new UserCreatedRoutineModel({
      ...mockRoutine,
      duration: 60, // Over the max of 52 weeks
    });

    await expect(invalidRoutine.save()).rejects.toThrow();
  });
});
