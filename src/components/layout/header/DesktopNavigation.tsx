"use client";

import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

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
}: DesktopNavigationProps) => {
  return (
    <nav className="hidden md:flex space-x-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        return (
          <Button
            key={item.id}
            variant={isActive ? "default" : "ghost"}
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
