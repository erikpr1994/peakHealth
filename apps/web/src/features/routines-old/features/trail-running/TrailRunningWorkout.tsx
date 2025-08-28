'use client';

import { useState, useEffect } from 'react';

import TrailRunningHeader from './components/TrailRunningHeader';
import WorkoutStats from './components/WorkoutStats';
import WorkoutOverview from './components/WorkoutOverview';
import SectionFormCard from './components/SectionFormCard';
import SectionsList from './components/SectionsList';
import { useTrailRunningWorkout } from '../../hooks/useTrailRunningWorkout';
import { calculateTotals } from '../../utils/trailRunningUtils';
import { TrailRunningWorkoutData } from '@/features/routines-old/types';

interface TrailRunningWorkoutProps {
  onSave: (workoutData: TrailRunningWorkoutData) => void;
  onCancel: () => void;
  initialData?: TrailRunningWorkoutData;
  mode: 'create' | 'edit';
}

const TrailRunningWorkout = ({
  onSave,
  onCancel,
  initialData,
  mode,
}: TrailRunningWorkoutProps): React.ReactElement => {
  const {
    workoutData,
    setWorkoutData,
    editingSection,
    currentSection,
    setCurrentSection,
    repeatIntervals,
    setRepeatIntervals,
    addSection,
    removeSection,
    editSection,
    cancelEdit,
    addRepeatInterval,
    removeRepeatInterval,
    updateRepeatInterval,
    canSave,
  } = useTrailRunningWorkout({ initialData, mode });

  const [skipLastRest, setSkipLastRest] = useState(false);

  // Update workout totals when sections change
  useEffect(() => {
    const totals = calculateTotals(workoutData.sections);
    setWorkoutData(prev => ({
      ...prev,
      targetDistance: totals.distance,
      estimatedDuration: totals.duration,
      elevationGain: totals.elevation,
    }));
  }, [workoutData.sections, setWorkoutData]);

  return (
    <div className="p-6">
      <TrailRunningHeader
        mode={mode}
        onCancel={onCancel}
        onSave={() => onSave(workoutData)}
        canSave={canSave}
      />

      <WorkoutStats
        targetDistance={workoutData.targetDistance}
        estimatedDuration={workoutData.estimatedDuration}
        elevationGain={workoutData.elevationGain}
      />

      <WorkoutOverview
        name={workoutData.name}
        description={workoutData.description}
        difficulty={workoutData.difficulty}
        onNameChange={name => setWorkoutData(prev => ({ ...prev, name }))}
        onDescriptionChange={description =>
          setWorkoutData(prev => ({ ...prev, description }))
        }
        onDifficultyChange={difficulty =>
          setWorkoutData(prev => ({
            ...prev,
            difficulty: difficulty as
              | 'beginner'
              | 'intermediate'
              | 'advanced'
              | 'expert',
          }))
        }
      />

      {/* Training Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionFormCard
          editingSection={editingSection}
          currentSection={currentSection}
          repeatIntervals={repeatIntervals}
          skipLastRest={skipLastRest}
          onUpdateCurrentSection={setCurrentSection}
          onUpdateRepeatIntervals={setRepeatIntervals}
          onSkipLastRestChange={setSkipLastRest}
          onAddInterval={addRepeatInterval}
          onRemoveInterval={removeRepeatInterval}
          onUpdateInterval={updateRepeatInterval}
          onCancelEdit={cancelEdit}
          onAddSection={addSection}
        />

        <SectionsList
          sections={workoutData.sections}
          onEditSection={editSection}
          onRemoveSection={removeSection}
        />
      </div>
    </div>
  );
};

export default TrailRunningWorkout;
