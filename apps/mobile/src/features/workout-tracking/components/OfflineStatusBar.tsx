import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useOfflineWorkouts } from '../hooks/useOfflineWorkouts';

interface OfflineStatusBarProps {
  onSyncPress?: () => void;
}

export const OfflineStatusBar: React.FC<OfflineStatusBarProps> = ({ 
  onSyncPress 
}) => {
  const { isOnline, isSyncing, syncOfflineData } = useOfflineWorkouts();

  if (isOnline) return null;

  const handleSyncPress = () => {
    if (onSyncPress) {
      onSyncPress();
    } else {
      syncOfflineData();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.indicator} />
        <Text style={styles.text}>You're offline. Changes will sync when you reconnect.</Text>
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSyncPress}
        disabled={isSyncing}
      >
        <Text style={styles.buttonText}>
          {isSyncing ? 'Syncing...' : 'Try Sync'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF3CD',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FFE69C',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF9800',
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    color: '#856404',
    flex: 1,
  },
  button: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 8,
  },
  buttonText: {
    color: '#212529',
    fontSize: 12,
    fontWeight: '600',
  },
});

