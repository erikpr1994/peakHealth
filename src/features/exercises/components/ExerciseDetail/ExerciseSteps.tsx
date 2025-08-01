import { Card } from "@/components/ui/card";
import { ExerciseData } from "../../types";

interface ExerciseStepsProps {
  exercise: ExerciseData;
}

export function ExerciseSteps({ exercise }: ExerciseStepsProps) {
  return (
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Step-by-Step Instructions
      </h2>
      <div className="space-y-6">
        {exercise.steps.map((step, index) => (
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
  );
} 