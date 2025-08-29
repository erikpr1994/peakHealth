import { Schema } from 'mongoose';
import { ExerciseModel } from './base-exercise';
import { bodyweightSetSchema } from '../sets/bodyweight-set';

// Define schema for bodyweight exercise
export const bodyweightExerciseSchema = new Schema({
  type: {
    type: String,
    enum: ['bodyweight'],
    required: true,
    default: 'bodyweight',
  },
  sets: [bodyweightSetSchema],
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
  unilateralMode: {
    type: String,
    enum: ['alternating', 'sequential', 'simultaneous'],
  },
});

// Register the discriminator
export const BodyweightExerciseModel = ExerciseModel.discriminator(
  'bodyweight',
  bodyweightExerciseSchema
);

export default BodyweightExerciseModel;
