"use client";

import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

interface MobileNavigationProps {
  items: NavigationItem[];
  pathname: string;
  onNavigate: (path: string) => void;
}

export const MobileNavigation = ({
  items,
  pathname,
  onNavigate,
}: MobileNavigationProps) => {
  return (
    <div className="md:hidden border-t border-gray-200 bg-white">
      <div className="flex overflow-x-auto py-2 px-4 space-x-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              onClick={() => onNavigate(item.path)}
              className="flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 min-w-16"
              size="sm"
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
