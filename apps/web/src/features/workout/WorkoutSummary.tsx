import {
  Trophy,
  Clock,
  Target,
  TrendingUp,
  Share,
  CheckCircle,
  Star,
  MessageCircle,
  Calendar,
} from 'lucide-react';
import React, { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useWorkoutNavigation } from './hooks/useWorkoutNavigation';

interface SetData {
  id: string;
  exerciseId: string;
  setNumber: number;
  targetReps?: string;
  actualReps?: number;
  targetWeight?: string;
  actualWeight?: number;
  targetDuration?: string;
  actualDuration?: number;
  restTime: number;
  notes?: string;
  completed: boolean;
  media?: Array<{
    id: string;
    type: 'photo' | 'video';
    url: string;
  }>;
}

interface WorkoutData {
  id: string;
  name: string;
  sections: Array<{
    id: string;
    name: string;
    type: 'warmup' | 'main' | 'cooldown';
    exercises: Array<{
      id: string;
      name: string;
      instructions: string;
      muscleGroups: string[];
      sets: Array<{
        id: string;
        type: 'reps' | 'time';
        reps?: string;
        weight?: string;
        duration?: string;
        restTime: string;
      }>;
      restTimeAfter?: number;
    }>;
    restTime: number;
  }>;
  restTimeAfter?: number;
}

interface WorkoutSession {
  routineId: string;
  routineName: string;
  startTime: Date;
  endTime?: Date;
  totalDuration: number;
  workouts: WorkoutData[];
  currentWorkoutIndex: number;
  currentSectionIndex: number;
  currentExerciseIndex: number;
  currentSetIndex: number;
  setData: SetData[];
  workoutNotes: string;
  isPaused: boolean;
  pauseReason?: string;
  pauseStartTime?: Date;
  totalPauseTime: number;
}

interface WorkoutSummaryProps {
  workoutSession: WorkoutSession;
  onComplete: () => void;
}

const WorkoutSummary = ({
  workoutSession,
  onComplete,
}: WorkoutSummaryProps): React.JSX.Element => {
  const [workoutNotes, setWorkoutNotes] = useState('');
  const [rating, setRating] = useState(0);
  const [showCelebration] = useState(true);
  const { goToRoutines, goToCalendar } = useWorkoutNavigation();

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const calculateStats = (): {
    totalSets: number;
    totalReps: number;
    avgRating: number;
    exercisesCompleted: number;
    duration: string;
    activeTime: string;
  } => {
    // Safely access setData with fallback
    const setData = workoutSession.setData || [];
    const totalSets = setData.filter(set => set.completed).length;
    const totalReps = setData.reduce(
      (acc, set) => acc + (set.actualReps || 0),
      0
    );
    const avgRating = rating;

    // Calculate total exercises from all workouts and sections
    const exercisesCompleted =
      workoutSession.workouts?.reduce(
        (workoutAcc, workout) =>
          workoutAcc +
          (workout.sections?.reduce(
            (sectionAcc, section) =>
              sectionAcc + (section.exercises?.length || 0),
            0
          ) || 0),
        0
      ) || 0;

    return {
      totalSets,
      totalReps,
      avgRating,
      exercisesCompleted,
      duration: formatDuration(workoutSession.totalDuration || 0),
      activeTime: formatDuration(
        (workoutSession.totalDuration || 0) -
          (workoutSession.totalPauseTime || 0)
      ),
    };
  };

  const stats = calculateStats();

  const handleSaveWorkout = (): void => {
    const _finalWorkoutData = {
      ...workoutSession,
      workoutNotes,
      rating,
      completedAt: new Date(),
    };

    // TODO: Save workout data to database
    onComplete();
  };

  const getMotivationalMessage = (): string => {
    const messages = [
      'Outstanding work! 💪',
      'You crushed it today! 🔥',
      'Another step closer to your goals! 🎯',
      'Consistency is key - well done! ⭐',
      'Your dedication is inspiring! 🚀',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Celebration Header */}
        {showCelebration && (
          <Card className="p-8 mb-8 text-center bg-gradient-to-r from-green-400 to-blue-500 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-bold mb-2">Workout Complete!</h1>
              <p className="text-xl opacity-90">{getMotivationalMessage()}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20" />
          </Card>
        )}

        {/* Workout Overview */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {workoutSession.routineName || 'Workout'}
            </h2>
            <Badge className="bg-green-500 text-white">
              <CheckCircle className="w-4 h-4 mr-1" />
              Completed
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.duration}
              </div>
              <div className="text-sm text-gray-600">Total Time</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.totalSets}
              </div>
              <div className="text-sm text-gray-600">Sets Completed</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.totalReps}
              </div>
              <div className="text-sm text-gray-600">Total Reps</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.exercisesCompleted}
              </div>
              <div className="text-sm text-gray-600">Exercises</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Started:</span>
                <span className="ml-2 font-medium">
                  {workoutSession.startTime
                    ? workoutSession.startTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Finished:</span>
                <span className="ml-2 font-medium">
                  {workoutSession.endTime
                    ? workoutSession.endTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Active Time:</span>
                <span className="ml-2 font-medium">{stats.activeTime}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Exercise Breakdown */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Exercise Breakdown</h3>
          <div className="space-y-4">
            {workoutSession.workouts && workoutSession.workouts.length > 0 ? (
              workoutSession.workouts
                .map(
                  workout =>
                    workout.sections?.map(
                      section =>
                        section.exercises?.map(exercise => {
                          const exerciseSets = (
                            workoutSession.setData || []
                          ).filter(set => set.exerciseId === exercise.id);
                          return (
                            <div
                              key={exercise.id}
                              className="border border-gray-200 rounded-lg p-4"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium text-gray-800">
                                  {exercise.name}
                                </h4>
                                <Badge variant="outline">
                                  {exerciseSets.length} sets
                                </Badge>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {exerciseSets.map((set, index) => (
                                  <div
                                    key={set.id}
                                    className="bg-gray-50 rounded-lg p-3 text-center"
                                  >
                                    <div className="text-sm text-gray-600 mb-1">
                                      Set {index + 1}
                                    </div>
                                    <div className="font-semibold">
                                      {set.actualReps
                                        ? `${set.actualReps} reps`
                                        : `${set.actualDuration}s`}
                                    </div>
                                    {set.actualWeight &&
                                      set.actualWeight > 0 && (
                                        <div className="text-xs text-gray-500">
                                          {set.actualWeight} lbs
                                        </div>
                                      )}
                                    {set.notes && (
                                      <div className="text-xs text-blue-600 mt-1">
                                        📝 Notes
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }) || []
                    ) || []
                )
                .flat()
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No exercise data available</p>
              </div>
            )}
          </div>
        </Card>

        {/* Workout Rating */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5" />
            Rate Your Workout
          </h3>
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl transition-colors ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ⭐
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-gray-600">
                {rating === 1 && 'Could be better'}
                {rating === 2 && 'Okay workout'}
                {rating === 3 && 'Good session'}
                {rating === 4 && 'Great workout!'}
                {rating === 5 && 'Amazing session! 🔥'}
              </span>
            )}
          </div>
        </Card>

        {/* Workout Notes */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Workout Notes
          </h3>
          <Textarea
            placeholder="How did today's workout feel? Any observations, achievements, or areas for improvement..."
            value={workoutNotes}
            onChange={e => setWorkoutNotes(e.target.value)}
            rows={4}
            className="mb-4"
          />
          <div className="text-sm text-gray-500">
            These notes will be saved with your workout history and help track
            your progress.
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <div>
                <div className="font-medium">Schedule Next Workout</div>
                <div className="text-sm text-gray-600">
                  Keep the momentum going
                </div>
              </div>
            </div>
            <Button
              onClick={() => goToCalendar()}
              variant="outline"
              className="w-full"
            >
              Open Calendar
            </Button>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Share className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium">Share Achievement</div>
                <div className="text-sm text-gray-600">
                  Inspire others with your progress
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Share Workout
            </Button>
          </Card>
        </div>

        {/* Final Actions */}
        <div className="flex gap-4">
          <Button variant="outline" onClick={goToRoutines} className="flex-1">
            Back to Routines
          </Button>
          <Button
            onClick={handleSaveWorkout}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Save Workout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSummary;
