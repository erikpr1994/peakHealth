import { Schema } from 'mongoose';
import { ExerciseModel } from './base-exercise';
import { strengthSetSchema } from '../sets/strength-set';

// Define schema for strength exercise
export const strengthExerciseSchema = new Schema({
  type: {
    type: String,
    enum: ['strength'],
    required: true,
    default: 'strength',
  },
  progressionMethod: {
    type: String,
    enum: [
      'linear',
      'percentage',
      'rpe',
      'time-under-tension',
      'dual-linear',
      'widowmaker',
      'myo-reps',
      'amrap',
      'pyramid',
      'wave-loading',
      'cluster-sets',
      'rest-pause',
    ],
  },
  sets: [strengthSetSchema],
  unilateralMode: {
    type: String,
    enum: ['alternating', 'sequential', 'simultaneous'],
  },
  supersetGroupId: { type: String },
});

// Register the discriminator
export const StrengthExerciseModel = ExerciseModel.discriminator(
  'strength',
  strengthExerciseSchema
);

export default StrengthExerciseModel;
