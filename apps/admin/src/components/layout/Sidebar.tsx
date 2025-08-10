'use client';

import { LogOut, Shield } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { navigationSections } from '@/lib/navigation-config';

export const Sidebar = (): React.JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleNavigation = (path: string): void => {
    router.push(path);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Sidebar header - fixed */}
      <div className="p-4 space-y-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2>Peak Health</h2>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation menu - scrollable */}
      <div className="flex-1 px-4 space-y-6 overflow-y-auto">
        {navigationSections.map(section => (
          <div key={section.id}>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 text-left">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map(item => {
                const Icon = item.icon;
                const isActive = pathname === item.path;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center justify-start gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge
                        variant={item.badge.variant}
                        className="ml-auto text-xs flex-shrink-0"
                      >
                        {item.badge.text}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User profile at bottom - fixed */}
      <div className="p-4 border-t border-sidebar-border flex-shrink-0">
        <div className="flex items-center gap-3 p-2 rounded-lg border">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">
              System Administrator
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
