'use client';

import { useEffect } from 'react';
import { Trash2, FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Exercise, ProgressionMethod } from '@/features/routines/types';
import { UnilateralMode } from '@/features/routines/types/exercise';
import {
  getProgressionMethodLabel,
  getProgressionMethodColor,
} from '@/features/routines/utils';
import { generateSetsForProgression } from '@/features/routines/utils/workoutCalculations';
import SetManagement, {
  WorkoutSet,
} from '@/features/routines/components/SetManagement';
import TimeInput from '../../routine-creation/components/TimeInput';

interface ExerciseManagementProps {
  exercise: Exercise;
  workoutId: string;
  sectionId: string;
  index: number;
  isLastExercise: boolean;
  sectionType: 'warmup' | 'basic' | 'cooldown' | 'emom' | 'tabata' | 'amrap';
  emomDuration?: number; // Add EMOM duration prop
  totalExercisesInSection?: number; // Add total exercises prop for Tabata
  onUpdateEmomReps: (exerciseId: string, reps: number) => void;
  onUpdateSets: (exerciseId: string, sets: WorkoutSet[]) => void;
  onUpdateName: (exerciseId: string, name: string) => void;
  onUpdateRestTimer: (exerciseId: string, restTimer: string) => void;
  onUpdateRestAfter: (exerciseId: string, restAfter: string) => void;
  onRemove: (exerciseId: string) => void;
  onAddApproachSets: (exerciseId: string) => void;
  onUpdateProgressionMethod: (
    exerciseId: string,
    method: ProgressionMethod
  ) => void;
  onNotesClick: (
    type: 'exercise' | 'set',
    exerciseId: string,
    setId?: string
  ) => void;
}

const ExerciseManagement = ({
  exercise,
  workoutId,
  sectionId,
  index,
  isLastExercise,
  sectionType,
  emomDuration,
  totalExercisesInSection,
  onUpdateEmomReps,
  onUpdateSets,
  onUpdateName,
  onUpdateRestTimer,
  onUpdateRestAfter,
  onRemove,
  onAddApproachSets,
  onUpdateProgressionMethod,
  onNotesClick,
}: ExerciseManagementProps): React.ReactElement => {
  // Get unilateral mode display information
  const getUnilateralModeInfo = (
    mode: UnilateralMode
  ): { label: string; description: string; color: string } => {
    switch (mode) {
      case 'alternating':
        return {
          label: 'Alternating',
          description: 'Left → Right → Left → Right',
          color: 'bg-blue-100 text-blue-700',
        };
      case 'sequential':
        return {
          label: 'Sequential',
          description: 'All left sets → All right sets',
          color: 'bg-green-100 text-green-700',
        };
      case 'simultaneous':
        return {
          label: 'Simultaneous',
          description: 'Both sides together',
          color: 'bg-purple-100 text-purple-700',
        };
      default:
        return {
          label: 'Unknown',
          description: '',
          color: 'bg-gray-100 text-gray-700',
        };
    }
  };
  // Handle progression method change with automatic set generation
  const handleProgressionMethodChange = (method: ProgressionMethod): void => {
    onUpdateProgressionMethod(exercise.id, method);

    // Generate predefined sets for the selected progression method
    const predefinedSets = generateSetsForProgression(
      method,
      exercise.isUnilateral,
      exercise.unilateralMode
    );
    onUpdateSets(exercise.id, predefinedSets);
  };

  // Auto-generate default sets for new exercises
  useEffect(() => {
    if (exercise.sets.length === 0) {
      let defaultSets;

      if (sectionType === 'emom' && emomDuration) {
        // For EMOM, create sets based on the section duration
        // Each set represents one minute
        defaultSets = Array.from({ length: emomDuration }, (_, i) => ({
          id: `${Date.now()}-${i}`,
          setNumber: i + 1,
          setType: 'normal' as const,
          repType: 'fixed' as const,
          reps: exercise.emomReps || 10,
          weight: null,
          rpe: null,
          notes: `EMOM set ${i + 1} - ${i + 1} minute interval`,
          isUnilateral: exercise.isUnilateral,
          unilateralSide:
            exercise.isUnilateral && exercise.unilateralMode === 'sequential'
              ? i % 2 === 0
                ? ('left' as const)
                : ('right' as const)
              : exercise.isUnilateral
                ? ('both' as const)
                : undefined,
        }));
      } else if (sectionType === 'tabata') {
        // For Tabata, create 8 sets per exercise (4 minutes total: 20s work, 10s rest, 8 rounds)
        // Each exercise gets 8 sets regardless of how many exercises are in the section
        const tabataRounds = 8;
        defaultSets = Array.from({ length: tabataRounds }, (_, i) => ({
          id: `${Date.now()}-${i}`,
          setNumber: i + 1,
          setType: 'normal' as const,
          repType: 'fixed' as const,
          reps: null, // Tabata doesn't use reps, it's time-based
          weight: null,
          rpe: null,
          notes: `Tabata round ${i + 1} - 20s work, 10s rest`,
          isUnilateral: exercise.isUnilateral,
          unilateralSide:
            exercise.isUnilateral && exercise.unilateralMode === 'sequential'
              ? i % 2 === 0
                ? ('left' as const)
                : ('right' as const)
              : exercise.isUnilateral
                ? ('both' as const)
                : undefined,
        }));
      } else {
        // For other section types, use the existing logic
        defaultSets = generateSetsForProgression(
          'linear',
          exercise.isUnilateral,
          exercise.unilateralMode
        );
      }

      onUpdateSets(exercise.id, defaultSets);
    }
  }, [
    exercise.id,
    exercise.sets.length,
    exercise.isUnilateral,
    exercise.unilateralMode,
    exercise.emomReps,
    sectionType,
    emomDuration,
    totalExercisesInSection,
    onUpdateSets,
  ]);

  // Regenerate EMOM sets when duration changes
  useEffect(() => {
    if (sectionType === 'emom' && emomDuration && exercise.sets.length > 0) {
      const newSets = Array.from({ length: emomDuration }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        setNumber: i + 1,
        setType: 'normal' as const,
        repType: 'fixed' as const,
        reps: exercise.emomReps || 10,
        weight: null,
        rpe: null,
        notes: `EMOM set ${i + 1} - ${i + 1} minute interval`,
        isUnilateral: exercise.isUnilateral,
        unilateralSide:
          exercise.isUnilateral && exercise.unilateralMode === 'sequential'
            ? i % 2 === 0
              ? ('left' as const)
              : ('right' as const)
            : exercise.isUnilateral
              ? ('both' as const)
              : undefined,
      }));
      onUpdateSets(exercise.id, newSets);
    }
  }, [
    sectionType,
    emomDuration,
    exercise.emomReps,
    exercise.id,
    exercise.isUnilateral,
    exercise.unilateralMode,
    onUpdateSets,
  ]);

  return (
    <Card className="border border-gray-200">
      <div className="p-4 space-y-4">
        {/* Exercise Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs font-medium">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg">
                {exercise.name || 'Exercise'}
              </h3>
              {exercise.isUnilateral && exercise.unilateralMode && (
                <div className="mt-1">
                  {/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */}
                  {(() => {
                    const modeInfo = getUnilateralModeInfo(
                      exercise.unilateralMode
                    );
                    return (
                      <Badge className={`text-xs ${modeInfo.color}`}>
                        {modeInfo.label}: {modeInfo.description}
                      </Badge>
                    );
                  })()}
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNotesClick('exercise', exercise.id)}
              className={`text-xs px-3 py-1 rounded-md border ${
                exercise.notes
                  ? 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100'
                  : 'text-gray-500 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
              title={
                exercise.notes
                  ? `Edit exercise notes: ${exercise.notes.substring(0, 50)}${
                      exercise.notes.length > 50 ? '...' : ''
                    }`
                  : 'Add notes for this exercise'
              }
            >
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                {exercise.notes ? (
                  <span className="truncate max-w-20">
                    {exercise.notes.length > 15
                      ? `${exercise.notes.substring(0, 15)}...`
                      : exercise.notes}
                  </span>
                ) : (
                  <span>Notes</span>
                )}
              </div>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(exercise.id)}
            className="text-red-600 hover:text-red-700 ml-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Exercise Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Hide rest timer for EMOM and Tabata */}
          {sectionType !== 'emom' && sectionType !== 'tabata' && (
            <TimeInput
              label="Rest Between Sets"
              value={exercise.restTimer || null}
              onChange={value => onUpdateRestTimer(exercise.id, value)}
              placeholder="e.g., 90s or 2:30"
            />
          )}

          {/* Only show rest after exercise if NOT the last exercise and NOT EMOM/Tabata */}
          {!isLastExercise &&
            sectionType !== 'emom' &&
            sectionType !== 'tabata' && (
              <TimeInput
                label="Rest After Exercise"
                value={exercise.restAfter || null}
                onChange={value => onUpdateRestAfter(exercise.id, value)}
                placeholder="e.g., 2:30 or 3:00"
              />
            )}

          {/* Hide progression method for EMOM and Tabata */}
          {sectionType !== 'emom' && sectionType !== 'tabata' && (
            <div>
              <Label className="block mb-2">Progression Method</Label>
              <Select
                value={exercise.progressionMethod || 'linear'}
                onValueChange={value =>
                  handleProgressionMethodChange(value as ProgressionMethod)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="dual">Dual</SelectItem>
                  <SelectItem value="inverse-pyramid">
                    Inverse Pyramid
                  </SelectItem>
                  <SelectItem value="myo-reps">Myo-Reps</SelectItem>
                  <SelectItem value="widowmaker">Widowmaker</SelectItem>
                  <SelectItem value="amrap">AMRAP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Progression Method Info - Hide for EMOM and Tabata */}
        {exercise.progressionMethod &&
          sectionType !== 'emom' &&
          sectionType !== 'tabata' && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <Badge
                    className={getProgressionMethodColor(
                      exercise.progressionMethod
                    )}
                  >
                    {getProgressionMethodLabel(exercise.progressionMethod)}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">
                    {getProgressionMethodLabel(exercise.progressionMethod)}{' '}
                    progression method
                  </p>
                </div>
              </div>
            </div>
          )}

        {/* Sets Management */}
        <div>
          <Label className="block mb-2">Sets</Label>
          <SetManagement
            sets={exercise.sets}
            onSetsChange={(sets: WorkoutSet[]) =>
              onUpdateSets(exercise.id, sets)
            }
            onNotesClick={(setId: string) =>
              onNotesClick('set', exercise.id, setId)
            }
            onAddApproachSets={() => onAddApproachSets(exercise.id)}
            exerciseEquipment={exercise.equipment}
            exerciseName={exercise.name}
            isUnilateral={exercise.isUnilateral}
            unilateralMode={exercise.unilateralMode}
            hideApproachSets={
              sectionType === 'emom' || sectionType === 'tabata'
            }
            sectionType={sectionType}
          />
        </div>
      </div>
    </Card>
  );
};

export default ExerciseManagement;
