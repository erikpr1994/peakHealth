/**
 * Exercise data constants
 */

import { CATEGORY, DIFFICULTY, EQUIPMENT, MUSCLE_GROUP } from './constants';

// Export the arrays for backward compatibility
export const difficulties = Object.values(DIFFICULTY);
export const equipment = Object.values(EQUIPMENT);
export const muscleGroups = Object.values(MUSCLE_GROUP);
export const exerciseCategories = Object.values(CATEGORY);

// Export the types for backward compatibility (using different names to avoid conflicts)
export type DifficultyType = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];
export type EquipmentType = (typeof EQUIPMENT)[keyof typeof EQUIPMENT];
export type MuscleGroupType = (typeof MUSCLE_GROUP)[keyof typeof MUSCLE_GROUP];
export type ExerciseCategoryType = (typeof CATEGORY)[keyof typeof CATEGORY];
