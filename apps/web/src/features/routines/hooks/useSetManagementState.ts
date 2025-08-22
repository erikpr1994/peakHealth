import { useState, useEffect } from 'react';
import { ProgressionMethod, WorkoutSet } from '../types/exercise';
import { SetType, RepType } from '../components/SetManagement';

/**
 * Configuration for each progression method
 */
const getProgressionConfig = (
  method: ProgressionMethod | undefined
): {
  allowRepTypeChange: boolean;
  allowSetTypeChange: boolean;
  allowAddRemoveSets: boolean;
  allowRepsChange: boolean;
  allowRpeChange: boolean;
  lockMessage: string;
  description: string;
} | null => {
  if (!method) return null;

  const configs = {
    linear: {
      allowRepTypeChange: true,
      allowSetTypeChange: true,
      allowAddRemoveSets: true,
      allowRepsChange: true,
      allowRpeChange: true,
      lockMessage: 'Linear progression uses fixed reps and structure',
      description: 'Fixed reps',
    },
    dual: {
      allowRepTypeChange: true,
      allowSetTypeChange: true,
      allowAddRemoveSets: true,
      allowRepsChange: true,
      allowRpeChange: true,
      lockMessage: 'Dual progression uses rep ranges',
      description: 'Rep ranges with progression',
    },
    'inverse-pyramid': {
      allowRepTypeChange: true,
      allowSetTypeChange: true,
      allowAddRemoveSets: true,
      allowRepsChange: true,
      allowRpeChange: true,
      lockMessage: 'Inverse pyramid structure is predefined',
      description: 'Decreasing weight, increasing reps',
    },
    'myo-reps': {
      allowRepTypeChange: true,
      allowSetTypeChange: true,
      allowAddRemoveSets: true,
      allowRepsChange: true,
      allowRpeChange: true,
      lockMessage: 'Myo-reps structure is predefined',
      description: 'Activation set + mini-sets',
    },
    widowmaker: {
      allowRepTypeChange: true,
      allowSetTypeChange: true,
      allowAddRemoveSets: true,
      allowRepsChange: true,
      allowRpeChange: true,
      lockMessage: 'Widowmaker structure is predefined',
      description: 'Warmup set + 20-rep failure set',
    },
    amrap: {
      allowRepTypeChange: true,
      allowSetTypeChange: true,
      allowAddRemoveSets: true,
      allowRepsChange: true,
      allowRpeChange: true,
      lockMessage: 'AMRAP structure is predefined',
      description: 'Regular sets + final AMRAP',
    },
  };

  return configs[method];
};

/**
 * Hook to manage all state for set management
 * Extracted from SetManagement component to reduce complexity
 */
export const useSetManagementState = (
  sets: WorkoutSet[],
  onSetsChange: (sets: WorkoutSet[]) => void,
  progressionMethod?: ProgressionMethod
): {
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
  initialized: boolean;
  config: {
    allowRepTypeChange: boolean;
    allowSetTypeChange: boolean;
    allowAddRemoveSets: boolean;
    allowRepsChange: boolean;
    allowRpeChange: boolean;
    lockMessage: string;
    description: string;
  } | null;
  hasApproachSets: boolean;
  isAddApproachSetsDisabled: boolean;
  getAddApproachSetsHoverText: () => string;
  getSetDisplay: (set: WorkoutSet, index: number) => string;
  getSetTypeColor: (type: SetType) => string;
} => {
  // UI State
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Configuration State
  const config = getProgressionConfig(progressionMethod);

  // Computed State
  const hasApproachSets = sets.some(
    set =>
      set.setType === 'warmup' &&
      set.notes &&
      set.notes.includes('Approach set')
  );

  // Determine if Add Approach Sets button should be disabled
  // Allow weight of 0 for bodyweight exercises, only disable if weight is null/undefined
  const isAddApproachSetsDisabled =
    sets.length === 0 ||
    sets[0]?.weight === null ||
    sets[0]?.weight === undefined ||
    hasApproachSets;

  // Utility Functions
  const getAddApproachSetsHoverText = (): string => {
    if (sets.length === 0) {
      return 'Add at least one set before adding approach sets';
    }
    if (sets[0]?.weight === null || sets[0]?.weight === undefined) {
      return 'First set must have a weight before adding approach sets';
    }
    if (hasApproachSets) {
      return 'Approach sets already added. Delete them to add new ones.';
    }
    return 'Add approach sets for this exercise';
  };

  const getSetDisplay = (set: WorkoutSet, index: number): string => {
    if (set.setType === 'normal') {
      // Count how many normal sets come before this one
      const normalSetsBefore = sets
        .slice(0, index)
        .filter(s => s.setType === 'normal').length;
      return (normalSetsBefore + 1).toString();
    } else {
      // Return letter for special sets
      switch (set.setType) {
        case 'warmup':
          return 'W';
        case 'failure':
          return 'F';
        case 'dropset':
          return 'D';
        default:
          return (index + 1).toString();
      }
    }
  };

  const getSetTypeColor = (type: SetType): string => {
    const colors = {
      warmup: 'bg-blue-100 text-blue-800 border-blue-200',
      normal: 'bg-green-100 text-green-800 border-green-200',
      failure: 'bg-red-100 text-red-800 border-red-200',
      dropset: 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Initialize repType for any sets that don't have it defined
  useEffect(() => {
    if (!initialized) {
      const setsNeedingInitialization = sets.filter(set => !set.repType);
      if (setsNeedingInitialization.length > 0) {
        const updatedSets = sets.map(set => ({
          ...set,
          repType: set.repType || ('fixed' as RepType),
        }));
        onSetsChange(updatedSets);
      }
      setInitialized(true);
    }
  }, [sets, onSetsChange, initialized]);

  return {
    // UI State
    openPopoverId,
    setOpenPopoverId,
    initialized,

    // Configuration State
    config,

    // Computed State
    hasApproachSets,
    isAddApproachSetsDisabled,

    // Utility Functions
    getAddApproachSetsHoverText,
    getSetDisplay,
    getSetTypeColor,
  };
};
