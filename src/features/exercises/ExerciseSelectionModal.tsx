'use client';

import { useState } from 'react';

import { ExerciseLibrary } from './components/ExerciseSelectionModal/ExerciseLibrary';
import { ExercisePreview } from './components/ExerciseSelectionModal/ExercisePreview';
import { ExerciseProvider } from './context/ExerciseContext';
import { useExercises } from './hooks/useExercises';
import { useExerciseSelection } from './hooks/useExerciseSelection';
import { Exercise, ExerciseVariant } from './types';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/features/auth/context/AuthContext';

interface ExerciseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExercise: (exercise: Exercise, variant?: ExerciseVariant) => void;
}

const ExerciseSelectionModalContent = ({
  isOpen,
  onClose,
  onSelectExercise,
}: ExerciseSelectionModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { userId } = useAuth();
  const {
    selectedExercise,
    selectedVariant,
    selectExercise,
    selectVariant,
    clearSelection,
  } = useExerciseSelection();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { exercises, isLoading, error } = useExercises();

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSelectExercise = (
    exercise: Exercise,
    variant?: ExerciseVariant
  ) => {
    // Always pass the original exercise with the selected variant
    onSelectExercise(exercise, variant);
    onClose();
    clearSelection();
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="!max-w-[95vw] !w-[95vw] h-[90vh] p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Add Exercise
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mt-1">
                Choose from our exercise library and find the perfect exercise
                for your routine
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="flex h-full overflow-hidden">
            <div className="w-2/3 border-r border-gray-100 flex flex-col bg-gray-50/50 overflow-hidden">
              <div className="animate-pulse p-6">
                <div className="h-10 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-48 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-1/3 flex flex-col bg-white overflow-hidden">
              <div className="animate-pulse p-6">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="!max-w-[95vw] !w-[95vw] h-[90vh] p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Add Exercise
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mt-1">
                Choose from our exercise library and find the perfect exercise
                for your routine
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="flex h-full overflow-hidden">
            <div className="w-full flex items-center justify-center">
              <div className="text-center">
                <h3 className="font-medium text-gray-900 mb-2">
                  Failed to Load Exercises
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  There was an error loading the exercise library.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[95vw] !w-[95vw] h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Add Exercise
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 mt-1">
              Choose from our exercise library and find the perfect exercise for
              your routine
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex h-full overflow-hidden">
          {/* Exercise Library */}
          <ExerciseLibrary
            exercises={exercises}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedExercise={selectedExercise}
            onExerciseSelect={selectExercise}
            onSearchChange={handleSearchChange}
            onCategoryChange={setSelectedCategory}
            userId={userId}
          />

          {/* Exercise Preview */}
          <ExercisePreview
            exercise={selectedExercise}
            selectedVariant={selectedVariant}
            onVariantSelect={selectVariant}
            onSelectExercise={() =>
              selectedExercise &&
              handleSelectExercise(
                selectedExercise,
                selectedVariant || undefined
              )
            }
            onClose={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ExerciseSelectionModal = (props: ExerciseSelectionModalProps) => {
  return (
    <ExerciseProvider>
      <ExerciseSelectionModalContent {...props} />
    </ExerciseProvider>
  );
};

export default ExerciseSelectionModal;
