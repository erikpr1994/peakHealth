'use client';

import { Bell, Moon, Sun, Shield } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  getDataScopeInfo,
  getNavigationItemByPath,
} from '@/lib/navigation-config';

export const Header = (): React.JSX.Element => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const getCurrentPageTitle = (): string => {
    const item = getNavigationItemByPath(pathname);
    return item?.label || 'Dashboard';
  };

  const scopeInfo = getDataScopeInfo(pathname);
  const IconComponent = scopeInfo.icon;

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* Data Context Indicator */}
          <div className="flex items-center gap-2">
            <Badge
              variant={
                scopeInfo.color as
                  | 'default'
                  | 'secondary'
                  | 'destructive'
                  | 'outline'
              }
            >
              <IconComponent className="h-3 w-3 mr-1" />
              {scopeInfo.label}
            </Badge>
          </div>

          <h1 className="font-medium">{getCurrentPageTitle()}</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <Badge variant="default">
            <Shield className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        </div>
      </div>
    </header>
  );
};
