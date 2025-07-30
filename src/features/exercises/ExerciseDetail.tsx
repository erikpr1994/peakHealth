import { useState } from "react";
import {
  ArrowLeft,
  Play,
  Heart,
  Star,
  ChevronRight,
  Printer,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

import { Page } from "@/types/app";

interface ExerciseDetailProps {
  onNavigate: (page: Page, exerciseId?: string) => void;
  exerciseId: string;
}

interface ExerciseVariant {
  id: string;
  name: string;
  description: string;
  focus: string;
  image: string;
}

interface Routine {
  id: string;
  name: string;
  schedule: string;
  exercises: number;
  isSelected: boolean;
}

interface ExerciseData {
  id: string;
  name: string;
  description: string;
  rating: number;
  totalRatings: number;
  isPopular: boolean;
  isFavorite: boolean;
  type: string;
  equipment: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  mechanics: string;
  primaryMuscles: string[];
  steps: Array<{
    title: string;
    description: string;
  }>;
  variants: ExerciseVariant[];
  proTips: string[];
  commonMistakes: string[];
  videoUrl?: string;
  videoDuration?: string;
}

export default function ExerciseDetail({
  onNavigate,
  exerciseId,
}: ExerciseDetailProps) {
  const [selectedRoutines, setSelectedRoutines] = useState<string[]>([]);

  // Mock exercise data - in a real app, this would come from an API
  const exerciseData: ExerciseData = {
    id: exerciseId,
    name: "Bench Press",
    description:
      "The bench press is a compound exercise that targets the chest, shoulders, and triceps. It's one of the most popular strength training exercises and is essential for building upper body strength.",
    rating: 4.8,
    totalRatings: 124,
    isPopular: true,
    isFavorite: false,
    type: "Strength",
    equipment: ["Barbell", "Bench"],
    difficulty: "Intermediate",
    mechanics: "Compound",
    primaryMuscles: ["Chest", "Shoulders", "Triceps"],
    steps: [
      {
        title: "Starting Position",
        description:
          "Lie flat on the bench with your feet planted firmly on the floor. Your eyes should be directly under the barbell.",
      },
      {
        title: "Grip",
        description:
          "Grip the barbell with hands slightly wider than shoulder-width apart. Wrap your thumbs around the bar for safety.",
      },
      {
        title: "Lowering Phase",
        description:
          "Lower the bar slowly and under control to your mid-chest. Keep your elbows at approximately a 45-75 degree angle.",
      },
      {
        title: "Pressing Phase",
        description:
          "Push the bar back up to the starting position by extending your arms. Focus on pushing through your chest muscles.",
      },
      {
        title: "Breathing",
        description:
          "Inhale during the lowering phase and exhale during the pressing phase.",
      },
    ],
    variants: [
      {
        id: "incline-bench",
        name: "Incline Bench Press",
        description: "Targets upper chest more than flat bench press.",
        focus: "Upper Chest Focus",
        image: "/exercise-images/incline-bench.jpg",
      },
      {
        id: "decline-bench",
        name: "Decline Bench Press",
        description: "Targets lower chest more than flat bench press.",
        focus: "Lower Chest Focus",
        image: "/exercise-images/decline-bench.jpg",
      },
      {
        id: "dumbbell-bench",
        name: "Dumbbell Bench Press",
        description:
          "Allows greater range of motion and stabilizer engagement.",
        focus: "Stabilizer Focus",
        image: "/exercise-images/dumbbell-bench.jpg",
      },
    ],
    proTips: [
      "Keep your wrists straight and directly above your elbows.",
      "Maintain a slight arch in your lower back, but keep your butt on the bench.",
      "Drive through your feet for stability and added power.",
      'Keep your shoulder blades retracted and "tucked" throughout the movement.',
      "Focus on pushing yourself away from the bar, rather than pushing the bar away from you.",
    ],
    commonMistakes: [
      "Bouncing the bar off your chest, which can lead to injury.",
      "Lifting your butt off the bench, which reduces stability.",
      "Flaring your elbows out too wide, which can strain your shoulders.",
      "Not lowering the bar to chest level, which reduces the effectiveness.",
      "Using too much weight and sacrificing proper form.",
    ],
    videoUrl: "/videos/bench-press-demo.mp4",
    videoDuration: "3:45 min",
  };

  const routines: Routine[] = [
    {
      id: "upper-body",
      name: "Upper Body Split",
      schedule: "Mon, Wed, Fri • 12 exercises",
      exercises: 12,
      isSelected: false,
    },
    {
      id: "push-day",
      name: "Push Day",
      schedule: "Tue, Sat • 8 exercises",
      exercises: 8,
      isSelected: false,
    },
    {
      id: "chest-focus",
      name: "Chest Focus",
      schedule: "Thu • 6 exercises",
      exercises: 6,
      isSelected: true,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Beginner: "bg-green-100 text-green-700",
      Intermediate: "bg-yellow-100 text-yellow-700",
      Advanced: "bg-red-100 text-red-700",
    };
    return colors[difficulty as keyof typeof colors] || colors.Intermediate;
  };

  const handleRoutineToggle = (routineId: string) => {
    setSelectedRoutines((prev) =>
      prev.includes(routineId)
        ? prev.filter((id) => id !== routineId)
        : [...prev, routineId]
    );
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>Exercise Details</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <button
          onClick={() => onNavigate("exercises")}
          className="hover:text-gray-700"
        >
          Exercises
        </button>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-indigo-600">{exerciseData.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-indigo-600 rounded-md flex items-center justify-center">
                    <span className="text-white text-xl">🏋️</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      {exerciseData.name}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      {exerciseData.isPopular && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>Popular</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>
                          {exerciseData.rating} ({exerciseData.totalRatings}{" "}
                          ratings)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Heart
                    className={`w-4 h-4 ${
                      exerciseData.isFavorite
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </Button>
                <Button variant="ghost" size="sm">
                  <Printer className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Exercise Details Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Type</div>
                <div className="font-medium text-gray-800">
                  {exerciseData.type}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Equipment</div>
                <div className="font-medium text-gray-800">
                  {exerciseData.equipment.join(", ")}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Difficulty</div>
                <span
                  className={`px-2 py-1 rounded text-sm ${getDifficultyColor(
                    exerciseData.difficulty
                  )}`}
                >
                  {exerciseData.difficulty}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Mechanics</div>
                <div className="font-medium text-gray-800">
                  {exerciseData.mechanics}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {exerciseData.description}
              </p>
            </div>

            {/* Primary Muscles */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Primary Muscles
              </h3>
              <div className="flex flex-wrap gap-2">
                {exerciseData.primaryMuscles.map((muscle) => (
                  <span
                    key={muscle}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Video Demo */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <div className="bg-gray-100 h-64 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button className="h-16 w-16 rounded-full bg-white/80 hover:bg-white/90">
                  <Play className="w-6 h-6 text-indigo-600" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Demonstration Video
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Watch this demonstration to ensure proper form and technique.
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{exerciseData.videoDuration}</span>
                <Button variant="ghost" size="sm" className="text-indigo-600">
                  Full Screen
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Step-by-Step Instructions */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Step-by-Step Instructions
        </h2>
        <div className="space-y-6">
          {exerciseData.steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 mb-1">{step.title}</h4>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Variants */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Variants</h2>
          <Button variant="ghost" className="text-indigo-600">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exerciseData.variants.map((variant) => (
            <Card
              key={variant.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-100 h-40"></div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  {variant.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {variant.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                    {variant.focus}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Pro Tips and Common Mistakes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-md flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Pro Tips</h2>
          </div>
          <ul className="space-y-3">
            {exerciseData.proTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-md flex items-center justify-center">
              <XCircle className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Common Mistakes</h2>
          </div>
          <ul className="space-y-3">
            {exerciseData.commonMistakes.map((mistake, index) => (
              <li key={index} className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{mistake}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Add to Routine */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Add to Routine</h2>
          <Button
            onClick={() => onNavigate("create-routine")}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Create New Routine
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {routines.map((routine) => (
            <div
              key={routine.id}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => handleRoutineToggle(routine.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800">{routine.name}</h4>
                <Checkbox
                  checked={
                    routine.isSelected || selectedRoutines.includes(routine.id)
                  }
                  readOnly
                />
              </div>
              <p className="text-sm text-gray-600">{routine.schedule}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
