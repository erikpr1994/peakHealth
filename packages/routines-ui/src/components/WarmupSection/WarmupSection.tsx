'use client';

import React, { useState } from 'react';
import { Accordion, Button } from '@peakhealth/ui';
import { useSection } from '../../hooks/useSection';
import { StrengthExercise } from '../StrengthExercise';
import {
  ExerciseLibraryModal,
  type ExerciseLibraryExercise,
} from '../ExerciseLibraryModal';
import './WarmupSection.css';

export interface WarmupSectionProps {
  workoutId: string;
  sectionId: string;
}

export const WarmupSection: React.FC<WarmupSectionProps> = ({
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
        restBetweenSets: '60s',
        notes: '',
      };

      addExercise(newExercise);
    });
  };

  const handleCloseExerciseModal = () => {
    setIsExerciseModalOpen(false);
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
        onSelect={handleExerciseSelect}
        initialFilter={{
          category: 'Flexibility',
          difficulty: 'Beginner',
        }}
      />
    </div>
  );
};
