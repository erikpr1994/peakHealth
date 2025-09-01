'use client';

import React, { useState } from 'react';
import { Accordion, Button } from '@peakhealth/ui';
import { useWorkout } from '../../hooks/useWorkout';
import { SectionTypeSelectionModal } from '../SectionTypeSelectionModal';
import { generateId } from '../../utils/idGenerator';
import type { SectionType } from '@peakhealth/routines-types';
import './WorkoutAccordion.css';

export interface WorkoutAccordionProps {
  workoutId: string;
}

export const WorkoutAccordion: React.FC<WorkoutAccordionProps> = ({
  workoutId,
}) => {
  const { workout, sectionIds, addSection } = useWorkout(workoutId);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);

  if (!workout) {
    return null;
  }

  const handleAddSection = () => {
    setIsSectionModalOpen(true);
  };

  const handleSectionTypeSelect = (
    workoutId: string,
    sectionType: SectionType
  ) => {
    // Create a new section based on the selected type
    const newSection = createSectionByType(sectionType);
    // Type assertion to resolve the union type issue
    addSection(newSection as any);
  };

  const handleCloseSectionModal = () => {
    setIsSectionModalOpen(false);
  };

  const renderSection = (sectionId: string) => {
    // For now, we'll render based on the section type
    // In a real implementation, you'd get the section data and render accordingly
    return (
      <div key={sectionId} className="workout-section">
        {/* This is a placeholder - in reality you'd render the actual section component */}
        <div className="section-placeholder">Section ID: {sectionId}</div>
      </div>
    );
  };

  return (
    <div className="workout-accordion">
      <Accordion>
        <Accordion.Header className="workout-accordion-header">
          <div className="workout-accordion-title">
            <span className="workout-icon">🏋️</span>
            <h3>{workout.name}</h3>
          </div>
          <div className="workout-accordion-controls">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddSection}
              className="add-section-btn"
            >
              <span className="btn-icon">+</span>
              Add Section
            </Button>
          </div>
        </Accordion.Header>

        <Accordion.Content className="workout-accordion-body">
          {sectionIds.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-content">
                <span className="empty-state-icon">📝</span>
                <h4>No sections yet</h4>
                <p>Add your first section to build your workout</p>
                <Button
                  variant="outline"
                  onClick={handleAddSection}
                  className="empty-state-btn"
                >
                  <span className="btn-icon">+</span>
                  Add your first section
                </Button>
              </div>
            </div>
          ) : (
            <div className="sections-list">{sectionIds.map(renderSection)}</div>
          )}
        </Accordion.Content>
      </Accordion>

      {/* Section Type Selection Modal */}
      <SectionTypeSelectionModal
        isOpen={isSectionModalOpen}
        onClose={handleCloseSectionModal}
        workoutId={workoutId}
        onSectionTypeSelect={handleSectionTypeSelect}
      />
    </div>
  );
};

// Helper function to create sections by type
// This is a placeholder - in reality you'd have proper section creation logic
function createSectionByType(sectionType: SectionType) {
  const baseSection = {
    _id: generateId(),
    name: sectionType.charAt(0).toUpperCase() + sectionType.slice(1),
    type: sectionType,
    orderIndex: 0,
    exercises: [],
  };

  // For now, return a basic section structure
  // In a real implementation, you'd create the proper section type
  return baseSection;
}
