'use client';

import { Activity, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TrailRunningWorkout from '@/features/routines/features/trail-running/TrailRunningWorkout';
import {
  RunningWorkout,
  WorkoutSet,
  TrailRunningWorkoutData,
} from '@/features/routines/types';
import WorkoutHeader from '@/features/routines/features/workout-management/components/WorkoutHeader';
import WorkoutDetails from '@/features/routines/features/workout-management/components/WorkoutDetails';
import WorkoutSectionComponent from '@/features/routines/features/workout-management/components/WorkoutSection';
import { calculateWorkoutDuration } from '@/features/routines/utils/workoutCalculations';

interface RunningWorkoutsSectionProps {
  runningWorkouts: RunningWorkout[];
  collapsedRunningWorkouts: Set<string>;
  creatingRunning: boolean;
  editingRunning: { workoutId: string; data: TrailRunningWorkoutData } | null;
  onAddRunningWorkout: () => void;
  onRunningSave: (runningData: TrailRunningWorkoutData) => void;
  onRunningCancel: () => void;
  onEditRunning: (workoutId: string) => void;
  onToggleCollapse: (workoutId: string) => void;
  onMoveUp: (workoutId: string) => void;
  onMoveDown: (workoutId: string) => void;
  onRemove: (workoutId: string) => void;
  onUpdateName: (workoutId: string, name: string) => void;
  onUpdateObjective: (workoutId: string, objective: string) => void;
  onUpdateSchedule: (
    workoutId: string,
    field: 'repeatPattern' | 'repeatValue' | 'selectedDays' | 'time',
    value: string | string[]
  ) => void;
  onAddSection: (workoutId: string) => void;
  onUpdateSectionName: (
    workoutId: string,
    sectionId: string,
    name: string
  ) => void;
  onUpdateSectionType: (
    workoutId: string,
    sectionId: string,
    type: 'warmup' | 'basic' | 'cooldown' | 'emom' | 'tabata' | 'amrap'
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
  onRemoveSection: (workoutId: string, sectionId: string) => void;
  onAddExercise: (workoutId: string, sectionId: string) => void;
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
  onAddApproachSets: (
    workoutId: string,
    sectionId: string,
    exerciseId: string
  ) => void;
  onNotesClick: (
    type: 'exercise' | 'set',
    workoutId: string,
    sectionId: string,
    exerciseId: string,
    setId?: string
  ) => void;
}

const RunningWorkoutsSection = ({
  runningWorkouts,
  collapsedRunningWorkouts,
  creatingRunning,
  editingRunning,
  onAddRunningWorkout,
  onRunningSave,
  onRunningCancel,
  onEditRunning,
  onToggleCollapse,
  onMoveUp,
  onMoveDown,
  onRemove,
  onUpdateName,
  onUpdateObjective,
  onUpdateSchedule,
  onAddSection,
  onUpdateSectionName,
  onUpdateSectionType,
  onUpdateSectionRestAfter,
  onUpdateSectionEmomDuration,
  onRemoveSection,
  onAddExercise,
  onUpdateExerciseEmomReps,
  onUpdateExerciseSets,
  onUpdateExerciseName,
  onUpdateRestTimer,
  onUpdateExerciseRestAfter,
  onRemoveExercise,
  onAddApproachSets,
  onNotesClick,
}: RunningWorkoutsSectionProps): React.ReactElement => {
  return (
    <div className="space-y-4 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Running Workouts ({runningWorkouts.length + (creatingRunning ? 1 : 0)}
          )
        </h2>
        <Button
          onClick={onAddRunningWorkout}
          className="bg-green-600 hover:bg-green-700"
        >
          <Activity className="h-4 w-4 mr-2" />
          Add Running Workout
        </Button>
      </div>

      {/* Running Creation Inline */}
      {creatingRunning && (
        <Card className="border-2 border-green-200">
          <TrailRunningWorkout
            onSave={onRunningSave}
            onCancel={onRunningCancel}
            mode="create"
          />
        </Card>
      )}

      {/* Running Editing Inline */}
      {editingRunning && (
        <Card className="border-2 border-green-200">
          <TrailRunningWorkout
            onSave={onRunningSave}
            onCancel={onRunningCancel}
            initialData={editingRunning.data}
            mode="edit"
          />
        </Card>
      )}

      {runningWorkouts.map((workout, index) => (
        <Card key={workout.id} className="overflow-hidden">
          <WorkoutHeader
            workout={workout}
            index={index}
            totalCount={runningWorkouts.length}
            isCollapsed={collapsedRunningWorkouts.has(workout.id)}
            duration={calculateWorkoutDuration(workout)}
            onToggleCollapse={() => onToggleCollapse(workout.id)}
            onMoveUp={() => onMoveUp(workout.id)}
            onMoveDown={() => onMoveDown(workout.id)}
            onRemove={() => onRemove(workout.id)}
            onEdit={() => onEditRunning(workout.id)}
            onUpdateName={name => onUpdateName(workout.id, name)}
          />

          {!collapsedRunningWorkouts.has(workout.id) && (
            <>
              <WorkoutDetails
                objective={workout.objective}
                schedule={workout.schedule}
                onUpdateObjective={objective =>
                  onUpdateObjective(workout.id, objective)
                }
                onUpdateSchedule={(field, value) =>
                  onUpdateSchedule(workout.id, field, value)
                }
              />

              {/* Sections */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Sections</h4>
                  <Button
                    onClick={() => onAddSection(workout.id)}
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                </div>

                {workout.sections.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No sections added yet</p>
                    <Button
                      onClick={() => onAddSection(workout.id)}
                      variant="outline"
                      size="sm"
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Section
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {workout.sections.map((section, sectionIndex) => (
                      <WorkoutSectionComponent
                        key={section.id}
                        section={section}
                        workoutId={workout.id}
                        isLastSection={
                          sectionIndex === workout.sections.length - 1
                        }
                        onUpdateName={name =>
                          onUpdateSectionName(workout.id, section.id, name)
                        }
                        onUpdateType={type =>
                          onUpdateSectionType(workout.id, section.id, type)
                        }
                        onUpdateRestAfter={restAfter =>
                          onUpdateSectionRestAfter(
                            workout.id,
                            section.id,
                            restAfter
                          )
                        }
                        onUpdateEmomDuration={duration =>
                          onUpdateSectionEmomDuration(
                            workout.id,
                            section.id,
                            duration
                          )
                        }
                        onRemove={() => onRemoveSection(workout.id, section.id)}
                        onAddExercise={() =>
                          onAddExercise(workout.id, section.id)
                        }
                        onUpdateExerciseEmomReps={(exerciseId, reps) =>
                          onUpdateExerciseEmomReps(
                            workout.id,
                            section.id,
                            exerciseId,
                            reps
                          )
                        }
                        onUpdateExerciseSets={(exerciseId, sets) =>
                          onUpdateExerciseSets(
                            workout.id,
                            section.id,
                            exerciseId,
                            sets
                          )
                        }
                        onUpdateExerciseName={(exerciseId, name) =>
                          onUpdateExerciseName(
                            workout.id,
                            section.id,
                            exerciseId,
                            name
                          )
                        }
                        onUpdateRestTimer={(exerciseId, restTimer) =>
                          onUpdateRestTimer(
                            workout.id,
                            section.id,
                            exerciseId,
                            restTimer
                          )
                        }
                        onUpdateExerciseRestAfter={(exerciseId, restAfter) =>
                          onUpdateExerciseRestAfter(
                            workout.id,
                            section.id,
                            exerciseId,
                            restAfter
                          )
                        }
                        onRemoveExercise={exerciseId =>
                          onRemoveExercise(workout.id, section.id, exerciseId)
                        }
                        onAddApproachSets={exerciseId =>
                          onAddApproachSets(workout.id, section.id, exerciseId)
                        }
                        onUpdateProgressionMethod={(exerciseId, method) => {
                          // Running workouts don't have progression methods
                          console.log(
                            'Progression methods not supported for running workouts'
                          );
                        }}
                        onNotesClick={(type, exerciseId, setId) =>
                          onNotesClick(
                            type,
                            workout.id,
                            section.id,
                            exerciseId,
                            setId
                          )
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </Card>
      ))}

      {runningWorkouts.length === 0 && !creatingRunning && (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Activity className="h-12 w-12 text-gray-400" />
            <div>
              <p className="text-gray-500 mb-4">
                No running workouts added yet
              </p>
              <Button
                onClick={onAddRunningWorkout}
                className="bg-green-600 hover:bg-green-700"
              >
                <Activity className="h-4 w-4 mr-2" />
                Add Your First Running Workout
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default RunningWorkoutsSection;
