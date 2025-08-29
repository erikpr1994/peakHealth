import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import { UserCreatedRoutineModel } from './user-created-routine';

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
          _id: new mongoose.Types.ObjectId().toString(),
          name: 'Day 1: Upper Body',
          orderIndex: 0,
          type: 'strength',
          sections: [
            {
              _id: new mongoose.Types.ObjectId().toString(),
              name: 'Warm-up',
              orderIndex: 0,
              type: 'warmup',
              duration: 10,
              intensity: 'light',
              targetMuscleGroups: ['chest', 'shoulders', 'arms'],
              exercises: [
                {
                  _id: new mongoose.Types.ObjectId().toString(),
                  exerciseId: new mongoose.Types.ObjectId().toString(),
                  exerciseVariantId: new mongoose.Types.ObjectId().toString(),
                  orderIndex: 0,
                  type: 'bodyweight',
                  sets: [
                    {
                      _id: new mongoose.Types.ObjectId().toString(),
                      orderIndex: 0,
                      reps: 10
                    }
                  ]
                }
              ]
            },
            {
              _id: new mongoose.Types.ObjectId().toString(),
              name: 'Main Workout',
              orderIndex: 1,
              type: 'basic',
              exercises: [
                {
                  _id: new mongoose.Types.ObjectId().toString(),
                  exerciseId: new mongoose.Types.ObjectId().toString(),
                  exerciseVariantId: new mongoose.Types.ObjectId().toString(),
                  orderIndex: 0,
                  type: 'strength',
                  progressionMethod: 'linear',
                  sets: [
                    {
                      _id: new mongoose.Types.ObjectId().toString(),
                      orderIndex: 0,
                      reps: 8,
                      weight: 100,
                      rpe: 7
                    },
                    {
                      _id: new mongoose.Types.ObjectId().toString(),
                      orderIndex: 1,
                      reps: 8,
                      weight: 100,
                      rpe: 8
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    const routine = new UserCreatedRoutineModel(routineData);
    const savedRoutine = await routine.save();
    
    expect(savedRoutine._id).toBeDefined();
    expect(savedRoutine.name).toBe(routineData.name);
    expect(savedRoutine.difficulty).toBe(routineData.difficulty);
    expect(savedRoutine.category).toBe(routineData.category);
    expect(savedRoutine.workouts.length).toBe(1);
    expect(savedRoutine.workouts[0].sections.length).toBe(2);
    expect(savedRoutine.workouts[0].sections[0].type).toBe('warmup');
    expect(savedRoutine.workouts[0].sections[1].type).toBe('basic');
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
      userId: new mongoose.Types.ObjectId().toString(),
      name: 'Invalid Routine',
      category: 'invalid-category', // Invalid enum value
      difficulty: 'super-hard', // Invalid enum value
      duration: 30,
      frequency: 3
    });

    await expect(routineWithInvalidEnum.save()).rejects.toThrow();
  });

  it('should create a routine with a circuit section', async () => {
    const routineData = {
      _id: new mongoose.Types.ObjectId().toString(),
      userId: new mongoose.Types.ObjectId().toString(),
      name: 'Circuit Training Routine',
      description: 'A circuit-based routine',
      category: 'strength',
      difficulty: 'intermediate',
      duration: 45,
      frequency: 3,
      tags: ['circuit', 'hiit'],
      isPublic: false,
      workouts: [
        {
          _id: new mongoose.Types.ObjectId().toString(),
          name: 'Full Body Circuit',
          orderIndex: 0,
          type: 'strength',
          sections: [
            {
              _id: new mongoose.Types.ObjectId().toString(),
              name: 'Circuit 1',
              orderIndex: 0,
              type: 'circuit',
              rounds: 3,
              restBetweenRounds: '60s',
              restBetweenExercises: '15s',
              exercises: [
                {
                  _id: new mongoose.Types.ObjectId().toString(),
                  exerciseId: new mongoose.Types.ObjectId().toString(),
                  exerciseVariantId: new mongoose.Types.ObjectId().toString(),
                  orderIndex: 0,
                  type: 'bodyweight',
                  sets: [
                    {
                      _id: new mongoose.Types.ObjectId().toString(),
                      orderIndex: 0,
                      reps: 15
                    }
                  ]
                },
                {
                  _id: new mongoose.Types.ObjectId().toString(),
                  exerciseId: new mongoose.Types.ObjectId().toString(),
                  exerciseVariantId: new mongoose.Types.ObjectId().toString(),
                  orderIndex: 1,
                  type: 'bodyweight',
                  sets: [
                    {
                      _id: new mongoose.Types.ObjectId().toString(),
                      orderIndex: 0,
                      reps: 12
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    const routine = new UserCreatedRoutineModel(routineData);
    const savedRoutine = await routine.save();
    
    expect(savedRoutine._id).toBeDefined();
    expect(savedRoutine.workouts[0].sections[0].type).toBe('circuit');
    expect(savedRoutine.workouts[0].sections[0].rounds).toBe(3);
    expect(savedRoutine.workouts[0].sections[0].restBetweenRounds).toBe('60s');
    expect(savedRoutine.workouts[0].sections[0].exercises.length).toBe(2);
  });

  it('should create a routine with a running workout', async () => {
    const routineData = {
      _id: new mongoose.Types.ObjectId().toString(),
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
          _id: new mongoose.Types.ObjectId().toString(),
          name: 'Interval Training',
          orderIndex: 0,
          type: 'running',
          sections: [
            {
              _id: new mongoose.Types.ObjectId().toString(),
              name: 'Warm-up Jog',
              orderIndex: 0,
              type: 'warmup',
              duration: 10,
              intensity: 'light',
              targetMuscleGroups: ['legs'],
              exercises: []
            },
            {
              _id: new mongoose.Types.ObjectId().toString(),
              name: 'Speed Intervals',
              orderIndex: 1,
              type: 'intervals',
              rounds: 5,
              workDistance: 400,
              restDuration: '90s',
              intensity: 'anaerobic',
              exercises: []
            },
            {
              _id: new mongoose.Types.ObjectId().toString(),
              name: 'Cool Down',
              orderIndex: 2,
              type: 'cooldown',
              duration: 10,
              stretchingFocus: ['calves', 'hamstrings', 'quads'],
              exercises: []
            }
          ]
        }
      ]
    };

    const routine = new UserCreatedRoutineModel(routineData);
    const savedRoutine = await routine.save();
    
    expect(savedRoutine._id).toBeDefined();
    expect(savedRoutine.workouts[0].type).toBe('running');
    expect(savedRoutine.workouts[0].sections.length).toBe(3);
    expect(savedRoutine.workouts[0].sections[1].type).toBe('intervals');
    expect(savedRoutine.workouts[0].sections[1].rounds).toBe(5);
    expect(savedRoutine.workouts[0].sections[1].workDistance).toBe(400);
  });
});

