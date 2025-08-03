import { Grid, List } from 'lucide-react';

import { useExerciseFilters } from '../../hooks/useExerciseFilters';
import { useExerciseSearch as useExerciseSearchService } from '../../hooks/useExercises';
import { useExerciseSearch } from '../../hooks/useExerciseSearch';
import { Exercise, Category } from '../../types';
import { filterExercises } from '../../utils/filterUtils';
import { ExerciseCard } from '../shared/ExerciseCard';

import { Button } from '@/components/ui/button';

interface ExerciseGridProps {
  exercises: Exercise[];
  activeCategory: string;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onExerciseClick: (exercise: Exercise) => void;
  userId?: string; // Add userId prop for favorite management
}

export const ExerciseGrid = ({
  exercises,
  activeCategory,
  viewMode,
  onViewModeChange,
  onExerciseClick,
  userId,
}: ExerciseGridProps) => {
  const { searchTerm } = useExerciseSearch();
  const { filters } = useExerciseFilters();

  // Use service-based search when there are search parameters
  const hasSearchParams =
    searchTerm ||
    filters.difficulties.length > 0 ||
    filters.muscleGroups.length > 0 ||
    filters.equipment.length > 0;

  const { exercises: searchResults, isLoading: isSearching } =
    useExerciseSearchService({
      searchTerm: searchTerm || undefined,
      category:
        activeCategory === 'All Exercises'
          ? undefined
          : (activeCategory as Category),
      difficulties:
        filters.difficulties.length > 0 ? filters.difficulties : undefined,
      equipment: filters.equipment.length > 0 ? filters.equipment : undefined,
      muscleGroups:
        filters.muscleGroups.length > 0 ? filters.muscleGroups : undefined,
    });

  // Use search results if we have search parameters, otherwise use the passed exercises
  const displayExercises = hasSearchParams ? searchResults : exercises;

  // Apply client-side filtering for category and additional filters
  const filteredExercises = filterExercises(
    displayExercises,
    '', // Search term is already handled by service
    activeCategory === 'All Exercises' ? 'All' : activeCategory,
    hasSearchParams
      ? { difficulties: [], muscleGroups: [], equipment: [] }
      : filters // Don't double-filter
  );

  const getSectionTitle = () => {
    if (activeCategory === 'All Exercises') return 'All Exercises';
    if (activeCategory === 'Favorites') return 'Favorite Exercises';
    return `${activeCategory} Exercises`;
  };

  if (isSearching) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {getSectionTitle()}
          </h2>
          <div className="flex border border-gray-300 rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">{getSectionTitle()}</h2>
        <div className="flex border border-gray-300 rounded-md">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="rounded-r-none"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="rounded-l-none"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
        {filteredExercises.map(exercise => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onClick={() => onExerciseClick(exercise)}
            userId={userId}
          />
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-medium text-gray-900 mb-2">No exercises found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};
