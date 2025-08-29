import { Schema } from 'mongoose';
import { SectionModel } from './base-section';

// Define schema for EMOM section
export const emomSectionSchema = new Schema({
  emomDuration: { type: Number, required: true }, // minutes
  rounds: { type: Number, required: true },
  restBetweenRounds: { type: String }, // DurationString
});

// Register the discriminator
export const EmomSectionModel = SectionModel.discriminator(
  'emom',
  emomSectionSchema
);

export default EmomSectionModel;
