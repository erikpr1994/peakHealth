import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useSetManagementState } from './useSetManagementState';
import { WorkoutSet } from '../types/exercise';
import { SetType } from '../components/SetManagement';

describe('useSetManagementState', () => {
  const mockSets: WorkoutSet[] = [
    {
      id: '1',
      setNumber: 1,
      setType: 'normal',
      repType: 'fixed',
      reps: 10,
      weight: 100,
      rpe: 8,
      notes: '',
    },
    {
      id: '2',
      setNumber: 2,
      setType: 'warmup',
      repType: 'fixed',
      reps: 5,
      weight: 50,
      rpe: 6,
      notes: 'Approach set',
    },
  ];

  const mockOnSetsChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() =>
        useSetManagementState(mockSets, mockOnSetsChange)
      );

      expect(result.current.openPopoverId).toBe(null);
      expect(result.current.initialized).toBe(true); // Gets set to true by useEffect
      expect(result.current.config).toBe(null);
      expect(result.current.hasApproachSets).toBe(true);
      expect(result.current.isAddApproachSetsDisabled).toBe(true); // Disabled because approach sets exist
    });

    it('should initialize with progression method config', () => {
      const { result } = renderHook(() =>
        useSetManagementState(mockSets, mockOnSetsChange, 'linear')
      );

      expect(result.current.config).toEqual({
        allowRepTypeChange: true,
        allowSetTypeChange: true,
        allowAddRemoveSets: true,
        allowRepsChange: true,
        allowRpeChange: true,
        lockMessage: 'Linear progression uses fixed reps and structure',
        description: 'Fixed 3x5 structure',
      });
    });
  });

  describe('UI state management', () => {
    it('should manage openPopoverId state', () => {
      const { result } = renderHook(() =>
        useSetManagementState(mockSets, mockOnSetsChange)
      );

      expect(result.current.openPopoverId).toBe(null);

      act(() => {
        result.current.setOpenPopoverId('test-id');
      });

      expect(result.current.openPopoverId).toBe('test-id');

      act(() => {
        result.current.setOpenPopoverId(null);
      });

      expect(result.current.openPopoverId).toBe(null);
    });
  });

  describe('computed state', () => {
    it('should detect approach sets correctly', () => {
      const setsWithApproach: WorkoutSet[] = [
        {
          id: '1',
          setNumber: 1,
          setType: 'warmup',
          repType: 'fixed',
          reps: 5,
          weight: 50,
          rpe: 6,
          notes: 'Approach set for warmup',
        },
      ];

      const { result } = renderHook(() =>
        useSetManagementState(setsWithApproach, mockOnSetsChange)
      );

      expect(result.current.hasApproachSets).toBe(true);
    });

    it('should not detect approach sets when not present', () => {
      const setsWithoutApproach: WorkoutSet[] = [
        {
          id: '1',
          setNumber: 1,
          setType: 'normal',
          repType: 'fixed',
          reps: 10,
          weight: 100,
          rpe: 8,
          notes: 'Regular set',
        },
      ];

      const { result } = renderHook(() =>
        useSetManagementState(setsWithoutApproach, mockOnSetsChange)
      );

      expect(result.current.hasApproachSets).toBe(false);
    });

    it('should disable approach sets button when no sets exist', () => {
      const { result } = renderHook(() =>
        useSetManagementState([], mockOnSetsChange)
      );

      expect(result.current.isAddApproachSetsDisabled).toBe(true);
    });

    it('should disable approach sets button when first set has no weight', () => {
      const setsWithoutWeight: WorkoutSet[] = [
        {
          id: '1',
          setNumber: 1,
          setType: 'normal',
          repType: 'fixed',
          reps: 10,
          weight: null,
          rpe: 8,
          notes: '',
        },
      ];

      const { result } = renderHook(() =>
        useSetManagementState(setsWithoutWeight, mockOnSetsChange)
      );

      expect(result.current.isAddApproachSetsDisabled).toBe(true);
    });

    it('should disable approach sets button when approach sets already exist', () => {
      const { result } = renderHook(() =>
        useSetManagementState(mockSets, mockOnSetsChange)
      );

      expect(result.current.hasApproachSets).toBe(true);
      expect(result.current.isAddApproachSetsDisabled).toBe(true); // Disabled because approach sets already exist
    });
  });

  describe('utility functions', () => {
    describe('getAddApproachSetsHoverText', () => {
      it('should return correct text when no sets exist', () => {
        const { result } = renderHook(() =>
          useSetManagementState([], mockOnSetsChange)
        );

        expect(result.current.getAddApproachSetsHoverText()).toBe(
          'Add at least one set before adding approach sets'
        );
      });

      it('should return correct text when first set has no weight', () => {
        const setsWithoutWeight: WorkoutSet[] = [
          {
            id: '1',
            setNumber: 1,
            setType: 'normal',
            repType: 'fixed',
            reps: 10,
            weight: null,
            rpe: 8,
            notes: '',
          },
        ];

        const { result } = renderHook(() =>
          useSetManagementState(setsWithoutWeight, mockOnSetsChange)
        );

        expect(result.current.getAddApproachSetsHoverText()).toBe(
          'First set must have a weight before adding approach sets'
        );
      });

      it('should return correct text when approach sets already exist', () => {
        const { result } = renderHook(() =>
          useSetManagementState(mockSets, mockOnSetsChange)
        );

        expect(result.current.getAddApproachSetsHoverText()).toBe(
          'Approach sets already added. Delete them to add new ones.'
        );
      });

      it('should return default text when conditions are met', () => {
        const setsReadyForApproach: WorkoutSet[] = [
          {
            id: '1',
            setNumber: 1,
            setType: 'normal',
            repType: 'fixed',
            reps: 10,
            weight: 100,
            rpe: 8,
            notes: '',
          },
        ];

        const { result } = renderHook(() =>
          useSetManagementState(setsReadyForApproach, mockOnSetsChange)
        );

        expect(result.current.getAddApproachSetsHoverText()).toBe(
          'Add approach sets for this exercise'
        );
      });
    });

    describe('getSetDisplay', () => {
      it('should return correct display for normal sets', () => {
        const { result } = renderHook(() =>
          useSetManagementState(mockSets, mockOnSetsChange)
        );

        const normalSet = mockSets[0];
        expect(result.current.getSetDisplay(normalSet, 0)).toBe('1');
      });

      it('should return correct display for warmup sets', () => {
        const { result } = renderHook(() =>
          useSetManagementState(mockSets, mockOnSetsChange)
        );

        const warmupSet = mockSets[1];
        expect(result.current.getSetDisplay(warmupSet, 1)).toBe('W');
      });

      it('should return correct display for failure sets', () => {
        const { result } = renderHook(() =>
          useSetManagementState(mockSets, mockOnSetsChange)
        );

        const failureSet: WorkoutSet = {
          id: '3',
          setNumber: 3,
          setType: 'failure',
          repType: 'fixed',
          reps: null,
          weight: 120,
          rpe: null,
          notes: '',
        };

        expect(result.current.getSetDisplay(failureSet, 2)).toBe('F');
      });

      it('should return correct display for dropset', () => {
        const { result } = renderHook(() =>
          useSetManagementState(mockSets, mockOnSetsChange)
        );

        const dropset: WorkoutSet = {
          id: '4',
          setNumber: 4,
          setType: 'dropset',
          repType: 'fixed',
          reps: 8,
          weight: 80,
          rpe: 9,
          notes: '',
        };

        expect(result.current.getSetDisplay(dropset, 3)).toBe('D');
      });

      it('should count normal sets correctly', () => {
        const mixedSets: WorkoutSet[] = [
          {
            id: '1',
            setNumber: 1,
            setType: 'warmup',
            repType: 'fixed',
            reps: 5,
            weight: 50,
            rpe: 6,
            notes: '',
          },
          {
            id: '2',
            setNumber: 2,
            setType: 'normal',
            repType: 'fixed',
            reps: 10,
            weight: 100,
            rpe: 8,
            notes: '',
          },
          {
            id: '3',
            setNumber: 3,
            setType: 'normal',
            repType: 'fixed',
            reps: 10,
            weight: 100,
            rpe: 8,
            notes: '',
          },
        ];

        const { result } = renderHook(() =>
          useSetManagementState(mixedSets, mockOnSetsChange)
        );

        expect(result.current.getSetDisplay(mixedSets[1], 1)).toBe('1');
        expect(result.current.getSetDisplay(mixedSets[2], 2)).toBe('2');
      });
    });

    describe('getSetTypeColor', () => {
      it('should return correct colors for each set type', () => {
        const { result } = renderHook(() =>
          useSetManagementState(mockSets, mockOnSetsChange)
        );

        expect(result.current.getSetTypeColor('warmup')).toBe(
          'bg-blue-100 text-blue-800 border-blue-200'
        );
        expect(result.current.getSetTypeColor('normal')).toBe(
          'bg-green-100 text-green-800 border-green-200'
        );
        expect(result.current.getSetTypeColor('failure')).toBe(
          'bg-red-100 text-red-800 border-red-200'
        );
        expect(result.current.getSetTypeColor('dropset')).toBe(
          'bg-purple-100 text-purple-800 border-purple-200'
        );
      });

      it('should return default color for unknown set type', () => {
        const { result } = renderHook(() =>
          useSetManagementState(mockSets, mockOnSetsChange)
        );

        expect(result.current.getSetTypeColor('unknown' as SetType)).toBe(
          'bg-gray-100 text-gray-800 border-gray-200'
        );
      });
    });
  });

  describe('progression method configuration', () => {
    it('should return correct config for linear progression', () => {
      const { result } = renderHook(() =>
        useSetManagementState(mockSets, mockOnSetsChange, 'linear')
      );

      expect(result.current.config).toEqual({
        allowRepTypeChange: true,
        allowSetTypeChange: true,
        allowAddRemoveSets: true,
        allowRepsChange: true,
        allowRpeChange: true,
        lockMessage: 'Linear progression uses fixed reps and structure',
        description: 'Fixed 3x5 structure',
      });
    });

    it('should return correct config for dual progression', () => {
      const { result } = renderHook(() =>
        useSetManagementState(mockSets, mockOnSetsChange, 'dual')
      );

      expect(result.current.config).toEqual({
        allowRepTypeChange: true,
        allowSetTypeChange: true,
        allowAddRemoveSets: true,
        allowRepsChange: true,
        allowRpeChange: true,
        lockMessage: 'Dual progression uses rep ranges',
        description: 'Rep ranges with progression',
      });
    });

    it('should return correct config for inverse-pyramid', () => {
      const { result } = renderHook(() =>
        useSetManagementState(mockSets, mockOnSetsChange, 'inverse-pyramid')
      );

      expect(result.current.config).toEqual({
        allowRepTypeChange: true,
        allowSetTypeChange: true,
        allowAddRemoveSets: true,
        allowRepsChange: true,
        allowRpeChange: true,
        lockMessage: 'Inverse pyramid structure is predefined',
        description: 'Decreasing weight, increasing reps',
      });
    });

    it('should return correct config for myo-reps', () => {
      const { result } = renderHook(() =>
        useSetManagementState(mockSets, mockOnSetsChange, 'myo-reps')
      );

      expect(result.current.config).toEqual({
        allowRepTypeChange: true,
        allowSetTypeChange: true,
        allowAddRemoveSets: true,
        allowRepsChange: true,
        allowRpeChange: true,
        lockMessage: 'Myo-reps structure is predefined',
        description: 'Activation set + mini-sets',
      });
    });

    it('should return correct config for widowmaker', () => {
      const { result } = renderHook(() =>
        useSetManagementState(mockSets, mockOnSetsChange, 'widowmaker')
      );

      expect(result.current.config).toEqual({
        allowRepTypeChange: true,
        allowSetTypeChange: true,
        allowAddRemoveSets: true,
        allowRepsChange: true,
        allowRpeChange: true,
        lockMessage: 'Widowmaker structure is predefined',
        description: 'Warmup set + 20-rep failure set',
      });
    });

    it('should return correct config for amrap', () => {
      const { result } = renderHook(() =>
        useSetManagementState(mockSets, mockOnSetsChange, 'amrap')
      );

      expect(result.current.config).toEqual({
        allowRepTypeChange: true,
        allowSetTypeChange: true,
        allowAddRemoveSets: true,
        allowRepsChange: true,
        allowRpeChange: true,
        lockMessage: 'AMRAP structure is predefined',
        description: 'Regular sets + final AMRAP',
      });
    });

    it('should return null for undefined progression method', () => {
      const { result } = renderHook(() =>
        useSetManagementState(mockSets, mockOnSetsChange, undefined)
      );

      expect(result.current.config).toBe(null);
    });
  });

  describe('initialization effect', () => {
    it('should initialize repType for sets without it', () => {
      const setsWithoutRepType = [
        {
          id: '1',
          setNumber: 1,
          setType: 'normal' as const,
          repType: undefined,
          reps: 10,
          weight: 100,
          rpe: 8,
          notes: '',
        },
      ] as any; // eslint-disable-line @typescript-eslint/no-explicit-any

      renderHook(() =>
        useSetManagementState(setsWithoutRepType, mockOnSetsChange)
      );

      expect(mockOnSetsChange).toHaveBeenCalledWith([
        {
          id: '1',
          setNumber: 1,
          setType: 'normal',
          repType: 'fixed',
          reps: 10,
          weight: 100,
          rpe: 8,
          notes: '',
        },
      ]);
    });

    it('should not call onSetsChange if all sets have repType', () => {
      renderHook(() => useSetManagementState(mockSets, mockOnSetsChange));

      expect(mockOnSetsChange).not.toHaveBeenCalled();
    });

    it('should only initialize once', () => {
      const setsWithoutRepType = [
        {
          id: '1',
          setNumber: 1,
          setType: 'normal' as const,
          repType: undefined,
          reps: 10,
          weight: 100,
          rpe: 8,
          notes: '',
        },
      ] as any; // eslint-disable-line @typescript-eslint/no-explicit-any

      const { rerender } = renderHook(() =>
        useSetManagementState(setsWithoutRepType, mockOnSetsChange)
      );

      // Clear the mock to check if it's called again
      vi.clearAllMocks();

      // Rerender with the same sets
      rerender();

      expect(mockOnSetsChange).not.toHaveBeenCalled();
    });
  });
});
