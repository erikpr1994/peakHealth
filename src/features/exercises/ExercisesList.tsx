"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchAndFilters } from "./components/ExercisesList/SearchAndFilters";
import { CategoryTabs } from "./components/ExercisesList/CategoryTabs";
import { NewExercisesCarousel } from "./components/ExercisesList/NewExercisesCarousel";
import { ExerciseGrid } from "./components/ExercisesList/ExerciseGrid";
import { FilterDialog } from "./components/ExercisesList/FilterDialog";
import { mockExercises } from "./data/mockExercises";

import { Exercise } from "./types";

export default function ExercisesList() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All Exercises");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const exercises = mockExercises;
  const newExercises = exercises.filter((exercise) => exercise.isNew);

  const handleExerciseClick = (exercise: Exercise) => {
    router.push(`/exercises/${exercise.id}`);
  };

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
          onClick={() => router.push("/suggest-exercise")}
          className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Suggest Exercise
        </Button>
      </div>

      {/* Search and Filters */}
      <SearchAndFilters
        onFilterOpen={() => setIsFilterOpen(true)}
        isFilterOpen={isFilterOpen}
      />

      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* New Exercises Section */}
      <NewExercisesCarousel
        newExercises={newExercises}
        onExerciseClick={handleExerciseClick}
      />

      {/* Main Exercises Section */}
      <ExerciseGrid
        exercises={exercises}
        activeCategory={activeCategory}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onExerciseClick={handleExerciseClick}
      />

      {/* Filter Dialog */}
      <FilterDialog
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
}
