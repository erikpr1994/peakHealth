import mongoose, { Schema } from 'mongoose';
import { baseSetSchema } from '../sets/base-set';

// Define schema for base exercise
export const baseExerciseSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['strength', 'bodyweight', 'mobility', 'tabata'],
      required: true,
    },
    exerciseId: { type: String, required: true },
    exerciseVariantId: { type: String, required: true },
    orderIndex: { type: Number, required: true },
    restBetweenSets: { type: String }, // DurationString
    restAfter: { type: String }, // DurationString
    notes: { type: String },
    // Type-specific fields that can be used when embedded
    sets: [baseSetSchema], // Use proper set schema for type safety
    progressionMethod: { type: String },
    unilateralMode: { type: String },
    rounds: { type: Number },
    workDuration: { type: String },
    restDuration: { type: String },
    intensity: { type: String },
  },
  { _id: false }
);

// Create and export the model
export const ExerciseModel = mongoose.model('Exercise', baseExerciseSchema);

export default ExerciseModel;
