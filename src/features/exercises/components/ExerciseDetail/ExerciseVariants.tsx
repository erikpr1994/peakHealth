import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExerciseData } from "../../types";

interface ExerciseVariantsProps {
  exercise: ExerciseData;
}

export function ExerciseVariants({ exercise }: ExerciseVariantsProps) {
  if (!exercise.variants || exercise.variants.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Variants</h2>
        <Button variant="ghost" className="text-indigo-600">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exercise.variants.map((variant) => (
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
  );
}
