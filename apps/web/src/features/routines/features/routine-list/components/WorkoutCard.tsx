'use client';

import {
  Play,
  Calendar,
  Clock,
  Target,
  Users,
  Star,
  Dumbbell,
  Activity,
  MapPin,
  Waves,
  Bike,
  Plus,
  X,
  FileText,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  WorkoutType,
  StrengthWorkout,
  RunningWorkout,
  WorkoutSection,
  Exercise,
  ProgressionMethod,
  WorkoutSet,
} from '@/features/routines/types';
import {
  getDifficultyColor,
  getGoalColor,
  getIconColor,
  getSectionColors,
  getSectionIcon,
  getProgressionMethodLabel,
  getProgressionMethodColor,
  getProgressionMethodDescription,
} from '@/features/routines/utils';

interface WorkoutCardProps {
  workout: StrengthWorkout | RunningWorkout;
  index: number;
  isStrength: boolean;
  isCollapsed: boolean;
  onToggleCollapse: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onRemove: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
  onUpdateObjective: (id: string, objective: string) => void;
  onUpdateSchedule: (id: string, field: string, value: string) => void;
  onAddSection: (id: string) => void;
  onRemoveSection: (workoutId: string, sectionId: string) => void;
  onUpdateSectionName: (
    workoutId: string,
    sectionId: string,
    name: string
  ) => void;
  onUpdateSectionType: (
    workoutId: string,
    sectionId: string,
    type: WorkoutSection['type']
  ) => void;
  onUpdateSectionRestAfter: (
    workoutId: string,
    sectionId: string,
    restAfter: string
  ) => void;
  onUpdateSectionEmomDuration: (
    workoutId: string,
    sectionId: string,
    duration: number
  ) => void;
  onUpdateExerciseEmomReps: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    reps: number
  ) => void;
  onUpdateExerciseSets: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    sets: WorkoutSet[]
  ) => void;
  onUpdateExerciseName: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    name: string
  ) => void;
  onUpdateRestTimer: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restTimer: string
  ) => void;
  onUpdateExerciseRestAfter: (
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    restAfter: string
  ) => void;
  onRemoveExercise: (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ) => void;
  onAddExercise: (workoutId: string, sectionId: string) => void;
  onNotesClick: (
    type: 'exercise' | 'set',
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    setId?: string
  ) => void;
  onEditRunning?: (workoutId: string) => void;
  totalCount: number;
  calculateWorkoutDuration: (
    workout: StrengthWorkout | RunningWorkout
  ) => string;
}

const WorkoutCard = ({
  workout,
  index,
  isStrength,
  isCollapsed,
  onToggleCollapse,
  onMove,
  onRemove,
  onUpdateName,
  onUpdateObjective,
  onUpdateSchedule,
  onAddSection,
  onRemoveSection,
  onUpdateSectionName,
  onUpdateSectionType,
  onUpdateSectionRestAfter,
  onUpdateSectionEmomDuration,
  onUpdateExerciseEmomReps,
  onUpdateExerciseSets,
  onUpdateExerciseName,
  onUpdateRestTimer,
  onUpdateExerciseRestAfter,
  onRemoveExercise,
  onAddExercise,
  onNotesClick,
  onEditRunning,
  totalCount,
  calculateWorkoutDuration,
}: WorkoutCardProps): React.ReactElement => {
  const getWorkoutIcon = (): React.ReactElement => {
    switch (workout.type) {
      case 'strength':
        return <Dumbbell className="h-5 w-5 text-indigo-600" />;
      case 'running':
        return <Activity className="h-5 w-5 text-green-600" />;
      case 'trail-running':
        return <MapPin className="h-5 w-5 text-orange-600" />;
      case 'swimming':
        return <Waves className="h-5 w-5 text-blue-600" />;
      case 'cycling':
        return <Bike className="h-5 w-5 text-purple-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <Card className="overflow-hidden">
      {/* Workout Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Workout Order Controls */}
            <div className="flex flex-col space-y-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMove(workout.id, 'up')}
                      disabled={index === 0}
                      className="p-1 h-6 w-6"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Move up</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMove(workout.id, 'down')}
                      disabled={index === totalCount - 1}
                      className="p-1 h-6 w-6"
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Move down</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Workout Order Number */}
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-sm font-medium">
              {index + 1}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleCollapse(workout.id)}
              className="p-1"
            >
              {isCollapsed ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>

            <div className="flex items-center space-x-3">
              {getWorkoutIcon()}

              <div>
                <Input
                  value={workout.name}
                  onChange={e => onUpdateName(workout.id, e.target.value)}
                  className="font-medium border-none p-0 h-auto bg-transparent focus:bg-white focus:border-gray-300"
                />
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm text-gray-500">
                    {calculateWorkoutDuration(workout)}
                  </span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500 capitalize">
                    {workout.type.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {workout.type === 'running' && onEditRunning && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditRunning(workout.id)}
                className="text-green-600 hover:text-green-700"
              >
                Edit
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(workout.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Workout Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-4">
          {/* Objective */}
          <div>
            <Label>Objective</Label>
            <Textarea
              value={workout.objective}
              onChange={e => onUpdateObjective(workout.id, e.target.value)}
              placeholder="What is the primary goal of this workout?"
              rows={2}
            />
          </div>

          {/* Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Weeks</Label>
              <Input
                value={workout.schedule.weeks}
                onChange={e =>
                  onUpdateSchedule(workout.id, 'weeks', e.target.value)
                }
                placeholder="e.g., Week 1, 3, 5"
              />
            </div>
            <div>
              <Label>Day</Label>
              <Select
                value={workout.schedule.day}
                onValueChange={value =>
                  onUpdateSchedule(workout.id, 'day', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monday">Monday</SelectItem>
                  <SelectItem value="Tuesday">Tuesday</SelectItem>
                  <SelectItem value="Wednesday">Wednesday</SelectItem>
                  <SelectItem value="Thursday">Thursday</SelectItem>
                  <SelectItem value="Friday">Friday</SelectItem>
                  <SelectItem value="Saturday">Saturday</SelectItem>
                  <SelectItem value="Sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Time</Label>
              <Input
                value={workout.schedule.time}
                onChange={e =>
                  onUpdateSchedule(workout.id, 'time', e.target.value)
                }
                placeholder="e.g., 9:00 AM"
              />
            </div>
          </div>

          {/* Running Workout Details */}
          {workout.type === 'running' &&
            'trailRunningData' in workout &&
            workout.trailRunningData && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-green-900">
                    Running Configuration
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-green-700">
                    <span>{workout.trailRunningData.targetDistance}km</span>
                    <span>•</span>
                    <span>{workout.trailRunningData.estimatedDuration}min</span>
                    <span>•</span>
                    <span>+{workout.trailRunningData.elevationGain}m</span>
                  </div>
                </div>
                <p className="text-sm text-green-700">
                  {workout.trailRunningData.sections.length} training sections
                  configured
                </p>
              </div>
            )}

          {/* Sections for other workout types */}
          {workout.type !== 'running' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Sections</h4>
                <Button
                  size="sm"
                  onClick={() => onAddSection(workout.id)}
                  className="text-sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Section
                </Button>
              </div>

              {workout.sections.map((section, sectionIndex) => {
                const colors = getSectionColors(section.type);
                const SectionIcon = getSectionIcon(section.type);

                return (
                  <div
                    key={section.id}
                    className={`border rounded-lg ${colors.border} ${colors.bg}`}
                  >
                    {/* Section Header */}
                    <div
                      className={`flex items-center justify-between p-3 border-b ${colors.headerBorder} ${colors.headerBg}`}
                    >
                      <div className="flex items-center space-x-3">
                        <SectionIcon className={`h-4 w-4 ${colors.icon}`} />
                        <Input
                          value={section.name}
                          onChange={e =>
                            onUpdateSectionName(
                              workout.id,
                              section.id,
                              e.target.value
                            )
                          }
                          className="border-none p-0 h-auto bg-transparent font-medium"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select
                          value={section.type}
                          onValueChange={(value: WorkoutSection['type']) =>
                            onUpdateSectionType(workout.id, section.id, value)
                          }
                        >
                          <SelectTrigger className="w-32 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="warmup">Warm-up</SelectItem>
                            <SelectItem value="basic">Basic</SelectItem>
                            <SelectItem value="cooldown">Cool-down</SelectItem>
                            <SelectItem value="emom">EMOM</SelectItem>
                            <SelectItem value="tabata">TABATA</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            onRemoveSection(workout.id, section.id)
                          }
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Section Content */}
                    <div className="p-3 space-y-3">
                      {/* EMOM Duration */}
                      {section.type === 'emom' && (
                        <div className="flex items-center space-x-4">
                          <Label className="text-sm font-medium">
                            Duration (minutes):
                          </Label>
                          <Input
                            type="number"
                            value={section.emomDuration || 10}
                            onChange={e =>
                              onUpdateSectionEmomDuration(
                                workout.id,
                                section.id,
                                parseInt(e.target.value) || 10
                              )
                            }
                            className="w-20"
                            min="1"
                            max="60"
                          />
                        </div>
                      )}

                      {/* TABATA Info */}
                      {section.type === 'tabata' && (
                        <div className="bg-red-100 border border-red-200 rounded p-3">
                          <p className="text-sm text-red-800">
                            TABATA Protocol: 4 minutes total (8 rounds of 20
                            seconds work, 10 seconds rest)
                          </p>
                        </div>
                      )}

                      {/* Exercises */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">
                            Exercises
                          </Label>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              onAddExercise(workout.id, section.id)
                            }
                            className="text-sm"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Exercise
                          </Button>
                        </div>

                        {section.exercises.length === 0 ? (
                          <p className="text-sm text-gray-500 py-4 text-center">
                            No exercises added yet
                          </p>
                        ) : (
                          section.exercises.map((exercise, exerciseIndex) => (
                            <div
                              key={exercise.id}
                              className="bg-white rounded border p-3 space-y-3"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 flex-1">
                                  <Input
                                    value={exercise.name}
                                    onChange={e =>
                                      onUpdateExerciseName(
                                        workout.id,
                                        section.id,
                                        exercise.id,
                                        e.target.value
                                      )
                                    }
                                    className="font-medium border-none p-0 h-auto bg-transparent flex-1"
                                  />
                                  {/* Progression Method Badge for Strength Exercises */}
                                  {isStrength && exercise.progressionMethod && (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div>
                                            <Badge
                                              variant="outline"
                                              className={`text-xs ${getProgressionMethodColor(
                                                exercise.progressionMethod
                                              )}`}
                                            >
                                              <TrendingUp className="h-3 w-3 mr-1" />
                                              {getProgressionMethodLabel(
                                                exercise.progressionMethod
                                              )}
                                            </Badge>
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          {getProgressionMethodDescription(
                                            exercise.progressionMethod
                                          )}
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                            onNotesClick(
                                              'exercise',
                                              workout.id,
                                              section.id,
                                              exercise.id
                                            )
                                          }
                                          className={
                                            exercise.notes
                                              ? 'text-blue-600'
                                              : 'text-gray-400'
                                          }
                                        >
                                          <FileText className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        {exercise.notes
                                          ? 'Edit notes'
                                          : 'Add notes'}
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      onRemoveExercise(
                                        workout.id,
                                        section.id,
                                        exercise.id
                                      )
                                    }
                                    className="text-red-600 hover:text-red-700 p-1"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* EMOM Reps */}
                              {section.type === 'emom' && (
                                <div className="flex items-center space-x-4">
                                  <Label className="text-sm">
                                    Target reps per minute:
                                  </Label>
                                  <Input
                                    type="number"
                                    value={exercise.emomReps || 10}
                                    onChange={e =>
                                      onUpdateExerciseEmomReps(
                                        workout.id,
                                        section.id,
                                        exercise.id,
                                        parseInt(e.target.value) || 10
                                      )
                                    }
                                    className="w-20"
                                    min="1"
                                    max="50"
                                  />
                                </div>
                              )}

                              {/* Rest Timers for non-TABATA */}
                              {section.type !== 'tabata' && (
                                <div className="space-y-3">
                                  {section.type === 'emom' ? (
                                    <>
                                      {/* EMOM Rest Explanation */}
                                      <div className="bg-purple-50 border border-purple-200 rounded p-3">
                                        <p className="text-sm text-purple-800">
                                          <strong>EMOM Rest:</strong> Rest is
                                          automatic - the remaining time after
                                          completing your reps becomes your rest
                                          period before the next minute starts.
                                        </p>
                                      </div>
                                      {/* Only Rest after exercise for EMOM - only show if NOT the last exercise */}
                                      {exerciseIndex <
                                        section.exercises.length - 1 && (
                                        <div>
                                          <Label className="text-sm">
                                            Rest after exercise
                                          </Label>
                                          <Input
                                            value={exercise.restAfter}
                                            onChange={e =>
                                              onUpdateExerciseRestAfter(
                                                workout.id,
                                                section.id,
                                                exercise.id,
                                                e.target.value
                                              )
                                            }
                                            placeholder="02:30"
                                            className="text-sm"
                                          />
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    /* Standard Rest Timers for non-EMOM */
                                    <div
                                      className={`grid gap-4 ${
                                        exerciseIndex <
                                        section.exercises.length - 1
                                          ? 'grid-cols-2'
                                          : 'grid-cols-1'
                                      }`}
                                    >
                                      <div>
                                        <Label className="text-sm">
                                          Rest between sets
                                        </Label>
                                        <Input
                                          value={exercise.restTimer}
                                          onChange={e =>
                                            onUpdateRestTimer(
                                              workout.id,
                                              section.id,
                                              exercise.id,
                                              e.target.value
                                            )
                                          }
                                          placeholder="02:00"
                                          className="text-sm"
                                        />
                                      </div>
                                      {/* Only show rest after exercise if NOT the last exercise */}
                                      {exerciseIndex <
                                        section.exercises.length - 1 && (
                                        <div>
                                          <Label className="text-sm">
                                            Rest after exercise
                                          </Label>
                                          <Input
                                            value={exercise.restAfter}
                                            onChange={e =>
                                              onUpdateExerciseRestAfter(
                                                workout.id,
                                                section.id,
                                                exercise.id,
                                                e.target.value
                                              )
                                            }
                                            placeholder="02:30"
                                            className="text-sm"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>

                      {/* Section Rest - only show if NOT the last section */}
                      {sectionIndex < workout.sections.length - 1 && (
                        <div>
                          <Label className="text-sm">Rest after section</Label>
                          <Input
                            value={section.restAfter}
                            onChange={e =>
                              onUpdateSectionRestAfter(
                                workout.id,
                                section.id,
                                e.target.value
                              )
                            }
                            placeholder="03:00"
                            className="text-sm w-32"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default WorkoutCard;
