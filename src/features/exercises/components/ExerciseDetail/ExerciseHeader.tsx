import { Heart, Star, Printer } from 'lucide-react';
import { useState } from 'react';

import { useFavoriteManagement } from '../../hooks/useExercises';
import { Exercise, ExerciseVariant } from '../../types';

import { Button } from '@/components/ui/button';

interface ExerciseHeaderProps {
  exercise: Exercise;
  variant: ExerciseVariant;
  userId?: string; // Add userId prop for favorite management
}

export const ExerciseHeader = ({
  exercise,
  variant,
  userId,
}: ExerciseHeaderProps) => {
  const [isFavorite, setIsFavorite] = useState(exercise.isFavorite);
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);
  const { addToFavorites, removeFromFavorites } = useFavoriteManagement();

  const handleFavoriteClick = async () => {
    if (!userId) return;

    if (isUpdatingFavorite) return;

    setIsUpdatingFavorite(true);
    try {
      if (isFavorite) {
        await removeFromFavorites(userId, exercise.id);
        setIsFavorite(false);
      } else {
        await addToFavorites(userId, exercise.id);
        setIsFavorite(true);
      }
    } catch {
      // Revert the state on error
      setIsFavorite(exercise.isFavorite);
    } finally {
      setIsUpdatingFavorite(false);
    }
  };

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
        {userId && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            disabled={isUpdatingFavorite}
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
              } ${isUpdatingFavorite ? 'animate-pulse' : ''}`}
            />
          </Button>
        )}
        <Button variant="ghost" size="sm">
          <Printer className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
