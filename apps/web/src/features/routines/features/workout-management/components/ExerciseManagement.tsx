'use client';

import { Plus, Trash2, FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import {
  getProgressionMethodLabel,
  getProgressionMethodColor,
} from '@/features/routines/utils';
import SetManagement, { WorkoutSet } from '@/features/workout/SetManagement';

interface ExerciseManagementProps {
  exercise: Exercise;
  workoutId: string;
  sectionId: string;
  index: number;
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
  return (
    <Card className="border border-gray-200">
      <div className="p-4 space-y-4">
        {/* Exercise Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs font-medium">
              {index + 1}
            </div>
            <Input
              value={exercise.name}
              onChange={e => onUpdateName(exercise.id, e.target.value)}
              className="font-medium border-none p-0 h-auto bg-transparent focus:bg-white focus:border-gray-300"
              placeholder="Exercise name"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNotesClick('exercise', exercise.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FileText className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(exercise.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Exercise Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>Rest Between Sets</Label>
            <Input
              value={exercise.restTimer}
              onChange={e => onUpdateRestTimer(exercise.id, e.target.value)}
              placeholder="e.g., 90s"
            />
          </div>
          <div>
            <Label>Rest After Exercise</Label>
            <Input
              value={exercise.restAfter}
              onChange={e => onUpdateRestAfter(exercise.id, e.target.value)}
              placeholder="e.g., 2 min"
            />
          </div>

          {exercise.emomReps !== undefined && (
            <div>
              <Label>EMOM Reps</Label>
              <Input
                type="number"
                value={exercise.emomReps}
                onChange={e =>
                  onUpdateEmomReps(exercise.id, Number(e.target.value))
                }
                placeholder="e.g., 10"
                min="1"
              />
            </div>
          )}

          {exercise.progressionMethod && (
            <div>
              <Label>Progression Method</Label>
              <Select
                value={exercise.progressionMethod}
                onValueChange={value =>
                  onUpdateProgressionMethod(
                    exercise.id,
                    value as ProgressionMethod
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
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

        {/* Progression Method Info */}
        {exercise.progressionMethod && (
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
              {!exercise.hasApproachSets && (
                <Button
                  onClick={() => onAddApproachSets(exercise.id)}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Approach Sets
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Sets Management */}
        <div>
          <Label>Sets</Label>
          <SetManagement
            sets={exercise.sets}
            onSetsChange={(sets: WorkoutSet[]) =>
              onUpdateSets(exercise.id, sets)
            }
            onNotesClick={(setId: string) =>
              onNotesClick('set', exercise.id, setId)
            }
          />
        </div>
      </div>
    </Card>
  );
};

export default ExerciseManagement;
