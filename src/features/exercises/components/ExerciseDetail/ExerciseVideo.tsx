import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExerciseData } from "../../types";

interface ExerciseVideoProps {
  exercise: ExerciseData;
}

export function ExerciseVideo({ exercise }: ExerciseVideoProps) {
  return (
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
          <span>{exercise.videoDuration}</span>
          <Button variant="ghost" size="sm" className="text-indigo-600">
            Full Screen
          </Button>
        </div>
      </div>
    </Card>
  );
} 