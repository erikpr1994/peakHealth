'use client';

import React, { useState } from 'react';
import { Accordion, Button } from '@peakhealth/ui';
import { useSection } from '../../hooks/useSection';
import { StrengthExercise } from '../StrengthExercise';
import {
  ExerciseLibraryModal,
  type ExerciseLibraryExercise,
} from '../ExerciseLibraryModal';
import './MainStrengthSection.css';

export interface MainStrengthSectionProps {
  workoutId: string;
  sectionId: string;
}

export const MainStrengthSection: React.FC<MainStrengthSectionProps> = ({
  workoutId,
  sectionId,
}) => {
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const { exerciseIds, addExercise } = useSection(workoutId, sectionId);

  const handleAddExercise = () => {
    setIsExerciseModalOpen(true);
  };

  const handleExerciseSelect = (
    selectedExercises: ExerciseLibraryExercise[]
  ) => {
    // Add each selected exercise to the section
    selectedExercises.forEach(exercise => {
      // Create a new exercise with default configuration
      const newExercise = {
        _id: globalThis.crypto.randomUUID(),
        exerciseId: exercise.id,
        exerciseVariantId: exercise.id, // Using the same ID for now
        orderIndex: exerciseIds.length,
        type: 'strength' as const,
        sets: [],
        restBetweenSets: '120s',
        notes: '',
        progressionMethod: 'linear' as const,
      };

      addExercise(newExercise);
    });
  };

  const handleCloseExerciseModal = () => {
    setIsExerciseModalOpen(false);
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
        onSelect={handleExerciseSelect}
        initialFilter={{
          category: 'Strength',
          difficulty: 'Beginner',
        }}
      />
    </div>
  );
};
