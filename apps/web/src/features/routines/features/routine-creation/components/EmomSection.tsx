'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { WorkoutSection } from '@/features/routines/types';
import TimeInput from './TimeInput';

interface EmomSectionProps {
  section: WorkoutSection;
  workoutId: string;
  isLastSection: boolean;
  onUpdateName: (name: string) => void;
  onUpdateDuration: (duration: number) => void;
  onUpdateRestAfter: (restAfter: string) => void;
  onRemove: () => void;
  onAddExercise: () => void;
  onUpdateExerciseEmomReps: (exerciseId: string, reps: number) => void;
  onUpdateExerciseName: (exerciseId: string, name: string) => void;
  onUpdateExerciseRestAfter: (exerciseId: string, restAfter: string) => void;
  onRemoveExercise: (exerciseId: string) => void;
  onNotesClick: (
    type: 'exercise' | 'set',
    exerciseId: string,
    setId?: string
  ) => void;
}

const EmomSection = React.memo(
  ({
    section,
    workoutId,
    isLastSection,
    onUpdateName,
    onUpdateDuration,
    onUpdateRestAfter,
    onRemove,
    onAddExercise,
    onUpdateExerciseEmomReps,
    onUpdateExerciseName,
    onUpdateExerciseRestAfter,
    onRemoveExercise,
    onNotesClick,
  }: EmomSectionProps): React.ReactElement => {
    return (
      <Card className="border-l-4 border-orange-500 p-4">
        <div className="space-y-4">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-orange-600">EMOM</span>
              <Input
                value={section.name}
                onChange={e => onUpdateName(e.target.value)}
                placeholder="Section name..."
                className="w-48"
              />
            </div>
            <Button
              onClick={onRemove}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* EMOM Configuration */}
          <div className="text-sm text-gray-600 mb-3">
            <p>
              EMOM: Complete the exercise within each minute. Rest is the
              remaining time in that minute after completing the exercise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="emom-duration" className="text-sm font-medium">
                Duration (minutes)
              </Label>
              <Input
                id="emom-duration"
                type="number"
                min="1"
                max="60"
                value={section.emomDuration || 10}
                onChange={e => onUpdateDuration(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            {/* Only show rest after section if NOT the last section */}
            {!isLastSection && (
              <div>
                <TimeInput
                  label="Rest After Section"
                  value={section.restAfter}
                  onChange={onUpdateRestAfter}
                  placeholder="e.g., 2:30 or 3:00"
                />
              </div>
            )}
          </div>

          {/* Exercises */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Exercises</h4>
              <Button
                onClick={onAddExercise}
                size="sm"
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Exercise
              </Button>
            </div>

            {section.exercises.length === 0 ? (
              <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                <p>No exercises added yet</p>
                <Button
                  onClick={onAddExercise}
                  variant="outline"
                  size="sm"
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Exercise
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {section.exercises.map((exercise, index) => (
                  <Card key={exercise.id} className="p-3">
                    <div className="flex items-start justify-between w-full">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="min-w-0 flex-1">
                          <Label className="text-xs text-gray-600 block mb-1">
                            Exercise
                          </Label>
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {exercise.name}
                          </div>
                        </div>
                        <div className="w-20">
                          <Label className="text-xs text-gray-600 block mb-1">
                            Reps
                          </Label>
                          <Input
                            type="number"
                            min="1"
                            value={exercise.emomReps || 10}
                            onChange={e =>
                              onUpdateExerciseEmomReps(
                                exercise.id,
                                Number(e.target.value)
                              )
                            }
                            className="text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          onClick={() => onNotesClick('exercise', exercise.id)}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          Notes
                        </Button>
                        <Button
                          onClick={() => onRemoveExercise(exercise.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 text-xs"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }
);

EmomSection.displayName = 'EmomSection';

export default EmomSection;
