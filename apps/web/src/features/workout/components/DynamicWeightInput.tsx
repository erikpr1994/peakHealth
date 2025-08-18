import React, { useState } from 'react';

import { Button, Input, Tooltip } from '@peakhealth/ui';

// Equipment types that affect weight input behavior
export type WeightInputType =
  | 'bodyweight' // Pure bodyweight (push-ups, squats)
  | 'bodyweight-plus' // Bodyweight + added weight (pull-ups with belt)
  | 'free-weight' // Barbell, dumbbells, kettlebells
  | 'machine' // Weight stack machines
  | 'resistance-band' // Resistance bands (future)
  | 'cable' // Cable machines
  | 'none'; // No weight input needed

export interface WeightInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
  exerciseEquipment: string[];
  exerciseName?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

// Helper function to determine weight input type based on equipment
export function getWeightInputType(equipment: string[]): WeightInputType {
  if (!equipment || equipment.length === 0) {
    return 'bodyweight';
  }

  // Check for pure bodyweight exercises
  if (equipment.length === 1 && equipment[0] === 'Bodyweight') {
    return 'bodyweight';
  }

  // Check for bodyweight + added weight exercises
  if (
    equipment.includes('Bodyweight') &&
    (equipment.includes('Pull-up Bar') || equipment.includes('Dip Station'))
  ) {
    return 'bodyweight-plus';
  }

  // Check for resistance bands (future feature)
  if (equipment.includes('Resistance Band')) {
    return 'resistance-band';
  }

  // Check for cable machines
  if (equipment.includes('Cable')) {
    return 'cable';
  }

  // Check for weight stack machines
  if (equipment.includes('Machine')) {
    return 'machine';
  }

  // Check for free weights
  if (
    equipment.includes('Barbell') ||
    equipment.includes('Dumbbell') ||
    equipment.includes('Kettlebell')
  ) {
    return 'free-weight';
  }

  // Default to bodyweight if no specific equipment is identified
  return 'bodyweight';
}

// Get tooltip text based on weight input type
function getTooltipText(type: WeightInputType, exerciseName?: string): string {
  switch (type) {
    case 'bodyweight':
      return `${exerciseName || 'This exercise'} uses only your body weight. No additional weight needed.`;
    case 'bodyweight-plus':
      return `${exerciseName || 'This exercise'} uses your body weight. You can add weight (e.g., weight belt, vest) to increase difficulty.`;
    case 'free-weight':
      return `Enter the weight used for ${exerciseName || 'this exercise'} (in lbs or kg).`;
    case 'machine':
      return `Enter the weight stack setting for ${exerciseName || 'this exercise'}.`;
    case 'resistance-band':
      return `Select resistance band level for ${exerciseName || 'this exercise'}.`;
    case 'cable':
      return `Enter the cable weight setting for ${exerciseName || 'this exercise'}.`;
    default:
      return `Enter weight for ${exerciseName || 'this exercise'}.`;
  }
}

// Get display text for bodyweight exercises
function getBodyweightDisplayText(
  type: WeightInputType,
  weight: number | null
): string {
  if (type === 'bodyweight') {
    return 'Bodyweight';
  }

  if (type === 'bodyweight-plus') {
    if (weight === null || weight === 0) {
      return 'Bodyweight';
    }
    return `Bodyweight + ${weight} lbs`;
  }

  return '';
}

export const DynamicWeightInput = ({
  value,
  onChange,
  exerciseEquipment,
  exerciseName,
  className = '',
  placeholder = '0',
  disabled = false,
}: WeightInputProps): React.ReactElement => {
  const [showBodyweightPlus, setShowBodyweightPlus] = useState(false);

  const weightInputType = getWeightInputType(exerciseEquipment);
  const tooltipText = getTooltipText(weightInputType, exerciseName);

  // For pure bodyweight exercises, show disabled input with tooltip
  if (weightInputType === 'bodyweight') {
    return (
      <Tooltip content={tooltipText}>
        <Input
          type="text"
          value="Bodyweight"
          disabled
          className={`h-8 text-center bg-gray-50 text-gray-600 cursor-help ${className}`}
        />
      </Tooltip>
    );
  }

  // For bodyweight + added weight exercises
  if (weightInputType === 'bodyweight-plus') {
    const displayText = getBodyweightDisplayText(weightInputType, value);

    return (
      <div className="flex items-center gap-1">
        {showBodyweightPlus ? (
          <>
            <Input
              type="number"
              placeholder="0"
              value={value || ''}
              onChange={e => {
                const newValue = e.target.value
                  ? ((): number | null => {
                      const parsed = parseFloat(e.target.value);
                      return isNaN(parsed) ? null : parsed;
                    })()
                  : null;
                onChange(newValue);
              }}
              className={`h-8 text-center ${className}`}
              min="0"
              step="0.5"
              disabled={disabled}
            />
            <span className="text-xs text-gray-500">lbs</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowBodyweightPlus(false)}
              className="h-6 px-1 text-xs"
            >
              Hide
            </Button>
          </>
        ) : (
          <>
            <Tooltip content={tooltipText}>
              <Input
                type="text"
                value={displayText}
                disabled
                className={`h-8 text-center bg-gray-50 text-gray-600 cursor-help ${className}`}
              />
            </Tooltip>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowBodyweightPlus(true)}
              className="h-6 px-1 text-xs"
            >
              +
            </Button>
          </>
        )}
      </div>
    );
  }

  // For resistance bands (future feature)
  if (weightInputType === 'resistance-band') {
    return (
      <Tooltip content={tooltipText}>
        <Input
          type="text"
          placeholder="Select band"
          value={value ? `Band ${value}` : ''}
          onChange={e => {
            // Extract number from input (e.g., "Band 3" -> 3)
            const inputValue = e.target.value;
            if (!inputValue) {
              onChange(null);
              return;
            }

            // Remove "Band " prefix and parse the remaining number
            const numberMatch = inputValue.replace(/^Band\s*/i, '');
            const bandLevel = numberMatch ? parseInt(numberMatch, 10) : null;

            // Only update if we got a valid number
            if (bandLevel !== null && !isNaN(bandLevel)) {
              onChange(bandLevel);
            }
          }}
          className={`h-8 text-center cursor-help ${className}`}
          disabled={disabled}
        />
      </Tooltip>
    );
  }

  // Default weight input for free weights, machines, cables
  return (
    <Tooltip content={tooltipText}>
      <Input
        type="number"
        placeholder={placeholder}
        value={value || ''}
        onChange={e => {
          const newValue = e.target.value
            ? ((): number | null => {
                const parsed = parseFloat(e.target.value);
                return isNaN(parsed) ? null : parsed;
              })()
            : null;
          onChange(newValue);
        }}
        className={`h-8 text-center cursor-help ${className}`}
        min="0"
        step="0.5"
        disabled={disabled}
      />
    </Tooltip>
  );
};
