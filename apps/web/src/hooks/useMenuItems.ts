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
  type LucideIcon,
} from 'lucide-react';
import { useTranslations } from './useTranslations';

export const useNavigationItems = (featureFlags: {
  isCalendarEnabled: boolean;
  isPerformanceEnabled: boolean;
  isHealthEnabled: boolean;
}): Array<{
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}> => {
  const t = useTranslations('navigation');

  return [
    { id: 'dashboard', label: t('dashboard'), icon: Home, path: '/dashboard' },
    { id: 'routines', label: t('routines'), icon: BookOpen, path: '/routines' },
    {
      id: 'exercises',
      label: t('exercises'),
      icon: Dumbbell,
      path: '/exercises',
    },
    ...(featureFlags.isCalendarEnabled
      ? [
          {
            id: 'calendar',
            label: t('calendar'),
            icon: Calendar,
            path: '/calendar',
          },
        ]
      : []),
    ...(featureFlags.isPerformanceEnabled
      ? [
          {
            id: 'performance',
            label: t('performance'),
            icon: BarChart3,
            path: '/performance',
          },
        ]
      : []),
    ...(featureFlags.isHealthEnabled
      ? [{ id: 'health', label: t('health'), icon: Heart, path: '/health' }]
      : []),
  ];
};

export const useUserMenuItems = (featureFlags: {
  isTrainerAndClubsEnabled: boolean;
  isGymsEnabled: boolean;
  isEquipmentEnabled: boolean;
  isSuggestionsEnabled: boolean;
}): Array<{
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}> => {
  const t = useTranslations('navigation');

  return [
    { id: 'profile', label: t('profile'), icon: User, path: '/profile' },
    ...(featureFlags.isTrainerAndClubsEnabled
      ? [
          {
            id: 'trainer-and-clubs',
            label: t('trainerAndClubs'),
            icon: Users,
            path: '/trainer-and-clubs',
          },
        ]
      : []),
    ...(featureFlags.isGymsEnabled
      ? [{ id: 'gyms', label: t('gyms'), icon: MapPin, path: '/gyms' }]
      : []),
    ...(featureFlags.isEquipmentEnabled
      ? [
          {
            id: 'equipment',
            label: t('equipment'),
            icon: Wrench,
            path: '/equipment',
          },
        ]
      : []),
    ...(featureFlags.isSuggestionsEnabled
      ? [
          {
            id: 'suggestions',
            label: t('suggestions'),
            icon: MessageSquare,
            path: '/suggestions',
          },
        ]
      : []),
  ];
};

export const useSettingsMenuItems = (featureFlags: {
  isAccountSettingsEnabled: boolean;
  isAppSettingsEnabled: boolean;
}): Array<{
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}> => {
  const t = useTranslations('navigation');

  return [
    ...(featureFlags.isAccountSettingsEnabled
      ? [
          {
            id: 'account-settings',
            label: t('accountSettings'),
            icon: Settings,
            path: '/account-settings',
          },
        ]
      : []),
    ...(featureFlags.isAppSettingsEnabled
      ? [
          {
            id: 'app-settings',
            label: t('appSettings'),
            icon: Settings,
            path: '/app-settings',
          },
        ]
      : []),
  ];
};

export const useSupportMenuItems = (featureFlags: {
  isHelpSupportEnabled: boolean;
}): Array<{
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}> => {
  const t = useTranslations('navigation');

  return [
    ...(featureFlags.isHelpSupportEnabled
      ? [
          {
            id: 'help-support',
            label: t('helpSupport'),
            icon: HelpCircle,
            path: '/help-support',
          },
        ]
      : []),
  ];
};

export { LogOut, Bell, ChevronDown };
