import { Heart, Star, Printer } from 'lucide-react';

import { Exercise, ExerciseVariant } from '../../types';

import { Button } from '@/components/ui/button';

interface ExerciseHeaderProps {
  exercise: Exercise;
  variant: ExerciseVariant;
}

export const ExerciseHeader = ({ exercise, variant }: ExerciseHeaderProps) => {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-indigo-600 rounded-md flex items-center justify-center">
            <span className="text-white text-xl">{exercise.icon}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{variant.name}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
              {exercise.isPopular && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Popular</span>
                </div>
              )}
              {exercise.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{exercise.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Heart
            className={`w-4 h-4 ${
              exercise.isFavorite
                ? 'text-red-500 fill-red-500'
                : 'text-gray-400'
            }`}
          />
        </Button>
        <Button variant="ghost" size="sm">
          <Printer className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
