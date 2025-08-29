import mongoose, { Schema } from 'mongoose';
import { baseExerciseSchema } from '../exercises/base-exercise';

// Define schema for the base workout section
export const baseSectionSchema = new Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: [
        'basic',
        'emom',
        'tabata',
        'circuit',
        'intervals',
        'tempo',
        'fartlek',
        'hill_repeats',
        'warmup',
        'cooldown',
      ],
      required: true,
    },
    orderIndex: { type: Number, required: true },
    restAfter: { type: String }, // DurationString
    notes: { type: String },
    exercises: [baseExerciseSchema],
    // Type-specific fields that can be used when embedded
    rounds: { type: Number },
    workDistance: { type: Number },
    workDuration: { type: String },
    restDuration: { type: String },
    intensity: { type: String },
    emomDuration: { type: Number },
    restBetweenExercises: { type: String },
    targetPace: { type: String },
    targetHeartRate: { type: String },
    hillGrade: { type: Number },
    hillDuration: { type: String },
  },
  { _id: false }
);

// Create and export the model
export const SectionModel = mongoose.model('Section', baseSectionSchema);

export default SectionModel;
