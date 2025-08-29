import { Schema } from 'mongoose';
import { SetModel } from './base-set';

// Define schema for bodyweight set
export const bodyweightSetSchema = new Schema({
  reps: { type: Number },
  repsMin: { type: Number },
  repsMax: { type: Number },
  duration: { type: Number },
  rpe: { type: Number },
  unilateralSide: {
    type: String,
    enum: ['left', 'right'],
  },
});

// Register the discriminator
export const BodyweightSetModel = SetModel.discriminator(
  'bodyweightSet',
  bodyweightSetSchema
);

export default BodyweightSetModel;
