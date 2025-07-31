"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Notification {
  id: string;
  type:
    | "workout_reminder"
    | "trainer_message"
    | "achievement"
    | "club_event"
    | "system"
    | "suggestion_status"
    | "routine_update";
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: "normal" | "high" | "urgent";
  actionUrl?: string;
  actionText?: string;
  metadata?: {
    trainerId?: string;
    trainerName?: string;
    clubId?: string;
    clubName?: string;
    routineId?: string;
    routineName?: string;
    achievementId?: string;
    suggestionId?: string;
  };
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp">
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return context;
};

interface NotificationsProviderProps {
  children: ReactNode;
  hasTrainer: boolean;
  isClubMember: boolean;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({
  children,
  hasTrainer,
  isClubMember,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("peak-health-notifications");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Convert timestamp strings back to Date objects
        return parsed.map((notif: any) => ({
          ...notif,
          timestamp: new Date(notif.timestamp),
        }));
      }
    }
    return [];
  });

  // Initialize with mock notifications based on user status
  useEffect(() => {
    if (notifications.length === 0) {
      const mockNotifications: Notification[] = [];

      // Add trainer-specific notifications
      if (hasTrainer) {
        mockNotifications.push(
          {
            id: "trainer-1",
            type: "trainer_message",
            title: "New Message from Sarah Johnson",
            message:
              "Great work on yesterday's leg workout! I've updated your routine for next week with some new exercises.",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            isRead: false,
            priority: "high",
            actionUrl: "trainer-and-clubs",
            actionText: "View Message",
            metadata: {
              trainerId: "trainer-sarah",
              trainerName: "Sarah Johnson",
            },
          },
          {
            id: "routine-1",
            type: "routine_update",
            title: "Routine Updated",
            message:
              'Your trainer has updated your "Full Body Split" routine with new exercises and rep ranges.',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
            isRead: false,
            priority: "normal",
            actionUrl: "routines",
            actionText: "View Routine",
            metadata: {
              trainerId: "trainer-sarah",
              trainerName: "Sarah Johnson",
              routineId: "full-body-split",
              routineName: "Full Body Split",
            },
          }
        );
      }

      // Add club-specific notifications
      if (isClubMember) {
        mockNotifications.push({
          id: "club-1",
          type: "club_event",
          title: "Morning 5K Run Tomorrow",
          message:
            "Don't forget about the group run at Central Park tomorrow at 6:00 AM. 25 runners already signed up!",
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          isRead: false,
          priority: "normal",
          actionUrl: "trainer-and-clubs",
          actionText: "View Event",
          metadata: {
            clubId: "morning-runners",
            clubName: "Morning Runners Club",
          },
        });
      }

      // Add general notifications
      mockNotifications.push(
        {
          id: "achievement-1",
          type: "achievement",
          title: "Achievement Unlocked: Week Warrior!",
          message:
            "Congratulations! You've completed all your workouts this week. Keep up the excellent work!",
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          isRead: false,
          priority: "high",
          actionUrl: "statistics",
          actionText: "View Achievement",
          metadata: {
            achievementId: "week-warrior",
          },
        },
        {
          id: "workout-1",
          type: "workout_reminder",
          title: "Workout Reminder",
          message:
            "Your Upper Body Strength workout is scheduled for today. Ready to crush those goals?",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
          isRead: true,
          priority: "normal",
          actionUrl: "dashboard",
          actionText: "Start Workout",
        },
        {
          id: "suggestion-1",
          type: "suggestion_status",
          title: "Equipment Suggestion Approved",
          message:
            'Your suggestion for "Adjustable Dumbbells Set" has been approved and added to the equipment database.',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          isRead: true,
          priority: "normal",
          actionUrl: "equipment",
          actionText: "View Equipment",
          metadata: {
            suggestionId: "suggestion-equipment-1",
          },
        },
        {
          id: "system-1",
          type: "system",
          title: "New Features Available",
          message:
            "We've added new progress tracking features and improved the workout timer. Check them out!",
          timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
          isRead: true,
          priority: "normal",
        }
      );

      setNotifications(mockNotifications);
    }
  }, [hasTrainer, isClubMember, notifications.length]);

  // Save to localStorage whenever notifications change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "peak-health-notifications",
        JSON.stringify(notifications)
      );
    }
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const addNotification = (
    notification: Omit<Notification, "id" | "timestamp">
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      timestamp: new Date(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
