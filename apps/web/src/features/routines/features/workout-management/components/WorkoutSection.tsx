'use client';

import { Plus, Trash2, Edit, Clock, Dumbbell } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import ExerciseManagement from './ExerciseManagement';
import {
  WorkoutSection as WorkoutSectionType,
  Exercise,
  ProgressionMethod,
} from '@/features/routines/types';
import { getSectionColors, getSectionIcon } from '@/features/routines/utils';
import { WorkoutSet } from '@/features/workout/SetManagement';

interface WorkoutSectionProps {
  section: WorkoutSectionType;
  workoutId: string;
  onUpdateName: (name: string) => void;
  onUpdateType: (type: WorkoutSectionType['type']) => void;
  onUpdateRestAfter: (restAfter: string) => void;
  onUpdateEmomDuration: (duration: number) => void;
  onRemove: () => void;
  onAddExercise: () => void;
  onUpdateExerciseEmomReps: (exerciseId: string, reps: number) => void;
  onUpdateExerciseSets: (exerciseId: string, sets: WorkoutSet[]) => void;
  onUpdateExerciseName: (exerciseId: string, name: string) => void;
  onUpdateRestTimer: (exerciseId: string, restTimer: string) => void;
  onUpdateExerciseRestAfter: (exerciseId: string, restAfter: string) => void;
  onRemoveExercise: (exerciseId: string) => void;
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

const WorkoutSection = ({
  section,
  workoutId,
  onUpdateName,
  onUpdateType,
  onUpdateRestAfter,
  onUpdateEmomDuration,
  onRemove,
  onAddExercise,
  onUpdateExerciseEmomReps,
  onUpdateExerciseSets,
  onUpdateExerciseName,
  onUpdateRestTimer,
  onUpdateExerciseRestAfter,
  onRemoveExercise,
  onAddApproachSets,
  onUpdateProgressionMethod,
  onNotesClick,
}: WorkoutSectionProps): React.ReactElement => {
  const { bgColor, textColor, borderColor } = getSectionColors(section.type);
  const SectionIcon = getSectionIcon(section.type);

  return (
    <Card className={`overflow-hidden border-2 ${borderColor}`}>
      {/* Section Header */}
      <div className={`${bgColor} ${textColor} p-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SectionIcon className="h-5 w-5" />
            <div className="flex items-center space-x-2">
              <Input
                value={section.name}
                onChange={e => onUpdateName(e.target.value)}
                className="font-medium border-none p-0 h-auto bg-transparent focus:bg-white focus:border-gray-300 text-inherit"
                placeholder="Section name"
              />
              <Badge variant="secondary" className="bg-white/20 text-inherit">
                {section.type.toUpperCase()}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-inherit hover:bg-white/20"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Section Content */}
      <div className="p-4 space-y-4">
        {/* Section Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Section Type</Label>
            <Select
              value={section.type}
              onValueChange={value =>
                onUpdateType(value as WorkoutSectionType['type'])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warmup">Warmup</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="cooldown">Cooldown</SelectItem>
                <SelectItem value="emom">EMOM</SelectItem>
                <SelectItem value="tabata">TABATA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Rest After Section</Label>
            <Input
              value={section.restAfter}
              onChange={e => onUpdateRestAfter(e.target.value)}
              placeholder="e.g., 2 min"
            />
          </div>

          {section.type === 'emom' && (
            <div>
              <Label>EMOM Duration (minutes)</Label>
              <Input
                type="number"
                value={section.emomDuration || ''}
                onChange={e => onUpdateEmomDuration(Number(e.target.value))}
                placeholder="e.g., 10"
                min="1"
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
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Exercise
            </Button>
          </div>

          {section.exercises.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Dumbbell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
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
                <ExerciseManagement
                  key={exercise.id}
                  exercise={exercise}
                  workoutId={workoutId}
                  sectionId={section.id}
                  index={index}
                  onUpdateEmomReps={onUpdateExerciseEmomReps}
                  onUpdateSets={onUpdateExerciseSets}
                  onUpdateName={onUpdateExerciseName}
                  onUpdateRestTimer={onUpdateRestTimer}
                  onUpdateRestAfter={onUpdateExerciseRestAfter}
                  onRemove={onRemoveExercise}
                  onAddApproachSets={onAddApproachSets}
                  onUpdateProgressionMethod={onUpdateProgressionMethod}
                  onNotesClick={onNotesClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default WorkoutSection;
