'use client';

import React from 'react';
import { Modal, Button } from '@peakhealth/ui';
import { SECTION_TYPE_OPTIONS, SectionTypeOption } from '../types/section';
import type { SectionType } from '@peakhealth/routines-types';
import './SectionTypeSelectionModal.css';

export interface SectionTypeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutId: string;
  onSectionTypeSelect: (workoutId: string, sectionType: SectionType) => void;
}

export const SectionTypeSelectionModal: React.FC<
  SectionTypeSelectionModalProps
> = ({ isOpen, onClose, workoutId, onSectionTypeSelect }) => {
  const handleSectionTypeSelect = (sectionType: SectionType) => {
    onSectionTypeSelect(workoutId, sectionType);
    onClose();
  };

  const getCategoryIcon = (category: SectionTypeOption['category']) => {
    switch (category) {
      case 'strength':
        return '💪';
      case 'common':
        return '🔄';
      default:
        return '⚡';
    }
  };

  const groupedOptions = SECTION_TYPE_OPTIONS.reduce(
    (acc, option) => {
      if (!acc[option.category]) {
        acc[option.category] = [];
      }
      acc[option.category].push(option);
      return acc;
    },
    {} as Record<string, SectionTypeOption[]>
  );

  const categoryLabels: Record<string, string> = {
    common: 'Common Sections',
    strength: 'Strength Training',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Select Section Type"
      showCloseButton={true}
    >
      <div className="section-type-selection-modal">
        <div className="section-type-selection-modal__description">
          Choose the type of section you'd like to add to your workout:
        </div>

        <div className="section-type-selection-modal__categories">
          {Object.entries(groupedOptions).map(([category, options]) => (
            <div
              key={category}
              className="section-type-selection-modal__category"
            >
              <h3 className="section-type-selection-modal__category-title">
                {getCategoryIcon(category as SectionTypeOption['category'])}{' '}
                {categoryLabels[category]}
              </h3>

              <div className="section-type-selection-modal__options">
                {options.map(option => (
                  <Button
                    key={option.type}
                    variant="outline"
                    size="lg"
                    className="section-type-selection-modal__option"
                    onClick={() => handleSectionTypeSelect(option.type)}
                  >
                    <div className="section-type-selection-modal__option-content">
                      <div className="section-type-selection-modal__option-label">
                        {option.label}
                      </div>
                      <div className="section-type-selection-modal__option-description">
                        {option.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
