import { Schema } from 'mongoose';
import { SectionModel } from './base-section';

// Define schema for tabata section
export const tabataSectionSchema = new Schema({
  workInterval: { type: String, required: true }, // DurationString
  restInterval: { type: String, required: true }, // DurationString
  rounds: { type: Number, required: true },
  // Note: exercises field is already in the base schema
});

// Register the discriminator
export const TabataSectionModel = SectionModel.discriminator(
  'tabata',
  tabataSectionSchema
);

export default TabataSectionModel;
