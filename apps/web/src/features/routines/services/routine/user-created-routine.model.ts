import mongoose, { Schema, Document } from 'mongoose';
import type { UserCreatedRoutine } from '@peakhealth/routines-types';

// Create a schema for the Workout
const WorkoutSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    orderIndex: { type: Number, required: true },
    objective: { type: String },
    notes: { type: String },
    type: {
      type: String,
      required: true,
      enum: ['strength', 'running', 'trail-running'],
    },
    sections: { type: [Schema.Types.Mixed], required: true },
  },
  { _id: false }
);

// Create a schema for the UserCreatedRoutine
const UserCreatedRoutineSchema = new Schema<UserCreatedRoutine & Document>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    goal: {
      type: String,
      required: true,
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
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
      max: 52,
    },
    objectives: { type: [String], required: true },
    workouts: { type: [WorkoutSchema], required: true },

    // Metadata
    schemaVersion: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },

    // UserCreatedRoutine specific fields
    userId: { type: String, required: true },
    createdBy: { type: String, required: true },
    routineType: {
      type: String,
      required: true,
      enum: ['user-created'],
      default: 'user-created',
    },

    // User-specific progress and status
    isActive: { type: Boolean, required: true, default: false },
    isFavorite: { type: Boolean, required: true, default: false },
    completedWorkouts: { type: Number, required: true, default: 0 },
    totalWorkouts: { type: Number, required: true },
    lastUsed: { type: String },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
    toJSON: {
      transform: (doc, ret): void => {
        // Convert MongoDB _id to string format if needed
        if (ret._id) {
          ret._id = ret._id.toString();
        }
      },
    },
  }
);

// Create indexes for efficient querying
UserCreatedRoutineSchema.index({ userId: 1 });
UserCreatedRoutineSchema.index({ isActive: 1 });
UserCreatedRoutineSchema.index({ isFavorite: 1 });

// Pre-save hook to set totalWorkouts based on workouts array length
UserCreatedRoutineSchema.pre('save', function (next): void {
  if (this.isModified('workouts')) {
    this.totalWorkouts = this.workouts.length;
  }
  next();
});

// Create and export the model
export const UserCreatedRoutineModel =
  mongoose.models.UserCreatedRoutine ||
  mongoose.model<UserCreatedRoutine & Document>(
    'UserCreatedRoutine',
    UserCreatedRoutineSchema
  );

export default UserCreatedRoutineModel;
