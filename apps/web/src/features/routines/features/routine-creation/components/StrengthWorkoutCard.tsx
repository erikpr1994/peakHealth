'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import WorkoutHeader from '@/features/routines/features/workout-management/components/WorkoutHeader';
import WorkoutDetails from '@/features/routines/features/workout-management/components/WorkoutDetails';
import WorkoutSectionComponent from '@/features/routines/features/workout-management/components/WorkoutSection';
import { calculateWorkoutDuration } from '@/features/routines/utils/workoutCalculations';
import { StrengthWorkout } from '@/features/routines/types';
import { useStrengthWorkoutContext } from '../context/StrengthWorkoutContext';

interface StrengthWorkoutCardProps {
  workout: StrengthWorkout;
  index: number;
  totalCount: number;
  isCollapsed: boolean;
}

const StrengthWorkoutCard = ({
  workout,
  index,
  totalCount,
  isCollapsed,
}: StrengthWorkoutCardProps): React.ReactElement => {
  const { operations } = useStrengthWorkoutContext();

  return (
    <Card className="overflow-hidden">
      <WorkoutHeader
        workout={workout}
        index={index}
        totalCount={totalCount}
        isCollapsed={isCollapsed}
        duration={calculateWorkoutDuration(workout)}
        onToggleCollapse={() => operations.onToggleCollapse(workout.id)}
        onMoveUp={() => operations.onMoveUp(workout.id)}
        onMoveDown={() => operations.onMoveDown(workout.id)}
        onRemove={() => operations.onRemove(workout.id)}
        onUpdateName={name => operations.onUpdateName(workout.id, name)}
      />

      {!isCollapsed && (
        <>
          <WorkoutDetails
            objective={workout.objective}
            schedule={workout.schedule}
            onUpdateObjective={objective =>
              operations.onUpdateObjective(workout.id, objective)
            }
            onUpdateSchedule={(field, value) =>
              operations.onUpdateSchedule(workout.id, field, value)
            }
          />

          {/* Sections */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Sections</h4>
              <Button
                onClick={() => operations.onAddSection(workout.id)}
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
                  onClick={() => operations.onAddSection(workout.id)}
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
                    isLastSection={sectionIndex === workout.sections.length - 1}
                    onUpdateName={name =>
                      operations.onUpdateSectionName(
                        workout.id,
                        section.id,
                        name
                      )
                    }
                    onUpdateType={type =>
                      operations.onUpdateSectionType(
                        workout.id,
                        section.id,
                        type
                      )
                    }
                    onUpdateRestAfter={restAfter =>
                      operations.onUpdateSectionRestAfter(
                        workout.id,
                        section.id,
                        restAfter
                      )
                    }
                    onUpdateEmomDuration={duration =>
                      operations.onUpdateSectionEmomDuration(
                        workout.id,
                        section.id,
                        duration
                      )
                    }
                    onRemove={() =>
                      operations.onRemoveSection(workout.id, section.id)
                    }
                    onAddExercise={() =>
                      operations.onAddExercise(workout.id, section.id)
                    }
                    onUpdateExerciseEmomReps={(exerciseId, reps) =>
                      operations.onUpdateExerciseEmomReps(
                        workout.id,
                        section.id,
                        exerciseId,
                        reps
                      )
                    }
                    onUpdateExerciseSets={(exerciseId, sets) =>
                      operations.onUpdateExerciseSets(
                        workout.id,
                        section.id,
                        exerciseId,
                        sets
                      )
                    }
                    onUpdateExerciseName={(exerciseId, name) =>
                      operations.onUpdateExerciseName(
                        workout.id,
                        section.id,
                        exerciseId,
                        name
                      )
                    }
                    onUpdateRestTimer={(exerciseId, restTimer) =>
                      operations.onUpdateRestTimer(
                        workout.id,
                        section.id,
                        exerciseId,
                        restTimer
                      )
                    }
                    onUpdateExerciseRestAfter={(exerciseId, restAfter) =>
                      operations.onUpdateExerciseRestAfter(
                        workout.id,
                        section.id,
                        exerciseId,
                        restAfter
                      )
                    }
                    onRemoveExercise={exerciseId =>
                      operations.onRemoveExercise(
                        workout.id,
                        section.id,
                        exerciseId
                      )
                    }
                    onAddApproachSets={exerciseId =>
                      operations.onAddApproachSets(
                        workout.id,
                        section.id,
                        exerciseId
                      )
                    }
                    onUpdateProgressionMethod={(exerciseId, method) =>
                      operations.onUpdateProgressionMethod(
                        workout.id,
                        section.id,
                        exerciseId,
                        method
                      )
                    }
                    onNotesClick={(type, exerciseId, setId) =>
                      operations.onNotesClick(
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
  );
};

export default StrengthWorkoutCard;
