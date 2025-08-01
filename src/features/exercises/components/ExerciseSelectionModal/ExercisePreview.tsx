import { Star, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Exercise, ExerciseVariant } from "../../types";
import { DifficultyBadge } from "../shared/DifficultyBadge";
import { CategoryBadge } from "../shared/CategoryBadge";
import { EquipmentTags } from "../shared/EquipmentTags";
import { getEffectiveExercise } from "../../utils/exerciseUtils";
import { VariantSelector } from "./VariantSelector";

interface ExercisePreviewProps {
  exercise: Exercise | null;
  selectedVariant: ExerciseVariant | null;
  onVariantSelect: (variant: ExerciseVariant | null) => void;
  onSelectExercise: () => void;
  onClose: () => void;
}

export function ExercisePreview({
  exercise,
  selectedVariant,
  onVariantSelect,
  onSelectExercise,
  onClose,
}: ExercisePreviewProps) {
  if (!exercise) {
    return (
      <div className="w-1/3 flex flex-col bg-white overflow-hidden">
        <div className="flex-1 flex items-center justify-center text-gray-500 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">
              Select an Exercise
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Choose an exercise from the library to view detailed instructions
              and add it to your workout
            </p>
          </div>
        </div>
      </div>
    );
  }

  const effectiveExercise = getEffectiveExercise(exercise, selectedVariant);

  return (
    <div className="w-1/3 flex flex-col bg-white overflow-hidden">
      {/* Exercise Header */}
      <div className="p-6 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {effectiveExercise.name}
            </h2>
            <div className="flex items-center gap-3">
              <DifficultyBadge difficulty={effectiveExercise.difficulty} />
              <CategoryBadge category={exercise.category} />
              {exercise.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm text-gray-600">
                    {exercise.rating}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed">
          {effectiveExercise.description ||
            `A ${exercise.category.toLowerCase()} exercise targeting ${effectiveExercise.muscleGroups
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
                  {effectiveExercise.muscleGroups.map((muscle) => (
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
              {effectiveExercise.equipment && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Equipment</h4>
                  <EquipmentTags equipment={effectiveExercise.equipment} />
                </div>
              )}

              {/* Instructions */}
              {effectiveExercise.instructions && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Instructions
                  </h4>
                  <ol className="space-y-3">
                    {effectiveExercise.instructions.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Variants */}
              <VariantSelector
                exercise={exercise}
                selectedVariant={selectedVariant}
                onVariantSelect={onVariantSelect}
              />
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
                  onClick={() => onVariantSelect(null)}
                  className="text-gray-500"
                >
                  Clear
                </Button>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button onClick={onSelectExercise} className="flex-1 bg-primary hover:bg-primary/90">
              Add Exercise
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 