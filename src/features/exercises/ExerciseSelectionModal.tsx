'use client';

import { useState } from 'react';

import { ExerciseLibrary } from './components/ExerciseSelectionModal/ExerciseLibrary';
import { ExercisePreview } from './components/ExerciseSelectionModal/ExercisePreview';
import { useExerciseSelection } from './hooks/useExerciseSelection';
import { mockExercises } from './types';
import { Exercise, ExerciseVariant } from './types';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const exercises = mockExercises;

interface ExerciseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExercise: (exercise: Exercise, variant?: ExerciseVariant) => void;
}

const ExerciseSelectionModal = ({
  isOpen,
  onClose,
  onSelectExercise,
}: ExerciseSelectionModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    selectedExercise,
    selectedVariant,
    selectExercise,
    selectVariant,
    clearSelection,
  } = useExerciseSelection();
  const [selectedCategory, setSelectedCategory] = useState('All');

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

export default ExerciseSelectionModal;
