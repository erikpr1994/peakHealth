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
import { useNotifications, NotificationsBell } from '@/features/notifications';

const Header = (): React.ReactElement => {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { unreadCount } = useNotifications();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  // Get all menu items without feature flag filtering
  const navigationItems = getNavigationItems({
    isCalendarEnabled: true,
    isPerformanceEnabled: true,
    isHealthEnabled: true,
  });

  const userMenuItems = getUserMenuItems({
    isTrainerAndClubsEnabled: true,
    isGymsEnabled: true,
    isEquipmentEnabled: true,
    isSuggestionsEnabled: true,
  });

  const settingsMenuItems = getSettingsMenuItems({
    isAccountSettingsEnabled: true,
    isAppSettingsEnabled: true,
  });

  const supportMenuItems = getSupportMenuItems({
    isHelpSupportEnabled: true,
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
            {user && <NotificationsBell unreadCount={unreadCount} />}
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
