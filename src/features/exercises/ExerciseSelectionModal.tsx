import { useState } from "react";
import {
  Search,
  Info,
  ChevronRight,
  Zap,
  Users,
  Award,
  Star,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ExerciseVariant {
  id: string;
  name: string;
  description: string;
  focus: string;
  image?: string;
  muscleGroups?: string[];
  equipment?: string[];
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  instructions?: string[];
}

interface Exercise {
  id: string;
  name: string;
  muscleGroups: string[];
  category: "Strength" | "Cardio" | "Flexibility" | "Balance";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  equipment?: string[];
  isFavorite: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  rating?: number;
  variants?: ExerciseVariant[];
  mainVariantId?: string; // ID of the main/default variant
  icon: string;
  iconColor: string;
  description?: string;
  instructions?: string[];
  videoUrl?: string;
  videoDuration?: string;
}

interface ExerciseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExercise: (exercise: Exercise, variant?: ExerciseVariant) => void;
}

const mockExercises: Exercise[] = [
  {
    id: "bench-press",
    name: "Bench Press",
    muscleGroups: ["Chest", "Triceps", "Shoulders"],
    category: "Strength",
    difficulty: "Intermediate",
    equipment: ["Barbell", "Bench"],
    isFavorite: false,
    isPopular: true,
    rating: 4.8,
    icon: "🏋️",
    iconColor: "bg-indigo-100 text-indigo-600",
    description:
      "A fundamental upper body exercise targeting the chest, triceps, and shoulders.",
    instructions: [
      "Lie flat on the bench with feet planted on the ground",
      "Grip the barbell with hands slightly wider than shoulder-width",
      "Lower the bar to your chest with control",
      "Press the bar back up to starting position",
    ],
    videoUrl: "/videos/bench-press.mp4",
    videoDuration: "3:45 min",
    mainVariantId: "bench-press-basic",
    variants: [
      {
        id: "bench-press-basic",
        name: "Bench Press",
        description:
          "A fundamental upper body exercise targeting the chest, triceps, and shoulders.",
        focus: "Overall Chest",
        muscleGroups: ["Chest", "Triceps", "Shoulders"],
        equipment: ["Barbell", "Bench"],
        difficulty: "Intermediate",
        instructions: [
          "Lie flat on the bench with feet planted on the ground",
          "Grip the barbell with hands slightly wider than shoulder-width",
          "Lower the bar to your chest with control",
          "Press the bar back up to starting position",
        ],
      },
      {
        id: "incline-bench",
        name: "Incline Bench Press",
        description: "Targets upper chest more than flat bench press.",
        focus: "Upper Chest Focus",
        muscleGroups: ["Upper Chest", "Triceps", "Front Delts"],
        equipment: ["Barbell", "Incline Bench"],
        difficulty: "Intermediate",
        instructions: [
          "Set incline bench to 30-45 degree angle",
          "Lie back with feet planted firmly on ground",
          "Grip barbell with hands slightly wider than shoulders",
          "Lower bar to upper chest area",
          "Press up and slightly back toward head",
        ],
      },
      {
        id: "decline-bench",
        name: "Decline Bench Press",
        description: "Targets lower chest more than flat bench press.",
        focus: "Lower Chest Focus",
        muscleGroups: ["Lower Chest", "Triceps", "Shoulders"],
        equipment: ["Barbell", "Decline Bench"],
        difficulty: "Intermediate",
        instructions: [
          "Set decline bench to 15-30 degree decline",
          "Secure feet in foot holders for stability",
          "Grip barbell with hands slightly wider than shoulders",
          "Lower bar to lower chest area",
          "Press up and slightly toward feet",
        ],
      },
      {
        id: "dumbbell-bench",
        name: "Dumbbell Bench Press",
        description:
          "Allows greater range of motion and stabilizer engagement.",
        focus: "Stabilizer Focus",
        muscleGroups: ["Chest", "Triceps", "Shoulders", "Stabilizers"],
        equipment: ["Dumbbells", "Bench"],
        difficulty: "Intermediate",
        instructions: [
          "Lie flat on bench with dumbbell in each hand",
          "Start with dumbbells at chest level, palms facing forward",
          "Press dumbbells up and slightly inward",
          "Lower with control, allowing deeper stretch",
          "Maintain control throughout full range of motion",
        ],
      },
    ],
  },
  {
    id: "squats",
    name: "Squats",
    muscleGroups: ["Legs", "Glutes"],
    category: "Strength",
    difficulty: "Beginner",
    equipment: ["Bodyweight"],
    isFavorite: false,
    rating: 4.9,
    icon: "🏋️",
    iconColor: "bg-indigo-100 text-indigo-600",
    description:
      "A fundamental lower body exercise targeting the legs and glutes.",
    instructions: [
      "Stand with feet shoulder-width apart",
      "Lower hips back and down as if sitting in a chair",
      "Keep knees tracking over toes",
      "Return to standing position",
    ],
    mainVariantId: "squat-basic",
    variants: [
      {
        id: "squat-basic",
        name: "Squat",
        description:
          "A fundamental lower body exercise targeting the legs and glutes.",
        focus: "Overall Lower Body",
        muscleGroups: ["Legs", "Glutes"],
        equipment: ["Bodyweight"],
        difficulty: "Beginner",
        instructions: [
          "Stand with feet shoulder-width apart",
          "Lower hips back and down as if sitting in a chair",
          "Keep knees tracking over toes",
          "Return to standing position",
        ],
      },
      {
        id: "goblet-squat",
        name: "Goblet Squat",
        description: "Squat variation holding a weight at chest level.",
        focus: "Beginner Friendly",
        muscleGroups: ["Quadriceps", "Glutes", "Core"],
        equipment: ["Dumbbell", "Kettlebell"],
        difficulty: "Beginner",
        instructions: [
          "Hold weight at chest level with both hands",
          "Stand with feet shoulder-width apart",
          "Lower into squat while keeping weight close to chest",
          "Keep knees tracking over toes",
          "Drive through heels to return to standing",
        ],
      },
      {
        id: "front-squat",
        name: "Front Squat",
        description: "Squat with barbell held at front of shoulders.",
        focus: "Quad Emphasis",
        muscleGroups: ["Quadriceps", "Glutes", "Core", "Upper Back"],
        equipment: ["Barbell", "Squat Rack"],
        difficulty: "Advanced",
        instructions: [
          "Set barbell in front rack position on shoulders",
          "Keep elbows high and chest up",
          "Descend into squat with torso upright",
          "Go down until thighs are parallel to floor",
          "Drive up through heels maintaining upright posture",
        ],
      },
    ],
  },
  {
    id: "deadlift",
    name: "Deadlift",
    muscleGroups: ["Back", "Glutes", "Hamstrings"],
    category: "Strength",
    difficulty: "Advanced",
    equipment: ["Barbell"],
    isFavorite: false,
    rating: 4.7,
    icon: "🏋️",
    iconColor: "bg-indigo-100 text-indigo-600",
    description:
      "A compound movement that works multiple muscle groups simultaneously.",
    instructions: [
      "Stand with feet hip-width apart",
      "Grip the barbell with hands outside legs",
      "Keep back straight and lift with legs and hips",
      "Stand up straight, then lower with control",
    ],
    variants: [
      {
        id: "romanian-deadlift",
        name: "Romanian Deadlift",
        description: "Hip-hinge movement focusing on hamstrings and glutes.",
        focus: "Hamstring Focus",
      },
      {
        id: "sumo-deadlift",
        name: "Sumo Deadlift",
        description: "Wide stance deadlift variation.",
        focus: "Glute Focus",
      },
    ],
  },
  {
    id: "push-ups",
    name: "Push-ups",
    muscleGroups: ["Chest", "Triceps", "Core"],
    category: "Strength",
    difficulty: "Beginner",
    equipment: ["Bodyweight"],
    isFavorite: false,
    rating: 4.6,
    icon: "💪",
    iconColor: "bg-indigo-100 text-indigo-600",
    description:
      "A bodyweight exercise that builds upper body and core strength.",
    instructions: [
      "Start in plank position with hands under shoulders",
      "Lower body until chest nearly touches ground",
      "Push back up to starting position",
      "Keep core engaged throughout movement",
    ],
    mainVariantId: "pushup-basic",
    variants: [
      {
        id: "pushup-basic",
        name: "Push-up",
        description:
          "A bodyweight exercise that builds upper body and core strength.",
        focus: "Overall Upper Body",
        muscleGroups: ["Chest", "Triceps", "Core"],
        equipment: ["Bodyweight"],
        difficulty: "Beginner",
        instructions: [
          "Start in plank position with hands under shoulders",
          "Lower body until chest nearly touches ground",
          "Push back up to starting position",
          "Keep core engaged throughout movement",
        ],
      },
      {
        id: "incline-pushup",
        name: "Incline Push-up",
        description: "Easier variation with hands elevated.",
        focus: "Beginner Friendly",
        muscleGroups: ["Chest", "Triceps", "Shoulders"],
        equipment: ["Bench", "Step"],
        difficulty: "Beginner",
        instructions: [
          "Place hands on elevated surface (bench, step, etc.)",
          "Keep body in straight line from head to heels",
          "Lower chest toward elevated surface",
          "Push back up to starting position",
          "Maintain core engagement throughout",
        ],
      },
      {
        id: "diamond-pushup",
        name: "Diamond Push-up",
        description: "Hands form diamond shape for tricep emphasis.",
        focus: "Tricep Focus",
        muscleGroups: ["Triceps", "Chest", "Shoulders"],
        equipment: ["Bodyweight"],
        difficulty: "Advanced",
        instructions: [
          "Form diamond shape with hands under chest",
          "Keep body in straight plank position",
          "Lower body until chest nearly touches hands",
          "Focus on controlled tricep engagement",
          "Push back up with emphasis on triceps",
        ],
      },
    ],
  },
  {
    id: "pull-up",
    name: "Pull-up",
    muscleGroups: ["Back", "Biceps"],
    category: "Strength",
    difficulty: "Advanced",
    equipment: ["Pull-up Bar"],
    isFavorite: false,
    rating: 4.5,
    icon: "🤸",
    iconColor: "bg-indigo-100 text-indigo-600",
    description:
      "An upper body exercise that primarily targets the back and biceps.",
    instructions: [
      "Hang from pull-up bar with palms facing away",
      "Pull body up until chin clears the bar",
      "Lower with control to starting position",
      "Keep core engaged throughout",
    ],
    variants: [
      {
        id: "chin-up",
        name: "Chin-up",
        description: "Pull-up with palms facing toward you.",
        focus: "Bicep Emphasis",
      },
      {
        id: "assisted-pullup",
        name: "Assisted Pull-up",
        description: "Pull-up with assistance band or machine.",
        focus: "Beginner Friendly",
      },
    ],
  },
  {
    id: "plank",
    name: "Plank",
    muscleGroups: ["Core", "Shoulders"],
    category: "Strength",
    difficulty: "Beginner",
    equipment: ["Bodyweight"],
    isFavorite: false,
    rating: 4.4,
    icon: "🧘",
    iconColor: "bg-purple-100 text-purple-600",
    description:
      "An isometric core exercise that builds stability and strength.",
    instructions: [
      "Start in push-up position",
      "Lower to forearms, keeping body straight",
      "Hold position, engaging core muscles",
      "Breathe normally throughout hold",
    ],
    mainVariantId: "plank-basic",
    variants: [
      {
        id: "plank-basic",
        name: "Plank",
        description:
          "An isometric core exercise that builds stability and strength.",
        focus: "Core Stability",
        muscleGroups: ["Core", "Shoulders"],
        equipment: ["Bodyweight"],
        difficulty: "Beginner",
        instructions: [
          "Start in push-up position",
          "Lower to forearms, keeping body straight",
          "Hold position, engaging core muscles",
          "Breathe normally throughout hold",
        ],
      },
      {
        id: "side-plank",
        name: "Side Plank",
        description: "Plank performed on one side.",
        focus: "Oblique Focus",
        muscleGroups: ["Obliques", "Core", "Shoulders"],
        equipment: ["Bodyweight"],
        difficulty: "Intermediate",
        instructions: [
          "Lie on your side with forearm on ground",
          "Stack feet and keep body in straight line",
          "Lift hips up creating straight line from head to feet",
          "Hold position while breathing normally",
          "Repeat on other side",
        ],
      },
      {
        id: "plank-up-down",
        name: "Plank Up-Down",
        description: "Dynamic plank moving from forearms to hands.",
        focus: "Dynamic Core",
        muscleGroups: ["Core", "Shoulders", "Triceps"],
        equipment: ["Bodyweight"],
        difficulty: "Intermediate",
        instructions: [
          "Start in forearm plank position",
          "Place one hand flat on ground where elbow was",
          "Push up to straight arm plank",
          "Lower back down to forearms one arm at a time",
          "Alternate which arm leads the movement",
        ],
      },
    ],
  },
  {
    id: "running",
    name: "Running",
    muscleGroups: ["Full Body", "Legs"],
    category: "Cardio",
    difficulty: "Beginner",
    equipment: ["Bodyweight"],
    isFavorite: true,
    isPopular: true,
    rating: 4.8,
    icon: "🏃",
    iconColor: "bg-green-100 text-green-600",
    description:
      "A cardiovascular exercise that improves endurance and burns calories.",
  },
  {
    id: "yoga-flow",
    name: "Yoga Flow",
    muscleGroups: ["Flexibility"],
    category: "Flexibility",
    difficulty: "Beginner",
    equipment: ["Bodyweight"],
    isFavorite: false,
    icon: "🧘",
    iconColor: "bg-purple-100 text-purple-600",
    description:
      "A flowing sequence of yoga poses to improve flexibility and mindfulness.",
    mainVariantId: "yoga-flow-basic",
    variants: [
      {
        id: "yoga-flow-basic",
        name: "Basic Yoga Flow",
        description:
          "A flowing sequence of yoga poses to improve flexibility and mindfulness.",
        focus: "General Flexibility",
        muscleGroups: ["Flexibility"],
        equipment: ["Bodyweight"],
        difficulty: "Beginner",
        instructions: [
          "Begin in mountain pose with arms at sides",
          "Flow through cat-cow stretches",
          "Move into downward-facing dog",
          "Step forward into standing forward fold",
          "Return to mountain pose and repeat",
        ],
      },
      {
        id: "sun-salutation",
        name: "Sun Salutation",
        description: "Classic flowing sequence.",
        focus: "Full Body Flow",
        muscleGroups: ["Flexibility", "Core"],
        equipment: ["Bodyweight"],
        difficulty: "Intermediate",
        instructions: [
          "Start in mountain pose, raise arms overhead",
          "Swan dive to forward fold",
          "Step back to downward dog",
          "Lower to chaturanga, then upward dog",
          "Return through downward dog to standing",
        ],
      },
      {
        id: "moon-salutation",
        name: "Moon Salutation",
        description: "Gentle evening flow sequence.",
        focus: "Relaxation",
        muscleGroups: ["Flexibility"],
        equipment: ["Bodyweight"],
        difficulty: "Beginner",
        instructions: [
          "Begin in goddess pose with wide stance",
          "Side bend left and right with arms overhead",
          "Flow through star pose",
          "End in child's pose for relaxation",
          "Focus on slow, calming movements",
        ],
      },
    ],
  },
];

const categories = ["All", "Strength", "Cardio", "Flexibility", "Balance"];

export default function ExerciseSelectionModal({
  isOpen,
  onClose,
  onSelectExercise,
}: ExerciseSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [selectedVariant, setSelectedVariant] =
    useState<ExerciseVariant | null>(null);

  // Get the effective exercise data - use variant data if selected, otherwise use base exercise
  const getEffectiveExercise = () => {
    if (!selectedExercise) return null;

    if (selectedVariant) {
      return {
        ...selectedExercise,
        name: selectedVariant.name,
        description: selectedVariant.description,
        muscleGroups:
          selectedVariant.muscleGroups || selectedExercise.muscleGroups,
        equipment: selectedVariant.equipment || selectedExercise.equipment,
        difficulty: selectedVariant.difficulty || selectedExercise.difficulty,
        instructions:
          selectedVariant.instructions || selectedExercise.instructions,
      };
    }

    return selectedExercise;
  };

  const effectiveExercise = getEffectiveExercise();

  const filteredExercises = mockExercises.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.muscleGroups.some((muscle) =>
        muscle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectExercise = (
    exercise: Exercise,
    variant?: ExerciseVariant
  ) => {
    // If variant is selected, create a new exercise object with variant data
    if (variant) {
      const variantExercise: Exercise = {
        ...exercise,
        id: variant.id, // Use variant ID
        name: variant.name, // Use variant name
        description: variant.description, // Use variant description
        muscleGroups: variant.muscleGroups || exercise.muscleGroups,
        equipment: variant.equipment || exercise.equipment,
        difficulty: variant.difficulty || exercise.difficulty,
        instructions: variant.instructions || exercise.instructions,
      };
      onSelectExercise(variantExercise, variant);
    } else {
      onSelectExercise(exercise, variant);
    }

    onClose();
    setSelectedExercise(null);
    setSelectedVariant(null);
    setSearchTerm("");
    setSelectedCategory("All");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Intermediate":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Advanced":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return <Zap className="w-3 h-3" />;
      case "Intermediate":
        return <Award className="w-3 h-3" />;
      case "Advanced":
        return <Users className="w-3 h-3" />;
      default:
        return <Info className="w-3 h-3" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Strength":
        return "bg-indigo-100 text-indigo-700";
      case "Cardio":
        return "bg-green-100 text-green-700";
      case "Flexibility":
        return "bg-purple-100 text-purple-700";
      case "Balance":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[95vw] !w-[95vw] h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Add Exercise
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 mt-1">
              Choose from our exercise library and find the perfect exercise for
              your routine
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex h-full overflow-hidden">
          {/* Exercise Library */}
          <div className="w-2/3 border-r border-gray-100 flex flex-col bg-gray-50/50 overflow-hidden">
            {/* Search and Filters */}
            <div className="p-6 bg-white border-b border-gray-100 flex-shrink-0">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search exercises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`h-8 px-4 rounded-full transition-all ${
                        selectedCategory === category
                          ? "bg-primary text-white shadow-sm"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Exercise Grid - Scrollable */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full w-full">
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                    {filteredExercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className={`group bg-white rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                          selectedExercise?.id === exercise.id
                            ? "border-primary shadow-lg ring-1 ring-primary/20"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => {
                          setSelectedExercise(exercise);
                          // Auto-select main variant if it exists
                          if (exercise.mainVariantId && exercise.variants) {
                            const mainVariant = exercise.variants.find(
                              (v) => v.id === exercise.mainVariantId
                            );
                            setSelectedVariant(mainVariant || null);
                          } else {
                            setSelectedVariant(null);
                          }
                        }}
                      >
                        {/* Exercise Image/Icon */}
                        <div className="relative h-48 overflow-hidden rounded-t-xl bg-gray-100">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl">{exercise.icon}</div>
                          </div>

                          {/* Overlay Info */}
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="flex items-center justify-between">
                              <Badge
                                className={`${getDifficultyColor(
                                  exercise.difficulty
                                )} text-xs border`}
                              >
                                {getDifficultyIcon(exercise.difficulty)}
                                <span className="ml-1">
                                  {exercise.difficulty}
                                </span>
                              </Badge>
                              <div className="flex items-center gap-2">
                                {exercise.isPopular && (
                                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    <span className="text-xs text-gray-700">
                                      Popular
                                    </span>
                                  </div>
                                )}
                                {exercise.isNew && (
                                  <div className="bg-green-500 rounded-full px-2 py-1">
                                    <span className="text-xs text-white">
                                      New
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Exercise Details */}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                              {exercise.name}
                            </h3>
                            <ChevronRight
                              className={`w-4 h-4 text-gray-400 group-hover:text-primary transition-all ${
                                selectedExercise?.id === exercise.id
                                  ? "rotate-90"
                                  : ""
                              }`}
                            />
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <Badge
                              variant="outline"
                              className={`text-xs ${getCategoryColor(
                                exercise.category
                              )}`}
                            >
                              {exercise.category}
                            </Badge>
                            {exercise.rating && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                {exercise.rating}
                              </div>
                            )}
                          </div>

                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {exercise.description ||
                              `A ${exercise.category.toLowerCase()} exercise targeting ${exercise.muscleGroups
                                .join(", ")
                                .toLowerCase()}.`}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {exercise.muscleGroups
                                .slice(0, 2)
                                .map((muscle) => (
                                  <span
                                    key={muscle}
                                    className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md"
                                  >
                                    {muscle}
                                  </span>
                                ))}
                              {exercise.muscleGroups.length > 2 && (
                                <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                                  +{exercise.muscleGroups.length - 2}
                                </span>
                              )}
                            </div>
                            {exercise.variants &&
                              exercise.variants.length > 0 && (
                                <span className="text-xs text-gray-500">
                                  {exercise.variants.length} variants
                                </span>
                              )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredExercises.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        No exercises found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search or category filter
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Exercise Preview */}
          <div className="w-1/3 flex flex-col bg-white overflow-hidden">
            {selectedExercise ? (
              <>
                {/* Exercise Header */}
                <div className="p-6 border-b border-gray-100 flex-shrink-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {effectiveExercise?.name}
                      </h2>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={getDifficultyColor(
                            effectiveExercise?.difficulty || "Beginner"
                          )}
                        >
                          {getDifficultyIcon(
                            effectiveExercise?.difficulty || "Beginner"
                          )}
                          <span className="ml-1">
                            {effectiveExercise?.difficulty}
                          </span>
                        </Badge>
                        <Badge
                          className={`${getCategoryColor(
                            selectedExercise.category
                          )} border-0`}
                        >
                          {selectedExercise.category}
                        </Badge>
                        {selectedExercise.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm text-gray-600">
                              {selectedExercise.rating}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {effectiveExercise?.description ||
                      `A ${selectedExercise.category.toLowerCase()} exercise targeting ${effectiveExercise?.muscleGroups
                        .join(", ")
                        .toLowerCase()}.`}
                  </p>
                </div>

                {/* Exercise Details - Scrollable */}
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full w-full">
                    <div className="p-6">
                      <div className="space-y-6">
                        {/* Target Muscles */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">
                            Target Muscles
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {effectiveExercise?.muscleGroups.map((muscle) => (
                              <div
                                key={muscle}
                                className="flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                              >
                                {muscle}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Equipment */}
                        {effectiveExercise?.equipment &&
                          effectiveExercise.equipment.length > 0 && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">
                                Equipment
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {effectiveExercise.equipment.map((item) => (
                                  <Badge
                                    key={item}
                                    variant="outline"
                                    className="bg-gray-50"
                                  >
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* Instructions */}
                        {effectiveExercise?.instructions && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">
                              Instructions
                            </h4>
                            <ol className="space-y-3">
                              {effectiveExercise.instructions.map(
                                (step, index) => (
                                  <li key={index} className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                                      {index + 1}
                                    </span>
                                    <span className="text-gray-700 text-sm leading-relaxed">
                                      {step}
                                    </span>
                                  </li>
                                )
                              )}
                            </ol>
                          </div>
                        )}

                        {/* Variants */}
                        {selectedExercise.variants &&
                          selectedExercise.variants.length > 0 && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">
                                Variants
                              </h4>
                              <div className="space-y-3">
                                {selectedExercise.variants.map((variant) => (
                                  <div
                                    key={variant.id}
                                    className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                                      selectedVariant?.id === variant.id
                                        ? "border-primary bg-primary/5"
                                        : "border-gray-200"
                                    }`}
                                    onClick={() =>
                                      setSelectedVariant(
                                        selectedVariant?.id === variant.id
                                          ? null
                                          : variant
                                      )
                                    }
                                  >
                                    <div className="flex items-start justify-between mb-1">
                                      <h5 className="font-medium text-gray-900 text-sm">
                                        {variant.name}
                                      </h5>
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {variant.focus}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-gray-600">
                                      {variant.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </ScrollArea>
                </div>

                {/* Action Buttons */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
                  <div className="space-y-3">
                    {selectedVariant && (
                      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-primary">
                              Selected Variant:
                            </p>
                            <p className="text-sm text-gray-700">
                              {selectedVariant.name}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedVariant(null)}
                            className="text-gray-500"
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        onClick={onClose}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() =>
                          handleSelectExercise(
                            selectedExercise,
                            selectedVariant || undefined
                          )
                        }
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        Add Exercise
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Info className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Select an Exercise
                  </h3>
                  <p className="text-sm text-gray-500 max-w-sm">
                    Choose an exercise from the library to view detailed
                    instructions and add it to your workout
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
