import { Schema } from 'mongoose';
import { SetModel } from './base-set';

// Define schema for strength set
export const strengthSetSchema = new Schema({
  reps: { type: Number },
  repsMin: { type: Number },
  repsMax: { type: Number },
  weight: { type: Number },
  rpe: { type: Number },
  duration: { type: Number },
  tempo: {
    eccentric: { type: Number },
    eccentric_pause: { type: Number },
    concentric: { type: Number },
    concentric_pause: { type: Number },
  },
  unilateralSide: {
    type: String,
    enum: ['left', 'right'],
  },
});

// Register the discriminator
export const StrengthSetModel = SetModel.discriminator(
  'strengthSet',
  strengthSetSchema
);

export default StrengthSetModel;
