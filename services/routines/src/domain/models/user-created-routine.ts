import mongoose, { Schema } from 'mongoose';
import { baseWorkoutSchema } from './workouts/base-workout';

// Define schema for user created routine
const userCreatedRoutineSchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ['strength', 'running', 'cycling', 'swimming', 'other'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    duration: { type: Number }, // in minutes
    frequency: { type: Number }, // workouts per week
    tags: [{ type: String }],
    isPublic: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    workouts: [baseWorkoutSchema],
  },
  { _id: false }
);

// Create and export the model
export const UserCreatedRoutineModel = mongoose.model(
  'UserCreatedRoutine',
  userCreatedRoutineSchema
);

export default UserCreatedRoutineModel;
