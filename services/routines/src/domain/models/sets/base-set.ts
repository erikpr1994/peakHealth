import mongoose, { Schema } from 'mongoose';

// Define schema for base set
export const baseSetSchema = new Schema(
  {
    orderIndex: { type: Number, required: true },
    notes: { type: String },
  },
  { discriminatorKey: 'type', _id: false }
);

// Create and export the model
export const SetModel = mongoose.model('Set', baseSetSchema);

export default SetModel;
