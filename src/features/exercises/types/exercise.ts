/**
 * Main exercise interfaces
 */

import type { Category, Difficulty, Equipment, MuscleGroup } from './constants';
import type { ExerciseId, ExerciseVariantId } from './ids';

// Instruction step interface
export interface InstructionStep {
  title: string;
  description: string;
}

// Exercise tips interface
export interface ExerciseTips {
  proTips: string[];
  commonMistakes: string[];
  safetyNotes?: string[];
}

// Media interface for exercise variants
export interface ExerciseMedia {
  images?: string[];
  videos?: string[];
  featuredImage?: string;
  featuredVideo?: string;
}

// Exercise variant interface - contains all detailed data
export interface ExerciseVariant {
  // Core Identity
  id: ExerciseVariantId;
  name: string;
  alternativeNames?: string[];
  description: string;
  focus: string;

  // Exercise Characteristics
  difficulty: Difficulty;
  equipment: Equipment[];
  muscleGroups: MuscleGroup[];
  secondaryMuscles?: MuscleGroup[];
  isUnilateral?: boolean;

  // Instructions & Guidance
  instructions: string[];
  steps: InstructionStep[];
  tips?: ExerciseTips;

  // Media Assets
  media?: ExerciseMedia;

  // Additional Data
  prerequisites?: ExerciseVariantId[];

  // Database fields
  created_at?: Date;
  updated_at?: Date;
}

// Main Exercise interface - wrapper for variants
export interface Exercise {
  // Core Identity
  id: ExerciseId;
  name: string;
  alternativeNames?: string[];
  category: Category;
  description: string;

  // Variants Management
  variants: ExerciseVariant[];
  mainVariantId: ExerciseVariantId; // ID of the main/default variant

  // Display Properties
  icon: string;
  iconColor: string;

  // Status flags
  isFavorite: boolean;
  isPopular?: boolean;
  isNew?: boolean;

  // Ratings
  rating?: number;

  // Summary Information (aggregated from variants)
  summary?: {
    difficultyRange: {
      min: Difficulty;
      max: Difficulty;
    };
    equipmentOptions: Equipment[];
    primaryMuscleGroups: MuscleGroup[];
  };

  // Search & Categorization
  tags?: string[];

  // Exercise Relationships
  relatedExercises?: ExerciseId[];

  // Database fields
  created_at?: Date;
  updated_at?: Date;
}

// Extended exercise data for detailed views (deprecated - use ExerciseVariant instead)
export type ExerciseData = Exercise & {
  totalRatings: number;
  type: string;
  mechanics: string;
  primaryMuscles: MuscleGroup[];

  // Detailed instructions
  steps: InstructionStep[];
  proTips: string[];
  commonMistakes: string[];
};

// Routine interface
export interface Routine {
  id: string;
  name: string;
  schedule: string;
  exercises: number;
  isSelected: boolean;
}
