import { Grid, List } from 'lucide-react';

import { useExerciseFilters } from '../../hooks/useExerciseFilters';
import { useExerciseSearch } from '../../hooks/useExerciseSearch';
import { Exercise } from '../../types';
import { filterExercises } from '../../utils/filterUtils';
import { ExerciseCard } from '../shared/ExerciseCard';

import { Button } from '@/components/ui/button';

interface ExerciseGridProps {
  exercises: Exercise[];
  activeCategory: string;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onExerciseClick: (exercise: Exercise) => void;
}

export const ExerciseGrid = ({
  exercises,
  activeCategory,
  viewMode,
  onViewModeChange,
  onExerciseClick,
}: ExerciseGridProps) => {
  const { searchTerm } = useExerciseSearch();
  const { filters } = useExerciseFilters();

  const filteredExercises = filterExercises(
    exercises,
    searchTerm,
    activeCategory === 'All Exercises' ? 'All' : activeCategory,
    filters
  );

  const getSectionTitle = () => {
    if (activeCategory === 'All Exercises') return 'All Exercises';
    if (activeCategory === 'Favorites') return 'Favorite Exercises';
    return `${activeCategory} Exercises`;
  };

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
          />
        ))}
      </div>
    </div>
  );
};
