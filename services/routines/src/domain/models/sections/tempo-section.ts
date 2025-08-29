import { Schema } from 'mongoose';
import { SectionModel } from './base-section';

// Define schema for tempo section
export const tempoSectionSchema = new Schema({
  distance: { type: Number }, // miles/km
  duration: { type: String, required: true }, // DurationString
  targetPace: { type: String, required: true }, // e.g., "7:30/mile"
});

// Register the discriminator
export const TempoSectionModel = SectionModel.discriminator(
  'tempo',
  tempoSectionSchema
);

export default TempoSectionModel;
