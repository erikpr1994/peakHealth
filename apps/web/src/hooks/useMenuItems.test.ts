import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
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
} from 'lucide-react';
import {
  useNavigationItems,
  useUserMenuItems,
  useSettingsMenuItems,
  useSupportMenuItems,
} from './useMenuItems';

// Mock the useTranslations hook
vi.mock('./useTranslations', () => ({
  useTranslations: vi.fn(),
}));

import { useTranslations } from './useTranslations';

const mockUseTranslations = useTranslations as ReturnType<typeof vi.fn>;

describe('useMenuItems', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation
    mockUseTranslations.mockReturnValue((key: string) => key);
  });

  describe('useNavigationItems', () => {
    it('should return navigation items with translations', () => {
      const featureFlags = {
        isCalendarEnabled: true,
        isPerformanceEnabled: true,
        isHealthEnabled: true,
      };

      const { result } = renderHook(() => useNavigationItems(featureFlags));

      expect(mockUseTranslations).toHaveBeenCalledWith('navigation');
      expect(result.current).toEqual([
        { id: 'dashboard', label: 'dashboard', icon: Home, path: '/dashboard' },
        {
          id: 'routines',
          label: 'routines',
          icon: BookOpen,
          path: '/routines',
        },
        {
          id: 'exercises',
          label: 'exercises',
          icon: Dumbbell,
          path: '/exercises',
        },
        {
          id: 'calendar',
          label: 'calendar',
          icon: Calendar,
          path: '/calendar',
        },
        {
          id: 'performance',
          label: 'performance',
          icon: BarChart3,
          path: '/performance',
        },
        { id: 'health', label: 'health', icon: Heart, path: '/health' },
      ]);
    });

    it('should filter out disabled features', () => {
      const featureFlags = {
        isCalendarEnabled: false,
        isPerformanceEnabled: false,
        isHealthEnabled: false,
      };

      const { result } = renderHook(() => useNavigationItems(featureFlags));

      expect(result.current).toEqual([
        { id: 'dashboard', label: 'dashboard', icon: Home, path: '/dashboard' },
        {
          id: 'routines',
          label: 'routines',
          icon: BookOpen,
          path: '/routines',
        },
        {
          id: 'exercises',
          label: 'exercises',
          icon: Dumbbell,
          path: '/exercises',
        },
      ]);
    });
  });

  describe('useUserMenuItems', () => {
    it('should return user menu items with translations', () => {
      const featureFlags = {
        isTrainerAndClubsEnabled: true,
        isGymsEnabled: true,
        isEquipmentEnabled: true,
        isSuggestionsEnabled: true,
      };

      const { result } = renderHook(() => useUserMenuItems(featureFlags));

      expect(mockUseTranslations).toHaveBeenCalledWith('navigation');
      expect(result.current).toEqual([
        { id: 'profile', label: 'profile', icon: User, path: '/profile' },
        {
          id: 'trainer-and-clubs',
          label: 'trainerAndClubs',
          icon: Users,
          path: '/trainer-and-clubs',
        },
        { id: 'gyms', label: 'gyms', icon: MapPin, path: '/gyms' },
        {
          id: 'equipment',
          label: 'equipment',
          icon: Wrench,
          path: '/equipment',
        },
        {
          id: 'suggestions',
          label: 'suggestions',
          icon: MessageSquare,
          path: '/suggestions',
        },
      ]);
    });

    it('should filter out disabled features', () => {
      const featureFlags = {
        isTrainerAndClubsEnabled: false,
        isGymsEnabled: false,
        isEquipmentEnabled: false,
        isSuggestionsEnabled: false,
      };

      const { result } = renderHook(() => useUserMenuItems(featureFlags));

      expect(result.current).toEqual([
        { id: 'profile', label: 'profile', icon: User, path: '/profile' },
      ]);
    });
  });

  describe('useSettingsMenuItems', () => {
    it('should return settings menu items with translations', () => {
      const featureFlags = {
        isAccountSettingsEnabled: true,
        isAppSettingsEnabled: true,
      };

      const { result } = renderHook(() => useSettingsMenuItems(featureFlags));

      expect(mockUseTranslations).toHaveBeenCalledWith('navigation');
      expect(result.current).toEqual([
        {
          id: 'account-settings',
          label: 'accountSettings',
          icon: Settings,
          path: '/account-settings',
        },
        {
          id: 'app-settings',
          label: 'appSettings',
          icon: Settings,
          path: '/app-settings',
        },
      ]);
    });

    it('should filter out disabled features', () => {
      const featureFlags = {
        isAccountSettingsEnabled: false,
        isAppSettingsEnabled: false,
      };

      const { result } = renderHook(() => useSettingsMenuItems(featureFlags));

      expect(result.current).toEqual([]);
    });
  });

  describe('useSupportMenuItems', () => {
    it('should return support menu items with translations when enabled', () => {
      const featureFlags = {
        isHelpSupportEnabled: true,
      };

      const { result } = renderHook(() => useSupportMenuItems(featureFlags));

      expect(mockUseTranslations).toHaveBeenCalledWith('navigation');
      expect(result.current).toEqual([
        {
          id: 'help-support',
          label: 'helpSupport',
          icon: HelpCircle,
          path: '/help-support',
        },
      ]);
    });

    it('should return empty array when disabled', () => {
      const featureFlags = {
        isHelpSupportEnabled: false,
      };

      const { result } = renderHook(() => useSupportMenuItems(featureFlags));

      expect(result.current).toEqual([]);
    });
  });
});
