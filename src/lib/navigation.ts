import { Page } from '../types/app';

/**
 * Determines if a page requires an item ID
 */
export function pageRequiresItemId(page: Page): boolean {
  const pagesWithItemId: Page[] = [
    'exercise-detail',
    'routine-detail',
    'edit-gym',
    'gym-detail',
    'edit-equipment',
    'equipment-detail',
    'workout-tracker'
  ];
  
  return pagesWithItemId.includes(page);
}

/**
 * Gets the display name for a page
 */
export function getPageDisplayName(page: Page): string {
  const pageNames: Record<Page, string> = {
    'dashboard': 'Dashboard',
    'exercises': 'Exercises',
    'exercise-detail': 'Exercise Detail',
    'routines': 'Routines',
    'routine-detail': 'Routine Detail',
    'edit-routine': 'Edit Routine',
    'create-routine': 'Create Routine',
    'calendar': 'Calendar',
    'performance': 'Performance',
    'health': 'Health',
    'profile': 'Profile',
    'gyms': 'Gyms',
    'create-gym': 'Create Gym',
    'suggest-gym': 'Suggest Gym',
    'edit-gym': 'Edit Gym',
    'gym-detail': 'Gym Detail',
    'equipment': 'Equipment',
    'suggest-equipment': 'Suggest Equipment',
    'edit-equipment': 'Edit Equipment',
    'equipment-detail': 'Equipment Detail',
    'suggestions': 'Suggestions',
    'suggest-exercise': 'Suggest Exercise',
    'account-settings': 'Account Settings',
    'app-settings': 'App Settings',
    'workout-tracker': 'Workout Tracker',
    'trainer-and-clubs': 'Trainer & Clubs',
    'statistics': 'Statistics',
  };

  return pageNames[page] || page;
}