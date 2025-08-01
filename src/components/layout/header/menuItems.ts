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

export const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
  { id: 'routines', label: 'Routines', icon: BookOpen, path: '/routines' },
  { id: 'exercises', label: 'Exercises', icon: Dumbbell, path: '/exercises' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, path: '/calendar' },
  {
    id: 'performance',
    label: 'Performance',
    icon: BarChart3,
    path: '/performance',
  },
  { id: 'health', label: 'Health', icon: Heart, path: '/health' },
];

export const userMenuItems = [
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  {
    id: 'trainer-and-clubs',
    label: 'Trainer & Clubs',
    icon: Users,
    path: '/trainer-and-clubs',
  },
  { id: 'gyms', label: 'Gyms', icon: MapPin, path: '/gyms' },
  { id: 'equipment', label: 'Equipment', icon: Wrench, path: '/equipment' },
  {
    id: 'suggestions',
    label: 'Suggestions',
    icon: MessageSquare,
    path: '/suggestions',
  },
];

export const settingsMenuItems = [
  {
    id: 'account-settings',
    label: 'Account Settings',
    icon: Settings,
    path: '/account-settings',
  },
  {
    id: 'app-settings',
    label: 'App Settings',
    icon: Settings,
    path: '/app-settings',
  },
];

export const supportMenuItems = [
  {
    id: 'help-support',
    label: 'Help & Support',
    icon: HelpCircle,
    path: '/help-support',
  },
];

export { LogOut, Bell, ChevronDown };
