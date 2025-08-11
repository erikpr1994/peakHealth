'use client';

import { useState, useEffect } from 'react';
import {
  TrailRunningWorkoutData,
  TrailRunningSection,
  TrailRunningInterval,
  IntensityTarget,
} from '../types';
import {
  calculateTotals,
  getDefaultIntensityTarget,
} from '../utils/trailRunningUtils';

interface UseTrailRunningWorkoutProps {
  initialData?: TrailRunningWorkoutData;
  mode: 'create' | 'edit';
}

export const useTrailRunningWorkout = ({
  initialData,
  mode,
}: UseTrailRunningWorkoutProps): {
  workoutData: TrailRunningWorkoutData;
  setWorkoutData: React.Dispatch<React.SetStateAction<TrailRunningWorkoutData>>;
  editingSection: TrailRunningSection | null;
  currentSection: Partial<TrailRunningSection>;
  setCurrentSection: React.Dispatch<
    React.SetStateAction<Partial<TrailRunningSection>>
  >;
  repeatIntervals: Partial<TrailRunningInterval>[];
  setRepeatIntervals: React.Dispatch<
    React.SetStateAction<Partial<TrailRunningInterval>[]>
  >;
  addSection: () => void;
  removeSection: (id: string) => void;
  editSection: (section: TrailRunningSection) => void;
  cancelEdit: () => void;
  addRepeatInterval: () => void;
  removeRepeatInterval: (index: number) => void;
  updateRepeatInterval: (
    index: number,
    field: string,
    value: string | number | boolean | IntensityTarget
  ) => void;
  canSave: boolean;
} => {
  const [workoutData, setWorkoutData] = useState<TrailRunningWorkoutData>({
    id: initialData?.id || `trail-running-${Date.now()}`,
    name: initialData?.name || '',
    description: initialData?.description || '',
    type: 'trail-running',
    difficulty: initialData?.difficulty || 'intermediate',
    estimatedDuration: initialData?.estimatedDuration || 0,
    targetDistance: initialData?.targetDistance || 0,
    elevationGain: initialData?.elevationGain || 0,
    sections: initialData?.sections || [],
  });

  const [editingSection, setEditingSection] =
    useState<TrailRunningSection | null>(null);
  const [currentSection, setCurrentSection] = useState<
    Partial<TrailRunningSection>
  >({
    id: '',
    name: '',
    type: 'run',
    distance: undefined,
    duration: undefined,
    intensityTarget: getDefaultIntensityTarget('run'),
    elevationChange: undefined,
    isRepeated: false,
    repeatCount: 1,
    repeatSections: [],
  });

  const [repeatIntervals, setRepeatIntervals] = useState<
    Partial<TrailRunningInterval>[]
  >([
    {
      id: `interval-${Date.now()}`,
      name: 'Run',
      type: 'run',
      distance: 1,
      duration: 5,
      intensityTarget: getDefaultIntensityTarget('run'),
      elevationChange: 0,
    },
  ]);

  // Update totals when sections change
  useEffect(() => {
    const totals = calculateTotals(workoutData.sections);
    setWorkoutData(prev => ({
      ...prev,
      targetDistance: totals.distance,
      estimatedDuration: totals.duration,
      elevationGain: totals.elevation,
    }));
  }, [workoutData.sections]);

  const addSection = (): void => {
    if (!currentSection.name) return;

    const newSection: TrailRunningSection = {
      id: editingSection?.id || `section-${Date.now()}`,
      name: currentSection.name,
      type: currentSection.type as TrailRunningSection['type'],
      distance: currentSection.distance,
      duration: currentSection.duration,
      intensityTarget: currentSection.intensityTarget,
      elevationChange: currentSection.elevationChange,
      isRepeated: currentSection.isRepeated,
      repeatCount: currentSection.repeatCount,
      repeatSections: currentSection.isRepeated
        ? (repeatIntervals as TrailRunningInterval[])
        : undefined,
    };

    if (editingSection) {
      // Update existing section
      setWorkoutData(prev => ({
        ...prev,
        sections: prev.sections.map(section =>
          section.id === editingSection.id ? newSection : section
        ),
      }));
      setEditingSection(null);
    } else {
      // Add new section
      setWorkoutData(prev => ({
        ...prev,
        sections: [...prev.sections, newSection],
      }));
    }

    // Reset form
    setCurrentSection({
      id: '',
      name: '',
      type: 'run',
      distance: undefined,
      duration: undefined,
      intensityTarget: getDefaultIntensityTarget('run'),
      elevationChange: undefined,
      isRepeated: false,
      repeatCount: 1,
      repeatSections: [],
    });
    setRepeatIntervals([
      {
        id: `interval-${Date.now()}`,
        name: 'Run',
        type: 'run',
        distance: 1,
        duration: 5,
        intensityTarget: getDefaultIntensityTarget('run'),
        elevationChange: 0,
      },
    ]);
  };

  const removeSection = (id: string): void => {
    setWorkoutData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== id),
    }));
  };

  const editSection = (section: TrailRunningSection): void => {
    setEditingSection(section);
    setCurrentSection({
      id: section.id,
      name: section.name,
      type: section.type,
      distance: section.distance,
      duration: section.duration,
      intensityTarget: section.intensityTarget,
      elevationChange: section.elevationChange,
      isRepeated: section.isRepeated,
      repeatCount: section.repeatCount,
      repeatSections: section.repeatSections,
    });
    if (section.repeatSections) {
      setRepeatIntervals(section.repeatSections);
    }
  };

  const cancelEdit = (): void => {
    setEditingSection(null);
    setCurrentSection({
      id: '',
      name: '',
      type: 'run',
      distance: undefined,
      duration: undefined,
      intensityTarget: getDefaultIntensityTarget('run'),
      elevationChange: undefined,
      isRepeated: false,
      repeatCount: 1,
      repeatSections: [],
    });
    setRepeatIntervals([
      {
        id: `interval-${Date.now()}`,
        name: 'Run',
        type: 'run',
        distance: 1,
        duration: 5,
        intensityTarget: getDefaultIntensityTarget('run'),
        elevationChange: 0,
      },
    ]);
  };

  const addRepeatInterval = (): void => {
    const newInterval: Partial<TrailRunningInterval> = {
      id: `interval-${Date.now()}`,
      name: 'Run',
      type: 'run',
      distance: 1,
      duration: 5,
      intensityTarget: getDefaultIntensityTarget('run'),
      elevationChange: 0,
    };
    setRepeatIntervals(prev => [...prev, newInterval]);
  };

  const removeRepeatInterval = (index: number): void => {
    setRepeatIntervals(prev => prev.filter((_, i) => i !== index));
  };

  const updateRepeatInterval = (
    index: number,
    field: string,
    value: string | number | boolean | IntensityTarget
  ): void => {
    setRepeatIntervals(prev =>
      prev.map((interval, i) =>
        i === index ? { ...interval, [field]: value } : interval
      )
    );
  };

  const canSave = Boolean(
    workoutData.name.trim() && workoutData.sections.length > 0
  );

  return {
    workoutData,
    setWorkoutData,
    editingSection,
    currentSection,
    setCurrentSection,
    repeatIntervals,
    setRepeatIntervals,
    addSection,
    removeSection,
    editSection,
    cancelEdit,
    addRepeatInterval,
    removeRepeatInterval,
    updateRepeatInterval,
    canSave,
  };
};
