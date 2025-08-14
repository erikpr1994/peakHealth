'use client';

import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

interface DesktopNavigationProps {
  items: NavigationItem[];
  pathname: string;
}

export const DesktopNavigation = ({
  items,
  pathname,
}: DesktopNavigationProps): React.ReactElement => {
  // Helper function to check if a navigation item should be active
  const isNavigationItemActive = (
    itemPath: string,
    currentPathname: string
  ): boolean => {
    // Check if the current pathname starts with the item path
    // This handles sub-routes like /routines/create, /routines/123, etc.
    if (itemPath === '/dashboard') {
      // Dashboard should only be active for exact match
      return currentPathname === itemPath;
    }
    return currentPathname.startsWith(itemPath);
  };

  return (
    <nav className="hidden md:flex space-x-1">
      {items.map(item => {
        const Icon = item.icon;
        const isActive = isNavigationItemActive(item.path, pathname);
        return (
          <Link key={item.id} href={item.path}>
            <Button
              variant={isActive ? 'default' : 'ghost'}
              className="flex items-center gap-2 px-4 py-2"
            >
              <Icon className="w-4 h-4" />
              <span className="hidden lg:inline">{item.label}</span>
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};
