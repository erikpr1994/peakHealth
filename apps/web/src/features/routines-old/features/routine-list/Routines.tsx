'use client';

import { useState, useEffect } from 'react';
import { Routine } from '@/features/routines-old/types';
import RoutinesList from './components/RoutinesList';
import { routineService } from '../../services/routineService';

const Routines = (): React.ReactElement => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoutines = async (): Promise<void> => {
    try {
      setLoading(true);
      const routines = await routineService.getUserRoutines();
      setRoutines(routines);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch routines');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    fetchRoutines();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading routines...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  const handleRoutinesChange = (updatedRoutines: Routine[]): void => {
    setRoutines(updatedRoutines);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <RoutinesList
        routines={routines}
        onRoutineUpdate={fetchRoutines}
        onRoutinesChange={handleRoutinesChange}
      />
    </div>
  );
};

export default Routines;
