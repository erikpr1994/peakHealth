import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Plus,
  Play,
  Edit,
  Trash,
  Clock,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Page } from "@/types/app";

interface CalendarProps {
  onNavigate: (page: Page, id?: string) => void;
}

interface WorkoutEvent {
  id: string;
  name: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  type: "Strength" | "Cardio" | "HIIT" | "Flexibility" | "Recovery";
  status: "scheduled" | "completed" | "missed" | "active";
  date: Date;
  time: string;
  exercises: number;
  estimatedCalories?: number;
  actualCalories?: number;
}

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  workouts: WorkoutEvent[];
}

export default function Calendar({ onNavigate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 22)); // July 22, 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 6, 22)); // July 22, 2025
  const [viewMode, setViewMode] = useState<"Month" | "Week" | "Day">("Month");

  const today = new Date(2025, 6, 22); // July 22, 2025
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const workoutTypes = [
    {
      name: "Strength",
      color: "bg-indigo-500",
      textColor: "text-indigo-700",
      bgColor: "bg-indigo-50",
    },
    {
      name: "Cardio",
      color: "bg-green-500",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
    },
    {
      name: "HIIT",
      color: "bg-orange-500",
      textColor: "text-orange-700",
      bgColor: "bg-orange-50",
    },
    {
      name: "Flexibility",
      color: "bg-purple-500",
      textColor: "text-purple-700",
      bgColor: "bg-purple-50",
    },
    {
      name: "Recovery",
      color: "bg-blue-500",
      textColor: "text-blue-700",
      bgColor: "bg-blue-50",
    },
  ];

  // Sample workout data - July 2025 with multiple daily sessions
  const workouts: WorkoutEvent[] = [
    {
      id: "1",
      name: "Upper Body Strength",
      duration: "45 minutes",
      difficulty: "Intermediate",
      type: "Strength",
      status: "completed",
      date: new Date(2025, 6, 20), // July 20, 2025
      time: "5:30 PM",
      exercises: 8,
      estimatedCalories: 320,
      actualCalories: 298,
    },
    {
      id: "2",
      name: "Morning HIIT",
      duration: "30 minutes",
      difficulty: "Advanced",
      type: "HIIT",
      status: "scheduled",
      date: new Date(2025, 6, 22), // July 22, 2025 (Today)
      time: "7:00 AM",
      exercises: 6,
      estimatedCalories: 280,
    },
    {
      id: "2b",
      name: "Evening Yoga",
      duration: "25 minutes",
      difficulty: "Beginner",
      type: "Flexibility",
      status: "scheduled",
      date: new Date(2025, 6, 22), // July 22, 2025 (Today - Evening)
      time: "7:30 PM",
      exercises: 4,
      estimatedCalories: 120,
    },
    {
      id: "3",
      name: "Lower Body Focus",
      duration: "50 minutes",
      difficulty: "Intermediate",
      type: "Strength",
      status: "scheduled",
      date: new Date(2025, 6, 23), // July 23, 2025 (Tomorrow)
      time: "6:00 PM",
      exercises: 10,
      estimatedCalories: 350,
    },
    {
      id: "4a",
      name: "Morning Walk",
      duration: "30 minutes",
      difficulty: "Beginner",
      type: "Cardio",
      status: "scheduled",
      date: new Date(2025, 6, 24), // July 24, 2025
      time: "7:00 AM",
      exercises: 2,
      estimatedCalories: 150,
    },
    {
      id: "4b",
      name: "Strength Training",
      duration: "45 minutes",
      difficulty: "Intermediate",
      type: "Strength",
      status: "scheduled",
      date: new Date(2025, 6, 24), // July 24, 2025 (Same day - Evening)
      time: "6:30 PM",
      exercises: 7,
      estimatedCalories: 300,
    },
    {
      id: "5",
      name: "Full Body Circuit",
      duration: "40 minutes",
      difficulty: "Advanced",
      type: "HIIT",
      status: "completed",
      date: new Date(2025, 6, 18), // July 18, 2025
      time: "6:30 PM",
      exercises: 12,
      estimatedCalories: 380,
      actualCalories: 365,
    },
    {
      id: "6a",
      name: "Morning Cardio",
      duration: "25 minutes",
      difficulty: "Beginner",
      type: "Cardio",
      status: "completed",
      date: new Date(2025, 6, 19), // July 19, 2025
      time: "6:45 AM",
      exercises: 3,
      estimatedCalories: 180,
      actualCalories: 165,
    },
    {
      id: "6b",
      name: "Core & Flexibility",
      duration: "35 minutes",
      difficulty: "Beginner",
      type: "Flexibility",
      status: "completed",
      date: new Date(2025, 6, 19), // July 19, 2025 (Same day - Evening)
      time: "8:00 PM",
      exercises: 6,
      estimatedCalories: 150,
      actualCalories: 142,
    },
    {
      id: "7a",
      name: "Morning Run",
      duration: "35 minutes",
      difficulty: "Intermediate",
      type: "Cardio",
      status: "completed",
      date: new Date(2025, 6, 21), // July 21, 2025
      time: "6:30 AM",
      exercises: 3,
      estimatedCalories: 250,
      actualCalories: 265,
    },
    {
      id: "7b",
      name: "Push Day",
      duration: "55 minutes",
      difficulty: "Advanced",
      type: "Strength",
      status: "completed",
      date: new Date(2025, 6, 21), // July 21, 2025 (Same day - Evening)
      time: "6:00 PM",
      exercises: 9,
      estimatedCalories: 380,
      actualCalories: 395,
    },
    {
      id: "8",
      name: "Morning Cardio",
      duration: "25 minutes",
      difficulty: "Intermediate",
      type: "Cardio",
      status: "scheduled",
      date: new Date(2025, 6, 25), // July 25, 2025
      time: "6:30 AM",
      exercises: 5,
      estimatedCalories: 220,
    },
    {
      id: "9a",
      name: "Lunch Break Stretch",
      duration: "20 minutes",
      difficulty: "Beginner",
      type: "Flexibility",
      status: "scheduled",
      date: new Date(2025, 6, 26), // July 26, 2025
      time: "12:30 PM",
      exercises: 4,
      estimatedCalories: 80,
    },
    {
      id: "9b",
      name: "Pull Day",
      duration: "50 minutes",
      difficulty: "Intermediate",
      type: "Strength",
      status: "scheduled",
      date: new Date(2025, 6, 26), // July 26, 2025 (Same day - Evening)
      time: "7:00 PM",
      exercises: 8,
      estimatedCalories: 340,
    },
  ];

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateToToday = () => {
    setCurrentDate(new Date(2025, 6, 22)); // July 22, 2025
    setSelectedDate(new Date(2025, 6, 22)); // July 22, 2025
  };

  const generateCalendarDays = (): CalendarDay[] => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const days: CalendarDay[] = [];

    // Add previous month's trailing days
    const prevMonth = new Date(currentYear, currentMonth - 1, 0);
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = prevMonth.getDate() - i;
      const workoutDate = new Date(currentYear, currentMonth - 1, date);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        workouts: workouts.filter((w) => isSameDay(w.date, workoutDate)),
      });
    }

    // Add current month's days
    for (let date = 1; date <= daysInMonth; date++) {
      const workoutDate = new Date(currentYear, currentMonth, date);
      const isToday = isSameDay(workoutDate, today);
      const isSelected = isSameDay(workoutDate, selectedDate);

      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelected,
        workouts: workouts.filter((w) => isSameDay(w.date, workoutDate)),
      });
    }

    // Add next month's leading days
    const remainingDays = 42 - days.length; // 6 weeks × 7 days
    for (let date = 1; date <= remainingDays; date++) {
      const workoutDate = new Date(currentYear, currentMonth + 1, date);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        workouts: workouts.filter((w) => isSameDay(w.date, workoutDate)),
      });
    }

    return days;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const getUpcomingWorkouts = () => {
    return workouts
      .filter((w) => w.status === "scheduled" && w.date >= today)
      .sort((a, b) => {
        // First sort by date, then by time
        if (a.date.getTime() !== b.date.getTime()) {
          return a.date.getTime() - b.date.getTime();
        }
        // Convert time to 24-hour format for comparison
        const timeA = convertTo24Hour(a.time);
        const timeB = convertTo24Hour(b.time);
        return timeA.localeCompare(timeB);
      })
      .slice(0, 8); // Show more to accommodate multiple daily sessions
  };

  const convertTo24Hour = (time: string): string => {
    const [timePart, period] = time.split(" ");
    let [hours, minutes] = timePart.split(":");
    let hour = parseInt(hours);

    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return `${hour.toString().padStart(2, "0")}:${minutes}`;
  };

  const groupWorkoutsByDay = (workoutList: WorkoutEvent[]) => {
    const grouped = workoutList.reduce((acc, workout) => {
      const dateKey = workout.date.toDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(workout);
      return acc;
    }, {} as Record<string, WorkoutEvent[]>);

    // Sort workouts within each day by time
    Object.keys(grouped).forEach((dateKey) => {
      grouped[dateKey].sort((a, b) => {
        const timeA = convertTo24Hour(a.time);
        const timeB = convertTo24Hour(b.time);
        return timeA.localeCompare(timeB);
      });
    });

    return grouped;
  };

  const getTimeOfDay = (
    time: string
  ): { period: string; color: string; bgColor: string } => {
    const hour24 = parseInt(convertTo24Hour(time).split(":")[0]);

    if (hour24 >= 5 && hour24 < 12) {
      return {
        period: "Morning",
        color: "text-amber-700",
        bgColor: "bg-amber-50 border-amber-200",
      };
    } else if (hour24 >= 12 && hour24 < 17) {
      return {
        period: "Afternoon",
        color: "text-blue-700",
        bgColor: "bg-blue-50 border-blue-200",
      };
    } else {
      return {
        period: "Evening",
        color: "text-purple-700",
        bgColor: "bg-purple-50 border-purple-200",
      };
    }
  };

  const getWorkoutTypeConfig = (type: WorkoutEvent["type"]) => {
    return workoutTypes.find((wt) => wt.name === type) || workoutTypes[0];
  };

  const getStatusConfig = (status: WorkoutEvent["status"]) => {
    switch (status) {
      case "completed":
        return {
          color: "bg-green-500",
          text: "Completed",
          textColor: "text-green-700",
        };
      case "scheduled":
        return {
          color: "bg-blue-500",
          text: "Scheduled",
          textColor: "text-blue-700",
        };
      case "missed":
        return {
          color: "bg-red-500",
          text: "Missed",
          textColor: "text-red-700",
        };
      case "active":
        return {
          color: "bg-yellow-500",
          text: "In Progress",
          textColor: "text-yellow-700",
        };
      default:
        return {
          color: "bg-gray-500",
          text: "Unknown",
          textColor: "text-gray-700",
        };
    }
  };

  const formatDate = (date: Date): string => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (isSameDay(date, today)) {
      return "Today";
    } else if (isSameDay(date, tomorrow)) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        weekday: "short",
      });
    }
  };

  const calendarDays = generateCalendarDays();
  const upcomingWorkouts = getUpcomingWorkouts();
  const groupedUpcoming = groupWorkoutsByDay(upcomingWorkouts);

  // Calculate stats
  const completedThisMonth = workouts.filter(
    (w) =>
      w.status === "completed" &&
      w.date.getMonth() === today.getMonth() &&
      w.date.getFullYear() === today.getFullYear()
  ).length;

  const scheduledThisMonth = workouts.filter(
    (w) =>
      w.date.getMonth() === today.getMonth() &&
      w.date.getFullYear() === today.getFullYear()
  ).length;

  const totalCaloriesBurned = workouts
    .filter((w) => w.status === "completed" && w.actualCalories)
    .reduce((sum, w) => sum + (w.actualCalories || 0), 0);

  // Calculate days with multiple sessions this month
  const daysWithMultipleSessions = Object.values(
    workouts
      .filter(
        (w) =>
          w.date.getMonth() === today.getMonth() &&
          w.date.getFullYear() === today.getFullYear()
      )
      .reduce((acc, workout) => {
        const dateKey = workout.date.toDateString();
        if (!acc[dateKey]) {
          acc[dateKey] = 0;
        }
        acc[dateKey]++;
        return acc;
      }, {} as Record<string, number>)
  ).filter((count) => count > 1).length;

  // Calculate average workout duration
  const completedWorkouts = workouts.filter((w) => w.status === "completed");
  const totalMinutes = completedWorkouts.reduce((sum, w) => {
    const minutes = parseInt(w.duration.split(" ")[0]);
    return sum + minutes;
  }, 0);
  const avgDuration =
    completedWorkouts.length > 0
      ? Math.round(totalMinutes / completedWorkouts.length)
      : 0;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-none">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
        <p className="text-gray-500 mt-2">
          View and manage your workout schedule
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedThisMonth}/{scheduledThisMonth}
              </p>
              <p className="text-xs text-gray-500">Workouts completed</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Calories</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalCaloriesBurned.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">Burned this month</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Duration</p>
              <p className="text-2xl font-bold text-gray-900">{avgDuration}m</p>
              <p className="text-xs text-gray-500">Per workout</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Double Days</p>
              <p className="text-2xl font-bold text-gray-900">
                {daysWithMultipleSessions}
              </p>
              <p className="text-xs text-gray-500">Multiple sessions</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {months[currentMonth]} {currentYear}
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateMonth("prev")}
                    className="w-8 h-8 p-0"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateMonth("next")}
                    className="w-8 h-8 p-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={navigateToToday}
                    className="ml-2"
                  >
                    Today
                  </Button>
                </div>
              </div>

              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                {["Month", "Week", "Day"].map((mode) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? "default" : "ghost"}
                    size="sm"
                    onClick={() =>
                      setViewMode(mode as "Month" | "Week" | "Day")
                    }
                    className={`px-3 py-1 text-sm ${
                      viewMode === mode
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {mode}
                  </Button>
                ))}
              </div>
            </div>

            {/* Workout Type Legend */}
            <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-700">Legend:</span>
              {workoutTypes.map((type) => (
                <div key={type.name} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${type.color}`} />
                  <span className="text-sm text-gray-600">{type.name}</span>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day Headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-2 text-center">
                  <span className="text-sm font-medium text-gray-600">
                    {day}
                  </span>
                </div>
              ))}

              {/* Calendar Days */}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`relative min-h-[80px] p-2 border border-gray-100 cursor-pointer transition-colors ${
                    day.isCurrentMonth
                      ? "bg-white hover:bg-gray-50"
                      : "bg-gray-50 text-gray-400"
                  } ${day.isToday ? "bg-indigo-50 border-indigo-200" : ""} ${
                    day.isSelected ? "ring-2 ring-indigo-500" : ""
                  }`}
                  onClick={() =>
                    setSelectedDate(
                      new Date(currentYear, currentMonth, day.date)
                    )
                  }
                >
                  <span
                    className={`text-sm font-medium ${
                      day.isToday
                        ? "text-indigo-600"
                        : day.isCurrentMonth
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {day.date}
                  </span>

                  {/* Workout indicators */}
                  {day.workouts.length > 0 && (
                    <div className="absolute bottom-1 left-1 right-1">
                      {day.workouts.length === 1 ? (
                        // Single workout - show as before
                        <div className="flex gap-1">
                          {day.workouts.map((workout, i) => {
                            const typeConfig = getWorkoutTypeConfig(
                              workout.type
                            );
                            const statusConfig = getStatusConfig(
                              workout.status
                            );
                            return (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  workout.status === "completed"
                                    ? statusConfig.color
                                    : typeConfig.color
                                }`}
                                title={`${workout.name} at ${workout.time} - ${workout.status}`}
                              />
                            );
                          })}
                        </div>
                      ) : (
                        // Multiple workouts - show count and time indicators
                        <div className="space-y-0.5">
                          <div className="flex items-center justify-between">
                            <div className="flex gap-0.5">
                              {day.workouts.slice(0, 4).map((workout, i) => {
                                const typeConfig = getWorkoutTypeConfig(
                                  workout.type
                                );
                                const statusConfig = getStatusConfig(
                                  workout.status
                                );
                                return (
                                  <div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      workout.status === "completed"
                                        ? statusConfig.color
                                        : typeConfig.color
                                    }`}
                                    title={`${workout.name} at ${workout.time} - ${workout.status}`}
                                  />
                                );
                              })}
                              {day.workouts.length > 4 && (
                                <span className="text-xs text-gray-500">
                                  +{day.workouts.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 bg-white/80 px-1 py-0.5 rounded">
                            {day.workouts.length} sessions
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Workouts */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Upcoming Workouts
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("routines")}
                className="text-indigo-600 hover:text-indigo-700"
              >
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {Object.entries(groupedUpcoming).map(([dateKey, dayWorkouts]) => (
                <div key={dateKey} className="space-y-3">
                  {/* Day Header */}
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">
                      {formatDate(dayWorkouts[0].date)}
                    </h4>
                    {dayWorkouts.length > 1 && (
                      <Badge variant="outline" className="text-xs">
                        {dayWorkouts.length} sessions
                      </Badge>
                    )}
                  </div>

                  {/* Workouts for this day */}
                  <div className="space-y-2">
                    {dayWorkouts.map((workout) => {
                      const typeConfig = getWorkoutTypeConfig(workout.type);
                      const timeOfDay = getTimeOfDay(workout.time);
                      const isToday = isSameDay(workout.date, today);

                      return (
                        <div
                          key={workout.id}
                          className={`p-3 rounded-lg border transition-colors ${
                            isToday
                              ? "bg-indigo-50 border-indigo-200"
                              : "bg-white border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-medium text-gray-900">
                                  {workout.name}
                                </h5>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${timeOfDay.color} ${timeOfDay.bgColor} border-0`}
                                >
                                  {timeOfDay.period}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="secondary"
                                  className={`text-xs ${typeConfig.bgColor} ${typeConfig.textColor} border-0`}
                                >
                                  {workout.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {workout.difficulty}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-7 h-7 p-0"
                              >
                                <Edit className="w-3 h-3 text-gray-500" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-7 h-7 p-0"
                              >
                                <Trash className="w-3 h-3 text-red-500" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>
                                {workout.time} • {workout.duration}
                              </span>
                            </div>
                            <div className="flex items-center justify-end gap-1">
                              <Target className="w-3 h-3" />
                              <span>{workout.exercises} exercises</span>
                            </div>
                          </div>

                          {workout.estimatedCalories && (
                            <div className="text-xs text-gray-600 mb-2">
                              Estimated: ~{workout.estimatedCalories} calories
                            </div>
                          )}

                          {isToday && (
                            <Button
                              className="w-full mt-2"
                              size="sm"
                              onClick={() => onNavigate("workout-tracker")}
                            >
                              <Play className="w-3 h-3 mr-2" />
                              Start {timeOfDay.period} Workout
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {Object.keys(groupedUpcoming).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="font-medium">No upcoming workouts</p>
                  <p className="text-sm">Schedule your next session</p>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => onNavigate("create-routine")}
              >
                <Plus className="w-4 h-4 mr-3" />
                Schedule Workout
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => onNavigate("routines")}
              >
                <CalendarIcon className="w-4 h-4 mr-3" />
                View Routines
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => onNavigate("statistics")}
              >
                <TrendingUp className="w-4 h-4 mr-3" />
                View Progress
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
