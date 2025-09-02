import { Schema } from 'mongoose';
import { RoutineDocument } from './types';

/**
 * Template Routine Schema
 * For routines created by trainers or the company
 */
export const templateRoutineSchema = new Schema<RoutineDocument>({
  templateType: {
    type: String,
    enum: {
      values: ['trainer', 'company'],
      message: 'Template type must be trainer or company',
    },
    required: [true, 'Template type is required for template routines'],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: [true, 'Creator ID is required'],
    index: true,
  },
  allowCopy: {
    type: Boolean,
    default: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
    index: true,
  },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: function (tags: string[]) {
        return tags.length <= 20;
      },
      message: 'Cannot have more than 20 tags',
    },
  },
  targetAudience: {
    type: [String],
    default: [],
  },
  parentRoutineId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Parent routine ID is required for template routines'],
    index: true,
  },
  version: {
    type: Number,
    required: [true, 'Version is required for template routines'],
    min: [1, 'Version must be at least 1'],
  },
  isLatest: {
    type: Boolean,
    default: false,
    index: true,
  },
});

// Additional indexes for template routines
templateRoutineSchema.index(
  { parentRoutineId: 1, version: 1 },
  { unique: true }
);
templateRoutineSchema.index({ parentRoutineId: 1, isLatest: 1 });
templateRoutineSchema.index({ templateType: 1, isPublic: 1 });
templateRoutineSchema.index({ tags: 1 });

// Pre-save middleware to ensure only one latest version per parent routine
templateRoutineSchema.pre('save', async function (next) {
  if (this.isLatest && this.isModified('isLatest')) {
    // Update other versions to not be latest
    await (this.constructor as any).updateMany(
      {
        parentRoutineId: this.parentRoutineId,
        _id: { $ne: this._id },
      },
      { isLatest: false }
    );
  }
  next();
});
