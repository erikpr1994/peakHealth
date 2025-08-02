import { Heart } from 'lucide-react';
import { useState } from 'react';

import { useFavoriteManagement } from '../../hooks/useExercises';
import { Exercise } from '../../types';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ExerciseVariantsProps {
  exercise: Exercise;
  userId?: string; // Add userId prop for favorite management
}

export const ExerciseVariants = ({
  exercise,
  userId,
}: ExerciseVariantsProps) => {
  const [favoriteStates, setFavoriteStates] = useState<Record<string, boolean>>(
    {}
  );
  const [updatingFavorites, setUpdatingFavorites] = useState<
    Record<string, boolean>
  >({});
  const { addToFavorites, removeFromFavorites } = useFavoriteManagement();

  if (!exercise.variants || exercise.variants.length === 0) {
    return null;
  }

  const handleFavoriteClick = async (
    variantId: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();

    if (!userId) return;

    if (updatingFavorites[variantId]) return;

    const currentFavorite = favoriteStates[variantId] ?? false;

    setUpdatingFavorites(prev => ({ ...prev, [variantId]: true }));
    try {
      if (currentFavorite) {
        await removeFromFavorites(userId, exercise.id);
        setFavoriteStates(prev => ({ ...prev, [variantId]: false }));
      } else {
        await addToFavorites(userId, exercise.id);
        setFavoriteStates(prev => ({ ...prev, [variantId]: true }));
      }
    } catch {
      // Handle error silently
    } finally {
      setUpdatingFavorites(prev => ({ ...prev, [variantId]: false }));
    }
  };

  return (
    <Card className="p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Variants</h2>
        <Button variant="ghost" className="text-indigo-600">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exercise.variants.map(variant => {
          const isFavorite = favoriteStates[variant.id] ?? false;
          const isUpdating = updatingFavorites[variant.id] ?? false;

          return (
            <Card
              key={variant.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-100 h-40 relative">
                {variant.media?.featuredImage && (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Image</span>
                  </div>
                )}
              </div>
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
                  {userId && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={e => handleFavoriteClick(variant.id, e)}
                      disabled={isUpdating}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFavorite
                            ? 'text-red-500 fill-red-500'
                            : 'text-gray-400'
                        } ${isUpdating ? 'animate-pulse' : ''}`}
                      />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};
