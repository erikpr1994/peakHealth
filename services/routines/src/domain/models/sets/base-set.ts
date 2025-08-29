import mongoose, { Schema } from 'mongoose';

// Define schema for base set
export const baseSetSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['strength', 'bodyweight', 'mobility', 'tabata'],
      required: true,
    },
    orderIndex: { type: Number, required: true },
    notes: { type: String },
    // Type-specific fields that can be used when embedded
    reps: { type: String },
    weight: { type: String },
    duration: { type: String },
    restTime: { type: String },
  },
  { _id: false }
);

// Create and export the model
export const SetModel = mongoose.model('Set', baseSetSchema);

export default SetModel;
