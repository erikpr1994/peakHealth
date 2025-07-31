"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useNotifications } from "@/contexts/NotificationsContext";
import { navigationItems } from "./header/menuItems";
import { DesktopNavigation } from "./header/DesktopNavigation";
import { MobileNavigation } from "./header/MobileNavigation";
import { NotificationsBell } from "./header/NotificationsBell";
import { UserMenu } from "./header/UserMenu";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { unreadCount } = useNotifications();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-primary">Peak Health</h1>
          </div>

          <DesktopNavigation
            items={navigationItems}
            pathname={pathname}
            onNavigate={(path) => router.push(path)}
          />

          <div className="flex items-center gap-3">
            <div className="md:hidden">
              {/* Mobile menu button could go here */}
            </div>
            <NotificationsBell unreadCount={unreadCount} />
            <UserMenu user={user} onLogout={logout} />
          </div>
        </div>
      </div>

      <MobileNavigation
        items={navigationItems}
        pathname={pathname}
        onNavigate={(path) => router.push(path)}
      />
    </header>
  );
}
