'use client';

import { Plus, Search, Grid3X3, List, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@peakhealth/ui';
import { Routine } from '@/features/routines/types';
import { routineService } from '../../../services/routineService';
import { ScheduledWorkoutService } from '../../../services/scheduledWorkoutService';
import ActiveRoutineCard from './ActiveRoutineCard';
import RoutineCard from './RoutineCard';
import { ActiveRoutineWarningModal } from '../../../components/ActiveRoutineWarningModal';

// Initialize ScheduledWorkoutService once at module level
const scheduledWorkoutService = new ScheduledWorkoutService();

interface RoutinesListProps {
  routines: Routine[];
  onRoutineUpdate?: () => void;
  onRoutinesChange?: (routines: Routine[]) => void;
}

const RoutinesList = ({
  routines,
  onRoutineUpdate,
  onRoutinesChange,
}: RoutinesListProps): React.ReactElement => {
  const router = useRouter();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [goalFilter, setGoalFilter] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Warning modal state
  const [warningModal, setWarningModal] = useState<{
    isOpen: boolean;
    currentActiveRoutineName: string;
    newRoutineName: string;
    newRoutineId: string;
  }>({
    isOpen: false,
    currentActiveRoutineName: '',
    newRoutineName: '',
    newRoutineId: '',
  });

  const activeRoutine = routines.find(routine => routine.isActive);
  const inactiveRoutines = routines.filter(routine => !routine.isActive);

  const filteredRoutines = inactiveRoutines.filter(routine => {
    const matchesSearch =
      routine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      routine.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel =
      levelFilter === 'all' || routine.difficulty === levelFilter;
    const matchesGoal = goalFilter === 'all' || routine.goal === goalFilter;
    const matchesFavorites = !showFavoritesOnly || routine.isFavorite;

    return matchesSearch && matchesLevel && matchesGoal && matchesFavorites;
  });

  const handleCreateRoutine = (): void => {
    router.push('/routines/create');
  };

  const handleSetActiveRoutine = async (routineId: string): Promise<void> => {
    try {
      // Check if user already has an active routine
      const { hasActive, activeRoutineName } =
        await scheduledWorkoutService.hasActiveRoutine();

      if (hasActive && activeRoutineName) {
        // Find the new routine from local state
        const newRoutine = routines.find(r => r.id === routineId);

        if (newRoutine) {
          // Show warning modal using API data for current active routine
          setWarningModal({
            isOpen: true,
            currentActiveRoutineName: activeRoutineName, // Use API data instead of local state
            newRoutineName: newRoutine.name,
            newRoutineId: routineId,
          });
          return;
        }
      }

      // No active routine or no warning needed, proceed directly
      await performSetActiveRoutine(routineId);
    } catch {
      showToast({
        message: 'Failed to check active routine status. Please try again.',
        variant: 'error',
      });
    }
  };

  const performSetActiveRoutine = async (routineId: string): Promise<void> => {
    try {
      // Optimistically update the local state first
      const updatedRoutines = routines.map(routine => ({
        ...routine,
        isActive: routine.id === routineId,
      }));

      if (onRoutinesChange) {
        onRoutinesChange(updatedRoutines);
      }

      // Then update the database and ensure it completes
      const result = await routineService.setActiveRoutine(routineId);

      if (result.success) {
        // Show success message with scheduled workouts count if available
        const message = result.scheduledWorkoutsCount
          ? `Routine activated successfully! Generated ${result.scheduledWorkoutsCount} scheduled workouts.`
          : 'Routine activated successfully!';

        showToast({
          message,
          variant: 'success',
        });
      } else {
        throw new Error(result.message);
      }
    } catch {
      // Error occurred while setting active routine

      // Revert the optimistic update on error
      const revertedRoutines = routines.map(routine => ({
        ...routine,
        isActive: routine.isActive, // Keep original state
      }));

      if (onRoutinesChange) {
        onRoutinesChange(revertedRoutines);
      }

      // Show error message to user
      showToast({
        message: 'Failed to set routine as active. Please try again.',
        variant: 'error',
      });
    }
  };

  const handleConfirmSetActiveRoutine = async (): Promise<void> => {
    setWarningModal(prev => ({ ...prev, isOpen: false }));
    await performSetActiveRoutine(warningModal.newRoutineId);
  };

  const handleCancelSetActiveRoutine = (): void => {
    setWarningModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleFavoriteToggle = async (routineId: string): Promise<void> => {
    try {
      await routineService.toggleRoutineFavorite(routineId);
      // Refresh the data to get updated favorite status
      onRoutineUpdate?.();
    } catch {
      // Error occurred while toggling favorite
      showToast({
        message: 'Failed to toggle favorite status. Please try again.',
        variant: 'error',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Routines</h1>
          <p className="text-gray-600 mt-1">
            Manage and track your workout routines
          </p>
        </div>
        <Button
          onClick={handleCreateRoutine}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Routine
        </Button>
      </div>

      {/* Active Routine */}
      {activeRoutine && (
        <div className="mb-8">
          <ActiveRoutineCard routine={activeRoutine} />
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search routines..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className="flex items-center gap-2"
          >
            <Heart
              className={`w-4 h-4 text-red-500 ${
                showFavoritesOnly ? 'fill-red-500' : ''
              }`}
            />
            Favorites
          </Button>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Select value={goalFilter} onValueChange={setGoalFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Goals</SelectItem>
              <SelectItem value="Strength">Strength</SelectItem>
              <SelectItem value="Hypertrophy">Hypertrophy</SelectItem>
              <SelectItem value="Endurance">Endurance</SelectItem>
              <SelectItem value="Weight Loss">Weight Loss</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
              title="Grid View"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
              title="List View"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {filteredRoutines.length} routine
          {filteredRoutines.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Routines Grid/List */}
      {filteredRoutines.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No routines found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || levelFilter !== 'all' || goalFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first routine'}
          </p>
          {!searchQuery && levelFilter === 'all' && goalFilter === 'all' && (
            <Button onClick={handleCreateRoutine}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Routine
            </Button>
          )}
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredRoutines.map(routine => (
            <RoutineCard
              key={routine.id}
              routine={routine}
              viewMode={viewMode}
              onSetActive={handleSetActiveRoutine}
              onToggleFavorite={handleFavoriteToggle}
            />
          ))}
        </div>
      )}

      {/* Warning Modal */}
      <ActiveRoutineWarningModal
        isOpen={warningModal.isOpen}
        currentActiveRoutineName={warningModal.currentActiveRoutineName}
        newRoutineName={warningModal.newRoutineName}
        onConfirm={handleConfirmSetActiveRoutine}
        onCancel={handleCancelSetActiveRoutine}
      />
    </div>
  );
};

export default RoutinesList;
