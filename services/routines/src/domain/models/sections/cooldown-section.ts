import { Schema } from 'mongoose';
import { SectionModel } from './base-section';

// Define schema for cooldown section
export const cooldownSectionSchema = new Schema({
  duration: { type: Number, required: true }, // minutes
  stretchingFocus: [{ type: String }],
});

// Register the discriminator
export const CooldownSectionModel = SectionModel.discriminator(
  'cooldown',
  cooldownSectionSchema
);

export default CooldownSectionModel;
