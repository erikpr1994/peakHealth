import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { useIsMobile } from "../../../../hooks/use-mobile";
import { Exercise } from "../../types";
import { ExerciseCard } from "../shared/ExerciseCard";

interface NewExercisesCarouselProps {
  newExercises: Exercise[];
  onExerciseClick: (exercise: Exercise) => void;
}

export function NewExercisesCarousel({
  newExercises,
  onExerciseClick,
}: NewExercisesCarouselProps) {
  const isMobile = useIsMobile();

  if (newExercises.length === 0) {
    return null;
  }

  return (
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
            {newExercises.map(exercise => (
              <CarouselItem key={exercise.id} className="pl-2 basis-64">
                <ExerciseCard
                  exercise={exercise}
                  size="sm"
                  onClick={() => onExerciseClick(exercise)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* No arrows on mobile - touch only */}
        </Carousel>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-none">
          {newExercises.slice(0, 5).map(exercise => (
            <div key={exercise.id} className="w-full max-w-64">
              <ExerciseCard
                exercise={exercise}
                size="sm"
                onClick={() => onExerciseClick(exercise)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
