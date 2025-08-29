import { Schema } from 'mongoose';
import { SetModel } from './base-set';

// Define schema for mobility set
export const mobilitySetSchema = new Schema({
  duration: { type: Number },
  reps: { type: Number },
  holdTime: { type: String }, // DurationString
});

// Register the discriminator
export const MobilitySetModel = SetModel.discriminator(
  'mobilitySet',
  mobilitySetSchema
);

export default MobilitySetModel;
