'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { CategoryTabs } from './components/ExercisesList/CategoryTabs';
import { ExerciseGrid } from './components/ExercisesList/ExerciseGrid';
import { FilterDialog } from './components/ExercisesList/FilterDialog';
import { NewExercisesCarousel } from './components/ExercisesList/NewExercisesCarousel';
import { SearchAndFilters } from './components/ExercisesList/SearchAndFilters';
import { ExerciseProvider } from './context/ExerciseContext';
import { Exercise } from './types';

import { Button } from '@/components/ui/button';

interface ExercisesListProps {
  initialExercises?: Exercise[];
  initialError?: string | null;
}

const ExercisesListContent = ({
  initialExercises = [],
  initialError,
}: ExercisesListProps): React.ReactElement => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All Exercises');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Use initial data instead of fetching client-side
  const exercises = initialExercises;
  const error = initialError;
  const isLoading = false; // No longer loading since we have initial data

  const newExercises = exercises.filter(exercise => exercise.isNew);

  // Use Link components for direct navigation from exercises page to prevent modal interception
  const handleExerciseClick = (exercise: Exercise): void => {
    // This will only be used when href is not provided (for modal contexts)
    router.push(`/exercises/${exercise.id}/variants/${exercise.mainVariantId}`);
  };

  if (isLoading) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Failed to Load Exercises
          </h1>
          <p className="text-gray-600 mb-6">
            There was an error loading the exercises. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Exercises</h1>
          <p className="text-gray-500 mt-2">
            Discover and explore exercises for your fitness journey.
          </p>
        </div>

        <Button
          onClick={() => router.push('/suggest-exercise')}
          className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Suggest Exercise
        </Button>
      </div>

      {/* Search and Filters */}
      <SearchAndFilters onFilterOpen={() => setIsFilterOpen(true)} />

      {/* Category Tabs */}
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* New Exercises Section */}
      <NewExercisesCarousel
        newExercises={newExercises}
        onExerciseClick={handleExerciseClick}
        href={(exercise: Exercise) =>
          `/exercises/${exercise.id}/variants/${exercise.mainVariantId}`
        }
      />

      {/* Main Exercises Section */}
      <ExerciseGrid
        exercises={exercises}
        activeCategory={activeCategory}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onExerciseClick={handleExerciseClick}
        href={(exercise: Exercise) =>
          `/exercises/${exercise.id}/variants/${exercise.mainVariantId}`
        }
      />

      {/* Filter Dialog */}
      <FilterDialog
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
};

const ExercisesList = ({
  initialExercises,
  initialError,
}: ExercisesListProps): React.ReactElement => {
  return (
    <ExerciseProvider>
      <ExercisesListContent
        initialExercises={initialExercises}
        initialError={initialError}
      />
    </ExerciseProvider>
  );
};

export default ExercisesList;
