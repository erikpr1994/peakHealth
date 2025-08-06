import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { 
  Activity, 
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Eye,
  Heart,
  MessageSquare,
  Share,
  Repeat
} from "lucide-react";

// Mock engagement data
const engagementMetrics = {
  overview: {
    dailyActiveUsers: { value: 1847, change: +12.5, trend: "up" },
    weeklyActiveUsers: { value: 6234, change: +8.3, trend: "up" },
    monthlyActiveUsers: { value: 18456, change: +15.7, trend: "up" },
    sessionDuration: { value: "24m 32s", change: +5.2, trend: "up" },
    retention7Day: { value: 78, change: -2.1, trend: "down" },
    retention30Day: { value: 45, change: +3.4, trend: "up" }
  },
  userSegments: [
    {
      name: "New Users (0-7 days)",
      count: 2341,
      percentage: 12.7,
      engagement: 68,
      retention: 45,
      color: "blue"
    },
    {
      name: "Active Users (8-30 days)", 
      count: 5623,
      percentage: 30.5,
      engagement: 82,
      retention: 73,
      color: "green"
    },
    {
      name: "Regular Users (31-90 days)",
      count: 7892,
      percentage: 42.8,
      engagement: 91,
      retention: 86,
      color: "purple"
    },
    {
      name: "Power Users (90+ days)",
      count: 2600,
      percentage: 14.1,
      engagement: 95,
      retention: 94,
      color: "orange"
    }
  ],
  topFeatures: [
    {
      name: "Workout Tracking",
      usage: 89,
      sessions: 15643,
      avgTime: "18m 45s",
      satisfaction: 4.7
    },
    {
      name: "Progress Analytics",
      usage: 76,
      sessions: 12234,
      avgTime: "12m 20s",
      satisfaction: 4.5
    },
    {
      name: "Trainer Sessions",
      usage: 34,
      sessions: 3421,
      avgTime: "45m 30s",
      satisfaction: 4.9
    },
    {
      name: "Community Feed",
      usage: 58,
      sessions: 8765,
      avgTime: "8m 15s",
      satisfaction: 4.2
    },
    {
      name: "Goal Setting",
      usage: 82,
      sessions: 9876,
      avgTime: "6m 30s",
      satisfaction: 4.6
    }
  ],
  userJourney: [
    { stage: "Sign Up", users: 1000, conversion: 100, dropOff: 0 },
    { stage: "Profile Setup", users: 850, conversion: 85, dropOff: 15 },
    { stage: "First Workout", users: 680, conversion: 68, dropOff: 17 },
    { stage: "Week 1 Active", users: 544, conversion: 54.4, dropOff: 13.6 },
    { stage: "Month 1 Retained", users: 435, conversion: 43.5, dropOff: 10.9 },
    { stage: "Long-term User", users: 348, conversion: 34.8, dropOff: 8.7 }
  ]
};

interface UserEngagementProps {
  scopeInfo: any;
}

const formatChange = (change: number) => {
  const isPositive = change > 0;
  return (
    <span className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
      {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
      {Math.abs(change)}%
    </span>
  );
};

const getSegmentColor = (color: string) => {
  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500", 
    purple: "bg-purple-500",
    orange: "bg-orange-500"
  };
  return colors[color as keyof typeof colors] || "bg-gray-500";
};

export function UserEngagement({ scopeInfo }: UserEngagementProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">
            Monitor user engagement patterns, retention rates, and feature adoption across the Peak Health platform.
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Daily Active Users</p>
                <Users className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-2xl font-semibold">{engagementMetrics.overview.dailyActiveUsers.value.toLocaleString()}</p>
              <div className="text-xs">
                {formatChange(engagementMetrics.overview.dailyActiveUsers.change)}
                <span className="text-muted-foreground ml-1">vs last period</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Weekly Active</p>
                <Calendar className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-semibold">{engagementMetrics.overview.weeklyActiveUsers.value.toLocaleString()}</p>
              <div className="text-xs">
                {formatChange(engagementMetrics.overview.weeklyActiveUsers.change)}
                <span className="text-muted-foreground ml-1">vs last period</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Monthly Active</p>
                <TrendingUp className="h-4 w-4 text-purple-500" />
              </div>
              <p className="text-2xl font-semibold">{engagementMetrics.overview.monthlyActiveUsers.value.toLocaleString()}</p>
              <div className="text-xs">
                {formatChange(engagementMetrics.overview.monthlyActiveUsers.change)}
                <span className="text-muted-foreground ml-1">vs last period</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Avg Session</p>
                <Clock className="h-4 w-4 text-orange-500" />
              </div>
              <p className="text-2xl font-semibold">{engagementMetrics.overview.sessionDuration.value}</p>
              <div className="text-xs">
                {formatChange(engagementMetrics.overview.sessionDuration.change)}
                <span className="text-muted-foreground ml-1">vs last period</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">7-Day Retention</p>
                <Target className="h-4 w-4 text-red-500" />
              </div>
              <p className="text-2xl font-semibold">{engagementMetrics.overview.retention7Day.value}%</p>
              <div className="text-xs">
                {formatChange(engagementMetrics.overview.retention7Day.change)}
                <span className="text-muted-foreground ml-1">vs last period</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">30-Day Retention</p>
                <Heart className="h-4 w-4 text-pink-500" />
              </div>
              <p className="text-2xl font-semibold">{engagementMetrics.overview.retention30Day.value}%</p>
              <div className="text-xs">
                {formatChange(engagementMetrics.overview.retention30Day.change)}
                <span className="text-muted-foreground ml-1">vs last period</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="segments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="segments">User Segments</TabsTrigger>
          <TabsTrigger value="features">Feature Usage</TabsTrigger>
          <TabsTrigger value="journey">User Journey</TabsTrigger>
          <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="segments" className="space-y-6">
          {/* User Segments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                User Segments by Engagement Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {engagementMetrics.userSegments.map((segment) => (
                  <div key={segment.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${getSegmentColor(segment.color)}`} />
                        <div>
                          <p className="font-medium">{segment.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {segment.count.toLocaleString()} users ({segment.percentage}%)
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Engagement: {segment.engagement}%</p>
                        <p className="text-sm text-muted-foreground">Retention: {segment.retention}%</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Engagement Score</span>
                          <span>{segment.engagement}%</span>
                        </div>
                        <Progress value={segment.engagement} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Retention Rate</span>
                          <span>{segment.retention}%</span>
                        </div>
                        <Progress value={segment.retention} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          {/* Feature Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Top Features by Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {engagementMetrics.topFeatures.map((feature, index) => (
                  <div key={feature.name} className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{feature.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {feature.sessions.toLocaleString()} sessions • Avg: {feature.avgTime}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{feature.usage}% adoption</p>
                        <p className="text-sm text-muted-foreground">★ {feature.satisfaction}/5</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>User Adoption</span>
                        <span>{feature.usage}%</span>
                      </div>
                      <Progress value={feature.usage} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journey" className="space-y-6">
          {/* User Journey Funnel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                User Journey Funnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {engagementMetrics.userJourney.map((stage, index) => (
                  <div key={stage.stage} className="relative">
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{stage.stage}</p>
                          <p className="text-sm text-muted-foreground">
                            {stage.users.toLocaleString()} users
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">{stage.conversion}%</p>
                        {index > 0 && (
                          <p className="text-sm text-red-600">
                            -{stage.dropOff}% drop-off
                          </p>
                        )}
                      </div>
                    </div>
                    {index < engagementMetrics.userJourney.length - 1 && (
                      <div className="flex justify-center py-2">
                        <ArrowDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cohorts" className="space-y-6">
          {/* Cohort Analysis Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Cohort Retention Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3>Cohort Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced cohort retention analysis and user lifecycle tracking.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}