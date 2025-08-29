import mongoose, { Schema, Document } from 'mongoose';
import {
  UserCreatedRoutine,
  Workout,
  StrengthWorkout,
  RunningWorkout,
  TrailRunningWorkout,
  StrengthWorkoutSection,
  RunningWorkoutSection,
  Difficulty,
  Goal,
  ISODateString,
  ObjectId,
} from '@peakhealth/routines-types';

// Define schema for the base workout section
const baseWorkoutSectionSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    orderIndex: { type: Number, required: true },
    notes: { type: String },
  },
  { discriminatorKey: 'type', _id: false }
);

// Define schema for strength workout section
const strengthWorkoutSectionSchema = new Schema({
  exercises: [
    {
      exerciseId: { type: String, required: true },
      sets: [
        {
          setType: {
            type: String,
            enum: ['working', 'warmup', 'drop', 'failure'],
            required: true,
          },
          repType: {
            type: String,
            enum: ['fixed', 'range', 'time', 'max'],
            required: true,
          },
          reps: { type: Schema.Types.Mixed, required: true }, // Can be number or range
          weight: { type: Schema.Types.Mixed }, // Can be number or null
          rpe: { type: Number },
          restSeconds: { type: Number },
          tempo: {
            eccentric: { type: Number },
            eccentric_pause: { type: Number },
            concentric: { type: Number },
            concentric_pause: { type: Number },
          },
          unilateralMode: {
            type: String,
            enum: ['alternating', 'sequential', 'simultaneous'],
          },
        },
      ],
      notes: { type: String },
    },
  ],
});

// Define schema for running workout section
const runningWorkoutSectionSchema = new Schema({
  distanceKm: { type: Number },
  durationMinutes: { type: Number },
  paceMinKm: { type: String },
  heartRateZone: { type: Number },
  elevationGainM: { type: Number },
  terrainType: { type: String },
});

// Define schema for base workout
const baseWorkoutSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    orderIndex: { type: Number, required: true },
    objective: { type: String },
    notes: { type: String },
    sections: [baseWorkoutSectionSchema],
  },
  { discriminatorKey: 'type', _id: false }
);

// Define the UserCreatedRoutine schema
const userCreatedRoutineSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  goal: {
    type: String,
    enum: [
      'strength',
      'hypertrophy',
      'endurance',
      'power',
      'weight_loss',
      'general_fitness',
      'mobility',
      'sport_specific',
    ],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 52,
  },
  objectives: [{ type: String }],
  workouts: [baseWorkoutSchema],

  // Metadata
  schemaVersion: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },

  // UserCreatedRoutine specific fields
  userId: { type: String, required: true },
  createdBy: { type: String, required: true },
  routineType: {
    type: String,
    enum: ['user-created'],
    required: true,
    default: 'user-created',
  },

  // User-specific progress and status
  isActive: { type: Boolean, required: true, default: false },
  isFavorite: { type: Boolean, required: true, default: false },
  completedWorkouts: { type: Number, required: true, default: 0 },
  totalWorkouts: { type: Number, required: true, default: 0 },
  lastUsed: { type: String },
});

// Register section discriminators
const WorkoutSectionSchema = mongoose.model(
  'WorkoutSection',
  baseWorkoutSectionSchema
);
WorkoutSectionSchema.discriminator('strength', strengthWorkoutSectionSchema);
WorkoutSectionSchema.discriminator('running', runningWorkoutSectionSchema);

// Register workout discriminators
const WorkoutSchema = mongoose.model('Workout', baseWorkoutSchema);
WorkoutSchema.discriminator('strength', new Schema({}));
WorkoutSchema.discriminator('running', new Schema({}));
WorkoutSchema.discriminator('trail-running', new Schema({}));

// Create and export the model
export interface UserCreatedRoutineDocument
  extends Document,
    Omit<UserCreatedRoutine, '_id'> {
  _id: mongoose.Types.ObjectId;
}

export const UserCreatedRoutineModel =
  mongoose.model<UserCreatedRoutineDocument>(
    'UserCreatedRoutine',
    userCreatedRoutineSchema
  );

export default UserCreatedRoutineModel;
