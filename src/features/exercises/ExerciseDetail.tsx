"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ExerciseHeader } from "./components/ExerciseDetail/ExerciseHeader";
import { ExerciseInfo } from "./components/ExerciseDetail/ExerciseInfo";
import { ExerciseVideo } from "./components/ExerciseDetail/ExerciseVideo";
import { ExerciseSteps } from "./components/ExerciseDetail/ExerciseSteps";
import { ExerciseVariants } from "./components/ExerciseDetail/ExerciseVariants";
import { ExerciseTips } from "./components/ExerciseDetail/ExerciseTips";
import { AddToRoutine } from "./components/ExerciseDetail/AddToRoutine";
import { mockExerciseData, mockRoutines } from "./data/mockExercises";

interface ExerciseDetailProps {
  exerciseId: string;
}

export default function ExerciseDetail({ exerciseId }: ExerciseDetailProps) {
  const router = useRouter();

  // Mock exercise data - in a real app, this would come from an API
  const exerciseData = mockExerciseData;
  const routines = mockRoutines;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>Exercise Details</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <button
          onClick={() => router.push("/exercises")}
          className="hover:text-gray-700"
        >
          Exercises
        </button>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-indigo-600">{exerciseData.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <ExerciseHeader exercise={exerciseData} />
            <ExerciseInfo exercise={exerciseData} />
          </Card>
        </div>

        {/* Video Demo */}
        <div className="lg:col-span-1">
          <ExerciseVideo exercise={exerciseData} />
        </div>
      </div>

      {/* Step-by-Step Instructions */}
      <ExerciseSteps exercise={exerciseData} />

      {/* Variants */}
      <ExerciseVariants exercise={exerciseData} />

      {/* Pro Tips and Common Mistakes */}
      <ExerciseTips exercise={exerciseData} />

      {/* Add to Routine */}
      <AddToRoutine routines={routines} />
    </div>
  );
}
