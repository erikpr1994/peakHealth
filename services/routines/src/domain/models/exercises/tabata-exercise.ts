import { Schema } from 'mongoose';
import { ExerciseModel } from './base-exercise';

// Define schema for tabata exercise
export const tabataExerciseSchema = new Schema({
  type: {
    type: String,
    enum: ['tabata'],
    required: true,
    default: 'tabata',
  },
  unilateralMode: {
    type: String,
    enum: ['alternating', 'sequential', 'simultaneous'],
  },
});

// Register the discriminator
export const TabataExerciseModel = ExerciseModel.discriminator(
  'tabata',
  tabataExerciseSchema
);

export default TabataExerciseModel;
