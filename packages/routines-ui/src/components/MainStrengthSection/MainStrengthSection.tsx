'use client';

import React from 'react';
import { Accordion, Button } from '@peakhealth/ui';
import { useExerciseManagement } from '../../hooks/useExerciseManagement';
import { useSection } from '../../hooks/useSection';
import { EXERCISE_DEFAULTS } from '../../utils/exerciseCreation';
import { StrengthExercise } from '../StrengthExercise';
import { ExerciseLibraryModal } from '../ExerciseLibraryModal';
import './MainStrengthSection.css';

export interface MainStrengthSectionProps {
  workoutId: string;
  sectionId: string;
}

export const MainStrengthSection: React.FC<MainStrengthSectionProps> = ({
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
    handleExerciseSelect(selectedExercises, EXERCISE_DEFAULTS.mainStrength);
  };

  return (
    <div className="main-strength-section">
      <Accordion>
        <Accordion.Header className="main-strength-section-header">
          <div className="main-strength-section-title">
            <span className="main-strength-icon">🏋️</span>
            <h3>Main Strength</h3>
          </div>
          <div className="main-strength-section-controls">
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

        <Accordion.Content className="main-strength-section-body">
          {exerciseIds.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-content">
                <span className="empty-state-icon">🏋️</span>
                <h4>No strength exercises yet</h4>
                <p>Add your first strength exercise to build your workout</p>
                <Button
                  variant="outline"
                  onClick={handleAddExercise}
                  className="empty-state-btn"
                >
                  <span className="btn-icon">+</span>
                  Add your first strength exercise
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
                  showApproachSetsToggle={true}
                  showProgressionMethods={true}
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
          category: 'Strength',
          difficulty: 'Beginner',
        }}
      />
    </div>
  );
};
