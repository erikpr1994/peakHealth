'use client';

import Link from 'next/link';
import { Menu, type LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

interface SideNavProps {
  items: NavigationItem[];
  pathname: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SideNav = ({
  items,
  pathname,
  isOpen,
  onOpenChange,
}: SideNavProps): React.ReactElement => {
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
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Peak Health</SheetTitle>
          </SheetHeader>
          <nav className="mt-8 flex flex-col gap-2">
            {items.map(item => {
              const Icon = item.icon;
              const isActive = isNavigationItemActive(item.path, pathname);
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={() => onOpenChange(false)}
                >
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className="flex items-center justify-start gap-3 w-full"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};
