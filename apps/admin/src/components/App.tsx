'use client';

import {
  Moon,
  Sun,
  Shield,
  Bell,
  FileText,
  Building2,
  Database,
  Settings,
} from 'lucide-react';
import React, { useState } from 'react';

import { Analytics } from './Analytics';
import { CommunicationLogs } from './CommunicationLogs';
import { ContentManagement } from './ContentManagement';
import { Dashboard } from './Dashboard';
import { EmailTemplates } from './EmailTemplates';
import { FeatureFlags } from './FeatureFlags';
import { KnowledgeBase } from './KnowledgeBase';
import { NotificationManagement } from './NotificationManagement';
import { PlatformAnnouncements } from './PlatformAnnouncements';
import { ProductRoadmap } from './ProductRoadmap';
import {
  SidebarNavigation,
  getDataScopeInfo,
  getCurrentPageTitle,
} from './SidebarNavigation';
import { SuggestionsManagement } from './SuggestionsManagement';
import { SupportTicketing } from './SupportTicketing';
import { TrainerList } from './TrainerList';
import { TrainerManagement } from './TrainerManagement';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

import { UserEngagement } from './UserEngagement';
import { UserFeedback } from './UserFeedback';

const App = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewingTrainerId, setViewingTrainerId] = useState<number | null>(null); // For detailed trainer view

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleViewTrainer = (trainerId: number) => {
    setViewingTrainerId(trainerId);
    setActiveView('trainer-view');
  };

  const handleBackToTrainers = () => {
    setViewingTrainerId(null);
    setActiveView('trainers');
  };

  const renderContent = () => {
    const scopeInfo = getDataScopeInfo(activeView, viewingTrainerId);

    switch (activeView) {
      case 'dashboard':
        return <Dashboard scopeInfo={scopeInfo} userRole="admin" />;
      case 'content':
        return <ContentManagement userRole="admin" scopeInfo={scopeInfo} />;
      case 'suggestions':
        return <SuggestionsManagement userRole="admin" scopeInfo={scopeInfo} />;
      case 'trainers':
        return (
          <TrainerList
            scopeInfo={scopeInfo}
            onViewTrainer={handleViewTrainer}
          />
        );
      case 'trainer-view':
        return viewingTrainerId ? (
          <TrainerManagement
            trainerId={viewingTrainerId}
            onBack={handleBackToTrainers}
            scopeInfo={scopeInfo}
            userRole="admin"
          />
        ) : null;
      case 'analytics':
        return <Analytics scopeInfo={scopeInfo} />;
      case 'roadmap':
        return <ProductRoadmap scopeInfo={scopeInfo} />;
      case 'features':
        return <FeatureFlags scopeInfo={scopeInfo} />;

      // Customer Success & Support
      case 'support':
        return <SupportTicketing scopeInfo={scopeInfo} />;
      case 'engagement':
        return <UserEngagement scopeInfo={scopeInfo} />;
      case 'knowledge':
        return <KnowledgeBase scopeInfo={scopeInfo} />;
      case 'feedback':
        return <UserFeedback scopeInfo={scopeInfo} />;

      // Communication & Notifications
      case 'announcements':
        return <PlatformAnnouncements scopeInfo={scopeInfo} />;
      case 'notifications':
        return <NotificationManagement scopeInfo={scopeInfo} />;
      case 'emails':
        return <EmailTemplates scopeInfo={scopeInfo} />;
      case 'comm_logs':
        return <CommunicationLogs scopeInfo={scopeInfo} />;

      case 'reports':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1>Platform Reports</h1>
                <p className="text-muted-foreground">
                  Comprehensive reports on platform performance, user
                  engagement, and business metrics.
                </p>
              </div>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3>Platform Reports</h3>
              <p className="text-sm text-muted-foreground">
                Generate and view detailed reports on platform performance and
                business metrics.
              </p>
            </div>
          </div>
        );
      case 'gyms':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1>Gym Partnerships</h1>
                <p className="text-muted-foreground">
                  Manage gym partnerships, facility integrations, and
                  location-based services.
                </p>
              </div>
              <Button>
                <Building2 className="h-4 w-4 mr-2" />
                Add New Partnership
              </Button>
            </div>
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3>Gym Partnerships</h3>
              <p className="text-sm text-muted-foreground">
                Manage partnerships with fitness facilities and integrate
                location-based services.
              </p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 space-y-6">
            <div>
              <h1>System Settings</h1>
              <p className="text-muted-foreground">
                Platform configuration and administrative settings
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3>Dark Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Toggle between light and dark themes
                  </p>
                </div>
                <Button variant="outline" onClick={toggleDarkMode}>
                  {isDarkMode ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3>Platform Administration</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage platform-wide settings and configurations
                  </p>
                </div>
                <Badge variant="default">
                  <Shield className="h-3 w-3 mr-1" />
                  Admin Access
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3>Data Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Export reports, backup data, and manage platform resources
                  </p>
                </div>
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Manage Data
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3>API Configuration</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage API keys, webhooks, and third-party integrations
                  </p>
                </div>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure APIs
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard scopeInfo={scopeInfo} userRole="admin" />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar Navigation */}
      <SidebarNavigation activeView={activeView} onViewChange={setActiveView} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              {/* Data Context Indicator */}
              <div className="flex items-center gap-2">
                {(() => {
                  const scopeInfo = getDataScopeInfo(
                    activeView,
                    viewingTrainerId
                  );
                  const IconComponent = scopeInfo.icon;
                  return (
                    <Badge
                      variant={
                        scopeInfo.color as
                          | 'default'
                          | 'secondary'
                          | 'destructive'
                          | 'outline'
                      }
                    >
                      <IconComponent className="h-3 w-3 mr-1" />
                      {scopeInfo.label}
                    </Badge>
                  );
                })()}
              </div>

              <h1 className="font-medium">
                {getCurrentPageTitle(activeView, viewingTrainerId)}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Badge variant="default">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </Badge>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default App;
