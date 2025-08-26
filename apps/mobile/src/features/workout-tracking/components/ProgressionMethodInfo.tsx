import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Card from '@/components/Card';

interface ProgressionMethodInfoProps {
  method?: string;
  currentSet: number;
  totalSets?: number;
  reps?: string;
  weight?: string;
}

const ProgressionMethodInfo: React.FC<ProgressionMethodInfoProps> = ({
  method,
  currentSet,
  totalSets,
  reps,
  weight,
}) => {
  if (!method) {
    return null;
  }

  const getProgressionInfo = () => {
    switch (method) {
      case 'linear':
        return {
          title: 'Linear Progression',
          description:
            'Add weight each workout when you hit all target reps with good form.',
          strategy: `Aim for ${reps} reps. If you complete all sets with target reps, increase weight next workout.`,
        };
      case 'double-progression':
        return {
          title: 'Double Progression',
          description:
            'First increase reps, then increase weight and start over.',
          strategy: `Aim for the lower end of ${reps} reps. When you can do the upper end for all sets, increase weight and start again at the lower end.`,
        };
      case 'rpe':
        return {
          title: 'RPE-Based Training',
          description:
            'Rate of Perceived Exertion - how many reps you have left in the tank.',
          strategy: `Adjust weight to match the target RPE. RPE 8 means you could do 2 more reps with good form.`,
        };
      case 'percentage':
        return {
          title: 'Percentage-Based',
          description: 'Work with a percentage of your one-rep max (1RM).',
          strategy: `Current weight (${weight}) is based on your estimated 1RM. Follow the prescribed reps exactly.`,
        };
      case 'dual':
        return {
          title: 'Dual Factor',
          description:
            'Combines volume and intensity progression for optimal gains.',
          strategy: `Focus on form for all ${totalSets} sets. Increase weight when you can complete all sets with good form.`,
        };
      case 'amrap':
        return {
          title: 'AMRAP (As Many Rounds As Possible)',
          description: 'Complete as many rounds as possible in the given time.',
          strategy: 'Pace yourself to maintain good form throughout the entire duration.',
        };
      case 'emom':
        return {
          title: 'EMOM (Every Minute On the Minute)',
          description:
            'Complete the prescribed work at the start of each minute.',
          strategy: 'Complete the work quickly to maximize rest time before the next minute starts.',
        };
      default:
        return {
          title: 'Standard Progression',
          description: 'Focus on good form and consistent progress.',
          strategy: `Complete ${totalSets} sets of ${reps} reps with good form.`,
        };
    }
  };

  const info = getProgressionInfo();

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>{info.title}</Text>
      <Text style={styles.description}>{info.description}</Text>
      <View style={styles.divider} />
      <Text style={styles.strategyTitle}>Strategy for Set {currentSet}:</Text>
      <Text style={styles.strategy}>{info.strategy}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 12,
  },
  strategyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  strategy: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProgressionMethodInfo;

