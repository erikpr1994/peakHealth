import { Schema } from 'mongoose';
import { SectionModel } from './base-section';

// Define schema for interval section
export const intervalSectionSchema = new Schema({
  rounds: { type: Number, required: true },
  workDistance: { type: Number }, // meters
  workDuration: { type: String }, // DurationString
  restDuration: { type: String, required: true }, // DurationString
  intensity: {
    type: String,
    enum: ['aerobic', 'anaerobic', 'vo2max'],
    required: true,
  },
});

// Register the discriminator
export const IntervalSectionModel = SectionModel.discriminator(
  'intervals',
  intervalSectionSchema
);

export default IntervalSectionModel;
