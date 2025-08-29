import mongoose, { Schema } from 'mongoose';

// Define schema for base set
export const baseSetSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['strengthSet', 'bodyweightSet', 'mobilitySet'],
      required: true,
    },
    orderIndex: { type: Number, required: true },
    notes: { type: String },
    // Type-specific fields that can be used when embedded
    reps: { type: Number },
    weight: { type: Number },
    duration: { type: Number },
    restTime: { type: String }, // Keep as String since it's a DurationString
  },
  { _id: false }
);

// Create and export the model
export const SetModel = mongoose.model('Set', baseSetSchema);

export default SetModel;
