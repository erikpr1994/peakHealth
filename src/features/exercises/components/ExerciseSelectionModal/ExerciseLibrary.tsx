import { ChevronRight, Info, Star } from 'lucide-react';

import { useExerciseFilters } from '../../hooks/useExerciseFilters';
import { Exercise, DIFFICULTY } from '../../types';
import { filterExercises } from '../../utils/filterUtils';

import { SearchAndFilters } from './SearchAndFilters';

import { ScrollArea } from '@/components/ui/scroll-area';

interface ExerciseLibraryProps {
  exercises: Exercise[];
  searchTerm: string;
  selectedCategory: string;
  selectedExercise: Exercise | null;
  onExerciseSelect: (exercise: Exercise) => void;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: string) => void;
}

export const ExerciseLibrary = ({
  exercises,
  searchTerm,
  selectedCategory,
  selectedExercise,
  onExerciseSelect,
  onSearchChange,
  onCategoryChange,
}: ExerciseLibraryProps) => {
  const { filters } = useExerciseFilters();

  // Helper function to get the main variant
  const getMainVariant = (exercise: Exercise) => {
    return exercise.variants.find(v => v.id === exercise.mainVariantId);
  };

  // Use advanced filtering with all filters
  const filteredExercises = filterExercises(
    exercises,
    searchTerm,
    selectedCategory,
    filters
  );

  return (
    <div className="w-2/3 border-r border-gray-100 flex flex-col bg-gray-50/50 overflow-hidden">
      {/* Search and Filters */}
      <SearchAndFilters
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />

      {/* Exercise Grid - Scrollable */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {filteredExercises.map(exercise => (
                <div
                  key={exercise.id}
                  className={`group bg-white rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                    selectedExercise?.id === exercise.id
                      ? 'border-primary shadow-lg ring-1 ring-primary/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => onExerciseSelect(exercise)}
                >
                  {/* Exercise Image/Icon */}
                  <div className="relative h-48 overflow-hidden rounded-t-xl bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl">{exercise.icon}</div>
                    </div>

                    {/* Overlay Info */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                          <Info className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-700">
                            {getMainVariant(exercise)?.difficulty ||
                              DIFFICULTY.UNKNOWN}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {exercise.isPopular && (
                            <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                              <span className="text-xs text-gray-700">
                                Popular
                              </span>
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
                  </div>

                  {/* Exercise Details */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {exercise.name}
                      </h3>
                      <ChevronRight
                        className={`w-4 h-4 text-gray-400 group-hover:text-primary transition-all ${
                          selectedExercise?.id === exercise.id
                            ? 'rotate-90'
                            : ''
                        }`}
                      />
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {exercise.description ||
                        `A ${exercise.category.toLowerCase()} exercise targeting ${getMainVariant(exercise)?.muscleGroups.join(', ').toLowerCase() || 'multiple muscle groups'}.`}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {(() => {
                          const mainVariant = getMainVariant(exercise);
                          return (
                            <>
                              {mainVariant?.muscleGroups
                                .slice(0, 2)
                                .map(muscle => (
                                  <span
                                    key={muscle}
                                    className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md"
                                  >
                                    {muscle}
                                  </span>
                                ))}
                              {mainVariant?.muscleGroups.length &&
                                mainVariant.muscleGroups.length > 2 && (
                                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                                    +{mainVariant.muscleGroups.length - 2}
                                  </span>
                                )}
                            </>
                          );
                        })()}
                      </div>
                      {exercise.variants && exercise.variants.length > 0 && (
                        <span className="text-xs text-gray-500">
                          {exercise.variants.length} variants
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredExercises.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">
                  No exercises found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or category filter
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
