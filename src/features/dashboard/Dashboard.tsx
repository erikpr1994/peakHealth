import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Flame,
  Target,
  TrendingUp,
  MapPin,
  Users,
  Crown,
  Zap,
  Play,
  Star,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import ClubEventConflictModal from "@/features/social/ClubEventConflictModal";

import { Page, OnboardingData } from "@/types/app";

interface DashboardProps {
  onNavigate: (page: Page) => void;
  hasTrainer: boolean;
  isClubMember: boolean;
  onboardingData?: OnboardingData | null;
}

export default function Dashboard({
  onNavigate,
  hasTrainer,
  isClubMember,
  onboardingData,
}: DashboardProps) {
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Mock data for weekly progress
  const weeklyData = [
    { day: "Mon", workouts: 1, calories: 320 },
    { day: "Tue", workouts: 1, calories: 450 },
    { day: "Wed", workouts: 0, calories: 0 },
    { day: "Thu", workouts: 1, calories: 380 },
    { day: "Fri", workouts: 2, calories: 720 },
    { day: "Sat", workouts: 1, calories: 290 },
    { day: "Sun", workouts: 0, calories: 0 },
  ];

  // Mock data for active routines
  const activeRoutines = [
    {
      id: "routine-1",
      name: "Upper Body Strength",
      nextWorkout: "Push Day",
      lastCompleted: "2 days ago",
      progress: 75,
      estimatedTime: "45 min",
      exercises: 8,
    },
    {
      id: "routine-2",
      name: "Cardio & Core",
      nextWorkout: "HIIT Session",
      lastCompleted: "4 days ago",
      progress: 45,
      estimatedTime: "30 min",
      exercises: 6,
    },
  ];

  // Mock recent workouts data
  const recentWorkouts = [
    {
      id: "1",
      name: "Push Day",
      type: "Strength",
      duration: "52 min",
      date: "Yesterday",
    },
    {
      id: "2",
      name: "HIIT Cardio",
      type: "Cardio",
      duration: "28 min",
      date: "3 days ago",
    },
    {
      id: "3",
      name: "Pull Day",
      type: "Strength",
      duration: "48 min",
      date: "5 days ago",
    },
    {
      id: "4",
      name: "Yoga Flow",
      type: "Flexibility",
      duration: "35 min",
      date: "1 week ago",
    },
  ];

  // Mock club events data
  const clubEvents = [
    {
      id: "event-1",
      name: "Morning Yoga Class",
      club: "Zen Fitness Club",
      time: "7:00 AM",
      date: "Tomorrow",
      duration: "60 min",
      difficulty: "Beginner",
      participants: 12,
    },
    {
      id: "event-2",
      name: "HIIT Bootcamp",
      club: "Peak Performance",
      time: "6:30 PM",
      date: "Wednesday",
      duration: "45 min",
      difficulty: "Intermediate",
      participants: 8,
    },
    {
      id: "event-3",
      name: "Strength Training",
      club: "Iron Warriors",
      time: "5:00 PM",
      date: "Friday",
      duration: "75 min",
      difficulty: "Advanced",
      participants: 15,
    },
  ];

  // Mock clubs around user
  const nearbyClubs = [
    {
      id: "club-1",
      name: "Zen Fitness Club",
      distance: "0.3 miles",
      rating: 4.8,
      members: "2.1k",
      specialty: "Yoga & Mindfulness",
    },
    {
      id: "club-2",
      name: "Peak Performance",
      distance: "0.7 miles",
      rating: 4.6,
      members: "1.5k",
      specialty: "HIIT & CrossFit",
    },
    {
      id: "club-3",
      name: "Iron Warriors",
      distance: "1.2 miles",
      rating: 4.9,
      members: "890",
      specialty: "Powerlifting",
    },
  ];

  const handleJoinEvent = (event: any) => {
    setSelectedEvent(event);
    setShowConflictModal(true);
  };

  const handleStartWorkout = (routineId: string) => {
    onNavigate("workout-tracker");
  };

  // Get personalized greeting based on onboarding data
  const getPersonalizedGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = "Good morning";
    if (hour >= 12 && hour < 17) timeGreeting = "Good afternoon";
    if (hour >= 17) timeGreeting = "Good evening";

    const name = onboardingData?.name || "there";
    return `${timeGreeting}, ${name}!`;
  };

  // Get personalized motivation message
  const getMotivationMessage = () => {
    if (!onboardingData) return "Ready to crush your fitness goals today?";

    const primaryGoal = onboardingData.goals?.[0];
    const timeAvailable = onboardingData.timeAvailable;

    if (primaryGoal === "Lose weight") {
      return "Every workout gets you closer to your weight loss goal!";
    } else if (primaryGoal === "Build muscle") {
      return "Time to build that strength and muscle mass!";
    } else if (primaryGoal === "Improve endurance") {
      return "Let's boost that endurance and stamina today!";
    } else if (timeAvailable === "15-30 minutes") {
      return "Even 15 minutes can make a difference - let's do this!";
    }

    return "Ready to take your fitness to the next level?";
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Compact Trainer Status Banner */}
      {hasTrainer && (
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">
              {getPersonalizedGreeting()}
            </h1>
            <p className="text-gray-500 mt-2">{getMotivationMessage()}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 ml-6 min-w-fit">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-700">
                Trainer: Sarah Johnson
              </span>
            </div>
            <p className="text-xs text-blue-600 mt-1">Managing your routines</p>
          </div>
        </div>
      )}

      {!hasTrainer && (
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {getPersonalizedGreeting()}
          </h1>
          <p className="text-gray-500 mt-2">{getMotivationMessage()}</p>
        </div>
      )}

      {/* This Week's Progress Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Workouts</p>
              <p className="text-2xl font-bold text-gray-900">6</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Calories</p>
              <p className="text-2xl font-bold text-gray-900">2,160</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Time</p>
              <p className="text-2xl font-bold text-gray-900">4.2h</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Streak</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Pro Upgrade Banner */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">
              Ready to take your fitness to the next level?
            </h3>
            <p className="text-purple-100 mb-4">
              Unlock advanced analytics, custom meal plans, and 1-on-1 coaching
              with Peak Health Pro.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Crown className="w-4 h-4" />
                <span>Advanced Analytics</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                <span>Custom Meal Plans</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>1-on-1 Coaching</span>
              </div>
            </div>
          </div>
          <Button
            variant="secondary"
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            Upgrade to Pro
          </Button>
        </div>
      </Card>

      {/* Today's Workout */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Today's Workout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeRoutines.map((routine) => (
            <div
              key={routine.id}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{routine.name}</h3>
                  <p className="text-sm text-gray-600">
                    Next: {routine.nextWorkout}
                  </p>
                </div>
                <Button
                  onClick={() => handleStartWorkout(routine.id)}
                  className="flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Start Workout
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Duration</p>
                  <p className="font-medium">{routine.estimatedTime}</p>
                </div>
                <div>
                  <p className="text-gray-600">Exercises</p>
                  <p className="font-medium">{routine.exercises}</p>
                </div>
                <div>
                  <p className="text-gray-600">Progress</p>
                  <div className="flex items-center gap-2">
                    <Progress value={routine.progress} className="flex-1 h-2" />
                    <span className="font-medium">{routine.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Find a Trainer Banner - Only show if user doesn't have trainer */}
      {!hasTrainer && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Ready for personalized guidance?
                </h3>
                <p className="text-gray-600 mb-3">
                  Connect with certified trainers who can create custom workout
                  plans and provide expert guidance tailored to your goals.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>✓ Personalized workout plans</span>
                  <span>✓ Expert guidance</span>
                  <span>✓ Progress tracking</span>
                </div>
              </div>
              <Button
                onClick={() => onNavigate("trainer-and-clubs")}
                className="ml-6"
              >
                Find a Trainer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              This Week's Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Area
                    type="monotone"
                    dataKey="calories"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Workouts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentWorkouts.slice(0, 4).map((workout) => (
                <div
                  key={workout.id}
                  className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{workout.name}</p>
                    <p className="text-sm text-gray-600">{workout.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{workout.duration}</p>
                    <p className="text-xs text-gray-500">{workout.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Club Events - Only show if user is a club member */}
      {isClubMember && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Upcoming Club Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clubEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {event.difficulty}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {event.participants} attending
                    </span>
                  </div>
                  <h4 className="font-semibold mb-1">{event.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{event.club}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>
                      {event.date} at {event.time}
                    </span>
                    <span>{event.duration}</span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => handleJoinEvent(event)}
                  >
                    Join Event
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clubs Around You */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Clubs Around You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyClubs.map((club) => (
              <div
                key={club.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{club.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">{club.distance}</span>
                </div>
                <h4 className="font-semibold mb-1">{club.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{club.specialty}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {club.members} members
                  </span>
                  <Button size="sm" variant="outline">
                    View Club
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Club Event Conflict Modal */}
      <ClubEventConflictModal
        isOpen={showConflictModal}
        onClose={() => setShowConflictModal(false)}
        event={selectedEvent}
        hasTrainer={hasTrainer}
        onConfirm={(action, message) => {
          console.log(
            "Event joined:",
            selectedEvent,
            "Action:",
            action,
            "Message:",
            message
          );
          setShowConflictModal(false);
        }}
      />
    </div>
  );
}
