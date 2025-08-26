import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration, Platform } from 'react-native';
import { Button } from '../../../components/Button/Button';
import { platformSelect, isIOS } from '../../../utils/platform';

interface RestTimerProps {
  duration: number; // in seconds
  onComplete: () => void;
  onSkip: () => void;
}

export const RestTimer: React.FC<RestTimerProps> = ({
  duration,
  onComplete,
  onSkip,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!);
            
            // Platform-specific vibration pattern
            if (isIOS) {
              // iOS vibration
              Vibration.vibrate();
            } else {
              // Android vibration pattern (ms)
              Vibration.vibrate([0, 500, 200, 500]);
            }
            
            onComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, onComplete]);

  const toggleTimer = () => {
    setIsActive((prev) => !prev);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Platform-specific styles
  const containerStyle = platformSelect<any>(
    {
      // iOS-specific styles
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    {
      // Android-specific styles
      elevation: 4,
    }
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>Rest Timer</Text>
      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      <View style={styles.buttonContainer}>
        <Button
          variant={isActive ? 'warning' : 'primary'}
          onPress={toggleTimer}
          style={styles.button}
        >
          {isActive ? 'Pause' : 'Resume'}
        </Button>
        <Button
          variant="secondary"
          onPress={onSkip}
          style={styles.button}
        >
          Skip
        </Button>
      </View>
      <Text style={styles.instruction}>
        Rest between sets to maximize your performance
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  timer: {
    fontSize: 48,
    fontWeight: '700',
    color: '#3B82F6',
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  button: {
    marginHorizontal: 8,
    minWidth: 100,
  },
  instruction: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
});

