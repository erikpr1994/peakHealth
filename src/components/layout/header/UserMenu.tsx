"use client";

import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  userMenuItems,
  settingsMenuItems,
  supportMenuItems,
  LogOut,
  ChevronDown,
} from "./menuItems";

interface UserMenuProps {
  user: User | null;
  onLogout: () => void;
}

const getInitials = (email: string | undefined) => {
  if (!email) return "";
  return email.substring(0, 2).toUpperCase();
};

export const UserMenu = ({ user, onLogout }: UserMenuProps) => {
  const router = useRouter();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavigate = (path: string) => {
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
        >
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={user?.user_metadata.avatar_url}
              alt={user?.email ?? ""}
            />
            <AvatarFallback className="text-xs">
              {getInitials(user?.email)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
              {user?.user_metadata.display_name ??
                user?.user_metadata.full_name ??
                user?.email}
            </span>
            <span className="text-xs text-gray-500 truncate max-w-[150px]">
              {user?.user_metadata.email}
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
        >
          <LogOut className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
