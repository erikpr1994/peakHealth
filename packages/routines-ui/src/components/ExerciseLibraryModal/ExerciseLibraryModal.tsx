'use client';

import React, { useState, useMemo } from 'react';
import { Modal, Button, Input } from '@peakhealth/ui';
import { ExerciseLibraryModalProps } from './ExerciseLibraryModal.types';
import { useExercises } from '../../hooks/useExercises';
import './ExerciseLibraryModal.css';

export const ExerciseLibraryModal: React.FC<ExerciseLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  initialFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    'Strength' | 'Cardio' | 'Flexibility' | 'Balance' | 'All'
  >(initialFilter?.category || 'All');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>(
    initialFilter?.muscleGroup || 'All'
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'Beginner' | 'Intermediate' | 'Advanced' | 'All'
  >(initialFilter?.difficulty || 'All');
  const [selectedExercises, setSelectedExercises] = useState<Set<string>>(
    new Set()
  );

  // Use the real data fetching hook
  const { exercises, isLoading, error } = useExercises({
    searchTerm: searchTerm || undefined,
    category: selectedCategory !== 'All' ? selectedCategory : undefined,
    muscleGroup:
      selectedMuscleGroup !== 'All' ? selectedMuscleGroup : undefined,
    difficulty: selectedDifficulty !== 'All' ? selectedDifficulty : undefined,
  });

  // Filter exercises based on search and filters
  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const matchesSearch =
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || exercise.category === selectedCategory;

      const matchesMuscleGroup =
        selectedMuscleGroup === 'All' ||
        exercise.muscleGroups.includes(selectedMuscleGroup);

      const matchesDifficulty =
        selectedDifficulty === 'All' ||
        exercise.difficulty === selectedDifficulty;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMuscleGroup &&
        matchesDifficulty
      );
    });
  }, [
    exercises,
    searchTerm,
    selectedCategory,
    selectedMuscleGroup,
    selectedDifficulty,
  ]);

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

  const categories = ['All', 'Strength', 'Cardio', 'Flexibility', 'Balance'];
  const muscleGroups = [
    'All',
    'Chest',
    'Back',
    'Legs',
    'Arms',
    'Shoulders',
    'Core',
    'Glutes',
    'Full Body',
  ];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

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
                  setSelectedCategory(
                    e.target.value as
                      | 'Strength'
                      | 'Cardio'
                      | 'Flexibility'
                      | 'Balance'
                      | 'All'
                  )
                }
                className="filter-select"
              >
                {categories.map(category => (
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
                onChange={e => setSelectedMuscleGroup(e.target.value)}
                className="filter-select"
              >
                {muscleGroups.map(group => (
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
                  setSelectedDifficulty(
                    e.target.value as
                      | 'Beginner'
                      | 'Intermediate'
                      | 'Advanced'
                      | 'All'
                  )
                }
                className="filter-select"
              >
                {difficulties.map(difficulty => (
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
          ) : filteredExercises.length === 0 ? (
            <div className="no-results">
              <p>No exercises found matching your criteria.</p>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="exercise-grid">
              {filteredExercises.map(exercise => (
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
