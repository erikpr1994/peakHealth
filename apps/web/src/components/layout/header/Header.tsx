'use client';

import { usePathname } from 'next/navigation';
import { useState, Suspense } from 'react';

import { DesktopNavigation } from './DesktopNavigation';
import styles from './Header.module.css';
import {
  getNavigationItems,
  getUserMenuItems,
  getSettingsMenuItems,
  getSupportMenuItems,
} from './menuItems';
import { SideNav } from './SideNav';
import { UserMenu } from './UserMenu';
import UserMenuSkeleton from './UserMenuSkeleton';

import { useAuth } from '@/features/auth/context/AuthContext';
import { FEATURE_FLAGS, useFeatureFlag } from '@/features/feature-flags';
import { useNotifications, NotificationsBell } from '@/features/notifications';
import { useNavigationFeatureFlags } from '@/hooks/useNavigationFeatureFlags';

const Header = (): React.ReactElement => {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { unreadCount } = useNotifications();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  // Only call useFeatureFlag if user is authenticated
  const { flags } = useFeatureFlag(
    user ? [FEATURE_FLAGS.NOTIFICATION_SYSTEM_FEATURE] : []
  );

  const isNotificationSystemEnabled =
    user && flags[FEATURE_FLAGS.NOTIFICATION_SYSTEM_FEATURE];

  // Get navigation feature flags
  const navigationFeatureFlags = useNavigationFeatureFlags();

  // Get filtered menu items
  const navigationItems = getNavigationItems({
    isCalendarEnabled: navigationFeatureFlags.isCalendarEnabled,
    isPerformanceEnabled: navigationFeatureFlags.isPerformanceEnabled,
    isHealthEnabled: navigationFeatureFlags.isHealthEnabled,
  });

  const userMenuItems = getUserMenuItems({
    isTrainerAndClubsEnabled: navigationFeatureFlags.isTrainerAndClubsEnabled,
    isGymsEnabled: navigationFeatureFlags.isGymsEnabled,
    isEquipmentEnabled: navigationFeatureFlags.isEquipmentEnabled,
    isSuggestionsEnabled: navigationFeatureFlags.isSuggestionsEnabled,
  });

  const settingsMenuItems = getSettingsMenuItems({
    isAccountSettingsEnabled: navigationFeatureFlags.isAccountSettingsEnabled,
    isAppSettingsEnabled: navigationFeatureFlags.isAppSettingsEnabled,
  });

  const supportMenuItems = getSupportMenuItems({
    isHelpSupportEnabled: navigationFeatureFlags.isHelpSupportEnabled,
  });

  return (
    <header className={styles.header}>
      <div
        className="w-full px-4 sm:px-6 lg:px-8"
        style={{ maxWidth: '100vw', boxSizing: 'border-box' }}
      >
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <SideNav
              items={navigationItems}
              pathname={pathname ?? ''}
              isOpen={isSideNavOpen}
              onOpenChange={setIsSideNavOpen}
            />
            <h1 className="text-xl font-bold text-primary hidden sm:block">
              Peak Health
            </h1>
          </div>

          <DesktopNavigation
            items={navigationItems}
            pathname={pathname ?? ''}
          />

          <div className="flex items-center gap-3">
            {isNotificationSystemEnabled && (
              <NotificationsBell unreadCount={unreadCount} />
            )}
            <Suspense fallback={<UserMenuSkeleton />}>
              <UserMenu
                user={user}
                onLogout={logout}
                userMenuItems={userMenuItems}
                settingsMenuItems={settingsMenuItems}
                supportMenuItems={supportMenuItems}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
