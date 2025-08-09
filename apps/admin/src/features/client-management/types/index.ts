export interface Client {
  id: string;
  email: string;
  created_at: string;
  updated_at?: string;
  profile?: ClientProfile;
  stats?: ClientStats;
  user_types?: string[];
  primary_user_type?: string;
  subscription_tier?: string;
  groups?: string[];
  permissions?: Record<string, boolean>;
  features?: string[];
  data_access_rules?: Record<string, string>;
}

export interface ClientProfile {
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
  onboarding_completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ClientStats {
  user_id: string;
  total_workouts: number;
  days_active: number;
  hours_trained: number;
  achievements_count: number;
  last_updated: string;
}

export interface ClientAchievement {
  id: string;
  user_id: string;
  achievement_type: string;
  title: string;
  description?: string;
  icon: string;
  earned_at: string;
}

export interface ClientFilters {
  status?: 'active' | 'inactive';
  user_type?: string;
  subscription_tier?: string;
  search?: string;
  has_program?: boolean;
}

export interface ClientListResponse {
  clients: Client[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AddClientData {
  email: string;
  user_type?: string;
  subscription_tier?: string;
  groups?: string[];
  profile?: Partial<ClientProfile>;
}

export interface UpdateClientData {
  user_type?: string;
  subscription_tier?: string;
  groups?: string[];
  profile?: Partial<ClientProfile>;
}

export interface AssignProgramData {
  client_id: string;
  program_name: string;
  start_date: string;
  goals?: string[];
  notes?: string;
}
