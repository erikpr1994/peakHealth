import { Schema } from 'mongoose';
import { SectionModel } from './base-section';

// Define schema for fartlek section
export const fartlekSectionSchema = new Schema({
  duration: { type: String, required: true }, // DurationString
  description: { type: String, required: true },
});

// Register the discriminator
export const FartlekSectionModel = SectionModel.discriminator(
  'fartlek',
  fartlekSectionSchema
);

export default FartlekSectionModel;
