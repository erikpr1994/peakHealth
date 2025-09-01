'use client';

import React, { useState } from 'react';
import { Modal, Button, Input } from '@peakhealth/ui';
import { ExerciseLibraryModalProps } from './ExerciseLibraryModal.types';
import { useExercises } from '../../hooks/useExercises';
import {
  EXERCISE_CATEGORIES,
  EXERCISE_MUSCLE_GROUPS,
  EXERCISE_DIFFICULTIES,
  toApiCategoryFilter,
  toApiDifficultyFilter,
  toApiMuscleGroupFilter,
  ExerciseCategory,
  ExerciseDifficulty,
  ExerciseMuscleGroup,
} from './ExerciseLibraryModal.utils';
import './ExerciseLibraryModal.css';

export const ExerciseLibraryModal: React.FC<ExerciseLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  initialFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory>(
    initialFilter?.category || 'All'
  );
  const [selectedMuscleGroup, setSelectedMuscleGroup] =
    useState<ExerciseMuscleGroup>(initialFilter?.muscleGroup || 'All');
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<ExerciseDifficulty>(initialFilter?.difficulty || 'All');
  const [selectedExercises, setSelectedExercises] = useState<Set<string>>(
    new Set()
  );

  // Use the real data fetching hook - server handles all filtering
  const { exercises, isLoading, error } = useExercises({
    searchTerm: searchTerm || undefined,
    category: toApiCategoryFilter(selectedCategory),
    muscleGroup: toApiMuscleGroupFilter(selectedMuscleGroup),
    difficulty: toApiDifficultyFilter(selectedDifficulty),
  });

  const handleExerciseToggle = (exerciseId: string) => {
    const newSelected = new Set(selectedExercises);
    if (newSelected.has(exerciseId)) {
      newSelected.delete(exerciseId);
    } else {
      newSelected.add(exerciseId);
    }
    setSelectedExercises(newSelected);
  };

  const handleSelect = () => {
    const selectedExerciseList = exercises.filter(exercise =>
      selectedExercises.has(exercise.id)
    );
    onSelect(selectedExerciseList);
    onClose();
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedMuscleGroup('All');
    setSelectedDifficulty('All');
    setSearchTerm('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Exercise Library"
      className="exercise-library-modal"
    >
      <div className="exercise-library-content">
        {/* Search and Filters */}
        <div className="search-filters">
          <div className="search-section">
            <Input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-section">
            <div className="filter-group">
              <label>Category:</label>
              <select
                value={selectedCategory}
                onChange={e =>
                  setSelectedCategory(e.target.value as ExerciseCategory)
                }
                className="filter-select"
              >
                {EXERCISE_CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Muscle Group:</label>
              <select
                value={selectedMuscleGroup}
                onChange={e =>
                  setSelectedMuscleGroup(e.target.value as ExerciseMuscleGroup)
                }
                className="filter-select"
              >
                {EXERCISE_MUSCLE_GROUPS.map(group => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Difficulty:</label>
              <select
                value={selectedDifficulty}
                onChange={e =>
                  setSelectedDifficulty(e.target.value as ExerciseDifficulty)
                }
                className="filter-select"
              >
                {EXERCISE_DIFFICULTIES.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="clear-filters-btn"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Exercise List */}
        <div className="exercise-list">
          {isLoading ? (
            <div className="loading-state">
              <p>Loading exercises...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>Error: {error.message}</p>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : exercises.length === 0 ? (
            <div className="no-results">
              <p>No exercises found matching your criteria.</p>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="exercise-grid">
              {exercises.map(exercise => (
                <div
                  key={exercise.id}
                  className={`exercise-card ${selectedExercises.has(exercise.id) ? 'selected' : ''}`}
                  onClick={() => handleExerciseToggle(exercise.id)}
                >
                  <div className="exercise-header">
                    <span className={`exercise-icon ${exercise.iconColor}`}>
                      {exercise.icon}
                    </span>
                    <div className="exercise-info">
                      <h3 className="exercise-name">{exercise.name}</h3>
                      <p className="exercise-category">{exercise.category}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedExercises.has(exercise.id)}
                      onChange={() => handleExerciseToggle(exercise.id)}
                      className="exercise-checkbox"
                    />
                  </div>

                  <p className="exercise-description">{exercise.description}</p>

                  <div className="exercise-tags">
                    <span className="tag difficulty">
                      {exercise.difficulty}
                    </span>
                    {exercise.muscleGroups.slice(0, 2).map(group => (
                      <span key={group} className="tag muscle-group">
                        {group}
                      </span>
                    ))}
                    {exercise.equipment.slice(0, 1).map(equipment => (
                      <span key={equipment} className="tag equipment">
                        {equipment}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSelect}
            disabled={selectedExercises.size === 0}
            className="select-btn"
          >
            Select{' '}
            {selectedExercises.size > 0 ? `(${selectedExercises.size})` : ''}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
