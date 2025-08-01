"use client";

import { Menu } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

interface SideNavProps {
  items: NavigationItem[];
  onNavigate: (path: string) => void;
  pathname: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SideNav = ({
  items,
  onNavigate,
  pathname,
  isOpen,
  onOpenChange,
}: SideNavProps) => {
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
              const isActive = pathname === item.path;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  onClick={() => onNavigate(item.path)}
                  className="flex items-center justify-start gap-3"
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};
