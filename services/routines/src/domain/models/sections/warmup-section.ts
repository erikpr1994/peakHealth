import { Schema } from 'mongoose';
import { SectionModel } from './base-section';

// Define schema for warmup section
export const warmupSectionSchema = new Schema({
  targetMuscleGroups: [{ type: String }],
  duration: { type: Number, required: true }, // minutes
  intensity: {
    type: String,
    enum: ['light', 'moderate'],
    required: true,
  },
});

// Register the discriminator
export const WarmupSectionModel = SectionModel.discriminator(
  'warmup',
  warmupSectionSchema
);

export default WarmupSectionModel;
