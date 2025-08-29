import { RoutineBuilderState } from '../types';
import {
  StrengthWorkoutSection,
  RunningWorkoutSection,
  Workout,
} from '@peakhealth/routines-types';

type AddSectionPayload = {
  workoutId: string;
  section: StrengthWorkoutSection | RunningWorkoutSection;
};

type RemoveSectionPayload = {
  workoutId: string;
  sectionId: string;
};

type UpdateSectionPayload = {
  workoutId: string;
  sectionId: string;
  updates: Partial<
    Omit<StrengthWorkoutSection | RunningWorkoutSection, '_id' | 'orderIndex'>
  >;
};

type ReorderSectionsPayload = {
  workoutId: string;
  sectionIds: string[];
};

export const addSection = (
  state: RoutineBuilderState,
  payload: AddSectionPayload
): RoutineBuilderState => {
  const { workoutId, section } = payload;

  const updatedWorkouts = state.workouts.map(workout => {
    if (workout._id !== workoutId) {
      return workout;
    }

    // Ensure the section has the correct orderIndex
    const updatedSection = {
      ...section,
      orderIndex: workout.sections.length,
    };

    return {
      ...workout,
      sections: [...workout.sections, updatedSection],
    } as Workout;
  });

  return {
    ...state,
    workouts: updatedWorkouts,
  };
};

export const removeSection = (
  state: RoutineBuilderState,
  payload: RemoveSectionPayload
): RoutineBuilderState => {
  const { workoutId, sectionId } = payload;

  const updatedWorkouts = state.workouts.map(workout => {
    if (workout._id !== workoutId) {
      return workout;
    }

    const filteredSections = workout.sections.filter(
      section => section._id !== sectionId
    );

    // Reorder the remaining sections
    const reorderedSections = filteredSections.map((section, index) => ({
      ...section,
      orderIndex: index,
    }));

    return {
      ...workout,
      sections: reorderedSections,
    } as Workout;
  });

  return {
    ...state,
    workouts: updatedWorkouts,
  };
};

export const updateSection = (
  state: RoutineBuilderState,
  payload: UpdateSectionPayload
): RoutineBuilderState => {
  const { workoutId, sectionId, updates } = payload;

  const updatedWorkouts = state.workouts.map(workout => {
    if (workout._id !== workoutId) {
      return workout;
    }

    const updatedSections = workout.sections.map(section =>
      section._id === sectionId
        ? ({ ...section, ...updates } as
            | StrengthWorkoutSection
            | RunningWorkoutSection)
        : section
    );

    return {
      ...workout,
      sections: updatedSections,
    } as Workout;
  });

  return {
    ...state,
    workouts: updatedWorkouts,
  };
};

export const reorderSections = (
  state: RoutineBuilderState,
  payload: ReorderSectionsPayload
): RoutineBuilderState => {
  const { workoutId, sectionIds } = payload;

  const updatedWorkouts = state.workouts.map(workout => {
    if (workout._id !== workoutId) {
      return workout;
    }

    // Create a map of section ID to section for quick lookup
    const sectionMap = new Map(
      workout.sections.map(section => [section._id, section])
    );

    // Reorder sections based on the provided order
    const reorderedSections = sectionIds
      .map((sectionId, index) => {
        const section = sectionMap.get(sectionId);
        if (!section) {
          return null;
        }
        return {
          ...section,
          orderIndex: index,
        };
      })
      .filter(
        (section): section is StrengthWorkoutSection | RunningWorkoutSection =>
          section !== null
      );

    return {
      ...workout,
      sections: reorderedSections,
    } as Workout;
  });

  return {
    ...state,
    workouts: updatedWorkouts,
  };
};
