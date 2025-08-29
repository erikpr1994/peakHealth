import { describe, it, expect } from 'vitest';
import mongoose from 'mongoose';
import { UserCreatedRoutineModel } from './user-created-routine';

describe('UserCreatedRoutine Model', () => {
  it('should create a valid user created routine', async () => {
    const routineData = {
      userId: new mongoose.Types.ObjectId().toString(),
      name: 'My First Routine',
      description: 'A beginner-friendly routine',
      category: 'strength',
      difficulty: 'intermediate',
      duration: 30,
      frequency: 3,
      tags: ['strength', 'beginner'],
      isPublic: false,
      workouts: [
        {
          name: 'Day 1: Upper Body',
          orderIndex: 0,
          type: 'strength',
          sections: [
            {
              name: 'Warm-up',
              orderIndex: 0,
              type: 'warmup',
              duration: 10,
              intensity: 'light',
              targetMuscleGroups: ['chest', 'shoulders', 'arms'],
              exercises: [
                {
                  exerciseId: new mongoose.Types.ObjectId().toString(),
                  exerciseVariantId: new mongoose.Types.ObjectId().toString(),
                  orderIndex: 0,
                  type: 'bodyweight',
                  sets: [
                    {
                      orderIndex: 0,
                      reps: 10,
                    },
                  ],
                },
              ],
            },
            {
              name: 'Main Workout',
              orderIndex: 1,
              type: 'basic',
              exercises: [
                {
                  exerciseId: new mongoose.Types.ObjectId().toString(),
                  exerciseVariantId: new mongoose.Types.ObjectId().toString(),
                  orderIndex: 0,
                  type: 'strength',
                  progressionMethod: 'linear',
                  sets: [
                    {
                      orderIndex: 0,
                      reps: 8,
                      weight: 100,
                      rpe: 7,
                    },
                    {
                      orderIndex: 1,
                      reps: 8,
                      weight: 100,
                      rpe: 8,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const routine = new UserCreatedRoutineModel(routineData);

    // Test that the model validates the data structure
    expect(routine.userId).toBe(routineData.userId);
    expect(routine.name).toBe(routineData.name);
    expect(routine.category).toBe(routineData.category);
    expect(routine.difficulty).toBe(routineData.difficulty);
    expect(routine.workouts).toHaveLength(1);
    expect(routine.workouts[0].sections).toHaveLength(2);
    expect(routine.workouts[0].sections[0].type).toBe('warmup');
    expect(routine.workouts[0].sections[1].type).toBe('basic');
    expect(routine.workouts[0].sections[0].exercises).toHaveLength(1);
    expect(routine.workouts[0].sections[1].exercises).toHaveLength(1);
  });

  it('should create a routine with circuit sections', async () => {
    const routineData = {
      userId: new mongoose.Types.ObjectId().toString(),
      name: 'Circuit Training',
      description: 'A circuit-based routine',
      category: 'strength',
      difficulty: 'intermediate',
      duration: 45,
      frequency: 3,
      tags: ['circuit', 'strength'],
      isPublic: false,
      workouts: [
        {
          name: 'Full Body Circuit',
          orderIndex: 0,
          type: 'strength',
          sections: [
            {
              name: 'Circuit 1',
              orderIndex: 0,
              type: 'circuit',
              rounds: 3,
              restBetweenRounds: '60s',
              exercises: [
                {
                  exerciseId: new mongoose.Types.ObjectId().toString(),
                  exerciseVariantId: new mongoose.Types.ObjectId().toString(),
                  orderIndex: 0,
                  type: 'strength',
                  sets: [
                    {
                      orderIndex: 0,
                      reps: 12,
                      weight: 50,
                    },
                  ],
                },
                {
                  exerciseId: new mongoose.Types.ObjectId().toString(),
                  exerciseVariantId: new mongoose.Types.ObjectId().toString(),
                  orderIndex: 1,
                  type: 'bodyweight',
                  sets: [
                    {
                      orderIndex: 0,
                      reps: 12,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const routine = new UserCreatedRoutineModel(routineData);

    // Test that the model validates the data structure
    expect(routine.workouts[0].sections[0].type).toBe('circuit');
    expect(routine.workouts[0].sections[0].exercises).toHaveLength(2);
  });

  it('should create a routine with a running workout', async () => {
    const routineData = {
      userId: new mongoose.Types.ObjectId().toString(),
      name: 'Running Program',
      description: 'A running-focused routine',
      category: 'running',
      difficulty: 'intermediate',
      duration: 60,
      frequency: 3,
      tags: ['running', 'cardio'],
      isPublic: false,
      workouts: [
        {
          name: 'Interval Training',
          orderIndex: 0,
          type: 'running',
          sections: [
            {
              name: 'Warm-up Jog',
              orderIndex: 0,
              type: 'warmup',
              duration: 10,
              intensity: 'light',
              targetMuscleGroups: ['legs'],
              exercises: [],
            },
            {
              name: 'Speed Intervals',
              orderIndex: 1,
              type: 'intervals',
              rounds: 5,
              workDistance: 400,
              restDuration: '90s',
              intensity: 'anaerobic',
              exercises: [],
            },
            {
              name: 'Cool Down',
              orderIndex: 2,
              type: 'cooldown',
              duration: 10,
              stretchingFocus: ['calves', 'hamstrings', 'quads'],
              exercises: [],
            },
          ],
        },
      ],
    };

    const routine = new UserCreatedRoutineModel(routineData);

    // Test that the model validates the data structure
    expect(routine.workouts[0].sections).toHaveLength(3);
    expect(routine.workouts[0].sections[1].type).toBe('intervals');
  });

  it('should validate required fields', () => {
    // Test that missing required fields cause validation errors
    const invalidRoutine = new UserCreatedRoutineModel({});

    const validationError = invalidRoutine.validateSync();
    expect(validationError).toBeDefined();
    expect(validationError?.errors.userId).toBeDefined();
    expect(validationError?.errors.name).toBeDefined();
    expect(validationError?.errors.category).toBeDefined();
    expect(validationError?.errors.difficulty).toBeDefined();
  });

  it('should validate enum fields', () => {
    const routineWithInvalidEnum = new UserCreatedRoutineModel({
      userId: new mongoose.Types.ObjectId().toString(),
      name: 'Invalid Routine',
      category: 'invalid-category', // Invalid enum value
      difficulty: 'super-hard', // Invalid enum value
      duration: 30,
      frequency: 3,
    });

    const validationError = routineWithInvalidEnum.validateSync();
    expect(validationError).toBeDefined();
    expect(validationError?.errors.category).toBeDefined();
    expect(validationError?.errors.difficulty).toBeDefined();
  });
});
