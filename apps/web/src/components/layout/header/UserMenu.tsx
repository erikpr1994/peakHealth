'use client';

import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { LogOut, ChevronDown } from './menuItems';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

interface UserMenuProps {
  user: User | null;
  onLogout: () => void;
  userMenuItems: MenuItem[];
  settingsMenuItems: MenuItem[];
  supportMenuItems: MenuItem[];
}

const getInitials = (email: string | undefined): string => {
  if (!email) return '';
  return email.substring(0, 2).toUpperCase();
};

const getUserDisplayName = (user: User | null): string => {
  if (!user) return '';

  // Try different possible name fields
  const name =
    user.user_metadata?.name ||
    user.user_metadata?.display_name ||
    user.user_metadata?.full_name ||
    user.email ||
    'User';

  return name;
};

const getUserEmail = (user: User | null): string => {
  if (!user) return '';

  // Try user_metadata.email first, then fallback to user.email
  return user.user_metadata?.email || user.email || '';
};

export const UserMenu = ({
  user,
  onLogout,
  userMenuItems,
  settingsMenuItems,
  supportMenuItems,
}: UserMenuProps): React.ReactElement => {
  const router = useRouter();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavigate = (path: string): void => {
    router.push(path);
    setUserDropdownOpen(false);
  };

  const menuSections = [userMenuItems, settingsMenuItems, supportMenuItems];

  return (
    <DropdownMenu open={userDropdownOpen} onOpenChange={setUserDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-2 py-1 h-auto"
          data-testid="user-menu-button"
        >
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={user?.user_metadata?.avatar_url}
              alt={getUserEmail(user)}
            />
            <AvatarFallback className="text-xs">
              {getInitials(getUserEmail(user))}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
              {getUserDisplayName(user)}
            </span>
            <span className="text-xs text-gray-500 truncate max-w-[150px]">
              {getUserEmail(user)}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
        {menuSections.map((section, index) => (
          <div key={index}>
            {section.map(item => {
              const Icon = item.icon;
              return (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </DropdownMenuItem>
              );
            })}
            {index < menuSections.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            onLogout();
            setUserDropdownOpen(false);
          }}
          className="flex items-center gap-2 text-red-600 focus:text-red-600"
          data-testid="logout-button"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
