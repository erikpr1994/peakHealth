// Basic types for the routine domain
// These will be expanded as we implement more features

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  email: string;
  role: 'user' | 'trainer' | 'admin';
}

export interface Exercise extends BaseEntity {
  name: string;
  description?: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'balance' | 'sports';
  muscleGroups: string[];
  equipment: string[];
  instructions: string[];
  videoUrl?: string;
  imageUrl?: string;
}

export interface Section extends BaseEntity {
  name: string;
  type: 'strength' | 'cardio' | 'warmup' | 'cooldown';
  exercises: Exercise[];
  sets: number;
  reps?: number;
  duration?: number; // in seconds
  restTime: number; // in seconds
  order: number;
}

export interface Routine extends BaseEntity {
  name: string;
  description?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sections: Section[];
  createdBy: string; // User ID
  isPublic: boolean;
  tags: string[];
}

export interface WorkoutSession extends BaseEntity {
  routineId: string;
  userId: string;
  startedAt: Date;
  completedAt?: Date;
  status: 'in-progress' | 'completed' | 'abandoned';
  notes?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  service: 'routines-service';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  service: 'routines-service';
}

export interface ApiError {
  error: string;
  message: string;
  details?: Record<string, unknown>;
  service: 'routines-service';
}
