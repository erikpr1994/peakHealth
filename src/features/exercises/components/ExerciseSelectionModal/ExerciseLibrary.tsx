import { Info } from 'lucide-react';

import { useExerciseFilters } from '../../hooks/useExerciseFilters';
import { useExerciseSearch } from '../../hooks/useExercises';
import { Exercise, Category } from '../../types';
import { filterExercises } from '../../utils/filterUtils';
import { ExerciseCard } from '../shared/ExerciseCard';

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

  // Use service-based search when there are search parameters
  const hasSearchParams =
    searchTerm ||
    filters.difficulties.length > 0 ||
    filters.muscleGroups.length > 0 ||
    filters.equipment.length > 0;

  const { exercises: searchResults, isLoading: isSearching } =
    useExerciseSearch({
      searchTerm: searchTerm || undefined,
      category:
        selectedCategory === 'All' ? undefined : (selectedCategory as Category),
      difficulties: filters.difficulties,
      equipment: filters.equipment,
      muscleGroups: filters.muscleGroups,
    });

  // Use search results if we have search parameters, otherwise use the passed exercises
  const displayExercises = hasSearchParams ? searchResults : exercises;

  // Apply client-side filtering for category and additional filters
  const filteredExercises = filterExercises(
    displayExercises,
    '', // Search term is already handled by service
    selectedCategory,
    hasSearchParams
      ? { difficulties: [], muscleGroups: [], equipment: [] }
      : filters // Don't double-filter
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
            {isSearching ? (
              <div className="animate-pulse">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-48 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {filteredExercises.map(exercise => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    onClick={() => onExerciseSelect(exercise)}
                    isSelected={selectedExercise?.id === exercise.id}
                    showChevron={true}
                  />
                ))}
              </div>
            )}

            {!isSearching && filteredExercises.length === 0 && (
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
