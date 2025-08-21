'use client';

import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Database,
  User,
  Globe,
  Building2,
  DollarSign,
  FileText,
  UserCheck,
  MessageSquare,
  Rocket,
  Flag,
  HeadphonesIcon,
  BookOpen,
  ThumbsUp,
  Megaphone,
  Send,
  Mail,
  Activity,
} from 'lucide-react';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

// Extended admin menu with Customer Success and Communication sections
export const menuSections = {
  overview: [
    {
      id: 'dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
      scope: 'platform',
    },
  ],
  analytics: [
    {
      id: 'analytics',
      label: 'Revenue Analytics',
      icon: BarChart3,
      scope: 'platform',
    },
    {
      id: 'reports',
      label: 'Platform Reports',
      icon: FileText,
      scope: 'platform',
    },
  ],
  partners: [
    {
      id: 'trainers',
      label: 'Trainer Management',
      icon: UserCheck,
      scope: 'general',
    },
    {
      id: 'gyms',
      label: 'Gym Partnerships',
      icon: Building2,
      scope: 'general',
    },
  ],
  content: [
    {
      id: 'content',
      label: 'Content Management',
      icon: Database,
      scope: 'general',
    },
    {
      id: 'suggestions',
      label: 'Content Suggestions',
      icon: MessageSquare,
      scope: 'general',
    },
  ],
  customer_success: [
    {
      id: 'support',
      label: 'Support Tickets',
      icon: HeadphonesIcon,
      scope: 'general',
    },
    {
      id: 'engagement',
      label: 'User Engagement',
      icon: Activity,
      scope: 'platform',
    },
    {
      id: 'knowledge',
      label: 'Knowledge Base',
      icon: BookOpen,
      scope: 'general',
    },
    {
      id: 'feedback',
      label: 'User Feedback',
      icon: ThumbsUp,
      scope: 'platform',
    },
  ],
  communications: [
    {
      id: 'announcements',
      label: 'Platform Announcements',
      icon: Megaphone,
      scope: 'platform',
    },
    {
      id: 'notifications',
      label: 'Push Notifications',
      icon: Bell,
      scope: 'general',
    },
    { id: 'emails', label: 'Email Templates', icon: Mail, scope: 'general' },
    {
      id: 'comm_logs',
      label: 'Communication Logs',
      icon: Send,
      scope: 'platform',
    },
  ],
  product: [
    {
      id: 'roadmap',
      label: 'Product Roadmap',
      icon: Rocket,
      scope: 'platform',
    },
  ],
  system: [
    {
      id: 'settings',
      label: 'System Settings',
      icon: Settings,
      scope: 'general',
    },
  ],
};

// Utility function to get data scope information
export const getDataScopeInfo = (
  viewId: string,
  viewingTrainerId?: number | null
) => {
  const allItems = [
    ...menuSections.overview,
    ...menuSections.analytics,
    ...menuSections.partners,
    ...menuSections.content,
    ...menuSections.customer_success,
    ...menuSections.communications,
    ...menuSections.product,
    ...menuSections.system,
  ];
  const item = allItems.find(item => item.id === viewId);

  if (viewId === 'trainer-view' && viewingTrainerId) {
    // For individual trainer view, show trainer-specific scope
    const mockTrainers = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Sarah Mitchell' },
      { id: 3, name: 'Mike Johnson' },
      { id: 4, name: 'Emily Chen' },
      { id: 5, name: 'David Rodriguez' },
      { id: 6, name: 'Lisa Thompson' },
    ];
    const trainer = mockTrainers.find(t => t.id === viewingTrainerId);
    return {
      scope: 'individual_trainer',
      label: `Trainer: ${trainer?.name || 'Unknown'}`,
      icon: User,
      color: 'default',
    };
  }

  if (!item)
    return {
      scope: 'general',
      label: 'General',
      icon: Globe,
      color: 'secondary',
    };

  switch (item.scope) {
    case 'platform':
      return {
        scope: 'platform',
        label: 'Platform Wide',
        icon: Globe,
        color: 'default',
      };
    case 'general':
      return {
        scope: 'general',
        label: 'System Wide',
        icon: Building2,
        color: 'outline',
      };
    default:
      return {
        scope: 'general',
        label: 'General',
        icon: Globe,
        color: 'secondary',
      };
  }
};

// Utility function to get current page title
export const getCurrentPageTitle = (
  activeView: string,
  viewingTrainerId?: number | null
) => {
  const allItems = [
    ...menuSections.overview,
    ...menuSections.analytics,
    ...menuSections.partners,
    ...menuSections.content,
    ...menuSections.customer_success,
    ...menuSections.communications,
    ...menuSections.product,
    ...menuSections.system,
  ];
  const item = allItems.find(item => item.id === activeView);

  if (activeView === 'trainer-view' && viewingTrainerId) {
    const mockTrainers = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Sarah Mitchell' },
      { id: 3, name: 'Mike Johnson' },
      { id: 4, name: 'Emily Chen' },
      { id: 5, name: 'David Rodriguez' },
      { id: 6, name: 'Lisa Thompson' },
    ];
    const trainer = mockTrainers.find(t => t.id === viewingTrainerId);
    return `Trainer: ${trainer?.name || 'Unknown'}`;
  }

  return item?.label || 'Dashboard';
};

interface SidebarNavigationProps {
  activeView: string;
  onViewChange: (viewId: string) => void;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  activeView,
  onViewChange,
}) => {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Sidebar content */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2>Peak Health</h2>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <div className="flex-1 px-4 space-y-6">
        {/* Overview Section */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Overview
          </h3>
          <div className="space-y-1">
            {menuSections.overview.map(item => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeView === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Analytics & Business Section */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Analytics & Business
          </h3>
          <div className="space-y-1">
            {menuSections.analytics.map(item => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeView === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.id === 'analytics' && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    $124K
                  </Badge>
                )}
                {item.id === 'reports' && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    15
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Partners & Network Section */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Partners & Network
          </h3>
          <div className="space-y-1">
            {menuSections.partners.map(item => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeView === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.id === 'trainers' && (
                  <Badge variant="secondary" className="ml-auto">
                    48
                  </Badge>
                )}
                {item.id === 'gyms' && (
                  <Badge variant="secondary" className="ml-auto">
                    12
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content & Operations Section */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Content & Operations
          </h3>
          <div className="space-y-1">
            {menuSections.content.map(item => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeView === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.id === 'suggestions' && (
                  <Badge variant="destructive" className="ml-auto text-xs">
                    3
                  </Badge>
                )}
                {item.id === 'content' && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    1.2K
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Customer Success & Support Section */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Customer Success & Support
          </h3>
          <div className="space-y-1">
            {menuSections.customer_success.map(item => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeView === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.id === 'support' && (
                  <Badge variant="destructive" className="ml-auto text-xs">
                    12
                  </Badge>
                )}
                {item.id === 'engagement' && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    85%
                  </Badge>
                )}
                {item.id === 'knowledge' && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    124
                  </Badge>
                )}
                {item.id === 'feedback' && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    4.8
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Communication & Notifications Section */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Communication & Notifications
          </h3>
          <div className="space-y-1">
            {menuSections.communications.map(item => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeView === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.id === 'announcements' && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    5
                  </Badge>
                )}
                {item.id === 'notifications' && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    89%
                  </Badge>
                )}
                {item.id === 'emails' && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    18
                  </Badge>
                )}
                {item.id === 'comm_logs' && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    2.3K
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product & Development Section */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Product & Development
          </h3>
          <div className="space-y-1">
            {menuSections.product.map(item => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeView === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.id === 'roadmap' && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    8
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* System Administration Section */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            System Administration
          </h3>
          <div className="space-y-1">
            {menuSections.system.map(item => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeView === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User profile at bottom */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 p-2 rounded-lg border">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">
              System Administrator
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
