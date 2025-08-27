import { Plus, Target, Flame, X as Failure, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip } from '@peakhealth/ui';
import { DynamicWeightInput } from '@/features/routines/components/DynamicWeightInput';

export type SetType = 'warmup' | 'normal' | 'failure' | 'dropset';
export type RepType = 'fixed' | 'range';
export type ProgressionMethod =
  | 'linear'
  | 'dual'
  | 'inverse-pyramid'
  | 'myo-reps'
  | 'widowmaker'
  | 'amrap';

export interface WorkoutSet {
  id: string;
  setNumber: number;
  setType: SetType;
  repType: RepType;
  reps: number | null;
  repsMin?: number;
  repsMax?: number;
  weight: number | null;
  rpe: number | null;
  notes: string;
  // Unilateral exercise support
  isUnilateral?: boolean;
  unilateralSide?: 'left' | 'right' | 'both';
}

interface SetManagementProps {
  sets: WorkoutSet[];
  onSetsChange: (sets: WorkoutSet[]) => void;
  onNotesClick: (setId: string) => void;
  onAddApproachSets: () => void;
  progressionMethod?: ProgressionMethod;
  exerciseEquipment?: string[];
  exerciseName?: string;
  // Unilateral exercise support
  isUnilateral?: boolean;
  unilateralMode?: 'alternating' | 'sequential' | 'simultaneous';
  hideApproachSets?: boolean;
  sectionType?: 'warmup' | 'basic' | 'cooldown' | 'emom' | 'tabata' | 'amrap';
}

// Configuration for each progression method
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
      description: 'Fixed 3x5 structure',
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

const SetManagement = ({
  sets,
  onSetsChange,
  onNotesClick,
  onAddApproachSets,
  progressionMethod,
  exerciseEquipment = [],
  exerciseName,
  isUnilateral = false,
  unilateralMode,
  hideApproachSets,
  sectionType,
}: SetManagementProps): React.ReactElement => {
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const config = getProgressionConfig(progressionMethod);

  // Check if approach sets are already present
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

  // Get hover explanation for Add Approach Sets button
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

  const addSet = (): void => {
    const newSet: WorkoutSet = {
      id: Date.now().toString(),
      setNumber: sets.length + 1,
      setType: 'normal',
      repType: 'fixed',
      reps: null,
      repsMin: undefined,
      repsMax: undefined,
      weight: null,
      rpe: null,
      notes: '',
      isUnilateral,
      unilateralSide:
        isUnilateral && unilateralMode === 'sequential'
          ? sets.length % 2 === 0
            ? 'left'
            : 'right'
          : isUnilateral
            ? 'both'
            : undefined,
    };
    onSetsChange([...sets, newSet]);
  };

  const removeSet = (setId: string): void => {
    const updatedSets = sets
      .filter(set => set.id !== setId)
      .map((set, index) => ({ ...set, setNumber: index + 1 }));
    onSetsChange(updatedSets);
  };

  const updateSet = (setId: string, updates: Partial<WorkoutSet>): void => {
    const updatedSets = sets.map(set => {
      if (set.id === setId) {
        const updatedSet = { ...set, ...updates };

        // Handle set type changes
        if (updates.setType === 'failure') {
          // For failure sets, force fixed reps and clear rep values
          updatedSet.repType = 'fixed';
          updatedSet.reps = null;
          updatedSet.repsMin = undefined;
          updatedSet.repsMax = undefined;
        }

        // Clean up data when switching rep types (only for non-failure sets)
        if (updates.repType && updatedSet.setType !== 'failure') {
          if (updates.repType === 'fixed') {
            updatedSet.repsMin = undefined;
            updatedSet.repsMax = undefined;
          } else if (updates.repType === 'range') {
            updatedSet.reps = null;
          }
        }

        return updatedSet;
      }
      return set;
    });
    onSetsChange(updatedSets);
  };

  // Get unilateral side display
  const getUnilateralSideDisplay = (set: WorkoutSet): string => {
    if (!set.isUnilateral || !set.unilateralSide) return '';

    switch (set.unilateralSide) {
      case 'left':
        return ' (L)';
      case 'right':
        return ' (R)';
      case 'both':
        return ''; // Don't show anything for 'both' sides
      default:
        return '';
    }
  };

  // Calculate the display number/letter for each set
  const getSetDisplay = (set: WorkoutSet, index: number): string => {
    let display = '';
    if (set.setType === 'normal') {
      // Count how many normal sets come before this one
      const normalSetsBefore = sets
        .slice(0, index)
        .filter(s => s.setType === 'normal').length;
      display = (normalSetsBefore + 1).toString();
    } else {
      // Return letter for special sets
      switch (set.setType) {
        case 'warmup':
          display = 'W';
          break;
        case 'failure':
          display = 'F';
          break;
        case 'dropset':
          display = 'D';
          break;
        default:
          display = (index + 1).toString();
      }
    }

    // Add unilateral side indicator
    display += getUnilateralSideDisplay(set);

    return display;
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

  const handleSetTypeChange = (setId: string, newType: SetType): void => {
    updateSet(setId, { setType: newType });
  };

  const setTypeOptions = [
    { value: 'normal', label: 'Normal Set', icon: null },
    {
      value: 'warmup',
      label: 'Warm-up Set',
      icon: <Target className="w-4 h-4" />,
    },
    {
      value: 'failure',
      label: 'Failure Set',
      icon: <Flame className="w-4 h-4" />,
    },
    { value: 'dropset', label: 'Drop Set', icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-4">
      {/* Add Set Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {progressionMethod && config && (
            <Badge variant="outline" className="text-xs">
              {config.description}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Hide approach sets button for EMOM and Tabata */}
          {!hideApproachSets && (
            <Tooltip content={getAddApproachSetsHoverText()}>
              <Button
                onClick={onAddApproachSets}
                size="sm"
                variant={hasApproachSets ? 'secondary' : 'outline'}
                disabled={isAddApproachSetsDisabled}
                className={
                  isAddApproachSetsDisabled
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }
              >
                <Target className="w-4 h-4 mr-1" />
                {hasApproachSets ? 'Approach Sets Added' : 'Add Approach Sets'}
              </Button>
            </Tooltip>
          )}
          <Tooltip content="Add a new set to the workout">
            <Button onClick={addSet} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add Set
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Sets Header */}
      <div className="grid grid-cols-8 gap-2 text-sm font-medium text-gray-600 border-b border-gray-200 pb-2">
        <div className="col-span-1">SET</div>
        <div className="col-span-1">REPS</div>
        <div className="col-span-2">REP VALUES</div>
        <div className="col-span-1">WEIGHT (KG)</div>
        <div className="col-span-1">RPE</div>
        <div className="col-span-1">NOTES</div>
        <div className="col-span-1" />
      </div>

      {/* Sets List */}
      <div className="space-y-2">
        {sets.map((set, index) => (
          <div
            key={set.id}
            className="grid grid-cols-8 gap-2 items-center py-2"
          >
            {/* Set Number/Type Selector */}
            <div className="col-span-1">
              <Popover
                open={openPopoverId === set.id}
                onOpenChange={open => setOpenPopoverId(open ? set.id : null)}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-10 h-8 p-0 relative flex items-center justify-center rounded text-sm font-medium hover:opacity-80 ${
                      set.setType !== 'normal'
                        ? getSetTypeColor(set.setType)
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <span>{getSetDisplay(set, index)}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2" align="start">
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-gray-700 mb-2">
                      Set Type
                    </div>
                    {setTypeOptions.map(option => (
                      <Button
                        key={option.value}
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleSetTypeChange(set.id, option.value as SetType)
                        }
                        className={`w-full justify-start h-8 ${
                          set.setType === option.value
                            ? 'bg-primary/10 text-primary'
                            : ''
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {option.icon}
                          <span className="text-xs">{option.label}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Rep Type Selector */}
            <div className="col-span-1">
              <Select
                value={set.repType || 'fixed'}
                onValueChange={(value: RepType) =>
                  updateSet(set.id, { repType: value })
                }
                disabled={set.setType === 'failure' || sectionType === 'tabata'}
              >
                <SelectTrigger
                  className={`w-full h-8 ${
                    set.setType === 'failure' || sectionType === 'tabata'
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="range">Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reps Input */}
            <div className="col-span-2">
              {set.setType === 'failure' ? (
                <div className="flex items-center justify-center h-8 text-xs text-red-600 font-medium bg-red-50 border border-red-200 rounded">
                  To failure
                </div>
              ) : sectionType === 'tabata' ? (
                <div className="flex items-center justify-center h-8 text-xs text-gray-600 font-medium bg-gray-50 border border-gray-200 rounded">
                  Time-based
                </div>
              ) : set.repType === 'range' ? (
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={set.repsMin || ''}
                    onChange={e =>
                      updateSet(set.id, {
                        repsMin: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    className="h-8 text-center"
                    min="0"
                  />
                  <span className="text-gray-400 text-xs">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={set.repsMax || ''}
                    onChange={e =>
                      updateSet(set.id, {
                        repsMax: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    className="h-8 text-center"
                    min="0"
                  />
                </div>
              ) : (
                <Input
                  type="number"
                  placeholder="10"
                  value={set.reps || ''}
                  onChange={e =>
                    updateSet(set.id, {
                      reps: e.target.value ? parseInt(e.target.value) : null,
                    })
                  }
                  className="h-8 text-center"
                  min="0"
                />
              )}
            </div>

            {/* Weight Input */}
            <div className="col-span-1">
              <DynamicWeightInput
                value={set.weight}
                onChange={weight => updateSet(set.id, { weight })}
                exerciseEquipment={exerciseEquipment}
                exerciseName={exerciseName}
                className="h-8"
                placeholder="0"
              />
            </div>

            {/* RPE Input */}
            <div className="col-span-1">
              <Input
                type="number"
                placeholder="8"
                value={set.rpe || ''}
                onChange={e =>
                  updateSet(set.id, {
                    rpe: e.target.value ? parseInt(e.target.value) : null,
                  })
                }
                className="h-8 text-center"
                min="1"
                max="10"
              />
            </div>

            {/* Notes */}
            <div className="col-span-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNotesClick(set.id)}
                className={`h-8 w-full p-2 flex items-center justify-center text-xs ${
                  set.notes
                    ? 'text-blue-600 bg-blue-50 border border-blue-200'
                    : 'text-gray-500 border border-dashed border-gray-300 hover:border-gray-400'
                }`}
                title={
                  set.notes
                    ? `Edit set notes: ${set.notes.substring(0, 50)}${
                        set.notes.length > 50 ? '...' : ''
                      }`
                    : 'Add notes for this set'
                }
              >
                {set.notes ? (
                  <div className="flex items-center gap-1 w-full">
                    <span className="text-blue-600">📝</span>
                    <span className="truncate text-left">
                      {set.notes.length > 20
                        ? `${set.notes.substring(0, 20)}...`
                        : set.notes}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span>📝</span>
                    <span>Notes</span>
                  </div>
                )}
              </Button>
            </div>

            {/* Delete Action */}
            <div className="col-span-1 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSet(set.id)}
                className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                title="Delete set"
              >
                <Failure className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {sets.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="mb-4">
            <Target className="w-12 h-12 mx-auto text-gray-300" />
          </div>
          <p>No sets added yet</p>
          <p className="text-sm">Click &quot;Add Set&quot; to get started</p>
        </div>
      )}
    </div>
  );
};

export default SetManagement;
