import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DetailedInstructions} from '@/types/workout';

interface ExerciseInstructionsProps {
  instructions: DetailedInstructions;
  exerciseName: string;
}

const ExerciseInstructions: React.FC<ExerciseInstructionsProps> = ({
  instructions,
  exerciseName,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpanded}
        activeOpacity={0.7}>
        <Text style={styles.headerText}>
          {exerciseName} Instructions {expanded ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Step-by-Step</Text>
          {instructions.stepByStep.map((step, index) => (
            <View key={index} style={styles.step}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          ))}

          <Text style={[styles.sectionTitle, styles.marginTop]}>Pro Tips</Text>
          {instructions.proTips.map((tip, index) => (
            <View key={index} style={styles.tip}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}

          <Text style={[styles.sectionTitle, styles.marginTop]}>
            Common Mistakes
          </Text>
          {instructions.commonMistakes.map((mistake, index) => (
            <View key={index} style={styles.tip}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.tipText}>{mistake}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 8,
  },
  header: {
    padding: 16,
    backgroundColor: '#e6f7ff',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0070f3',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  marginTop: {
    marginTop: 16,
  },
  step: {
    marginBottom: 12,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
  },
  tip: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
    width: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});

export default ExerciseInstructions;

