import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ExerciseLibrary } from "./components/ExerciseSelectionModal/ExerciseLibrary";
import { ExercisePreview } from "./components/ExerciseSelectionModal/ExercisePreview";
import { mockExercises } from "./data/mockExercises";
import { useExerciseSelection } from "./hooks/useExerciseSelection";
import {
  Exercise,
  ExerciseVariant,
  ExerciseSelectionModalProps,
} from "./types";
import { createVariantExercise } from "./utils/exerciseUtils";

const exercises = mockExercises;

export default function ExerciseSelectionModal({
  isOpen,
  onClose,
  onSelectExercise,
}: ExerciseSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    selectedExercise,
    selectedVariant,
    selectExercise,
    selectVariant,
    clearSelection,
  } = useExerciseSelection();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSelectExercise = (
    exercise: Exercise,
    variant?: ExerciseVariant
  ) => {
    // If variant is selected, create a new exercise object with variant data
    if (variant) {
      const variantExercise = createVariantExercise(exercise, variant);
      onSelectExercise(variantExercise, variant);
    } else {
      onSelectExercise(exercise, variant);
    }

    onClose();
    clearSelection();
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
          <ExerciseLibrary
            exercises={exercises}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedExercise={selectedExercise}
            onExerciseSelect={selectExercise}
            onSearchChange={handleSearchChange}
            onCategoryChange={setSelectedCategory}
          />

          {/* Exercise Preview */}
          <ExercisePreview
            exercise={selectedExercise}
            selectedVariant={selectedVariant}
            onVariantSelect={selectVariant}
            onSelectExercise={() =>
              handleSelectExercise(
                selectedExercise!,
                selectedVariant || undefined
              )
            }
            onClose={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
