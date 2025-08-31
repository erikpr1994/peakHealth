'use client';

import React, { useState } from 'react';
import { Modal, Button, Input, Label } from '@peakhealth/ui';
import './ApproachSetGeneratorModal.css';

export interface ApproachSetGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseId: string;
  onGenerateSets: (exerciseId: string, warmupSets: WarmupSet[]) => void;
}

export interface WarmupSet {
  weight: number;
  reps: number;
  percentage: number;
}

interface WarmupStrategy {
  id: string;
  name: string;
  description: string;
  sets: Array<{ percentage: number; reps: number }>;
}

const WARMUP_STRATEGIES: WarmupStrategy[] = [
  {
    id: 'standard',
    name: 'Standard Ramp-up (3 Sets)',
    description: '40%, 60%, 80% of working weight',
    sets: [
      { percentage: 40, reps: 8 },
      { percentage: 60, reps: 6 },
      { percentage: 80, reps: 4 },
    ],
  },
  {
    id: 'quick',
    name: 'Quick Ramp-up (2 Sets)',
    description: '50%, 75% of working weight',
    sets: [
      { percentage: 50, reps: 6 },
      { percentage: 75, reps: 4 },
    ],
  },
  {
    id: 'conservative',
    name: 'Conservative Ramp-up (4 Sets)',
    description: '30%, 50%, 70%, 85% of working weight',
    sets: [
      { percentage: 30, reps: 10 },
      { percentage: 50, reps: 8 },
      { percentage: 70, reps: 6 },
      { percentage: 85, reps: 3 },
    ],
  },
];

export const ApproachSetGeneratorModal: React.FC<
  ApproachSetGeneratorModalProps
> = ({ isOpen, onClose, exerciseId, onGenerateSets }) => {
  const [workingWeight, setWorkingWeight] = useState<string>('');
  const [selectedStrategy, setSelectedStrategy] = useState<string>('standard');
  const [customSets, setCustomSets] = useState<WarmupSet[]>([]);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  const handleGenerateSets = () => {
    if (!workingWeight || parseFloat(workingWeight) <= 0) {
      return;
    }

    const weight = parseFloat(workingWeight);
    let sets: WarmupSet[];

    if (isCustomMode) {
      sets = customSets;
    } else {
      const strategy = WARMUP_STRATEGIES.find(s => s.id === selectedStrategy);
      if (!strategy) return;

      sets = strategy.sets.map(set => ({
        weight: Math.round((weight * set.percentage) / 100),
        reps: set.reps,
        percentage: set.percentage,
      }));
    }

    onGenerateSets(exerciseId, sets);
    onClose();
  };

  const handleCustomSetChange = (
    index: number,
    field: keyof WarmupSet,
    value: string | number
  ) => {
    const newSets = [...customSets];
    if (field === 'weight' || field === 'reps') {
      newSets[index] = { ...newSets[index], [field]: Number(value) };
    } else if (field === 'percentage') {
      const percentage = Number(value);
      newSets[index] = {
        ...newSets[index],
        percentage,
        weight: Math.round((parseFloat(workingWeight) * percentage) / 100),
      };
    }
    setCustomSets(newSets);
  };

  const addCustomSet = () => {
    setCustomSets([...customSets, { weight: 0, reps: 8, percentage: 50 }]);
  };

  const removeCustomSet = (index: number) => {
    setCustomSets(customSets.filter((_, i) => i !== index));
  };

  const isValid = () => {
    if (isCustomMode) {
      return (
        customSets.length > 0 &&
        customSets.every(set => set.weight > 0 && set.reps > 0)
      );
    }
    return workingWeight && parseFloat(workingWeight) > 0;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate Warm-up Sets"
      showCloseButton={true}
    >
      <div className="approach-set-generator-modal">
        <div className="approach-set-generator-modal__description">
          Generate warm-up sets based on your first working set weight to help
          you prepare for your main sets.
        </div>

        <div className="approach-set-generator-modal__section">
          <Label htmlFor="working-weight">First Working Set Weight (lbs)</Label>
          <Input
            id="working-weight"
            type="number"
            placeholder="e.g., 135"
            value={workingWeight}
            onChange={e => setWorkingWeight(e.target.value)}
            min="1"
            step="1"
          />
        </div>

        <div className="approach-set-generator-modal__section">
          <Label>Warm-up Strategy</Label>
          <div className="approach-set-generator-modal__strategies">
            {WARMUP_STRATEGIES.map(strategy => (
              <div
                key={strategy.id}
                className={`approach-set-generator-modal__strategy ${
                  selectedStrategy === strategy.id && !isCustomMode
                    ? 'approach-set-generator-modal__strategy--selected'
                    : ''
                }`}
                onClick={() => {
                  setSelectedStrategy(strategy.id);
                  setIsCustomMode(false);
                }}
              >
                <div className="approach-set-generator-modal__strategy-header">
                  <input
                    type="radio"
                    name="strategy"
                    value={strategy.id}
                    checked={selectedStrategy === strategy.id && !isCustomMode}
                    onChange={() => {
                      setSelectedStrategy(strategy.id);
                      setIsCustomMode(false);
                    }}
                  />
                  <h4 className="approach-set-generator-modal__strategy-name">
                    {strategy.name}
                  </h4>
                </div>
                <p className="approach-set-generator-modal__strategy-description">
                  {strategy.description}
                </p>
                <div className="approach-set-generator-modal__strategy-sets">
                  {strategy.sets.map((set, index) => (
                    <span
                      key={index}
                      className="approach-set-generator-modal__strategy-set"
                    >
                      {set.percentage}% × {set.reps} reps
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div
              className={`approach-set-generator-modal__strategy ${
                isCustomMode
                  ? 'approach-set-generator-modal__strategy--selected'
                  : ''
              }`}
              onClick={() => setIsCustomMode(true)}
            >
              <div className="approach-set-generator-modal__strategy-header">
                <input
                  type="radio"
                  name="strategy"
                  value="custom"
                  checked={isCustomMode}
                  onChange={() => setIsCustomMode(true)}
                />
                <h4 className="approach-set-generator-modal__strategy-name">
                  Custom
                </h4>
              </div>
              <p className="approach-set-generator-modal__strategy-description">
                Create your own warm-up set configuration
              </p>
            </div>
          </div>
        </div>

        {isCustomMode && (
          <div className="approach-set-generator-modal__section">
            <div className="approach-set-generator-modal__custom-header">
              <Label>Custom Warm-up Sets</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addCustomSet}
                className="approach-set-generator-modal__add-set-button"
              >
                + Add Set
              </Button>
            </div>

            {customSets.map((set, index) => (
              <div
                key={index}
                className="approach-set-generator-modal__custom-set"
              >
                <div className="approach-set-generator-modal__custom-set-inputs">
                  <div>
                    <Label>Percentage</Label>
                    <Input
                      type="number"
                      value={set.percentage}
                      onChange={e =>
                        handleCustomSetChange(
                          index,
                          'percentage',
                          e.target.value
                        )
                      }
                      min="1"
                      max="100"
                      step="5"
                    />
                  </div>
                  <div>
                    <Label>Reps</Label>
                    <Input
                      type="number"
                      value={set.reps}
                      onChange={e =>
                        handleCustomSetChange(index, 'reps', e.target.value)
                      }
                      min="1"
                      step="1"
                    />
                  </div>
                  <div>
                    <Label>Weight (lbs)</Label>
                    <Input
                      type="number"
                      value={set.weight}
                      onChange={e =>
                        handleCustomSetChange(index, 'weight', e.target.value)
                      }
                      min="1"
                      step="1"
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeCustomSet(index)}
                  className="approach-set-generator-modal__remove-set-button"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="approach-set-generator-modal__actions">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleGenerateSets}
            disabled={!isValid()}
          >
            Generate Sets
          </Button>
        </div>
      </div>
    </Modal>
  );
};
