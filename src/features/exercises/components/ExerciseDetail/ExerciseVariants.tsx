import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { useFavoriteManagement } from '../../hooks/useExercises';
import { Exercise } from '../../types';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ExerciseVariantsProps {
  exercise: Exercise;
  currentVariantId?: string; // Current variant to exclude from the list
  userId?: string; // Add userId prop for favorite management
}

export const ExerciseVariants = ({
  exercise,
  currentVariantId,
  userId,
}: ExerciseVariantsProps) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(exercise.isFavorite);
  const [isUpdating, setIsUpdating] = useState(false);
  const { addToFavorites, removeFromFavorites } = useFavoriteManagement();

  // Sync favorite state when exercise changes
  useEffect(() => {
    setIsFavorite(exercise.isFavorite);
  }, [exercise.isFavorite]);

  // Filter out the current variant if specified
  const filteredVariants = exercise.variants.filter(
    variant => !currentVariantId || variant.id !== currentVariantId
  );

  if (!filteredVariants || filteredVariants.length === 0) {
    return null;
  }

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!userId) return;

    if (isUpdating) return;

    setIsUpdating(true);
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
      setIsUpdating(false);
    }
  };

  const handleVariantClick = (variantId: string) => {
    router.push(`/exercises/${exercise.id}/variants/${variantId}`);
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
        {filteredVariants.map(variant => (
          <Card
            key={variant.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleVariantClick(variant.id)}
          >
            <div className="bg-gray-100 h-40 relative">
              {variant.media?.featuredImage ? (
                <Image
                  src={variant.media.featuredImage}
                  alt={variant.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
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
                    onClick={handleFavoriteClick}
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
        ))}
      </div>
    </Card>
  );
};
