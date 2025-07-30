import { useState } from "react";
import {
  Search,
  Grid,
  List,
  Heart,
  Star,
  Plus,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

import { Page } from "@/types/app";

interface ExercisesListProps {
  onNavigate: (page: Page, exerciseId?: string) => void;
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
  variants?: number;
  icon: string;
  iconColor: string;
}

interface FilterState {
  difficulties: string[];
  muscleGroups: string[];
  equipment: string[];
}

export default function ExercisesList({ onNavigate }: ExercisesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Exercises");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    difficulties: [],
    muscleGroups: [],
    equipment: [],
  });

  const isMobile = useIsMobile();

  const categories = [
    "All Exercises",
    "Strength",
    "Cardio",
    "Flexibility",
    "Balance",
    "Favorites",
  ];

  const difficulties = ["Beginner", "Intermediate", "Advanced"];
  const muscleGroupOptions = [
    "Chest",
    "Back",
    "Legs",
    "Arms",
    "Shoulders",
    "Core",
    "Glutes",
    "Biceps",
    "Triceps",
    "Cardio",
    "Full Body",
  ];
  const equipmentOptions = [
    "Barbell",
    "Dumbbell",
    "Bodyweight",
    "Machine",
    "Resistance Band",
    "Kettlebell",
    "Cable",
  ];

  const exercises: Exercise[] = [
    {
      id: "bench-press",
      name: "Bench Press",
      muscleGroups: ["Chest", "Triceps"],
      category: "Strength",
      difficulty: "Intermediate",
      equipment: ["Barbell"],
      isFavorite: false,
      icon: "🏋️",
      iconColor: "bg-indigo-100 text-indigo-600",
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
    },
    {
      id: "squats",
      name: "Squats",
      muscleGroups: ["Legs", "Glutes"],
      category: "Strength",
      difficulty: "Beginner",
      equipment: ["Bodyweight"],
      isFavorite: false,
      icon: "🏋️",
      iconColor: "bg-indigo-100 text-indigo-600",
    },
    {
      id: "lunges",
      name: "Lunges",
      muscleGroups: ["Legs"],
      category: "Strength",
      difficulty: "Beginner",
      equipment: ["Bodyweight"],
      isFavorite: false,
      icon: "🦵",
      iconColor: "bg-purple-100 text-purple-600",
    },
    {
      id: "cycling",
      name: "Cycling",
      muscleGroups: ["Legs", "Cardio"],
      category: "Cardio",
      difficulty: "Beginner",
      equipment: ["Machine"],
      isFavorite: true,
      icon: "🚴",
      iconColor: "bg-green-100 text-green-600",
    },
    {
      id: "push-ups",
      name: "Push-ups",
      muscleGroups: ["Chest", "Triceps", "Core"],
      category: "Strength",
      difficulty: "Beginner",
      equipment: ["Bodyweight"],
      isFavorite: false,
      icon: "💪",
      iconColor: "bg-indigo-100 text-indigo-600",
    },
    {
      id: "swimming",
      name: "Swimming",
      muscleGroups: ["Full Body", "Cardio"],
      category: "Cardio",
      difficulty: "Intermediate",
      equipment: ["Bodyweight"],
      isFavorite: false,
      icon: "🏊",
      iconColor: "bg-green-100 text-green-600",
    },
    {
      id: "plank",
      name: "Plank",
      muscleGroups: ["Core"],
      category: "Strength",
      difficulty: "Beginner",
      equipment: ["Bodyweight"],
      isFavorite: false,
      icon: "🧘",
      iconColor: "bg-purple-100 text-purple-600",
    },
    {
      id: "deadlift",
      name: "Deadlift",
      muscleGroups: ["Back", "Legs", "Core"],
      category: "Strength",
      difficulty: "Advanced",
      equipment: ["Barbell"],
      isFavorite: false,
      icon: "🏋️",
      iconColor: "bg-indigo-100 text-indigo-600",
    },
    {
      id: "pull-up",
      name: "Pull-up",
      muscleGroups: ["Back", "Biceps"],
      category: "Strength",
      difficulty: "Advanced",
      equipment: ["Bodyweight"],
      isFavorite: false,
      icon: "🤸",
      iconColor: "bg-indigo-100 text-indigo-600",
    },
    {
      id: "yoga-flow",
      name: "Yoga Flow",
      muscleGroups: ["Flexibility"],
      category: "Flexibility",
      difficulty: "Beginner",
      equipment: ["Bodyweight"],
      isFavorite: false,
      variants: 8,
      icon: "🧘",
      iconColor: "bg-purple-100 text-purple-600",
    },
    {
      id: "kettlebell-swing",
      name: "Kettlebell Swing",
      muscleGroups: ["Full Body", "Core"],
      category: "Strength",
      difficulty: "Intermediate",
      equipment: ["Kettlebell"],
      isFavorite: false,
      isNew: true,
      icon: "🏋️",
      iconColor: "bg-indigo-100 text-indigo-600",
    },
  ];

  const newExercises = exercises.filter((exercise) => exercise.isNew);

  const getCategoryColor = (category: string) => {
    const colors = {
      Strength: "bg-indigo-100 text-indigo-700",
      Cardio: "bg-green-100 text-green-700",
      Flexibility: "bg-purple-100 text-purple-700",
      Balance: "bg-yellow-100 text-yellow-700",
    };
    return colors[category as keyof typeof colors] || colors.Strength;
  };

  const getSectionTitle = () => {
    if (activeCategory === "All Exercises") return "All Exercises";
    if (activeCategory === "Favorites") return "Favorite Exercises";
    return `${activeCategory} Exercises`;
  };

  const filterExercises = (exerciseList: Exercise[]) => {
    return exerciseList.filter((exercise) => {
      // Search filter
      const matchesSearch =
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.muscleGroups.some((group) =>
          group.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Category filter
      const matchesCategory =
        activeCategory === "All Exercises" ||
        exercise.category === activeCategory ||
        (activeCategory === "Favorites" && exercise.isFavorite);

      // Advanced filters
      const matchesDifficulty =
        filters.difficulties.length === 0 ||
        filters.difficulties.includes(exercise.difficulty);

      const matchesMuscleGroup =
        filters.muscleGroups.length === 0 ||
        filters.muscleGroups.some((group) =>
          exercise.muscleGroups.includes(group)
        );

      const matchesEquipment =
        filters.equipment.length === 0 ||
        (exercise.equipment &&
          filters.equipment.some((eq) => exercise.equipment!.includes(eq)));

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDifficulty &&
        matchesMuscleGroup &&
        matchesEquipment
      );
    });
  };

  const handleFilterChange = (type: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      difficulties: [],
      muscleGroups: [],
      equipment: [],
    });
  };

  const getActiveFilterCount = () => {
    return (
      filters.difficulties.length +
      filters.muscleGroups.length +
      filters.equipment.length
    );
  };

  const ExerciseCard = ({ exercise }: { exercise: Exercise }) => (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow w-full max-w-md mx-auto"
      onClick={() => onNavigate("exercise-detail", exercise.id)}
    >
      {/* Exercise Image/Icon */}
      <div className="bg-gray-100 h-40 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl">{exercise.icon}</div>
        </div>
        {exercise.isPopular && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white px-2 py-1 rounded-full text-sm">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-gray-600">Popular</span>
          </div>
        )}
        {exercise.isNew && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-green-500 px-2 py-1 rounded-full text-sm">
            <span className="text-white">New</span>
          </div>
        )}
        {exercise.rating && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white px-2 py-1 rounded-full text-sm">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-gray-600">{exercise.rating}</span>
          </div>
        )}
      </div>

      {/* Exercise Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 mb-2 truncate">
              {exercise.name}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <span className="truncate">
                {exercise.muscleGroups.join(", ")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span
              className={`px-2 py-1 rounded text-xs whitespace-nowrap ${getCategoryColor(
                exercise.category
              )}`}
            >
              {exercise.category}
            </span>
            {exercise.variants && (
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {exercise.variants} variants
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              // Handle favorite toggle
            }}
            className="flex-shrink-0 ml-2"
          >
            <Heart
              className={`w-4 h-4 ${
                exercise.isFavorite
                  ? "text-red-500 fill-red-500"
                  : "text-gray-400"
              }`}
            />
          </Button>
        </div>
      </div>
    </Card>
  );

  const CarouselExerciseCard = ({ exercise }: { exercise: Exercise }) => (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow w-64 flex-shrink-0"
      onClick={() => onNavigate("exercise-detail", exercise.id)}
    >
      {/* Exercise Image/Icon */}
      <div className="bg-gray-100 h-32 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl">{exercise.icon}</div>
        </div>
        {exercise.isNew && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-green-500 px-2 py-1 rounded-full text-xs">
            <span className="text-white">New</span>
          </div>
        )}
      </div>

      {/* Exercise Info */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 mb-1 truncate">
          {exercise.name}
        </h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="truncate">{exercise.muscleGroups.join(", ")}</span>
        </div>
        <div className="flex items-center justify-between">
          <span
            className={`px-2 py-1 rounded text-xs ${getCategoryColor(
              exercise.category
            )}`}
          >
            {exercise.category}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              // Handle favorite toggle
            }}
          >
            <Heart
              className={`w-3 h-3 ${
                exercise.isFavorite
                  ? "text-red-500 fill-red-500"
                  : "text-gray-400"
              }`}
            />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Exercises</h1>
          <p className="text-gray-500 mt-2">
            Discover and explore exercises for your fitness journey.
          </p>
        </div>

        <Button
          onClick={() => onNavigate("suggest-exercise")}
          className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Suggest Exercise
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {getActiveFilterCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getActiveFilterCount()}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Filter Exercises</DialogTitle>
              <DialogDescription>
                Apply filters to narrow down your exercise search results.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Difficulty Filter */}
              <div>
                <Label className="font-semibold mb-3 block">Difficulty</Label>
                <div className="space-y-2">
                  {difficulties.map((difficulty) => (
                    <div
                      key={difficulty}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`difficulty-${difficulty}`}
                        checked={filters.difficulties.includes(difficulty)}
                        onCheckedChange={() =>
                          handleFilterChange("difficulties", difficulty)
                        }
                      />
                      <Label htmlFor={`difficulty-${difficulty}`}>
                        {difficulty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Muscle Groups Filter */}
              <div>
                <Label className="font-semibold mb-3 block">
                  Muscle Groups
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {muscleGroupOptions.map((group) => (
                    <div key={group} className="flex items-center space-x-2">
                      <Checkbox
                        id={`muscle-${group}`}
                        checked={filters.muscleGroups.includes(group)}
                        onCheckedChange={() =>
                          handleFilterChange("muscleGroups", group)
                        }
                      />
                      <Label htmlFor={`muscle-${group}`} className="text-sm">
                        {group}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Equipment Filter */}
              <div>
                <Label className="font-semibold mb-3 block">Equipment</Label>
                <div className="space-y-2">
                  {equipmentOptions.map((equipment) => (
                    <div
                      key={equipment}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`equipment-${equipment}`}
                        checked={filters.equipment.includes(equipment)}
                        onCheckedChange={() =>
                          handleFilterChange("equipment", equipment)
                        }
                      />
                      <Label htmlFor={`equipment-${equipment}`}>
                        {equipment}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="flex-1"
                >
                  Clear All
                </Button>
                <Button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex space-x-4 sm:space-x-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`py-2 px-1 border-b-2 transition-colors whitespace-nowrap ${
                activeCategory === category
                  ? "border-indigo-600 text-indigo-600 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* New Exercises Section */}
      {newExercises.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">New Exercises</h2>
            <Button variant="ghost" className="text-indigo-600">
              View All
            </Button>
          </div>

          {/* Mobile: Touch carousel without arrows, Desktop: Grid with max 5 items */}
          {isMobile ? (
            <Carousel className="w-full" opts={{ dragFree: true }}>
              <CarouselContent className="-ml-2">
                {newExercises.map((exercise) => (
                  <CarouselItem key={exercise.id} className="pl-2 basis-64">
                    <CarouselExerciseCard exercise={exercise} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* No arrows on mobile - touch only */}
            </Carousel>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-none">
              {newExercises.slice(0, 5).map((exercise) => (
                <div key={exercise.id} className="w-full max-w-64">
                  <CarouselExerciseCard exercise={exercise} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Exercises Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {getSectionTitle()}
          </h2>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {filterExercises(exercises).map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </div>
    </div>
  );
}
