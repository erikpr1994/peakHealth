import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Rocket, 
  ChevronRight, 
  Calendar,
  User,
  Clock,
  TrendingUp,
  Zap,
  Star,
  CheckCircle,
  AlertCircle,
  Play,
  Target,
  Users,
  Smartphone,
  Database,
  BarChart3,
  Plus
} from "lucide-react";

// Mock roadmap data
const roadmapFeatures = {
  "Q1 2025": [
    {
      id: 1,
      title: "Advanced Analytics Dashboard",
      description: "Enhanced revenue analytics with predictive insights and trainer performance metrics",
      status: "in_development",
      priority: "high",
      progress: 75,
      team: "Analytics Team",
      estimatedCompletion: "Feb 2025",
      impact: "High",
      userTypes: ["Admins", "Trainers"],
      icon: BarChart3
    },
    {
      id: 2,
      title: "Mobile App for Trainers",
      description: "Native mobile application for trainers to manage clients on-the-go",
      status: "planning",
      priority: "high",
      progress: 20,
      team: "Mobile Team",
      estimatedCompletion: "Mar 2025",
      impact: "High",
      userTypes: ["Trainers"],
      icon: Smartphone
    }
  ],
  "Q2 2025": [
    {
      id: 3,
      title: "AI Workout Recommendations",
      description: "Machine learning-powered workout suggestions based on user preferences and goals",
      status: "planning",
      priority: "medium",
      progress: 10,
      team: "AI Team",
      estimatedCompletion: "May 2025",
      impact: "Medium",
      userTypes: ["Users", "Trainers"],
      icon: Zap
    },
    {
      id: 4,
      title: "Corporate Dashboard",
      description: "Dedicated dashboard for corporate clients to manage employee wellness programs",
      status: "planning",
      priority: "high",
      progress: 5,
      team: "Enterprise Team",
      estimatedCompletion: "Jun 2025",
      impact: "High",
      userTypes: ["Corporate Admins"],
      icon: Users
    }
  ],
  "Q3 2025": [
    {
      id: 5,
      title: "Wearable Integration",
      description: "Integration with popular fitness wearables for automatic workout tracking",
      status: "research",
      priority: "medium",
      progress: 0,
      team: "Integration Team",
      estimatedCompletion: "Aug 2025",
      impact: "Medium",
      userTypes: ["Users"],
      icon: Target
    }
  ]
};

const recentlyCompleted = [
  {
    id: 6,
    title: "Trainer Management System",
    description: "Comprehensive trainer management with service pricing and credentials",
    completedDate: "Dec 2024",
    impact: "High",
    icon: User
  },
  {
    id: 7,
    title: "Content Suggestions Workflow",
    description: "Review and approval system for trainer content suggestions",
    completedDate: "Nov 2024",
    impact: "Medium",
    icon: CheckCircle
  }
];

interface ProductRoadmapProps {
  scopeInfo: any;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'default';
    case 'in_development':
      return 'secondary';
    case 'planning':
      return 'outline';
    case 'research':
      return 'secondary';
    default:
      return 'outline';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'in_development':
      return <Play className="h-4 w-4 text-blue-500" />;
    case 'planning':
      return <Clock className="h-4 w-4 text-orange-500" />;
    case 'research':
      return <AlertCircle className="h-4 w-4 text-purple-500" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'secondary';
    case 'low':
      return 'outline';
    default:
      return 'outline';
  }
};

export function ProductRoadmap({ scopeInfo }: ProductRoadmapProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {(() => {
              const IconComponent = scopeInfo.icon;
              return (
                <Badge variant={scopeInfo.color}>
                  <IconComponent className="h-3 w-3 mr-1" />
                  {scopeInfo.label}
                </Badge>
              );
            })()}
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <h1>Product Roadmap</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Export Timeline
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
        </div>
      </div>

      <div>
        <p className="text-muted-foreground">
          Track upcoming features, development progress, and product milestones across Peak Health platform.
        </p>
      </div>

      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="status">By Status</TabsTrigger>
          <TabsTrigger value="completed">Recently Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          {/* Roadmap Timeline */}
          {Object.entries(roadmapFeatures).map(([quarter, features]) => (
            <div key={quarter} className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="font-semibold">{quarter}</h2>
                <Badge variant="outline">{features.length} features</Badge>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {features.map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={feature.id} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-base">{feature.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                {getStatusIcon(feature.status)}
                                <Badge variant={getStatusColor(feature.status)} className="text-xs">
                                  {feature.status.replace('_', ' ')}
                                </Badge>
                                <Badge variant={getPriorityColor(feature.priority)} className="text-xs">
                                  {feature.priority} priority
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                        
                        {/* Progress */}
                        {feature.progress > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span>{feature.progress}%</span>
                            </div>
                            <Progress value={feature.progress} className="h-2" />
                          </div>
                        )}
                        
                        {/* Feature Details */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Team</p>
                            <p className="font-medium">{feature.team}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Est. Completion</p>
                            <p className="font-medium">{feature.estimatedCompletion}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Impact</p>
                            <Badge variant="outline" className="text-xs">{feature.impact}</Badge>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Users</p>
                            <div className="flex flex-wrap gap-1">
                              {feature.userTypes.map((type) => (
                                <Badge key={type} variant="secondary" className="text-xs">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="status" className="space-y-6">
          {/* Group by Status */}
          {['in_development', 'planning', 'research'].map((status) => {
            const statusFeatures = Object.values(roadmapFeatures)
              .flat()
              .filter(feature => feature.status === status);
            
            if (statusFeatures.length === 0) return null;
            
            return (
              <div key={status} className="space-y-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(status)}
                  <h2 className="font-semibold capitalize">{status.replace('_', ' ')}</h2>
                  <Badge variant="outline">{statusFeatures.length} features</Badge>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {statusFeatures.map((feature) => {
                    const IconComponent = feature.icon;
                    return (
                      <Card key={feature.id}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <IconComponent className="h-4 w-4 text-primary" />
                            </div>
                            <CardTitle className="text-sm">{feature.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{feature.estimatedCompletion}</span>
                            <Badge variant={getPriorityColor(feature.priority)} className="text-xs">
                              {feature.priority}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {/* Recently Completed Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h2 className="font-semibold">Recently Completed</h2>
              <Badge variant="outline">{recentlyCompleted.length} features</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {recentlyCompleted.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={feature.id} className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base">{feature.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <Badge variant="default" className="text-xs bg-green-600">
                              Completed
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Completed: {feature.completedDate}</span>
                        <Badge variant="outline" className="text-xs">{feature.impact} Impact</Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">In Development</p>
                <p className="text-xl font-semibold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Planning</p>
                <p className="text-xl font-semibold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Research</p>
                <p className="text-xl font-semibold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Completed (Q4)</p>
                <p className="text-xl font-semibold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}