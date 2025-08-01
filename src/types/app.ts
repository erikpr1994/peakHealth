export type AppState = 'landing' | 'auth' | 'app';

export type Page =
  | 'dashboard'
  | 'exercises'
  | 'exercise-detail'
  | 'routines'
  | 'routine-detail'
  | 'edit-routine'
  | 'create-routine'
  | 'calendar'
  | 'performance'
  | 'health'
  | 'profile'
  | 'gyms'
  | 'create-gym'
  | 'suggest-gym'
  | 'edit-gym'
  | 'gym-detail'
  | 'equipment'
  | 'suggest-equipment'
  | 'edit-equipment'
  | 'equipment-detail'
  | 'suggestions'
  | 'suggest-exercise'
  | 'account-settings'
  | 'app-settings'
  | 'workout-tracker'
  | 'trainer-and-clubs'
  | 'statistics';

export interface OnboardingData {
  name: string;
  fitnessLevel: string;
  goals: string[];
  timeAvailable: string;
  equipmentAccess: string;
  workoutTypes: string[];
  experience: string;
  limitations: string;
  motivation: string;
  completedAt: Date;
}

export interface NavigateFunction {
  (page: Page, itemId?: string): void;
}

export interface AppContextType {
  currentPage: Page;
  selectedItemId: string | null;
  hasTrainer: boolean;
  isClubMember: boolean;
  onboardingData: OnboardingData;
  onNavigate: NavigateFunction;
  onToggleTrainer: () => void;
  onToggleClubMembership: () => void;
}
