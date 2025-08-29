import { Schema } from 'mongoose';
import { SectionModel } from './base-section';

// Define schema for basic section
export const basicSectionSchema = new Schema({
  // No additional fields beyond base section
});

// Register the discriminator
export const BasicSectionModel = SectionModel.discriminator(
  'basic',
  basicSectionSchema
);

export default BasicSectionModel;
