import { Schema } from 'mongoose';
import { ExerciseModel } from './base-exercise';
import { mobilitySetSchema } from '../sets/mobility-set';

// Define schema for mobility exercise
export const mobilityExerciseSchema = new Schema({
  type: {
    type: String,
    enum: ['mobility'],
    required: true,
    default: 'mobility',
  },
  sets: [mobilitySetSchema],
  unilateralMode: {
    type: String,
    enum: ['alternating', 'sequential', 'simultaneous'],
  },
});

// Register the discriminator
export const MobilityExerciseModel = ExerciseModel.discriminator(
  'mobility',
  mobilityExerciseSchema
);

export default MobilityExerciseModel;
