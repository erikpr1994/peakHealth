import { useState } from "react";

import { Exercise, ExerciseVariant } from "../types";

export function useExerciseSelection() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [selectedVariant, setSelectedVariant] =
    useState<ExerciseVariant | null>(null);

  const selectExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    // Auto-select main variant if it exists
    if (exercise.mainVariantId && exercise.variants) {
      const mainVariant = exercise.variants.find(
        v => v.id === exercise.mainVariantId
      );
      setSelectedVariant(mainVariant || null);
    } else {
      setSelectedVariant(null);
    }
  };

  const selectVariant = (variant: ExerciseVariant | null) => {
    setSelectedVariant(variant);
  };

  const clearSelection = () => {
    setSelectedExercise(null);
    setSelectedVariant(null);
  };

  return {
    selectedExercise,
    selectedVariant,
    selectExercise,
    selectVariant,
    clearSelection,
  };
}
