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
                      setNumber: 1,
                      setType: 'warmup',
                      repType: 'fixed',
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
                      setNumber: 1,
                      setType: 'working',
                      repType: 'fixed',
                      reps: 8,
                      weight: 100,
                      rpe: 7
                    },
                    {
                      setNumber: 2,
                      setType: 'working',
                      repType: 'fixed',
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
      totalWorkouts: 1
    };

    const routine = new UserCreatedRoutineModel(routineData);
    const savedRoutine = await routine.save();
    
    expect(savedRoutine._id).toBeDefined();
    expect(savedRoutine.name).toBe(routineData.name);
    expect(savedRoutine.difficulty).toBe(routineData.difficulty);
    expect(savedRoutine.goal).toBe(routineData.goal);
    expect(savedRoutine.workouts.length).toBe(1);
    expect(savedRoutine.workouts[0].sections.length).toBe(2);
    expect(savedRoutine.workouts[0].sections[0].type).toBe('warmup');
    expect(savedRoutine.workouts[0].sections[1].type).toBe('basic');
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
      totalWorkouts: 0
    });

    await expect(routineWithInvalidEnum.save()).rejects.toThrow();
  });

  it('should create a routine with a circuit section', async () => {
    const routineData = {
      _id: new mongoose.Types.ObjectId().toString(),
      name: 'Circuit Training Routine',
      difficulty: 'intermediate',
      goal: 'endurance',
      duration: 4,
      objectives: ['Improve endurance', 'Burn calories'],
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
                      setNumber: 1,
                      setType: 'working',
                      repType: 'fixed',
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
                      setNumber: 1,
                      setType: 'working',
                      repType: 'fixed',
                      reps: 12
                    }
                  ]
                }
              ]
            }
          ]
        }
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
      totalWorkouts: 1
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
      name: 'Running Program',
      difficulty: 'intermediate',
      goal: 'endurance',
      duration: 8,
      objectives: ['Improve cardiovascular fitness', 'Prepare for 10K'],
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
      totalWorkouts: 1
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

