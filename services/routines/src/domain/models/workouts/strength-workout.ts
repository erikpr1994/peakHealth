import { Schema } from 'mongoose';
import { WorkoutModel } from './base-workout';

// Define schema for strength workout
export const strengthWorkoutSchema = new Schema({
  type: {
    type: String,
    enum: ['strength'],
    required: true,
    default: 'strength',
  },
  // sections is already defined in the base schema
});

// Register the discriminator
export const StrengthWorkoutModel = WorkoutModel.discriminator(
  'strength',
  strengthWorkoutSchema
);

export default StrengthWorkoutModel;
