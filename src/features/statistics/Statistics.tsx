import { useState } from "react";
import {
  Activity,
  Clock,
  Flame,
  Heart,
  TrendingUp,
  TrendingDown,
  Filter,
  Calendar,
  Target,
  Award,
  Download,
  Upload,
  BarChart3,
  PieChart,
  Users,
  Scale,
  Droplets,
  Eye,
  Zap,
  Dumbbell,
  Trophy,
  Star,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Play,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Progress } from "./ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ComposedChart,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Page } from "@/types/app";

interface StatisticsProps {
  onNavigate: (page: Page) => void;
}

export default function Statistics({ onNavigate }: StatisticsProps) {
  const [timeFilter, setTimeFilter] = useState("monthly");
  const [activeTab, setActiveTab] = useState("overview");

  // Enhanced mock data with real charts
  const performanceData = [
    {
      date: "Jun 1",
      workouts: 3,
      calories: 850,
      duration: 120,
      strength: 82,
      endurance: 75,
    },
    {
      date: "Jun 8",
      workouts: 4,
      calories: 1200,
      duration: 160,
      strength: 85,
      endurance: 78,
    },
    {
      date: "Jun 15",
      workouts: 3,
      calories: 980,
      duration: 135,
      strength: 88,
      endurance: 82,
    },
    {
      date: "Jun 22",
      workouts: 5,
      calories: 1450,
      duration: 200,
      strength: 91,
      endurance: 85,
    },
    {
      date: "Jun 29",
      workouts: 4,
      calories: 1150,
      duration: 170,
      strength: 89,
      endurance: 87,
    },
    {
      date: "Jul 6",
      workouts: 4,
      calories: 1320,
      duration: 180,
      strength: 93,
      endurance: 89,
    },
    {
      date: "Jul 13",
      workouts: 5,
      calories: 1520,
      duration: 210,
      strength: 95,
      endurance: 91,
    },
    {
      date: "Jul 20",
      workouts: 4,
      calories: 1280,
      duration: 185,
      strength: 97,
      endurance: 94,
    },
  ];

  const workoutDistribution = [
    { name: "Strength Training", value: 45, color: "#3b82f6" },
    { name: "Cardio", value: 25, color: "#10b981" },
    { name: "HIIT", value: 20, color: "#f59e0b" },
    { name: "Flexibility", value: 10, color: "#8b5cf6" },
  ];

  const muscleGroupData = [
    { group: "Chest", frequency: 8, volume: 2840, growth: 12 },
    { group: "Back", frequency: 9, volume: 3250, growth: 15 },
    { group: "Shoulders", frequency: 7, volume: 2180, growth: 8 },
    { group: "Arms", frequency: 10, volume: 1920, growth: 18 },
    { group: "Legs", frequency: 6, volume: 4100, growth: 22 },
    { group: "Core", frequency: 12, volume: 1650, growth: 10 },
  ];

  const healthMetricsData = [
    {
      date: "Jun 1",
      weight: 82.1,
      bodyFat: 15.8,
      muscleMass: 42.2,
      restingHR: 65,
    },
    {
      date: "Jun 8",
      weight: 82.3,
      bodyFat: 15.5,
      muscleMass: 42.6,
      restingHR: 63,
    },
    {
      date: "Jun 15",
      weight: 82.6,
      bodyFat: 15.2,
      muscleMass: 43.1,
      restingHR: 62,
    },
    {
      date: "Jun 22",
      weight: 82.9,
      bodyFat: 14.9,
      muscleMass: 43.5,
      restingHR: 61,
    },
    {
      date: "Jun 29",
      weight: 83.2,
      bodyFat: 14.6,
      muscleMass: 43.9,
      restingHR: 60,
    },
    {
      date: "Jul 6",
      weight: 83.4,
      bodyFat: 14.4,
      muscleMass: 44.2,
      restingHR: 59,
    },
    {
      date: "Jul 13",
      weight: 83.7,
      bodyFat: 14.1,
      muscleMass: 44.6,
      restingHR: 58,
    },
    {
      date: "Jul 20",
      weight: 83.9,
      bodyFat: 13.9,
      muscleMass: 44.9,
      restingHR: 57,
    },
  ];

  const fitnessOverview = [
    {
      title: "Total Workouts",
      value: "142",
      change: "+18",
      period: "this month",
      trending: "up",
      goal: "160",
      progress: 88.75,
      icon: Activity,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Active Hours",
      value: "68.5",
      change: "+12.3",
      period: "this month",
      trending: "up",
      goal: "75",
      progress: 91.33,
      icon: Clock,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Calories Burned",
      value: "54,280",
      change: "+4,320",
      period: "this month",
      trending: "up",
      goal: "60,000",
      progress: 90.47,
      icon: Flame,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      title: "Avg Heart Rate",
      value: "142",
      change: "-8",
      period: "improvement",
      trending: "down",
      goal: "130-150",
      progress: 95,
      icon: Heart,
      color: "bg-red-500",
      lightColor: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      title: "Weight Progress",
      value: "83.9kg",
      change: "+1.8kg",
      period: "muscle gain",
      trending: "up",
      goal: "85kg",
      progress: 78,
      icon: Scale,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Body Fat",
      value: "13.9%",
      change: "-1.9%",
      period: "improvement",
      trending: "down",
      goal: "12%",
      progress: 85,
      icon: Droplets,
      color: "bg-cyan-500",
      lightColor: "bg-cyan-50",
      textColor: "text-cyan-600",
    },
    {
      title: "Muscle Mass",
      value: "44.9kg",
      change: "+2.7kg",
      period: "this period",
      trending: "up",
      goal: "47kg",
      progress: 82,
      icon: Dumbbell,
      color: "bg-indigo-500",
      lightColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      title: "Sleep Quality",
      value: "8.2h",
      change: "+0.5h",
      period: "average",
      trending: "up",
      goal: "8h",
      progress: 103,
      icon: Eye,
      color: "bg-violet-500",
      lightColor: "bg-violet-50",
      textColor: "text-violet-600",
    },
  ];

  const achievements = [
    {
      title: "Consistency Streak",
      description: "15 days workout streak",
      icon: Trophy,
      color: "bg-yellow-500",
      lightColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      isNew: true,
    },
    {
      title: "Personal Best",
      description: "New bench press record: 190lbs",
      icon: Award,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600",
      isNew: true,
    },
    {
      title: "Milestone Reached",
      description: "100 total workouts completed",
      icon: Star,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
      isNew: false,
    },
  ];

  const recentWorkouts = [
    {
      id: "1",
      date: "Jul 22, 2025",
      name: "Upper Body Power",
      type: "Strength",
      duration: "48 min",
      calories: 340,
      exercises: 8,
      sets: 24,
      volume: 2850,
      rating: 9.2,
      notes: "Great session, felt strong throughout",
    },
    {
      id: "2",
      date: "Jul 21, 2025",
      name: "Morning Cardio",
      type: "Cardio",
      duration: "35 min",
      calories: 420,
      exercises: 5,
      sets: 0,
      volume: 0,
      rating: 8.5,
      notes: "Good endurance work",
    },
    {
      id: "3",
      date: "Jul 20, 2025",
      name: "Leg Day Crusher",
      type: "Strength",
      duration: "55 min",
      calories: 480,
      exercises: 10,
      sets: 32,
      volume: 4200,
      rating: 9.8,
      notes: "Intense session, new squat PR!",
    },
    {
      id: "4",
      date: "Jul 19, 2025",
      name: "HIIT Circuit",
      type: "HIIT",
      duration: "25 min",
      calories: 380,
      exercises: 6,
      sets: 18,
      volume: 1200,
      rating: 8.8,
      notes: "High intensity, great sweat",
    },
  ];

  const personalRecords = [
    {
      exercise: "Bench Press",
      current: "190 lbs",
      previous: "185 lbs",
      improvement: "+5 lbs",
      date: "Jul 20, 2025",
      isNew: true,
    },
    {
      exercise: "Squat",
      current: "285 lbs",
      previous: "275 lbs",
      improvement: "+10 lbs",
      date: "Jul 18, 2025",
      isNew: true,
    },
    {
      exercise: "Deadlift",
      current: "325 lbs",
      previous: "315 lbs",
      improvement: "+10 lbs",
      date: "Jul 15, 2025",
      isNew: false,
    },
    {
      exercise: "5K Run",
      current: "22:15",
      previous: "22:45",
      improvement: "-0:30",
      date: "Jul 12, 2025",
      isNew: false,
    },
  ];

  const getTrendIcon = (trending: string) => {
    return trending === "up" ? ArrowUp : ArrowDown;
  };

  const getTrendColor = (trending: string) => {
    return trending === "up" ? "text-green-600" : "text-blue-600";
  };

  const getWorkoutTypeColor = (type: string) => {
    const colors = {
      Strength: "bg-blue-100 text-blue-800",
      Cardio: "bg-green-100 text-green-800",
      HIIT: "bg-orange-100 text-orange-800",
      Flexibility: "bg-purple-100 text-purple-800",
    };
    return colors[type as keyof typeof colors] || colors.Strength;
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Statistics & Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              Comprehensive insights into your fitness journey
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-white rounded-lg border border-gray-200 p-1">
              <Button
                variant={timeFilter === "weekly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeFilter("weekly")}
              >
                Weekly
              </Button>
              <Button
                variant={timeFilter === "monthly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeFilter("monthly")}
              >
                Monthly
              </Button>
              <Button
                variant={timeFilter === "yearly" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeFilter("yearly")}
              >
                Yearly
              </Button>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="strength">Strength</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            {/* Fitness Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {fitnessOverview.map((stat, index) => {
                const Icon = stat.icon;
                const TrendIcon = getTrendIcon(stat.trending);
                return (
                  <Card
                    key={index}
                    className="p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-lg ${stat.lightColor} flex items-center justify-center`}
                      >
                        <Icon className={`w-6 h-6 ${stat.textColor}`} />
                      </div>
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full ${stat.lightColor}`}
                      >
                        <TrendIcon
                          className={`w-3 h-3 ${getTrendColor(stat.trending)}`}
                        />
                        <span
                          className={`text-xs font-medium ${getTrendColor(
                            stat.trending
                          )}`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-500">{stat.period}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">
                            Goal: {stat.goal}
                          </span>
                          <span className="font-medium">
                            {stat.progress.toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={stat.progress} className="h-2" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Achievements Section */}
            <Card className="p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Achievements
                </h3>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={index}
                      className="relative p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                    >
                      {achievement.isNew && (
                        <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-500 text-white text-xs">
                          New!
                        </Badge>
                      )}
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg ${achievement.lightColor} flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon
                            className={`w-5 h-5 ${achievement.textColor}`}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Performance Overview Chart */}
            <Card className="p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Performance Overview
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar
                      yAxisId="left"
                      dataKey="workouts"
                      fill="#3b82f6"
                      name="Workouts"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="calories"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Calories"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="duration"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="Duration (min)"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Recent Workouts */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Workouts
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate("calendar")}
                >
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Activity className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">
                            {workout.name}
                          </h4>
                          <Badge
                            variant="secondary"
                            className={getWorkoutTypeColor(workout.type)}
                          >
                            {workout.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{workout.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="text-center">
                        <p className="font-medium text-gray-900">
                          {workout.duration}
                        </p>
                        <p>Duration</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-900">
                          {workout.calories}
                        </p>
                        <p>Calories</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-900">
                          {workout.rating}/10
                        </p>
                        <p>Rating</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Play className="w-4 h-4 mr-2" />
                            Repeat Workout
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Workout Distribution */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Workout Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        dataKey="value"
                        data={workoutDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {workoutDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Muscle Group Analysis */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Muscle Group Focus
                </h3>
                <div className="space-y-4">
                  {muscleGroupData.map((muscle, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {muscle.group}
                        </span>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span>{muscle.frequency} sessions</span>
                          <span>{muscle.volume} lbs volume</span>
                          <span className="text-green-600">
                            +{muscle.growth}%
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={(muscle.frequency / 12) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Performance Trends */}
            <Card className="p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Performance Trends
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="strength"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Strength Score"
                    />
                    <Line
                      type="monotone"
                      dataKey="endurance"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Endurance Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Volume and Intensity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Training Volume & Intensity
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="duration"
                      fill="#3b82f6"
                      name="Duration (min)"
                    />
                    <Bar dataKey="workouts" fill="#10b981" name="Workouts" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="strength" className="mt-8">
            {/* Personal Records */}
            <Card className="p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Personal Records
                </h3>
                <Button variant="outline" size="sm">
                  <Target className="w-4 h-4 mr-2" />
                  Set New Goal
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {personalRecords.map((record, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">
                        {record.exercise}
                      </h4>
                      {record.isNew && (
                        <Badge className="bg-green-500 hover:bg-green-500 text-white text-xs">
                          New!
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-gray-900">
                        {record.current}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <TrendingUp className="w-3 h-3" />
                        <span>{record.improvement}</span>
                      </div>
                      <p className="text-xs text-gray-500">{record.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Strength Progress Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Strength Progression
                </h3>
                <Select defaultValue="bench-press">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bench-press">Bench Press</SelectItem>
                    <SelectItem value="squat">Squat</SelectItem>
                    <SelectItem value="deadlift">Deadlift</SelectItem>
                    <SelectItem value="overhead-press">
                      Overhead Press
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: "Jan", weight: 150 },
                      { month: "Feb", weight: 160 },
                      { month: "Mar", weight: 165 },
                      { month: "Apr", weight: 175 },
                      { month: "May", weight: 180 },
                      { month: "Jun", weight: 185 },
                      { month: "Jul", weight: 190 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#3b82f6"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="mt-8">
            {/* Health Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Current Weight</h4>
                  <Scale className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  83.9 kg
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +1.8kg this period
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Body Fat</h4>
                  <Droplets className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  13.9%
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  -1.9% improvement
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Muscle Mass</h4>
                  <Dumbbell className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  44.9 kg
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2.7kg gained
                </div>
              </Card>
            </div>

            {/* Health Trends Chart */}
            <Card className="p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Health Metrics Trends
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="weight"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Weight (kg)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="bodyFat"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="Body Fat %"
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="muscleMass"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Muscle Mass (kg)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Health Integration */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Health Integration
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate("health")}
                >
                  View Health Dashboard
                </Button>
              </div>
              <div className="text-center py-8 text-gray-500">
                <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Connect Your Health Data</p>
                <p className="text-sm">
                  Integrate with health apps for comprehensive insights
                </p>
                <Button className="mt-4" onClick={() => onNavigate("health")}>
                  Go to Health Tracking
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="mt-8">
            {/* Advanced Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Workout Frequency
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { day: "Mon", workouts: 5 },
                        { day: "Tue", workouts: 8 },
                        { day: "Wed", workouts: 6 },
                        { day: "Thu", workouts: 7 },
                        { day: "Fri", workouts: 9 },
                        { day: "Sat", workouts: 4 },
                        { day: "Sun", workouts: 3 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="workouts" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Monthly Comparison
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { month: "Jan", thisYear: 12, lastYear: 8 },
                        { month: "Feb", thisYear: 15, lastYear: 10 },
                        { month: "Mar", thisYear: 18, lastYear: 14 },
                        { month: "Apr", thisYear: 20, lastYear: 16 },
                        { month: "May", thisYear: 22, lastYear: 18 },
                        { month: "Jun", thisYear: 25, lastYear: 20 },
                        { month: "Jul", thisYear: 28, lastYear: 22 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="thisYear"
                        stackId="1"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        name="2025"
                      />
                      <Area
                        type="monotone"
                        dataKey="lastYear"
                        stackId="2"
                        stroke="#94a3b8"
                        fill="#94a3b8"
                        name="2024"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Insights and Recommendations */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                AI Insights & Recommendations
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900">
                        Strength Improvement
                      </h4>
                      <p className="text-sm text-blue-700">
                        Your bench press has improved 27% in the last 6 months.
                        Consider increasing your training frequency to 3x per
                        week for continued gains.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-900">
                        Consistency Achievement
                      </h4>
                      <p className="text-sm text-green-700">
                        You've maintained a 15-day workout streak! This
                        consistency is key to reaching your fitness goals.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-900">
                        Balance Recommendation
                      </h4>
                      <p className="text-sm text-orange-700">
                        Consider adding more cardio sessions. Your strength
                        training is excellent, but cardiovascular endurance
                        could use attention.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
