import { Difficulty, Goal, ISODateString, ObjectId } from './common';
import { Workout } from './workout';

/**
 * Base Routine Interface
 * Contains core properties common across all routine types
 */
export interface BaseRoutine {
  _id: ObjectId;
  name: string;
  description?: string;
  difficulty: Difficulty;
  goal: Goal;
  duration: number; // weeks, 1-52
  objectives: string[];
  workouts: Workout[];

  // Metadata
  schemaVersion: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/**
 * User-Created Routine
 * A routine created by a user, for their own use. Fully mutable by the user who owns it.
 */
export interface UserCreatedRoutine extends BaseRoutine {
  userId: ObjectId; // The user who owns and can edit this routine
  createdBy: ObjectId; // Same as userId
  routineType: 'user-created';

  // User-specific progress and status
  isActive: boolean;
  isFavorite: boolean;
  completedWorkouts: number;
  totalWorkouts: number;
  lastUsed?: ISODateString;
}

/**
 * Template Routine
 * A read-only blueprint created by a trainer or the company.
 * Users cannot modify these directly; they are assigned a specific version to follow.
 */
export interface TemplateRoutine extends BaseRoutine {
  routineType: 'template';
  templateType: 'trainer' | 'company';
  createdBy: ObjectId; // The trainer or company user ID that owns the template

  // Permissions
  allowCopy: boolean; // If true, user can copy this template to create their own UserCreatedRoutine

  // Categorization and Discovery
  isPublic: boolean;
  tags?: string[];
  targetAudience?: string[]; // e.g., ['beginner', 'trail-runner']

  // Versioning Fields
  parentRoutineId: ObjectId; // Links all versions of a routine together
  version: number; // e.g., 1, 2, 3
  isLatest: boolean; // Flag to easily find the most recent version
}

/**
 * Routine Assignment Model
 * Links a user to a specific, immutable version of a TemplateRoutine and tracks all progress against it.
 */
export interface RoutineAssignment {
  _id: ObjectId;
  routineVersionId: ObjectId; // Reference to a specific version of a TemplateRoutine
  parentRoutineId: ObjectId; // The parent ID, to track the overall routine being followed
  trainerId?: ObjectId; // The trainer who assigned it (if applicable)
  userId: ObjectId;

  assignedAt: ISODateString;
  startDate?: ISODateString;
  endDate?: ISODateString;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  notesForUser?: string;

  // Progress tracking specific to this assignment
  progress: {
    completedWorkouts: number;
    totalWorkouts: number;
    lastWorkoutDate?: ISODateString;
    feedback?: string; // Feedback from the user to the trainer
  };
}

/**
 * Union type for all routine types
 */
export type Routine = UserCreatedRoutine | TemplateRoutine;
