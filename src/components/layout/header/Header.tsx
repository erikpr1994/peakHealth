"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useNotifications } from "@/contexts/NotificationsContext";
import { navigationItems } from "./menuItems";
import { DesktopNavigation } from "./DesktopNavigation";
import { SideNav } from "./SideNav";
import { NotificationsBell } from "./NotificationsBell";
import { UserMenu } from "./UserMenu";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { unreadCount } = useNotifications();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsSideNavOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <SideNav
              items={navigationItems}
              onNavigate={handleNavigate}
              pathname={pathname ?? ""}
              isOpen={isSideNavOpen}
              onOpenChange={setIsSideNavOpen}
            />
            <h1 className="text-xl font-bold text-primary hidden sm:block">
              Peak Health
            </h1>
          </div>

          <DesktopNavigation
            items={navigationItems}
            pathname={pathname ?? ""}
            onNavigate={handleNavigate}
          />

          <div className="flex items-center gap-3">
            <NotificationsBell unreadCount={unreadCount} />
            <UserMenu user={user} onLogout={logout} />
          </div>
        </div>
      </div>
    </header>
  );
}
