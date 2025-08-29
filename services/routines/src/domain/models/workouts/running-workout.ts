import { Schema } from 'mongoose';
import { WorkoutModel } from './base-workout';

// Define schema for running workout
export const runningWorkoutSchema = new Schema({
  type: {
    type: String,
    enum: ['running'],
    required: true,
    default: 'running',
  },
  // sections is already defined in the base schema
});

// Register the discriminator
export const RunningWorkoutModel = WorkoutModel.discriminator(
  'running',
  runningWorkoutSchema
);

export default RunningWorkoutModel;
