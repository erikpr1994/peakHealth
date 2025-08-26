import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Button from '@/components/Button';

interface RestTimerProps {
  duration: number; // in seconds
  onComplete: () => void;
  onSkip?: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const RestTimer: React.FC<RestTimerProps> = ({
  duration,
  onComplete,
  onSkip,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, onComplete]);

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  const handleSkip = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (onSkip) {
      onSkip();
    } else {
      onComplete();
    }
  };

  // Calculate progress percentage
  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerLabel}>Rest Timer</Text>
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, {width: `${progress}%`}]}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          variant="outline"
          onPress={togglePause}
          style={styles.button}>
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
        <Button
          variant="primary"
          onPress={handleSkip}
          style={styles.button}>
          Skip
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  timerLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0070f3',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default RestTimer;

