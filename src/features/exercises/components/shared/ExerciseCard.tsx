import { Heart, Star, ChevronRight } from 'lucide-react';

import { Exercise } from '../../types';

import { CategoryBadge } from './CategoryBadge';
import { DifficultyBadge } from './DifficultyBadge';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick?: () => void;
  onFavoriteToggle?: () => void;
  showChevron?: boolean;
  isSelected?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ExerciseCard = ({
  exercise,
  onClick,
  onFavoriteToggle,
  showChevron = false,
  isSelected = false,
  className = '',
  size = 'md',
}: ExerciseCardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.();
  };

  const sizeClasses = {
    sm: 'w-64',
    md: 'w-full max-w-md',
    lg: 'w-full',
  };

  const iconSizes = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-6xl',
  };

  const imageHeights = {
    sm: 'h-32',
    md: 'h-40',
    lg: 'h-48',
  };

  const paddingSizes = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-4',
  };

  return (
    <Card
      className={`cursor-pointer hover:shadow-md transition-shadow ${
        sizeClasses[size]
      } mx-auto ${
        isSelected
          ? 'border-primary shadow-lg ring-1 ring-primary/20'
          : 'border-gray-200 hover:border-gray-300'
      } ${className}`}
      onClick={onClick}
    >
      {/* Exercise Image/Icon */}
      <div className={`bg-gray-100 ${imageHeights[size]} relative`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={iconSizes[size]}>{exercise.icon}</div>
        </div>

        {/* Overlay Info */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between">
            <DifficultyBadge difficulty={exercise.difficulty} />
            <div className="flex items-center gap-2">
              {exercise.isPopular && (
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs text-gray-700">Popular</span>
                </div>
              )}
              {exercise.isNew && (
                <div className="bg-green-500 rounded-full px-2 py-1">
                  <span className="text-xs text-white">New</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {exercise.rating && size !== 'sm' && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white px-2 py-1 rounded-full text-sm">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-gray-600">{exercise.rating}</span>
          </div>
        )}
      </div>

      {/* Exercise Info */}
      <div className={paddingSizes[size]}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 mb-2 truncate">
              {exercise.name}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <span className="truncate">
                {exercise.muscleGroups.join(', ')}
              </span>
            </div>
          </div>
          {showChevron && (
            <ChevronRight
              className={`w-4 h-4 text-gray-400 group-hover:text-primary transition-all ${
                isSelected ? 'rotate-90' : ''
              }`}
            />
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <CategoryBadge category={exercise.category} />
            {exercise.variants && exercise.variants.length > 0 && (
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {exercise.variants.length} variants
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            className="flex-shrink-0 ml-2"
          >
            <Heart
              className={`w-4 h-4 ${
                exercise.isFavorite
                  ? 'text-red-500 fill-red-500'
                  : 'text-gray-400'
              }`}
            />
          </Button>
        </div>
      </div>
    </Card>
  );
};
