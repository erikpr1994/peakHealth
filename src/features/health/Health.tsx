"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Camera,
  Target,
  Calendar,
  Scale,
  Ruler,
  Activity,
  Heart,
  Droplets,
  Thermometer,
  Eye,
  MoreHorizontal,
  Edit,
  Trash,
  Download,
  Upload,
  Dumbbell,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
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
} from "recharts";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HealthEntry {
  id: string;
  date: Date;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    bicepLeft?: number;
    bicepRight?: number;
    thighLeft?: number;
    thighRight?: number;
    neck?: number;
  };
  vitals?: {
    restingHeartRate?: number;
    bloodPressureSystolic?: number;
    bloodPressureDiastolic?: number;
    sleepHours?: number;
    waterIntake?: number;
    bodyTemperature?: number;
  };
  notes?: string;
  photos?: string[];
}

interface Goal {
  id: string;
  type: "weight" | "bodyFat" | "muscle" | "measurement";
  target: number;
  current: number;
  deadline: Date;
  description: string;
  unit: string;
}

export default function Health() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  // Mock data - in a real app, this would come from API/database
  const healthData: HealthEntry[] = [
    {
      id: "1",
      date: new Date(2025, 6, 1), // July 1, 2025
      weight: 82.5,
      bodyFat: 15.2,
      muscleMass: 42.8,
      measurements: {
        chest: 102,
        waist: 81,
        bicepLeft: 35.5,
        bicepRight: 36.0,
      },
      vitals: {
        restingHeartRate: 62,
        bloodPressureSystolic: 118,
        bloodPressureDiastolic: 78,
        sleepHours: 7.5,
        waterIntake: 2.8,
      },
      notes: "Feeling strong and energetic. Increased water intake this week.",
    },
    {
      id: "2",
      date: new Date(2025, 6, 8), // July 8, 2025
      weight: 82.8,
      bodyFat: 14.9,
      muscleMass: 43.2,
      measurements: {
        chest: 102.5,
        waist: 80.5,
      },
      vitals: {
        restingHeartRate: 61,
        sleepHours: 8.0,
        waterIntake: 3.0,
      },
    },
    {
      id: "3",
      date: new Date(2025, 6, 15), // July 15, 2025
      weight: 83.1,
      bodyFat: 14.6,
      muscleMass: 43.8,
      vitals: {
        restingHeartRate: 60,
        sleepHours: 7.8,
        waterIntake: 3.2,
      },
      notes: "Great progress on muscle mass. Sleep quality improving.",
    },
    {
      id: "4",
      date: new Date(2025, 6, 22), // July 22, 2025 (Today)
      weight: 83.4,
      bodyFat: 14.3,
      muscleMass: 44.1,
      measurements: {
        chest: 103,
        waist: 80,
        bicepLeft: 36.0,
        bicepRight: 36.5,
      },
      vitals: {
        restingHeartRate: 59,
        bloodPressureSystolic: 116,
        bloodPressureDiastolic: 76,
        sleepHours: 8.2,
        waterIntake: 3.1,
      },
    },
  ];

  const goals: Goal[] = [
    {
      id: "1",
      type: "weight",
      target: 85,
      current: 83.4,
      deadline: new Date(2025, 9, 1), // October 1, 2025
      description: "Gain lean muscle mass",
      unit: "kg",
    },
    {
      id: "2",
      type: "bodyFat",
      target: 12,
      current: 14.3,
      deadline: new Date(2025, 11, 31), // December 31, 2025
      description: "Reduce body fat percentage",
      unit: "%",
    },
    {
      id: "3",
      type: "measurement",
      target: 105,
      current: 103,
      deadline: new Date(2025, 8, 15), // September 15, 2025
      description: "Increase chest measurement",
      unit: "cm",
    },
  ];

  // Prepare chart data
  const chartData = healthData.map((entry) => ({
    date: entry.date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    weight: entry.weight || 0,
    bodyFat: entry.bodyFat || 0,
    muscleMass: entry.muscleMass || 0,
    restingHR: entry.vitals?.restingHeartRate || 0,
  }));

  const latestEntry = healthData[healthData.length - 1];
  const previousEntry = healthData[healthData.length - 2];

  const getChangeIndicator = (
    current: number,
    previous: number,
    isPositiveGood = true
  ) => {
    const change = current - previous;
    const isPositive = change > 0;
    const isGood = isPositiveGood ? isPositive : !isPositive;

    return {
      value: Math.abs(change),
      isPositive,
      isGood,
      icon: isPositive ? TrendingUp : TrendingDown,
      color: isGood ? "text-green-600" : "text-red-600",
      bgColor: isGood ? "bg-green-50" : "bg-red-50",
    };
  };

  const renderQuickStats = () => {
    if (!latestEntry || !previousEntry) return null;

    const weightChange = getChangeIndicator(
      latestEntry.weight || 0,
      previousEntry.weight || 0,
      true
    );
    const bodyFatChange = getChangeIndicator(
      latestEntry.bodyFat || 0,
      previousEntry.bodyFat || 0,
      false
    );
    const muscleChange = getChangeIndicator(
      latestEntry.muscleMass || 0,
      previousEntry.muscleMass || 0,
      true
    );
    const hrChange = getChangeIndicator(
      latestEntry.vitals?.restingHeartRate || 0,
      previousEntry.vitals?.restingHeartRate || 0,
      false
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Weight</span>
            </div>
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full ${weightChange.bgColor}`}
            >
              <weightChange.icon className={`w-3 h-3 ${weightChange.color}`} />
              <span className={`text-xs font-medium ${weightChange.color}`}>
                {weightChange.value.toFixed(1)}kg
              </span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {latestEntry.weight}kg
          </div>
          <div className="text-xs text-gray-500">Last updated today</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-gray-600">Body Fat</span>
            </div>
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full ${bodyFatChange.bgColor}`}
            >
              <bodyFatChange.icon
                className={`w-3 h-3 ${bodyFatChange.color}`}
              />
              <span className={`text-xs font-medium ${bodyFatChange.color}`}>
                {bodyFatChange.value.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {latestEntry.bodyFat}%
          </div>
          <div className="text-xs text-gray-500">Excellent range</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Muscle Mass</span>
            </div>
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full ${muscleChange.bgColor}`}
            >
              <muscleChange.icon className={`w-3 h-3 ${muscleChange.color}`} />
              <span className={`text-xs font-medium ${muscleChange.color}`}>
                {muscleChange.value.toFixed(1)}kg
              </span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {latestEntry.muscleMass}kg
          </div>
          <div className="text-xs text-gray-500">Growing strong</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600" />
              <span className="text-sm text-gray-600">Resting HR</span>
            </div>
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full ${hrChange.bgColor}`}
            >
              <hrChange.icon className={`w-3 h-3 ${hrChange.color}`} />
              <span className={`text-xs font-medium ${hrChange.color}`}>
                {hrChange.value} bpm
              </span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {latestEntry.vitals?.restingHeartRate} bpm
          </div>
          <div className="text-xs text-gray-500">Athletic level</div>
        </Card>
      </div>
    );
  };

  const renderGoalsSection = () => {
    return (
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Health Goals
            </h3>
          </div>
          <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Health Goal</DialogTitle>
                <DialogDescription>
                  Set a new health goal to track your progress and stay
                  motivated.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-type">Goal Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select goal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight">Weight</SelectItem>
                      <SelectItem value="bodyFat">Body Fat %</SelectItem>
                      <SelectItem value="muscle">Muscle Mass</SelectItem>
                      <SelectItem value="measurement">
                        Body Measurement
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target">Target Value</Label>
                  <Input
                    id="target"
                    type="number"
                    placeholder="Enter target value"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Target Date</Label>
                  <Input id="deadline" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your goal..."
                  />
                </div>
                <Button className="w-full">Create Goal</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            const isAchieved = progress >= 100;
            const daysLeft = Math.ceil(
              (goal.deadline.getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            );

            return (
              <div key={goal.id} className="p-4 border rounded-lg bg-white">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {goal.description}
                    </h4>
                    <div className="text-sm text-gray-600 mt-1">
                      {goal.current} / {goal.target} {goal.unit}
                    </div>
                  </div>
                  <Badge variant={isAchieved ? "default" : "secondary"}>
                    {progress.toFixed(0)}%
                  </Badge>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      isAchieved ? "bg-green-600" : "bg-blue-600"
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>

                <div className="text-xs text-gray-500">
                  {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Health Tracking
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor your health metrics and progress
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Dialog open={isAddEntryOpen} onOpenChange={setIsAddEntryOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Log Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Log Health Entry</DialogTitle>
                  <DialogDescription>
                    Record your health metrics, body measurements, and vitals
                    for today.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="entry-date">Date</Label>
                    <Input
                      id="entry-date"
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        placeholder="82.5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="body-fat">Body Fat (%)</Label>
                      <Input
                        id="body-fat"
                        type="number"
                        step="0.1"
                        placeholder="14.3"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="muscle-mass">Muscle Mass (kg)</Label>
                      <Input
                        id="muscle-mass"
                        type="number"
                        step="0.1"
                        placeholder="44.1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resting-hr">
                        Resting Heart Rate (bpm)
                      </Label>
                      <Input id="resting-hr" type="number" placeholder="59" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">
                      Body Measurements (cm)
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="chest">Chest</Label>
                        <Input
                          id="chest"
                          type="number"
                          step="0.1"
                          placeholder="103"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="waist">Waist</Label>
                        <Input
                          id="waist"
                          type="number"
                          step="0.1"
                          placeholder="80"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bicep-left">Bicep (Left)</Label>
                        <Input
                          id="bicep-left"
                          type="number"
                          step="0.1"
                          placeholder="36.0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bicep-right">Bicep (Right)</Label>
                        <Input
                          id="bicep-right"
                          type="number"
                          step="0.1"
                          placeholder="36.5"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">
                      Additional Vitals
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="blood-pressure">Blood Pressure</Label>
                        <div className="flex gap-2">
                          <Input placeholder="116" />
                          <span className="flex items-center">/</span>
                          <Input placeholder="76" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sleep">Sleep Hours</Label>
                        <Input
                          id="sleep"
                          type="number"
                          step="0.1"
                          placeholder="8.2"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="water">Water Intake (L)</Label>
                        <Input
                          id="water"
                          type="number"
                          step="0.1"
                          placeholder="3.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="temperature">
                          Body Temperature (°C)
                        </Label>
                        <Input
                          id="temperature"
                          type="number"
                          step="0.1"
                          placeholder="36.6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any additional notes about your health today..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Progress Photos</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload photos or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 10MB each
                      </p>
                    </div>
                  </div>

                  <Button className="w-full">Save Entry</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="measurements">Measurements</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            {renderQuickStats()}
            {renderGoalsSection()}

            {/* Health Statistics Dashboard */}
            <Card className="p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Health Statistics Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">91%</div>
                  <div className="text-sm text-gray-600">
                    Overall Health Score
                  </div>
                  <div className="text-xs text-green-600">+5% this month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">8.2h</div>
                  <div className="text-sm text-gray-600">Avg Sleep Quality</div>
                  <div className="text-xs text-green-600">
                    +0.5h improvement
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600">3.1L</div>
                  <div className="text-sm text-gray-600">
                    Daily Water Intake
                  </div>
                  <div className="text-xs text-green-600">103% of goal</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">59</div>
                  <div className="text-sm text-gray-600">
                    Resting Heart Rate
                  </div>
                  <div className="text-xs text-green-600">Athletic level</div>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
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

            {/* Recent Entries */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Entries
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab("history")}
                >
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {healthData
                  .slice(-3)
                  .reverse()
                  .map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {entry.date.toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="text-sm text-gray-600">
                            Weight: {entry.weight}kg • Body Fat: {entry.bodyFat}
                            % • Muscle: {entry.muscleMass}kg
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Entry
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="w-4 h-4 mr-2" />
                            Delete Entry
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="mt-8">
            {/* Health Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Weight Progress</h4>
                  <Scale className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  83.9 kg
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +1.8kg this period
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Target: 85kg (93% complete)
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
                <div className="text-xs text-gray-500 mt-1">
                  Target: 12% (84% complete)
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
                <div className="text-xs text-gray-500 mt-1">
                  Target: 47kg (95% complete)
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Combined Health Metrics Chart */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Health Metrics Trends
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
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

              {/* Heart Rate & Vitals */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Vital Signs Trends
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="restingHR"
                        stroke="#ef4444"
                        strokeWidth={2}
                        name="Resting HR (bpm)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Weekly Health Score */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Weekly Health Score
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { week: "Week 1", score: 82 },
                        { week: "Week 2", score: 85 },
                        { week: "Week 3", score: 88 },
                        { week: "Week 4", score: 91 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#8b5cf6"
                        fill="#e9d5ff"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Health Goals Progress */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Health Goals Progress
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        Weight Goal (85kg)
                      </span>
                      <span className="text-sm text-gray-600">
                        83.9kg / 85kg
                      </span>
                    </div>
                    <Progress value={93} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        Body Fat Goal (12%)
                      </span>
                      <span className="text-sm text-gray-600">13.9% / 12%</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        Muscle Mass Goal (47kg)
                      </span>
                      <span className="text-sm text-gray-600">
                        44.9kg / 47kg
                      </span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        Resting HR Goal (&lt;60 bpm)
                      </span>
                      <span className="text-sm text-gray-600">59 bpm</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="measurements" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Body Measurements
                </h3>
                <div className="space-y-4">
                  {latestEntry?.measurements &&
                    Object.entries(latestEntry.measurements).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between py-2 border-b border-gray-100"
                        >
                          <span className="text-gray-600 capitalize">
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                          </span>
                          <span className="font-medium">{value} cm</span>
                        </div>
                      )
                    )}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Progress Photos
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Camera className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Front View</p>
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Camera className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Side View</p>
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Camera className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Back View</p>
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <Button variant="outline" className="h-full w-full">
                      <Plus className="w-6 h-6 mr-2" />
                      Add Photo
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vitals" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestEntry?.vitals && (
                <>
                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Heart className="w-6 h-6 text-red-500" />
                      <h4 className="font-medium">Heart Rate</h4>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {latestEntry.vitals.restingHeartRate} bpm
                    </div>
                    <div className="text-sm text-gray-600">
                      Resting heart rate
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Activity className="w-6 h-6 text-blue-500" />
                      <h4 className="font-medium">Blood Pressure</h4>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {latestEntry.vitals.bloodPressureSystolic}/
                      {latestEntry.vitals.bloodPressureDiastolic}
                    </div>
                    <div className="text-sm text-gray-600">mmHg</div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Eye className="w-6 h-6 text-purple-500" />
                      <h4 className="font-medium">Sleep</h4>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {latestEntry.vitals.sleepHours}h
                    </div>
                    <div className="text-sm text-gray-600">Last night</div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Droplets className="w-6 h-6 text-cyan-500" />
                      <h4 className="font-medium">Hydration</h4>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {latestEntry.vitals.waterIntake}L
                    </div>
                    <div className="text-sm text-gray-600">Today's intake</div>
                  </Card>

                  {latestEntry.vitals.bodyTemperature && (
                    <Card className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Thermometer className="w-6 h-6 text-orange-500" />
                        <h4 className="font-medium">Temperature</h4>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {latestEntry.vitals.bodyTemperature}°C
                      </div>
                      <div className="text-sm text-gray-600">
                        Body temperature
                      </div>
                    </Card>
                  )}
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Health History
              </h3>
              <div className="space-y-6">
                {healthData.reverse().map((entry) => (
                  <div
                    key={entry.id}
                    className="border-l-4 border-blue-200 pl-6 pb-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h4 className="font-medium text-gray-900">
                            {entry.date.toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {entry.date.toLocaleDateString() ===
                            new Date().toLocaleDateString()
                              ? "Today"
                              : Math.ceil(
                                  (new Date().getTime() -
                                    entry.date.getTime()) /
                                    (1000 * 60 * 60 * 24)
                                ) + " days ago"}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {entry.weight && (
                            <div className="text-sm">
                              <span className="text-gray-600">Weight:</span>
                              <span className="font-medium ml-2">
                                {entry.weight}kg
                              </span>
                            </div>
                          )}
                          {entry.bodyFat && (
                            <div className="text-sm">
                              <span className="text-gray-600">Body Fat:</span>
                              <span className="font-medium ml-2">
                                {entry.bodyFat}%
                              </span>
                            </div>
                          )}
                          {entry.muscleMass && (
                            <div className="text-sm">
                              <span className="text-gray-600">Muscle:</span>
                              <span className="font-medium ml-2">
                                {entry.muscleMass}kg
                              </span>
                            </div>
                          )}
                          {entry.vitals?.restingHeartRate && (
                            <div className="text-sm">
                              <span className="text-gray-600">HR:</span>
                              <span className="font-medium ml-2">
                                {entry.vitals.restingHeartRate} bpm
                              </span>
                            </div>
                          )}
                        </div>

                        {entry.notes && (
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            {entry.notes}
                          </p>
                        )}
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Entry
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="w-4 h-4 mr-2" />
                            Delete Entry
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
