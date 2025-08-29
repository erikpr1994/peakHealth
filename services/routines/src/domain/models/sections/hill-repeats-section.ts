import { Schema } from 'mongoose';
import { SectionModel } from './base-section';

// Define schema for hill repeats section
export const hillRepeatsSectionSchema = new Schema({
  repeats: { type: Number, required: true },
  hillLength: { type: Number }, // meters
  restType: {
    type: String,
    enum: ['jog_down', 'walk_down', 'static'],
    required: true,
  },
});

// Register the discriminator
export const HillRepeatsSectionModel = SectionModel.discriminator(
  'hill_repeats',
  hillRepeatsSectionSchema
);

export default HillRepeatsSectionModel;
