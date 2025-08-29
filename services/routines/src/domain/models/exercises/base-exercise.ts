import mongoose, { Schema } from 'mongoose';

// Define schema for base exercise
export const baseExerciseSchema = new Schema(
  {
    _id: { type: String, required: true },
    exerciseId: { type: String, required: true },
    exerciseVariantId: { type: String, required: true },
    orderIndex: { type: Number, required: true },
    restBetweenSets: { type: String }, // DurationString
    restAfter: { type: String }, // DurationString
    notes: { type: String },
  },
  { discriminatorKey: 'type', _id: false }
);

// Create and export the model
export const ExerciseModel = mongoose.model('Exercise', baseExerciseSchema);

export default ExerciseModel;
