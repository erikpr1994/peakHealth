"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface NotificationsBellProps {
  unreadCount: number;
}

export const NotificationsBell = ({ unreadCount }: NotificationsBellProps) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
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
              We&apos;ll let you know when something new comes up.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
