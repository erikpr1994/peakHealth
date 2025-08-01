import { Badge } from "@/components/ui/badge";
import { Exercise, ExerciseVariant } from "../../types";

interface VariantSelectorProps {
  exercise: Exercise;
  selectedVariant: ExerciseVariant | null;
  onVariantSelect: (variant: ExerciseVariant | null) => void;
}

export function VariantSelector({
  exercise,
  selectedVariant,
  onVariantSelect,
}: VariantSelectorProps) {
  if (!exercise.variants || exercise.variants.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="font-medium text-gray-900 mb-3">Variants</h4>
      <div className="space-y-3">
        {exercise.variants.map((variant) => (
          <div
            key={variant.id}
            className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
              selectedVariant?.id === variant.id
                ? "border-primary bg-primary/5"
                : "border-gray-200"
            }`}
            onClick={() =>
              onVariantSelect(
                selectedVariant?.id === variant.id ? null : variant
              )
            }
          >
            <div className="flex items-start justify-between mb-1">
              <h5 className="font-medium text-gray-900 text-sm">
                {variant.name}
              </h5>
              <Badge variant="outline" className="text-xs">
                {variant.focus}
              </Badge>
            </div>
            <p className="text-xs text-gray-600">{variant.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
