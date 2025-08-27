'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/features/auth/context/AuthContext';
import { useToast } from '@peakhealth/ui';

import { RoutineDetails } from './components/RoutineDetails';
import { RoutineHeader } from './components/RoutineHeader';
import { useRoutineCreationState } from './hooks/useRoutineCreationState';
import { useRoutineValidation } from './hooks/useRoutineValidation';
import { routineService } from './services/routineService';

import styles from './RoutineCreation.module.css';

interface RoutineCreationProps {
  editRoutineId?: string;
  mode?: 'create' | 'edit';
}

export const RoutineCreation = ({
  editRoutineId,
  mode = 'create',
}: RoutineCreationProps): React.ReactElement => {
  const router = useRouter();
  // TODO: This should be part of the auth context, so, if we are not logged in, we should redirect to the login page
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();

  // Use custom hooks for state management
  const { routineData, updateRoutineData, loadRoutineDataForEditing } =
    useRoutineCreationState();

  const { validateRoutine } = useRoutineValidation();

  // Load routine data if editing
  useEffect(() => {
    if (editRoutineId && mode === 'edit') {
      loadRoutineDataForEditing(editRoutineId);
    }
  }, [editRoutineId, mode, loadRoutineDataForEditing]);

  // Handle save routine
  const handleSaveRoutine = async (): Promise<void> => {
    if (!isAuthenticated || !user) {
      showToast({
        message: 'Please log in to create a routine',
        variant: 'error',
      });
      return;
    }

    const validationError = validateRoutine(routineData);
    if (validationError) {
      showToast({ message: validationError, variant: 'error' });
      return;
    }

    try {
      if (mode === 'edit' && editRoutineId) {
        await routineService.updateRoutine({
          id: editRoutineId,
          name: routineData.name,
          description: routineData.description,
          difficulty: routineData.difficulty,
          goal: routineData.goal,
          duration: routineData.duration,
          objectives: routineData.objectives,
          strengthWorkouts: [],
          runningWorkouts: [],
        });
        showToast({
          message: 'Routine updated successfully',
          variant: 'success',
        });
      } else {
        await routineService.createRoutine({
          name: routineData.name,
          description: routineData.description,
          difficulty: routineData.difficulty,
          goal: routineData.goal,
          duration: routineData.duration,
          objectives: routineData.objectives,
          strengthWorkouts: [],
          runningWorkouts: [],
        });
        showToast({
          message: 'Routine created successfully',
          variant: 'success',
        });
      }

      router.push('/routines');
    } catch {
      showToast({ message: 'Failed to save routine', variant: 'error' });
    }
  };

  // Handle cancel
  const handleCancel = (): void => {
    router.push('/routines');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <RoutineHeader
          mode={mode}
          onSave={handleSaveRoutine}
          onCancel={handleCancel}
        />

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Routine Details */}
          <RoutineDetails data={routineData} onUpdate={updateRoutineData} />
        </div>
      </div>
    </div>
  );
};
