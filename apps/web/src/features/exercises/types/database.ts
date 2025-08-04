// Database types that match our Supabase schema
export interface DatabaseExercise {
  id: string;
  name: string;
  alternative_names?: string[];
  category: string;
  description: string;
  icon: string;
  icon_color: string;
  is_popular: boolean;
  is_new: boolean;
  rating?: number;
  tags?: string[];
  related_exercise_ids?: string[];
  created_at: string;
  updated_at: string;
}

export interface DatabaseExerciseVariant {
  id: string;
  exercise_id: string;
  name: string;
  alternative_names?: string[];
  description: string;
  focus: string;
  difficulty: string;
  equipment: string[];
  muscle_groups: string[];
  secondary_muscles?: string[];
  is_unilateral: boolean;
  instructions: string[];
  prerequisites?: string[];
  created_at: string;
  updated_at: string;
}

export interface DatabaseInstructionStep {
  id: string;
  exercise_variant_id: string;
  step_order: number;
  title: string;
  description: string;
  created_at: string;
}

export interface DatabaseExerciseTips {
  id: string;
  exercise_variant_id: string;
  pro_tips: string[];
  common_mistakes: string[];
  safety_notes?: string[];
  created_at: string;
  updated_at: string;
}

export interface DatabaseExerciseMedia {
  id: string;
  exercise_variant_id: string;
  images?: string[];
  videos?: string[];
  featured_image?: string;
  featured_video?: string;
  created_at: string;
  updated_at: string;
}
