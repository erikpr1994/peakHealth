"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Dumbbell,
  BookOpen,
  Calendar,
  BarChart3,
  Heart,
  User,
  Settings,
  LogOut,
  MapPin,
  ChevronDown,
  Wrench,
  MessageSquare,
  HelpCircle,
  Users,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/contexts/NotificationsContext";
import { useAppContext } from "@/contexts/AppContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const { toggleTrainer, toggleClubMembership } = useAppContext();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { unreadCount } = useNotifications();

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
    { id: "routines", label: "Routines", icon: BookOpen, path: "/routines" },
    { id: "exercises", label: "Exercises", icon: Dumbbell, path: "/exercises" },
    { id: "calendar", label: "Calendar", icon: Calendar, path: "/calendar" },
    {
      id: "performance",
      label: "Performance",
      icon: BarChart3,
      path: "/performance",
    },
    { id: "health", label: "Health", icon: Heart, path: "/health" },
  ];

  const userMenuItems = [
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
    {
      id: "trainer-and-clubs",
      label: "Trainer & Clubs",
      icon: Users,
      path: "/trainer-and-clubs",
    },
    { id: "gyms", label: "Gyms", icon: MapPin, path: "/gyms" },
    { id: "equipment", label: "Equipment", icon: Wrench, path: "/equipment" },
    {
      id: "suggestions",
      label: "Suggestions",
      icon: MessageSquare,
      path: "/suggestions",
    },
  ];

  const settingsMenuItems = [
    {
      id: "account-settings",
      label: "Account Settings",
      icon: Settings,
      path: "/account-settings",
    },
    {
      id: "app-settings",
      label: "App Settings",
      icon: Settings,
      path: "/app-settings",
    },
  ];

  const supportMenuItems = [
    {
      id: "help-support",
      label: "Help & Support",
      icon: HelpCircle,
      path: "/help-support",
    },
  ];

  // Mock user data - in a real app, this would come from authentication context
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "/api/placeholder/32/32",
    initials: "AJ",
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-primary">Peak Health</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => router.push(item.path)}
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* Right side - Notifications and User */}
          <div className="flex items-center gap-3">
            {/* Mobile Navigation Toggle - you might want to add a mobile menu here */}
            <div className="md:hidden">
              {/* Mobile menu button could go here */}
            </div>

            {/* Notifications */}
            <Popover
              open={notificationsOpen}
              onOpenChange={setNotificationsOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative p-2 hover:bg-gray-100 transition-colors rounded-lg"
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-semibold bg-red-500 hover:bg-red-500 text-white border-2 border-white">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="p-0 w-auto border-0 shadow-lg"
                align="end"
                side="bottom"
                sideOffset={8}
              >
                <div className="p-4 w-80">
                  <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                  <div className="text-center text-gray-500 py-8">
                    <Bell className="w-12 h-12 mx-auto text-gray-300" />
                    <p className="mt-2 font-medium">No new notifications</p>
                    <p className="text-sm text-gray-400">
                      We'll let you know when something new comes up.
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* User Dropdown */}
            <DropdownMenu
              open={userDropdownOpen}
              onOpenChange={setUserDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2 py-1 h-auto"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-xs">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-gray-700">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {userMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => {
                        router.push(item.path);
                        setUserDropdownOpen(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </DropdownMenuItem>
                  );
                })}

                <DropdownMenuSeparator />

                {settingsMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => {
                        router.push(item.path);
                        setUserDropdownOpen(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </DropdownMenuItem>
                  );
                })}

                <DropdownMenuSeparator />

                {supportMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => {
                        router.push(item.path);
                        setUserDropdownOpen(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </DropdownMenuItem>
                  );
                })}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    setUserDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 text-red-600 focus:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Show on smaller screens */}
      <div className="md:hidden border-t border-gray-200 bg-white">
        <div className="flex overflow-x-auto py-2 px-4 space-x-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                onClick={() => router.push(item.path)}
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
    </header>
  );
}
