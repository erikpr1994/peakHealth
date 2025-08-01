import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  CheckCircle,
  Clock,
  Dumbbell,
  Target,
  Flame,
} from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type RestType = 'set' | 'exercise' | 'section' | 'workout';

interface RestTimerProps {
  restType: RestType;
  initialTime: number; // in seconds
  title?: string;
  subtitle?: string;
  onComplete: () => void;
  onSkip?: () => void;
  showCustomTimer?: boolean;
  customTimerOptions?: number[]; // preset time options in seconds
  isAutoStart?: boolean;
}

const DEFAULT_REST_TIMES = {
  set: [30, 60, 90, 120, 180], // 30s, 1min, 1.5min, 2min, 3min
  exercise: [60, 120, 180, 240, 300], // 1min, 2min, 3min, 4min, 5min
  section: [120, 180, 300, 420, 600], // 2min, 3min, 5min, 7min, 10min
  workout: [300, 600, 900, 1200, 1800], // 5min, 10min, 15min, 20min, 30min
};

const REST_TYPE_CONFIG = {
  set: {
    icon: <Dumbbell className="w-5 h-5" />,
    color: 'bg-green-100 text-green-700 border-green-200',
    title: 'Set Rest',
    description: 'Rest between sets',
  },
  exercise: {
    icon: <Target className="w-5 h-5" />,
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    title: 'Exercise Rest',
    description: 'Rest between exercises',
  },
  section: {
    icon: <Flame className="w-5 h-5" />,
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    title: 'Section Rest',
    description: 'Rest between workout sections',
  },
  workout: {
    icon: <Clock className="w-5 h-5" />,
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    title: 'Workout Rest',
    description: 'Rest between workouts',
  },
};

export default function RestTimer({
  restType,
  initialTime,
  title,
  subtitle,
  onComplete,
  onSkip,
  showCustomTimer = false,
  customTimerOptions,
  isAutoStart = true,
}: RestTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(isAutoStart);
  const [totalTime, setTotalTime] = useState(initialTime);
  const [isCompleted, setIsCompleted] = useState(false);

  const config = REST_TYPE_CONFIG[restType];
  const presetTimes = customTimerOptions || DEFAULT_REST_TIMES[restType];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            // Play notification sound or vibration
            if ('vibrate' in navigator) {
              navigator.vibrate([200, 100, 200]);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimeShort = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    if (minutes > 0) {
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    return `${secs}s`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeRemaining(totalTime);
    setIsRunning(isAutoStart);
    setIsCompleted(false);
  };

  const handleCustomTimeChange = (newTime: string) => {
    const time = parseInt(newTime);
    setTotalTime(time);
    setTimeRemaining(time);
    setIsRunning(isAutoStart);
    setIsCompleted(false);
  };

  const handleSkip = () => {
    setIsRunning(false);
    if (onSkip) {
      onSkip();
    } else {
      onComplete();
    }
  };

  const handleComplete = () => {
    setIsRunning(false);
    onComplete();
  };

  const getTimerColor = () => {
    if (isCompleted) return 'text-green-600';
    const percentage = (timeRemaining / totalTime) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressPercentage = () => {
    return ((totalTime - timeRemaining) / totalTime) * 100;
  };

  const getProgressColor = () => {
    if (isCompleted) return 'stroke-green-500';
    const percentage = getProgressPercentage();
    if (percentage > 75) return 'stroke-green-500';
    if (percentage > 50) return 'stroke-yellow-500';
    return 'stroke-red-500';
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-6 text-center bg-white shadow-lg">
        {/* Header */}
        <div className="mb-6">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${config.color}`}
          >
            {config.icon}
            {title || config.title}
          </div>
          {subtitle && <p className="text-gray-600 text-sm mt-2">{subtitle}</p>}
        </div>

        {/* Timer Display */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          {/* Progress Circle */}
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${
                2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)
              }`}
              className={getProgressColor()}
              strokeLinecap="round"
            />
          </svg>

          {/* Timer Display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`text-4xl font-bold ${getTimerColor()}`}>
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        {/* Custom Timer Selector */}
        {showCustomTimer && (
          <div className="mb-6">
            <Select
              value={totalTime.toString()}
              onValueChange={handleCustomTimeChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose rest time" />
              </SelectTrigger>
              <SelectContent>
                {presetTimes.map(time => (
                  <SelectItem key={time} value={time.toString()}>
                    {formatTimeShort(time)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Timer Controls */}
        <div className="flex justify-center gap-3 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTimer}
            className="min-w-24"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {timeRemaining === 0 ? 'Start' : 'Resume'}
              </>
            )}
          </Button>

          <Button variant="outline" size="sm" onClick={resetTimer}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Completion Status */}
        {isCompleted && (
          <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Rest Complete!</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSkip} className="flex-1">
            <SkipForward className="w-4 h-4 mr-2" />
            Skip Rest
          </Button>

          <Button
            onClick={handleComplete}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
            disabled={timeRemaining > 0 && isRunning}
          >
            {isCompleted ? 'Continue' : 'Continue Early'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
