'use client';

import React, { useState, useMemo } from 'react';
import { Modal, Button, Input } from '@peakhealth/ui';
import {
  ExerciseLibraryExercise,
  ExerciseLibraryModalProps,
} from './ExerciseLibraryModal.types';
import './ExerciseLibraryModal.css';

export const ExerciseLibraryModal: React.FC<ExerciseLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  initialFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    ExerciseLibraryExercise['category'] | 'All'
  >(initialFilter?.category || 'All');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>(
    initialFilter?.muscleGroup || 'All'
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    ExerciseLibraryExercise['difficulty'] | 'All'
  >(initialFilter?.difficulty || 'All');
  const [selectedExercises, setSelectedExercises] = useState<Set<string>>(
    new Set()
  );

  // Mock exercise data - in a real app, this would come from an API
  const exercises: ExerciseLibraryExercise[] = useMemo(
    () => [
      {
        id: '1',
        name: 'Push-ups',
        description: 'A classic bodyweight exercise for upper body strength',
        category: 'Strength',
        muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
        equipment: ['Bodyweight'],
        difficulty: 'Beginner',
        icon: '🏋️',
        iconColor: 'bg-blue-100 text-blue-600',
      },
      {
        id: '2',
        name: 'Squats',
        description: 'Fundamental lower body exercise',
        category: 'Strength',
        muscleGroups: ['Legs', 'Glutes', 'Core'],
        equipment: ['Bodyweight'],
        difficulty: 'Beginner',
        icon: '🏋️',
        iconColor: 'bg-green-100 text-green-600',
      },
      {
        id: '3',
        name: 'Plank',
        description: 'Core stability exercise',
        category: 'Strength',
        muscleGroups: ['Core', 'Shoulders'],
        equipment: ['Bodyweight'],
        difficulty: 'Beginner',
        icon: '🧘',
        iconColor: 'bg-yellow-100 text-yellow-600',
      },
      {
        id: '4',
        name: 'Jumping Jacks',
        description: 'Cardiovascular exercise',
        category: 'Cardio',
        muscleGroups: ['Full Body'],
        equipment: ['Bodyweight'],
        difficulty: 'Beginner',
        icon: '🏃',
        iconColor: 'bg-red-100 text-red-600',
      },
      {
        id: '5',
        name: 'Stretching',
        description: 'Flexibility and mobility work',
        category: 'Flexibility',
        muscleGroups: ['Full Body'],
        equipment: ['Bodyweight'],
        difficulty: 'Beginner',
        icon: '🧘',
        iconColor: 'bg-purple-100 text-purple-600',
      },
    ],
    []
  );

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
                      | ExerciseLibraryExercise['category']
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
                      | ExerciseLibraryExercise['difficulty']
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
          {filteredExercises.length === 0 ? (
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
                    <span
                      className="exercise-icon"
                      style={{ backgroundColor: exercise.iconColor }}
                    >
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
