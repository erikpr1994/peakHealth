"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Award,
  Star,
  MessageCircle,
  Video,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  specializations: string[];
  experience: number;
  rating: number;
  bio: string;
  certifications: string[];
  location: string;
  nextSession?: {
    date: string;
    time: string;
    type: "in-person" | "virtual";
  };
  stats: {
    totalSessions: number;
    clientsHelped: number;
    yearsExperience: number;
  };
}

interface Club {
  id: string;
  name: string;
  type: string;
  description: string;
  memberCount: number;
  avatar: string;
  location: string;
  meetingSchedule: string;
  joinedDate: string;
  nextEvent?: {
    name: string;
    date: string;
    time: string;
    location: string;
  };
  activities: string[];
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
}

export default function TrainerAndClubs() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in a real app, this would come from a user context or API
  const userTrainer: Trainer = {
    id: "trainer-1",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@fitness.com",
    phone: "+1 (555) 123-4567",
    avatar: "/api/placeholder/128/128",
    specializations: ["Strength Training", "Weight Loss", "Functional Fitness"],
    experience: 8,
    rating: 4.9,
    bio: "Sarah is a certified personal trainer with over 8 years of experience helping clients achieve their fitness goals. She specializes in strength training and functional movement patterns.",
    certifications: ["NASM-CPT", "CSCS", "FMS Level 2"],
    location: "Downtown Fitness Center",
    nextSession: {
      date: "2025-07-23",
      time: "2:00 PM",
      type: "in-person",
    },
    stats: {
      totalSessions: 156,
      clientsHelped: 45,
      yearsExperience: 8,
    },
  };

  const userClubs: Club[] = [
    {
      id: "club-1",
      name: "Morning Runners Club",
      type: "Running",
      description:
        "A friendly group of early risers who love to start their day with a good run. We meet every Tuesday and Thursday for group runs.",
      memberCount: 24,
      avatar: "/api/placeholder/64/64",
      location: "Central Park",
      meetingSchedule: "Tuesdays & Thursdays, 6:30 AM",
      joinedDate: "2024-03-15",
      nextEvent: {
        name: "5K Fun Run",
        date: "2025-07-26",
        time: "7:00 AM",
        location: "Central Park Loop",
      },
      activities: ["Group Runs", "Pace Training", "Social Events"],
      level: "All Levels",
    },
    {
      id: "club-2",
      name: "Powerlifting Society",
      type: "Powerlifting",
      description:
        "Serious powerlifters focused on improving their squat, bench, and deadlift. We provide coaching, spotting, and motivation.",
      memberCount: 18,
      avatar: "/api/placeholder/64/64",
      location: "Iron Temple Gym",
      meetingSchedule: "Saturdays, 10:00 AM",
      joinedDate: "2024-05-20",
      nextEvent: {
        name: "Monthly Max Out Day",
        date: "2025-07-28",
        time: "10:00 AM",
        location: "Iron Temple Gym",
      },
      activities: ["Technique Coaching", "Spotting", "Competition Prep"],
      level: "Intermediate",
    },
  ];

  const hasTrainer = !!userTrainer;
  const hasClubs = userClubs.length > 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTrainerStatusColor = () => {
    if (hasTrainer) return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  const getLevelColor = (level: string) => {
    const colors = {
      Beginner: "bg-green-100 text-green-700",
      Intermediate: "bg-yellow-100 text-yellow-700",
      Advanced: "bg-red-100 text-red-700",
      "All Levels": "bg-blue-100 text-blue-700",
    };
    return colors[level as keyof typeof colors] || colors["All Levels"];
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            My Trainer & Clubs
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your fitness community and professional guidance.
          </p>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Trainer Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getTrainerStatusColor()}`}
              >
                {hasTrainer ? "Active" : "No Trainer"}
              </div>
              {hasTrainer && (
                <Badge variant="secondary" className="text-xs">
                  Routine Creation Managed
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Club Memberships</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-primary">
                {userClubs.length}
              </span>
              <span className="text-gray-600">
                Active {userClubs.length === 1 ? "Club" : "Clubs"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Community Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-primary">
                {userClubs.reduce((total, club) => total + club.memberCount, 0)}
              </span>
              <span className="text-gray-600">Total Members</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trainer">Trainer</TabsTrigger>
          <TabsTrigger value="clubs">Clubs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trainer Summary */}
            {hasTrainer && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Current Trainer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={userTrainer.avatar}
                        alt={userTrainer.name}
                      />
                      <AvatarFallback>
                        {userTrainer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {userTrainer.name}
                      </h3>
                      <p className="text-gray-600">
                        {userTrainer.specializations.join(", ")}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">
                            {userTrainer.rating}
                          </span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">
                          {userTrainer.experience} years exp
                        </span>
                      </div>
                    </div>
                  </div>
                  {userTrainer.nextSession && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-800">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">Next Session</span>
                      </div>
                      <p className="text-blue-700 mt-1">
                        {formatDate(userTrainer.nextSession.date)} at{" "}
                        {userTrainer.nextSession.time}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Recent Club Activity */}
            {hasClubs && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Upcoming Club Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userClubs
                    .filter((club) => club.nextEvent)
                    .slice(0, 2)
                    .map((club) => (
                      <div
                        key={club.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={club.avatar} alt={club.name} />
                          <AvatarFallback>
                            {club.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium">
                            {club.nextEvent?.name}
                          </h4>
                          <p className="text-sm text-gray-600">{club.name}</p>
                          <p className="text-xs text-gray-500">
                            {club.nextEvent && formatDate(club.nextEvent.date)}{" "}
                            at {club.nextEvent?.time}
                          </p>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Important Notice */}
          {hasTrainer && (
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <Award className="w-5 h-5" />
                  Professional Training Program
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700">
                  You're currently enrolled in a professional training program
                  with {userTrainer.name}. Your trainer will manage your workout
                  routines to ensure optimal progress and safety. Routine
                  creation is temporarily disabled while you're under
                  professional guidance.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="trainer" className="space-y-6">
          {hasTrainer ? (
            <div className="space-y-6">
              {/* Trainer Profile */}
              <Card>
                <CardHeader>
                  <CardTitle>Trainer Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage
                        src={userTrainer.avatar}
                        alt={userTrainer.name}
                      />
                      <AvatarFallback className="text-lg">
                        {userTrainer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {userTrainer.name}
                      </h2>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">
                            {userTrainer.rating}
                          </span>
                          <span className="text-gray-600">rating</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">
                          {userTrainer.experience} years experience
                        </span>
                      </div>
                      <p className="text-gray-600 mt-3">{userTrainer.bio}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">
                        Contact Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{userTrainer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{userTrainer.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{userTrainer.location}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Statistics</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Sessions with you:
                          </span>
                          <span className="font-medium">
                            {userTrainer.stats.totalSessions}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Clients helped:</span>
                          <span className="font-medium">
                            {userTrainer.stats.clientsHelped}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Years experience:
                          </span>
                          <span className="font-medium">
                            {userTrainer.stats.yearsExperience}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {userTrainer.specializations.map((spec) => (
                        <Badge key={spec} variant="secondary">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {userTrainer.certifications.map((cert) => (
                        <Badge key={cert} className="bg-blue-100 text-blue-800">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {userTrainer.nextSession && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-blue-800 flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          Next Session
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span>
                              {formatDate(userTrainer.nextSession.date)} at{" "}
                              {userTrainer.nextSession.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {userTrainer.nextSession.type === "virtual" ? (
                              <Video className="w-4 h-4 text-blue-600" />
                            ) : (
                              <MapPin className="w-4 h-4 text-blue-600" />
                            )}
                            <span className="capitalize">
                              {userTrainer.nextSession.type} session
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            Message Trainer
                          </Button>
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Trainer Assigned</CardTitle>
                <CardDescription>
                  You don't currently have a personal trainer. Consider hiring
                  one to get professional guidance and customized workout plans.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Find a Trainer
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="clubs" className="space-y-6">
          {hasClubs ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {userClubs.map((club) => (
                <Card key={club.id}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={club.avatar} alt={club.name} />
                        <AvatarFallback>
                          {club.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{club.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{club.type}</Badge>
                          <Badge className={getLevelColor(club.level)}>
                            {club.level}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{club.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Members:</span>
                        <div className="font-medium">{club.memberCount}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Joined:</span>
                        <div className="font-medium">
                          {new Date(club.joinedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{club.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{club.meetingSchedule}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Activities</h4>
                      <div className="flex flex-wrap gap-1">
                        {club.activities.map((activity) => (
                          <Badge
                            key={activity}
                            variant="secondary"
                            className="text-xs"
                          >
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {club.nextEvent && (
                      <Card className="bg-green-50 border-green-200">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-green-800 mb-2">
                            Upcoming Event
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div className="font-medium">
                              {club.nextEvent.name}
                            </div>
                            <div className="text-green-700">
                              {formatDate(club.nextEvent.date)} at{" "}
                              {club.nextEvent.time}
                            </div>
                            <div className="text-green-600">
                              {club.nextEvent.location}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Message Club
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Club Memberships</CardTitle>
                <CardDescription>
                  You're not currently a member of any fitness clubs. Join a
                  club to connect with like-minded fitness enthusiasts!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Discover Clubs
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
