// Profile System Types

export interface UserProfile {
  id: string;
  bio?: string;
  fitness_level?: string;
  time_available?: string;
  equipment_access?: string;
  experience?: string;
  goals?: string[];
  workout_types?: string[];
  limitations?: string;
  motivation?: string;
  onboarding_completed_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserStats {
  user_id: string;
  total_workouts: number;
  days_active: number;
  hours_trained: number;
  achievements_count: number;
  last_updated: Date;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_type: string;
  title: string;
  description?: string;
  icon: string;
  earned_at: Date;
}

export interface FullUserProfile {
  profile: UserProfile;
  stats: UserStats;
  achievements: UserAchievement[];
}

// Profile update types
export interface ProfileUpdateData {
  bio?: string;
  fitness_level?: string;
  time_available?: string;
  equipment_access?: string;
  experience?: string;
  goals?: string[];
  workout_types?: string[];
  limitations?: string;
  motivation?: string;
}

// User metadata types (for basic profile info)
export interface UserMetadata {
  name?: string;
  display_name?: string;
  avatar_url?: string;
  phone?: string;
  location?: string;
  birth_date?: string;
  bio?: string;
  roles?: string[];
  groups?: string[];
}

// Extended user type with profile data
export interface ExtendedUserWithProfile {
  id: string;
  email: string;
  user_metadata: UserMetadata;
  profile: UserProfile;
  stats: UserStats;
  achievements: UserAchievement[];
}

// API response types
export interface ProfileApiResponse {
  profile: UserProfile;
  stats: UserStats;
  achievements: UserAchievement[];
}

export interface ProfileUpdateResponse {
  success: boolean;
  profile: UserProfile;
  message?: string;
}
