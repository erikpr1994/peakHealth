"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Play,
  Edit,
  Share,
  Heart,
  Calendar,
  Activity,
  Clock,
  Target,
  Copy,
  Trash,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface RoutineDetailProps {
  routineId: string;
}

interface Exercise {
  id: string;
  name: string;
  sets: Array<{
    reps?: string;
    weight?: string;
    duration?: string;
    restTime: string;
  }>;
  notes?: string;
  muscleGroups: string[];
}

interface WorkoutDay {
  id: string;
  name: string;
  exercises: Exercise[];
  estimatedTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

interface RoutineData {
  id: string;
  name: string;
  description: string;
  duration: number; // weeks
  daysPerWeek: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  goal: "Strength" | "Hypertrophy" | "Endurance" | "Weight Loss";
  isActive: boolean;
  isFavorite: boolean;
  progress: {
    currentWeek: number;
    totalWeeks: number;
    completedWorkouts: number;
    totalWorkouts: number;
  };
  schedule: boolean[]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  workoutDays: WorkoutDay[];
  createdDate: string;
  lastModified: string;
}

export default function RoutineDetail({ routineId }: RoutineDetailProps) {
  const router = useRouter();
  const [showAllExercises, setShowAllExercises] = useState(false);

  // Mock data - in a real app, this would come from an API based on routineId
  const routineData: RoutineData = {
    id: routineId,
    name: "Full Body Split",
    description:
      "A comprehensive full-body workout targeting all major muscle groups with compound movements. Perfect for intermediate lifters looking to build strength and muscle mass.",
    duration: 8,
    daysPerWeek: 3,
    difficulty: "Intermediate",
    goal: "Hypertrophy",
    isActive: true,
    isFavorite: false,
    progress: {
      currentWeek: 4,
      totalWeeks: 8,
      completedWorkouts: 9,
      totalWorkouts: 24,
    },
    schedule: [true, false, true, false, true, false, false], // M W F
    workoutDays: [
      {
        id: "workout-a",
        name: "Workout A - Upper Focus",
        estimatedTime: "45-60 min",
        difficulty: "Intermediate",
        exercises: [
          {
            id: "bench-press",
            name: "Barbell Bench Press",
            muscleGroups: ["Chest", "Triceps", "Shoulders"],
            sets: [
              { reps: "10", weight: "Warm-up", restTime: "60s" },
              { reps: "8", weight: "135 lbs", restTime: "90s" },
              { reps: "6", weight: "155 lbs", restTime: "90s" },
              { reps: "6", weight: "155 lbs", restTime: "90s" },
            ],
          },
          {
            id: "bent-over-row",
            name: "Bent-Over Barbell Row",
            muscleGroups: ["Back", "Biceps"],
            sets: [
              { reps: "8", weight: "115 lbs", restTime: "90s" },
              { reps: "8", weight: "125 lbs", restTime: "90s" },
              { reps: "6", weight: "135 lbs", restTime: "90s" },
            ],
          },
          {
            id: "shoulder-press",
            name: "Overhead Press",
            muscleGroups: ["Shoulders", "Triceps"],
            sets: [
              { reps: "8", weight: "85 lbs", restTime: "90s" },
              { reps: "6", weight: "95 lbs", restTime: "90s" },
              { reps: "6", weight: "95 lbs", restTime: "90s" },
            ],
          },
          {
            id: "pull-ups",
            name: "Pull-ups",
            muscleGroups: ["Back", "Biceps"],
            sets: [
              { reps: "8", weight: "Bodyweight", restTime: "90s" },
              { reps: "6", weight: "Bodyweight", restTime: "90s" },
              { reps: "5", weight: "Bodyweight", restTime: "90s" },
            ],
          },
        ],
      },
      {
        id: "workout-b",
        name: "Workout B - Lower Focus",
        estimatedTime: "50-65 min",
        difficulty: "Intermediate",
        exercises: [
          {
            id: "squats",
            name: "Barbell Back Squat",
            muscleGroups: ["Quadriceps", "Glutes", "Core"],
            sets: [
              { reps: "10", weight: "Warm-up", restTime: "60s" },
              { reps: "8", weight: "155 lbs", restTime: "2 min" },
              { reps: "6", weight: "185 lbs", restTime: "2 min" },
              { reps: "6", weight: "185 lbs", restTime: "2 min" },
            ],
          },
          {
            id: "deadlift",
            name: "Romanian Deadlift",
            muscleGroups: ["Hamstrings", "Glutes", "Back"],
            sets: [
              { reps: "8", weight: "135 lbs", restTime: "90s" },
              { reps: "6", weight: "155 lbs", restTime: "90s" },
              { reps: "6", weight: "165 lbs", restTime: "90s" },
            ],
          },
        ],
      },
    ],
    createdDate: "June 15, 2024",
    lastModified: "July 10, 2024",
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

  const progressPercentage =
    (routineData.progress.completedWorkouts /
      routineData.progress.totalWorkouts) *
    100;

  const displayedExercises = showAllExercises
    ? routineData.workoutDays.flatMap((day) => day.exercises)
    : routineData.workoutDays.flatMap((day) => day.exercises).slice(0, 6);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/routines")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Routines
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-800">
                {routineData.name}
              </h1>
              {routineData.isActive && (
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  Active
                </span>
              )}
            </div>
            <p className="text-gray-500">{routineData.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <Heart
              className={`w-4 h-4 ${
                routineData.isFavorite
                  ? "text-red-500 fill-red-500"
                  : "text-gray-400"
              }`}
            />
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/routines/${routineId}/edit`)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={() => router.push(`/workout-tracker/${routineId}`)}
          >
            <Play className="w-4 h-4 mr-2" />
            Start Workout
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Duration</h3>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {routineData.duration} weeks
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Frequency</h3>
            <Activity className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {routineData.daysPerWeek} days/week
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Avg. Duration</h3>
            <Clock className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-800">45-60 min</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Goal</h3>
            <Target className="w-4 h-4 text-gray-400" />
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getGoalColor(
              routineData.goal
            )}`}
          >
            {routineData.goal}
          </span>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Progress & Schedule */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Progress
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Overall Progress
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    Week {routineData.progress.currentWeek} of{" "}
                    {routineData.progress.totalWeeks}
                  </span>
                </div>
                <Progress
                  value={
                    (routineData.progress.currentWeek /
                      routineData.progress.totalWeeks) *
                    100
                  }
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Workouts Completed
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {routineData.progress.completedWorkouts} of{" "}
                    {routineData.progress.totalWorkouts}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>
          </Card>

          {/* Weekly Schedule */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Weekly Schedule
            </h2>
            <div className="flex gap-3">
              {routineData.schedule.map((isActive, index) => (
                <div
                  key={index}
                  className={`flex-1 h-16 rounded-lg flex flex-col items-center justify-center ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-300"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <div className="text-xs font-medium">{dayLabels[index]}</div>
                  {isActive && <div className="text-xs mt-1">Workout</div>}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Routine Info */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Routine Info
          </h2>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Difficulty Level</div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                  routineData.difficulty
                )}`}
              >
                {routineData.difficulty}
              </span>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Created</div>
              <div className="font-medium text-gray-800">
                {routineData.createdDate}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Last Modified</div>
              <div className="font-medium text-gray-800">
                {routineData.lastModified}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500 mb-3">Quick Actions</div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate Routine
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share Routine
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-red-600 hover:text-red-700"
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Delete Routine
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Workout Days */}
      <Card className="p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Workout Days
        </h2>
        <div className="space-y-6">
          {routineData.workoutDays.map((workout) => (
            <div
              key={workout.id}
              className="border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {workout.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span>Est. {workout.estimatedTime}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${getDifficultyColor(
                        workout.difficulty
                      )}`}
                    >
                      {workout.difficulty}
                    </span>
                    <span>{workout.exercises.length} exercises</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/workout-tracker/${routineId}`)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
              </div>

              <div className="space-y-3">
                {workout.exercises.map((exercise) => (
                  <div key={exercise.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">
                        {exercise.name}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {exercise.muscleGroups.map((group) => (
                          <span
                            key={group}
                            className="px-2 py-1 bg-white text-gray-600 rounded text-xs"
                          >
                            {group}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {exercise.sets.length} sets •{" "}
                      {exercise.sets.map((set) => set.reps).join(", ")} reps
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Exercise List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">All Exercises</h2>
          <Button
            variant="ghost"
            onClick={() => setShowAllExercises(!showAllExercises)}
            className="text-indigo-600"
          >
            {showAllExercises ? "Show Less" : "View All"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <h4 className="font-medium text-gray-800 mb-2">
                {exercise.name}
              </h4>
              <div className="flex flex-wrap gap-1 mb-2">
                {exercise.muscleGroups.map((group) => (
                  <span
                    key={group}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    {group}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                {exercise.sets.length} sets
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
