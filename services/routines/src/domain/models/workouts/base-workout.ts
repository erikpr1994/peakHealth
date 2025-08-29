import mongoose, { Schema } from 'mongoose';
import { baseSectionSchema } from '../sections/base-section';

// Define schema for base workout
export const baseWorkoutSchema = new Schema(
  {
    name: { type: String, required: true },
    orderIndex: { type: Number, required: true },
    objective: { type: String },
    notes: { type: String },
    sections: [baseSectionSchema],
  },
  { _id: false }
);

// Create and export the model
export const WorkoutModel = mongoose.model('Workout', baseWorkoutSchema);

export default WorkoutModel;
