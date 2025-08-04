import {
  Home,
  Dumbbell,
  BookOpen,
  Calendar,
  BarChart3,
  Heart,
  User,
  Settings,
  MapPin,
  Wrench,
  MessageSquare,
  HelpCircle,
  Users,
  LogOut,
  Bell,
  ChevronDown,
} from 'lucide-react';

export const getNavigationItems = (featureFlags: {
  isCalendarEnabled: boolean;
  isPerformanceEnabled: boolean;
  isHealthEnabled: boolean;
}) => [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
  { id: 'routines', label: 'Routines', icon: BookOpen, path: '/routines' },
  { id: 'exercises', label: 'Exercises', icon: Dumbbell, path: '/exercises' },
  ...(featureFlags.isCalendarEnabled
    ? [{ id: 'calendar', label: 'Calendar', icon: Calendar, path: '/calendar' }]
    : []),
  ...(featureFlags.isPerformanceEnabled
    ? [
        {
          id: 'performance',
          label: 'Performance',
          icon: BarChart3,
          path: '/performance',
        },
      ]
    : []),
  ...(featureFlags.isHealthEnabled
    ? [{ id: 'health', label: 'Health', icon: Heart, path: '/health' }]
    : []),
];

export const getUserMenuItems = (featureFlags: {
  isTrainerAndClubsEnabled: boolean;
  isGymsEnabled: boolean;
  isEquipmentEnabled: boolean;
  isSuggestionsEnabled: boolean;
}) => [
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ...(featureFlags.isTrainerAndClubsEnabled
    ? [
        {
          id: 'trainer-and-clubs',
          label: 'Trainer & Clubs',
          icon: Users,
          path: '/trainer-and-clubs',
        },
      ]
    : []),
  ...(featureFlags.isGymsEnabled
    ? [{ id: 'gyms', label: 'Gyms', icon: MapPin, path: '/gyms' }]
    : []),
  ...(featureFlags.isEquipmentEnabled
    ? [
        {
          id: 'equipment',
          label: 'Equipment',
          icon: Wrench,
          path: '/equipment',
        },
      ]
    : []),
  ...(featureFlags.isSuggestionsEnabled
    ? [
        {
          id: 'suggestions',
          label: 'Suggestions',
          icon: MessageSquare,
          path: '/suggestions',
        },
      ]
    : []),
];

export const getSettingsMenuItems = (featureFlags: {
  isAccountSettingsEnabled: boolean;
  isAppSettingsEnabled: boolean;
}) => [
  ...(featureFlags.isAccountSettingsEnabled
    ? [
        {
          id: 'account-settings',
          label: 'Account Settings',
          icon: Settings,
          path: '/account-settings',
        },
      ]
    : []),
  ...(featureFlags.isAppSettingsEnabled
    ? [
        {
          id: 'app-settings',
          label: 'App Settings',
          icon: Settings,
          path: '/app-settings',
        },
      ]
    : []),
];

export const getSupportMenuItems = (featureFlags: {
  isHelpSupportEnabled: boolean;
}) => [
  ...(featureFlags.isHelpSupportEnabled
    ? [
        {
          id: 'help-support',
          label: 'Help & Support',
          icon: HelpCircle,
          path: '/help-support',
        },
      ]
    : []),
];

export { LogOut, Bell, ChevronDown };
