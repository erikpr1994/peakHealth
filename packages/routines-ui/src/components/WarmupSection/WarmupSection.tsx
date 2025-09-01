'use client';

import React from 'react';
import { Accordion, Button } from '@peakhealth/ui';
import { useExerciseManagement } from '../../hooks/useExerciseManagement';
import { useSection } from '../../hooks/useSection';
import { EXERCISE_DEFAULTS } from '../../utils/exerciseCreation';
import { StrengthExercise } from '../StrengthExercise';
import { ExerciseLibraryModal } from '../ExerciseLibraryModal';
import './WarmupSection.css';

export interface WarmupSectionProps {
  workoutId: string;
  sectionId: string;
}

export const WarmupSection: React.FC<WarmupSectionProps> = ({
  workoutId,
  sectionId,
}) => {
  const { exerciseIds } = useSection(workoutId, sectionId);
  const {
    isExerciseModalOpen,
    handleAddExercise,
    handleExerciseSelect,
    handleCloseExerciseModal,
  } = useExerciseManagement(workoutId, sectionId);

  const onExerciseSelect = (selectedExercises: any[]) => {
    handleExerciseSelect(selectedExercises, EXERCISE_DEFAULTS.warmup);
  };

  return (
    <div className="warmup-section">
      <Accordion>
        <Accordion.Header className="warmup-section-header">
          <div className="warmup-section-title">
            <span className="warmup-icon">🔥</span>
            <h3>Warm-up</h3>
          </div>
          <div className="warmup-section-controls">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddExercise}
              className="add-exercise-btn"
            >
              <span className="btn-icon">+</span>
              Add Exercise
            </Button>
          </div>
        </Accordion.Header>

        <Accordion.Content className="warmup-section-body">
          {exerciseIds.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-content">
                <span className="empty-state-icon">🔥</span>
                <h4>No warm-up exercises yet</h4>
                <p>Add your first warm-up exercise to get started</p>
                <Button
                  variant="outline"
                  onClick={handleAddExercise}
                  className="empty-state-btn"
                >
                  <span className="btn-icon">+</span>
                  Add your first warm-up exercise
                </Button>
              </div>
            </div>
          ) : (
            <div className="exercises-list">
              {exerciseIds.map(exerciseId => (
                <StrengthExercise
                  key={exerciseId}
                  workoutId={workoutId}
                  sectionId={sectionId}
                  exerciseId={exerciseId}
                  showApproachSetsToggle={false}
                  showProgressionMethods={false}
                />
              ))}
            </div>
          )}
        </Accordion.Content>
      </Accordion>

      {/* Exercise Library Modal */}
      <ExerciseLibraryModal
        isOpen={isExerciseModalOpen}
        onClose={handleCloseExerciseModal}
        onSelect={onExerciseSelect}
        initialFilter={{
          category: 'Flexibility',
          difficulty: 'Beginner',
        }}
      />
    </div>
  );
};
