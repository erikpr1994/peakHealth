import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Users,
  Dumbbell,
  TrendingUp,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle,
  Activity,
  Clock,
  Zap,
  Award,
  ArrowRight,
  Plus,
  User,
  Building2,
  Database,
  BarChart3,
  TrendingDown,
  DollarSign,
} from 'lucide-react';

// Mock data for platform activities (admin view)
const platformActivities = [
  {
    id: 1,
    trainerName: 'Sarah Mitchell',
    trainerAvatar:
      'https://images.unsplash.com/photo-1494790108755-2616b96b61d4?w=150&h=150&fit=crop&crop=face',
    action: 'New trainer joined',
    details: 'Certified Personal Trainer',
    timeAgo: '3 hours ago',
    type: 'trainer_joined',
  },
  {
    id: 2,
    gymName: 'FitLife Center',
    action: 'Partnership activated',
    details: 'Premium gym partnership',
    timeAgo: '1 day ago',
    type: 'gym_partnership',
  },
  {
    id: 3,
    action: 'Revenue milestone reached',
    details: '$125K monthly revenue',
    timeAgo: '2 days ago',
    type: 'revenue_milestone',
  },
  {
    id: 4,
    trainerName: 'Mike Johnson',
    trainerAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    action: 'High performance alert',
    details: 'Top 5% trainer this month',
    timeAgo: '3 days ago',
    type: 'trainer_performance',
  },
  {
    id: 5,
    action: 'Corporate subscription',
    details: 'TechCorp upgraded to Enterprise',
    timeAgo: '1 week ago',
    type: 'corporate_upgrade',
  },
];

interface DashboardProps {
  scopeInfo: any;
  userRole: string;
}

export function Dashboard({ scopeInfo, userRole }: DashboardProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'trainer_joined':
        return <User className="h-4 w-4 text-green-500" />;
      case 'gym_partnership':
        return <Building2 className="h-4 w-4 text-blue-500" />;
      case 'revenue_milestone':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'trainer_performance':
        return <Award className="h-4 w-4 text-purple-500" />;
      case 'corporate_upgrade':
        return <DollarSign className="h-4 w-4 text-green-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Reports
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">$124,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Trainers
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">48</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gym Partners</CardTitle>
            <Building2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1</span> new partnership
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Platform Users
            </CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">2,345</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+247</span> this week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Platform Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformActivities.map(activity => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 p-3 rounded-lg border"
                >
                  {activity.trainerAvatar && (
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={activity.trainerAvatar}
                        alt={activity.trainerName}
                      />
                      <AvatarFallback>
                        {activity.trainerName
                          ? activity.trainerName
                              .split(' ')
                              .map(n => n[0])
                              .join('')
                          : 'PH'}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  {!activity.trainerAvatar && (
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {activity.trainerName && (
                        <p className="font-medium">{activity.trainerName}</p>
                      )}
                      <span className="text-muted-foreground">
                        {activity.action}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.details} • {activity.timeAgo}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Revenue Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Revenue Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <Users className="h-8 w-8 p-1 bg-blue-100 rounded-lg text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Individual Users</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>$48K revenue</span>
                    <span>•</span>
                    <span>42% of total</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <Building2 className="h-8 w-8 p-1 bg-green-100 rounded-lg text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Corporate Plans</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>$44K revenue</span>
                    <span>•</span>
                    <span>26% of total</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <User className="h-8 w-8 p-1 bg-purple-100 rounded-lg text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Trainer Subscriptions</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>$19K revenue</span>
                    <span>•</span>
                    <span>17% of total</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                View Revenue Analytics
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Weekly Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Platform Weekly Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-semibold text-green-600">$28.4K</p>
                <p className="text-sm text-muted-foreground">Weekly Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-blue-600">3</p>
                <p className="text-sm text-muted-foreground">New Trainers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-purple-600">1</p>
                <p className="text-sm text-muted-foreground">Gym Partnership</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-orange-600">247</p>
                <p className="text-sm text-muted-foreground">New Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Add New Trainer
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Building2 className="h-4 w-4 mr-2" />
                Add Gym Partner
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                Revenue Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Database className="h-4 w-4 mr-2" />
                Manage Content
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Platform Reports
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Attention Required */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Attention Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-orange-200 bg-orange-50">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Low Revenue Trainer</p>
                  <p className="text-sm text-muted-foreground">
                    3 trainers below $200/month
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="destructive" className="text-xs">
                      Requires support
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Last contact: 1 week ago
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-yellow-200 bg-yellow-50">
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <TrendingDown className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Churn Alert</p>
                  <p className="text-sm text-muted-foreground">
                    Corporate subscription renewal pending
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className="text-xs border-yellow-500"
                    >
                      $15K value
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Expires: 5 days
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Contact
                </Button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                View All Alerts
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
