'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { DesktopNavigation } from './DesktopNavigation';
import styles from './Header.module.css';
import { navigationItems } from './menuItems';
import { SideNav } from './SideNav';
import { UserMenu } from './UserMenu';

import { useAuth } from '@/features/auth/context/AuthContext';
import { FEATURE_FLAGS, useFeatureFlag } from '@/features/feature-flags';
import { useNotifications, NotificationsBell } from '@/features/notifications';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { unreadCount } = useNotifications();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const { flags } = useFeatureFlag([FEATURE_FLAGS.NOTIFICATION_SYSTEM_FEATURE]);

  const isNotificationSystemEnabled =
    flags[FEATURE_FLAGS.NOTIFICATION_SYSTEM_FEATURE];

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsSideNavOpen(false);
  };

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
              onNavigate={handleNavigate}
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
            onNavigate={handleNavigate}
          />

          <div className="flex items-center gap-3">
            {isNotificationSystemEnabled && (
              <NotificationsBell unreadCount={unreadCount} />
            )}
            <UserMenu user={user} onLogout={logout} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
