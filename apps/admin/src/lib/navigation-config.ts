import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Database,
  UserCheck,
  Building2,
  MessageSquare,
  HeadphonesIcon,
  Activity,
  BookOpen,
  ThumbsUp,
  Megaphone,
  Bell,
  Mail,
  Send,
  Rocket,
  Flag,
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
    id: 'analytics',
    title: 'Analytics & Business',
    items: [
      {
        id: 'analytics',
        label: 'Revenue Analytics',
        icon: BarChart3,
        path: '/analytics',
        scope: 'platform',
        badge: {
          text: '$124K',
          variant: 'secondary',
        },
      },
      {
        id: 'reports',
        label: 'Platform Reports',
        icon: BarChart3,
        path: '/reports',
        scope: 'platform',
        badge: {
          text: '15',
          variant: 'secondary',
        },
      },
    ],
  },
  {
    id: 'partners',
    title: 'Partners & Network',
    items: [
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
    ],
  },
  {
    id: 'content',
    title: 'Content & Operations',
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
    id: 'customer_success',
    title: 'Customer Success & Support',
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
        id: 'engagement',
        label: 'User Engagement',
        icon: Activity,
        path: '/engagement',
        scope: 'platform',
        badge: {
          text: '85%',
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
    ],
  },
  {
    id: 'communications',
    title: 'Communication & Notifications',
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
    id: 'product',
    title: 'Product & Development',
    items: [
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
    ],
  },
  {
    id: 'system',
    title: 'System Administration',
    items: [
      {
        id: 'settings',
        label: 'System Settings',
        icon: Settings,
        path: '/settings',
        scope: 'general',
      },
    ],
  },
];

export const getAllNavigationItems = (): NavigationItem[] => {
  return navigationSections.flatMap(section => section.items);
};

export const getNavigationItemByPath = (path: string): NavigationItem | undefined => {
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