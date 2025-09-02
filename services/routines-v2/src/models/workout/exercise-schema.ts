import { Schema } from 'mongoose';
import { setSchema } from './set-schema';

/**
 * Exercise Schema
 * Embedded schema for exercises within sections
 */
export const exerciseSchema = new Schema(
  {
    exerciseId: {
      type: String,
      required: [true, 'Exercise ID is required'],
    },
    exerciseVariantId: {
      type: String,
      required: [true, 'Exercise variant ID is required'],
    },
    type: {
      type: String,
      enum: {
        values: ['strength', 'bodyweight', 'mobility', 'tabata'],
        message: 'Invalid exercise type',
      },
      required: [true, 'Exercise type is required'],
    },
    orderIndex: {
      type: Number,
      required: [true, 'Exercise order index is required'],
      min: [0, 'Order index cannot be negative'],
    },
    restBetweenSets: {
      type: String,
      validate: {
        validator: function (v: string) {
          return !v || /^(\d+(\.\d+)?)[smh]$/.test(v);
        },
        message: 'Rest between sets must be a valid duration string',
      },
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
    notes: {
      type: String,
      trim: true,
      maxLength: [500, 'Exercise notes cannot exceed 500 characters'],
    },

    // Strength exercise specific fields
    progressionMethod: {
      type: String,
      enum: [
        'linear',
        'percentage',
        'rpe',
        'time-under-tension',
        'dual-linear',
        'widowmaker',
        'myo-reps',
        'amrap',
        'pyramid',
        'wave-loading',
        'cluster-sets',
        'rest-pause',
      ],
    },
    sets: {
      type: [setSchema],
      default: [],
    },
    unilateralMode: {
      type: String,
      enum: ['alternating', 'sequential', 'simultaneous'],
    },
    supersetGroupId: String,
  },
  {
    _id: true,
  }
);
