import React from 'react';
import {
  LayoutDashboard,
  Settings,
  Database,
  UserCheck,
  Building2,
  MessageSquare,
  HeadphonesIcon,
  BookOpen,
  ThumbsUp,
  Megaphone,
  Bell,
  Mail,
  Send,
  Rocket,
  Flag,
  Users,
  UserCog,
  Handshake,
  DollarSign,
} from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  scope: 'platform' | 'general';
  badge?: {
    text: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  };
}

export interface NavigationSection {
  id: string;
  title: string;
  items: NavigationItem[];
}

export const navigationSections: NavigationSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    items: [
      {
        id: 'dashboard',
        label: 'Overview',
        icon: LayoutDashboard,
        path: '/dashboard',
        scope: 'platform',
      },
    ],
  },
  {
    id: 'revenue',
    title: 'Revenue',
    items: [
      {
        id: 'revenue_analytics',
        label: 'Revenue Analytics',
        icon: DollarSign,
        path: '/revenue',
        scope: 'platform',
        badge: {
          text: '$124K',
          variant: 'secondary',
        },
      },
      {
        id: 'subscription_tiers',
        label: 'Subscription Tiers',
        icon: Database,
        path: '/subscription-tiers',
        scope: 'general',
        badge: {
          text: '6',
          variant: 'secondary',
        },
      },
    ],
  },
  {
    id: 'user_management',
    title: 'User Management',
    items: [
      {
        id: 'users',
        label: 'Users',
        icon: Users,
        path: '/users',
        scope: 'general',
        badge: {
          text: '2.4K',
          variant: 'secondary',
        },
      },
      {
        id: 'trainers',
        label: 'Trainer Management',
        icon: UserCheck,
        path: '/trainers',
        scope: 'general',
        badge: {
          text: '48',
          variant: 'secondary',
        },
      },
      {
        id: 'feedback',
        label: 'User Feedback',
        icon: ThumbsUp,
        path: '/feedback',
        scope: 'platform',
        badge: {
          text: '4.8',
          variant: 'secondary',
        },
      },
      {
        id: 'user_types',
        label: 'User Types & Groups',
        icon: UserCog,
        path: '/user-types',
        scope: 'general',
        badge: {
          text: '12',
          variant: 'secondary',
        },
      },
    ],
  },
  {
    id: 'partners',
    title: 'Partners & Business',
    items: [
      {
        id: 'gyms',
        label: 'Gym Partnerships',
        icon: Building2,
        path: '/gyms',
        scope: 'general',
        badge: {
          text: '12',
          variant: 'secondary',
        },
      },
      {
        id: 'partners',
        label: 'Partner Management',
        icon: Handshake,
        path: '/partners',
        scope: 'general',
        badge: {
          text: '8',
          variant: 'secondary',
        },
      },
    ],
  },
  {
    id: 'content',
    title: 'Content & Features',
    items: [
      {
        id: 'content',
        label: 'Content Management',
        icon: Database,
        path: '/content',
        scope: 'general',
        badge: {
          text: '1.2K',
          variant: 'secondary',
        },
      },
      {
        id: 'knowledge',
        label: 'Knowledge Base',
        icon: BookOpen,
        path: '/knowledge',
        scope: 'general',
        badge: {
          text: '124',
          variant: 'secondary',
        },
      },
      {
        id: 'features',
        label: 'Feature Flags',
        icon: Flag,
        path: '/features',
        scope: 'general',
        badge: {
          text: '23',
          variant: 'secondary',
        },
      },
      {
        id: 'roadmap',
        label: 'Product Roadmap',
        icon: Rocket,
        path: '/roadmap',
        scope: 'platform',
        badge: {
          text: '8',
          variant: 'secondary',
        },
      },
      {
        id: 'suggestions',
        label: 'Content Suggestions',
        icon: MessageSquare,
        path: '/suggestions',
        scope: 'general',
        badge: {
          text: '3',
          variant: 'destructive',
        },
      },
    ],
  },
  {
    id: 'communication',
    title: 'Communication',
    items: [
      {
        id: 'announcements',
        label: 'Platform Announcements',
        icon: Megaphone,
        path: '/announcements',
        scope: 'platform',
        badge: {
          text: '5',
          variant: 'secondary',
        },
      },
      {
        id: 'notifications',
        label: 'Push Notifications',
        icon: Bell,
        path: '/notifications',
        scope: 'general',
        badge: {
          text: '89%',
          variant: 'secondary',
        },
      },
      {
        id: 'emails',
        label: 'Email Templates',
        icon: Mail,
        path: '/emails',
        scope: 'general',
        badge: {
          text: '18',
          variant: 'secondary',
        },
      },
      {
        id: 'comm_logs',
        label: 'Communication Logs',
        icon: Send,
        path: '/communication-logs',
        scope: 'platform',
        badge: {
          text: '2.3K',
          variant: 'secondary',
        },
      },
    ],
  },
  {
    id: 'system',
    title: 'System & Support',
    items: [
      {
        id: 'support',
        label: 'Support Tickets',
        icon: HeadphonesIcon,
        path: '/support',
        scope: 'general',
        badge: {
          text: '12',
          variant: 'destructive',
        },
      },
      {
        id: 'settings',
        label: 'System Settings',
        icon: Settings,
        path: '/settings',
        scope: 'general',
      },
      {
        id: 'user_defaults',
        label: 'User Defaults',
        icon: UserCog,
        path: '/user-defaults',
        scope: 'general',
      },
    ],
  },
];

export const getAllNavigationItems = (): NavigationItem[] => {
  return navigationSections.flatMap(section => section.items);
};

export const getNavigationItemByPath = (
  path: string
): NavigationItem | undefined => {
  return getAllNavigationItems().find(item => item.path === path);
};

export const getDataScopeInfo = (path: string) => {
  const item = getNavigationItemByPath(path);

  if (!item) {
    return {
      scope: 'general',
      label: 'General',
      icon: Settings,
      color: 'secondary',
    };
  }

  switch (item.scope) {
    case 'platform':
      return {
        scope: 'platform',
        label: 'Platform Wide',
        icon: item.icon,
        color: 'default',
      };
    case 'general':
      return {
        scope: 'general',
        label: 'System Wide',
        icon: item.icon,
        color: 'secondary',
      };
    default:
      return {
        scope: 'general',
        label: 'General',
        icon: Settings,
        color: 'secondary',
      };
  }
};
