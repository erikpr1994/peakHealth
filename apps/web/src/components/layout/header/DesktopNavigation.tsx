'use client';

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
  onNavigate: (path: string) => void;
}

export const DesktopNavigation = ({
  items,
  pathname,
  onNavigate,
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
          <Button
            key={item.id}
            variant={isActive ? 'default' : 'ghost'}
            onClick={() => onNavigate(item.path)}
            className="flex items-center gap-2 px-4 py-2"
          >
            <Icon className="w-4 h-4" />
            <span className="hidden lg:inline">{item.label}</span>
          </Button>
        );
      })}
    </nav>
  );
};
