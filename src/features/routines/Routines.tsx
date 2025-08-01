"use client";

import {
  Search,
  Grid,
  List,
  Play,
  Plus,
  Heart,
  Activity,
  Calendar,
  Eye,
  Edit,
  Target,
  Trophy,
  Zap,
  Dumbbell,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Routine {
  id: string;
  name: string;
  description: string;
  daysPerWeek: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  goal: "Strength" | "Hypertrophy" | "Endurance" | "Weight Loss";
  isActive: boolean;
  isFavorite: boolean;
  schedule: boolean[]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  progress: {
    current: number;
    total: number;
  };
  lastUsed?: string;
  objectives?: string[];
  totalWorkouts?: number;
  completedWorkouts?: number;
  estimatedDuration?: string;
}

export default function Routines() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [goalFilter, setGoalFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const routines: Routine[] = [
    {
      id: "full-body-split",
      name: "Full Body Split",
      description:
        "A comprehensive full-body workout targeting all major muscle groups with compound movements. Perfect for intermediate lifters looking to build strength and muscle mass.",
      daysPerWeek: 3,
      difficulty: "Intermediate",
      goal: "Hypertrophy",
      isActive: true,
      isFavorite: false,
      schedule: [true, false, true, false, true, false, false], // M W F
      progress: { current: 4, total: 8 },
      objectives: [
        "Increase muscle mass by 15%",
        "Boost strength by 25%",
        "4-5 workouts per week",
        "Improve cardiovascular health",
      ],
      totalWorkouts: 24,
      completedWorkouts: 9,
      estimatedDuration: "55 min",
    },
    {
      id: "upper-lower-split",
      name: "Upper/Lower Split",
      description:
        "Split routine focusing on upper body and lower body on alternating days for maximum recovery.",
      daysPerWeek: 4,
      difficulty: "Advanced",
      goal: "Strength",
      isActive: false,
      isFavorite: false,
      schedule: [true, true, false, true, true, false, false], // M T Th F
      progress: { current: 0, total: 8 },
      lastUsed: "2 weeks ago",
    },
    {
      id: "push-pull-legs",
      name: "Push/Pull/Legs",
      description:
        "High-frequency training split targeting push muscles, pull muscles, and legs twice per week.",
      daysPerWeek: 6,
      difficulty: "Advanced",
      goal: "Hypertrophy",
      isActive: false,
      isFavorite: true,
      schedule: [true, true, true, true, true, false, false], // M T W Th F
      progress: { current: 0, total: 8 },
      lastUsed: "2 weeks ago",
    },
  ];

  const stats = [
    {
      title: "Total Routines",
      value: "8",
      icon: Activity,
      color: "indigo",
    },
    {
      title: "Active Routine",
      value: "Full Body Split",
      subtitle: true,
      icon: Play,
      color: "green",
    },
    {
      title: "Avg Days/Week",
      value: "4.2",
      icon: Calendar,
      color: "amber",
    },
    {
      title: "Favorites",
      value: "3",
      icon: Heart,
      color: "red",
    },
  ];

  const activeRoutine = routines.find(routine => routine.isActive);
  const inactiveRoutines = routines.filter(routine => !routine.isActive);

  const getIconColor = (color: string) => {
    const colors = {
      indigo: "bg-indigo-100 text-indigo-600",
      green: "bg-green-100 text-green-600",
      amber: "bg-amber-100 text-amber-600",
      red: "bg-red-100 text-red-600",
    };
    return colors[color as keyof typeof colors] || colors.indigo;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Beginner: "bg-green-100 text-green-700",
      Intermediate: "bg-yellow-100 text-yellow-700",
      Advanced: "bg-red-100 text-red-700",
    };
    return colors[difficulty as keyof typeof colors] || colors.Intermediate;
  };

  const getGoalColor = (goal: string) => {
    const colors = {
      Strength: "bg-blue-100 text-blue-700",
      Hypertrophy: "bg-purple-100 text-purple-700",
      Endurance: "bg-green-100 text-green-700",
      "Weight Loss": "bg-orange-100 text-orange-700",
    };
    return colors[goal as keyof typeof colors] || colors.Strength;
  };

  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

  const filteredInactiveRoutines = inactiveRoutines.filter(routine => {
    const matchesSearch =
      routine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      routine.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel =
      levelFilter === "all" || routine.difficulty === levelFilter;
    const matchesGoal = goalFilter === "all" || routine.goal === goalFilter;

    return matchesSearch && matchesLevel && matchesGoal;
  });

  const getObjectiveIcon = (index: number) => {
    const icons = [Trophy, Zap, Dumbbell, Target];
    return icons[index % icons.length];
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Routines</h1>
        <p className="text-gray-500 mt-2">
          Manage and organize your workout programs
        </p>
      </div>

      {/* Active Routine Featured Section */}
      {activeRoutine && (
        <div className="mb-12">
          <Card className="overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 text-white">
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      Active
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                      {activeRoutine.difficulty}
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold mb-4">
                    {activeRoutine.name}
                  </h2>
                  <p className="text-indigo-100 mb-6 text-lg leading-relaxed">
                    {activeRoutine.description}
                  </p>

                  {/* Week Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">Week Progress</h3>
                      <span className="text-indigo-100">
                        Week {activeRoutine.progress.current} of{" "}
                        {activeRoutine.progress.total}
                      </span>
                    </div>
                    <div className="bg-white/20 rounded-full h-3 mb-2">
                      <div
                        className="bg-white rounded-full h-3 transition-all duration-300"
                        style={{
                          width: `${
                            (activeRoutine.progress.current /
                              activeRoutine.progress.total) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <p className="text-indigo-100 text-sm">
                      {Math.round(
                        (activeRoutine.progress.current /
                          activeRoutine.progress.total) *
                          100
                      )}
                      % Complete
                    </p>
                  </div>

                  {/* Program Objectives */}
                  {activeRoutine.objectives && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Program Objectives
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeRoutine.objectives.map((objective, index) => {
                          const IconComponent = getObjectiveIcon(index);
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3"
                            >
                              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <span className="text-sm">{objective}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Overview */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-6">
                    This Week&apos;s Progress
                  </h3>

                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">
                        {activeRoutine.daysPerWeek}
                      </div>
                      <div className="text-indigo-200 text-sm">
                        Workouts
                        <br />
                        Planned
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">2</div>
                      <div className="text-indigo-200 text-sm">
                        Workouts
                        <br />
                        Remaining
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/20">
                    <h4 className="font-semibold mb-4">Progress Overview</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Duration</span>
                          <span>{activeRoutine.progress.total} Weeks</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Total Workouts</span>
                          <span>{activeRoutine.totalWorkouts}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Completed (GTD)</span>
                          <span>{activeRoutine.completedWorkouts}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Current Week</span>
                          <span>
                            {activeRoutine.progress.current}/
                            {activeRoutine.progress.total}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Avg Duration</span>
                          <span>{activeRoutine.estimatedDuration}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Difficulty</span>
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-200 rounded text-xs">
                            {activeRoutine.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-white/20">
                <Button
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-gray-50 shadow-lg"
                  onClick={() =>
                    router.push(`/workout-tracker/${activeRoutine.id}`)
                  }
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Workout
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => router.push(`/routines/${activeRoutine.id}`)}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 shadow-lg"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  View Details
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() =>
                    router.push(`/routines/${activeRoutine.id}/edit`)
                  }
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 shadow-lg"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  Edit Routine
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* My Routines Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Routines</h2>
          <Button
            onClick={() => router.push("/routines/create")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Routine
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search routines..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={goalFilter} onValueChange={setGoalFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All Goals" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Goals</SelectItem>
                    <SelectItem value="Strength">Strength</SelectItem>
                    <SelectItem value="Hypertrophy">Hypertrophy</SelectItem>
                    <SelectItem value="Endurance">Endurance</SelectItem>
                    <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex border border-gray-300 rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">
                  {stat.title}
                </h3>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconColor(
                    stat.color
                  )}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="space-y-1">
                <div
                  className={`font-bold text-gray-800 ${
                    stat.subtitle ? "text-lg" : "text-2xl"
                  }`}
                >
                  {stat.value}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Inactive Routines Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInactiveRoutines.map(routine => (
          <Card key={routine.id} className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3
                    className="text-xl font-bold text-gray-800 cursor-pointer hover:text-indigo-600 transition-colors"
                    onClick={() => router.push(`/routines/${routine.id}`)}
                  >
                    {routine.name}
                  </h3>
                  {routine.isFavorite && (
                    <Button variant="ghost" size="sm" className="p-1">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {routine.daysPerWeek} days/week
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${getDifficultyColor(
                      routine.difficulty
                    )}`}
                  >
                    {routine.difficulty}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${getGoalColor(
                      routine.goal
                    )}`}
                  >
                    {routine.goal}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/routines/${routine.id}`)}
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/routines/${routine.id}/edit`)}
                  title="Edit Routine"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              {routine.description}
            </p>

            {/* Weekly Schedule */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Weekly Schedule:
              </p>
              <div className="flex gap-2">
                {routine.schedule.map((isActive, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {dayLabels[index]}
                  </div>
                ))}
              </div>
            </div>

            {/* Last Used */}
            {routine.lastUsed && (
              <div className="mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Last Used</span>
                  <span className="font-medium text-gray-800">
                    {routine.lastUsed}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                Activate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/routines/${routine.id}`)}
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
