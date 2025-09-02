import { Schema } from 'mongoose';

/**
 * Set Schema
 * Embedded schema for exercise sets
 */
export const setSchema = new Schema(
  {
    setNumber: {
      type: Number,
      required: [true, 'Set number is required'],
      min: [1, 'Set number must be at least 1'],
    },
    setType: {
      type: String,
      enum: {
        values: ['working', 'warmup', 'drop', 'failure'],
        message: 'Invalid set type',
      },
      required: [true, 'Set type is required'],
    },
    repType: {
      type: String,
      enum: {
        values: ['fixed', 'range', 'time', 'max'],
        message: 'Invalid rep type',
      },
      required: [true, 'Rep type is required'],
    },
    notes: {
      type: String,
      trim: true,
      maxLength: [200, 'Set notes cannot exceed 200 characters'],
    },
    restAfter: {
      type: String,
      validate: {
        validator: function (v: string) {
          return !v || /^(\d+(\.\d+)?)[smh]$/.test(v);
        },
        message: 'Rest after must be a valid duration string',
      },
    },

    // Strength set specific fields
    reps: Number,
    repsMin: Number,
    repsMax: Number,
    weight: Number,
    rpe: {
      type: Number,
      min: [1, 'RPE must be between 1 and 10'],
      max: [10, 'RPE must be between 1 and 10'],
    },
    duration: Number,
    tempo: {
      eccentric: Number,
      eccentric_pause: Number,
      concentric: Number,
      concentric_pause: Number,
    },
    unilateralSide: {
      type: String,
      enum: ['left', 'right'],
    },
  },
  {
    _id: true,
  }
);
