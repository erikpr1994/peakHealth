"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";
import { 
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  Calendar,
  MapPin,
  CreditCard,
  Target,
  Activity,
  TrendingUp,
  Award,
  Clock,
  Users,
  MessageSquare,
  Plus,
  CheckCircle,
  AlertCircle,
  Zap,
  Dumbbell,
  BarChart3,
  User,
  ChevronRight
} from "lucide-react";

// Mock client data
const mockClient = {
  id: 1,
  name: "Sarah Johnson",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b96b61d4?w=150&h=150&fit=crop&crop=face",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY 10001",
  dateJoined: "2023-08-15",
  lastWorkout: "2024-01-20",
  status: "active",
  subscriptionPlan: "Premium Monthly",
  subscriptionStatus: "active",
  nextBilling: "2024-02-15",
  totalPaid: 456.00,
  currentStreak: 12,
  totalWorkouts: 67,
  adherenceRate: 85,
  goals: ["Lose 15 lbs", "Improve cardiovascular health", "Build core strength", "Complete first 5K run"],
  achievements: ["30-day streak", "First month completed", "Weight loss milestone"],
  notes: "Highly motivated client. Prefers morning workouts. Has minor knee issues - avoid high-impact exercises.",
  emergencyContact: {
    name: "Mike Johnson",
    phone: "+1 (555) 123-4568",
    relationship: "Spouse"
  }
};

// Mock assigned programs
const assignedPrograms = [
  {
    id: 1,
    name: "Weight Loss Program",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    currentWeek: 6,
    totalWeeks: 8,
    completedWorkouts: 24,
    totalWorkouts: 32,
    adherenceRate: 85,
    status: "active",
    progress: 75
  },
  {
    id: 2,
    name: "Core Strength Building",
    startDate: "2023-12-01",
    endDate: "2024-01-15",
    currentWeek: 6,
    totalWeeks: 6,
    completedWorkouts: 18,
    totalWorkouts: 18,
    adherenceRate: 100,
    status: "completed",
    progress: 100
  }
];

// Mock workout history data
const workoutHistory = [
  { date: '2024-01-15', workouts: 1, duration: 45, calories: 320 },
  { date: '2024-01-16', workouts: 0, duration: 0, calories: 0 },
  { date: '2024-01-17', workouts: 1, duration: 50, calories: 380 },
  { date: '2024-01-18', workouts: 1, duration: 40, calories: 290 },
  { date: '2024-01-19', workouts: 0, duration: 0, calories: 0 },
  { date: '2024-01-20', workouts: 1, duration: 55, calories: 420 },
  { date: '2024-01-21', workouts: 1, duration: 48, calories: 350 }
];

// Mock progress data
const progressData = [
  { week: 'Week 1', weight: 165, bodyFat: 28, muscle: 38 },
  { week: 'Week 2', weight: 163, bodyFat: 27.5, muscle: 38.2 },
  { week: 'Week 3', weight: 162, bodyFat: 27, muscle: 38.5 },
  { week: 'Week 4', weight: 160, bodyFat: 26.5, muscle: 38.8 },
  { week: 'Week 5', weight: 159, bodyFat: 26, muscle: 39 },
  { week: 'Week 6', weight: 158, bodyFat: 25.5, muscle: 39.2 }
];

// Mock recent activities
const recentActivities = [
  {
    id: 1,
    type: "workout_completed",
    title: "Completed HIIT Cardio Session",
    description: "45 minutes • Burned 320 calories",
    date: "2024-01-20",
    time: "7:30 AM"
  },
  {
    id: 2,
    type: "milestone_reached",
    title: "12-Day Workout Streak!",
    description: "Achieved personal best consistency",
    date: "2024-01-20",
    time: "7:30 AM"
  },
  {
    id: 3,
    type: "workout_completed",
    title: "Strength Training - Upper Body",
    description: "55 minutes • 8 exercises completed",
    date: "2024-01-18",
    time: "6:45 AM"
  },
  {
    id: 4,
    type: "program_progress",
    title: "Week 6 of Weight Loss Program",
    description: "75% program completion",
    date: "2024-01-15",
    time: "All day"
  }
];

interface ClientViewProps {
  clientId: number;
  onBack: () => void;
  scopeInfo: any;
}

export function ClientView({ clientId, onBack, scopeInfo }: ClientViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'workout_completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'milestone_reached':
        return <Award className="h-4 w-4 text-purple-500" />;
      case 'program_progress':
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant={scopeInfo.color}>
              <scopeInfo.icon className="h-3 w-3 mr-1" />
              {scopeInfo.label}
            </Badge>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <h1>Client Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Assign Program
          </Button>
        </div>
      </div>

      {/* Client Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={mockClient.avatar} alt={mockClient.name} />
              <AvatarFallback>
                {mockClient.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-semibold">{mockClient.name}</h2>
                <Badge variant={mockClient.status === 'active' ? 'default' : 'secondary'}>
                  <Activity className="h-3 w-3 mr-1" />
                  {mockClient.status}
                </Badge>
                <Badge variant="outline">
                  <CreditCard className="h-3 w-3 mr-1" />
                  {mockClient.subscriptionPlan}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{mockClient.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{mockClient.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {new Date(mockClient.dateJoined).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Last workout {new Date(mockClient.lastWorkout).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Dumbbell className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Workouts</p>
                <p className="text-2xl font-semibold">{mockClient.totalWorkouts}</p>
                <p className="text-xs text-green-600">All time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Adherence Rate</p>
                <p className="text-2xl font-semibold">{mockClient.adherenceRate}%</p>
                <p className="text-xs text-green-600">Above average</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-semibold">{mockClient.currentStreak}</p>
                <p className="text-xs text-green-600">Days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-semibold">${mockClient.totalPaid}</p>
                <p className="text-xs text-green-600">Lifetime value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg border">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()} at {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Goals & Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Current Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockClient.goals.map((goal, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-sm">{goal}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Log Workout
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Session
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Weekly Workout Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workoutHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                  <YAxis />
                  <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
                  <Bar dataKey="duration" fill="#8884d8" name="Duration (min)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assignedPrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{program.name}</CardTitle>
                    <Badge variant={program.status === 'active' ? 'default' : 'secondary'}>
                      {program.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Progress</p>
                      <p className="font-medium">{program.currentWeek} / {program.totalWeeks} weeks</p>
                      <Progress value={program.progress} className="mt-1" />
                    </div>
                    <div>
                      <p className="text-muted-foreground">Workouts</p>
                      <p className="font-medium">{program.completedWorkouts} / {program.totalWorkouts}</p>
                      <Progress value={(program.completedWorkouts / program.totalWorkouts) * 100} className="mt-1" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Adherence Rate</span>
                    <span className="font-medium">{program.adherenceRate}%</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Body Composition Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} name="Weight (lbs)" />
                  <Line type="monotone" dataKey="bodyFat" stroke="#82ca9d" strokeWidth={2} name="Body Fat %" />
                  <Line type="monotone" dataKey="muscle" stroke="#ffc658" strokeWidth={2} name="Muscle Mass %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Weight Loss</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-semibold text-green-600">-7 lbs</p>
                <p className="text-sm text-muted-foreground">Since program start</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Body Fat</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-semibold text-blue-600">-2.5%</p>
                <p className="text-sm text-muted-foreground">Reduction achieved</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Muscle Gain</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-semibold text-purple-600">+1.2%</p>
                <p className="text-sm text-muted-foreground">Muscle mass increase</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <h3 className="font-medium">{mockClient.subscriptionPlan}</h3>
                    <p className="text-sm text-muted-foreground">$49.99/month</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Next Billing Date</p>
                    <p className="font-medium">{new Date(mockClient.nextBilling).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payment Method</p>
                    <p className="font-medium">•••• •••• •••• 4567</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="font-medium">Recent Payments</h4>
                  {[
                    { date: "2024-01-15", amount: 49.99, status: "Paid" },
                    { date: "2023-12-15", amount: 49.99, status: "Paid" },
                    { date: "2023-11-15", amount: 49.99, status: "Paid" }
                  ].map((payment, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">${payment.amount}</p>
                        <p className="text-sm text-muted-foreground">{new Date(payment.date).toLocaleDateString()}</p>
                      </div>
                      <Badge variant="outline">{payment.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-semibold">${mockClient.totalPaid}</p>
                  <p className="text-sm text-muted-foreground">Total Lifetime Value</p>
                </div>
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monthly Revenue</span>
                    <span>$49.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Months Active</span>
                    <span>9</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Monthly</span>
                    <span>$49.99</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Manage Billing
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{mockClient.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{mockClient.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{mockClient.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date Joined</p>
                    <p className="font-medium">{new Date(mockClient.dateJoined).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{mockClient.address}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{mockClient.emergencyContact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Relationship</p>
                    <p className="font-medium">{mockClient.emergencyContact.relationship}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{mockClient.emergencyContact.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Trainer Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{mockClient.notes}</p>
                <Button variant="outline" className="mt-4">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Notes
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockClient.achievements.map((achievement, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {achievement}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}