import { Schema } from 'mongoose';
import { SectionModel } from './base-section';

// Define schema for circuit section
export const circuitSectionSchema = new Schema({
  rounds: { type: Number, required: true },
  restBetweenRounds: { type: String, required: true }, // DurationString
  restBetweenExercises: { type: String }, // DurationString
});

// Register the discriminator
export const CircuitSectionModel = SectionModel.discriminator(
  'circuit',
  circuitSectionSchema
);

export default CircuitSectionModel;
