import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  style,
  textStyle,
}) => {
  const getBadgeStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'success':
        return styles.success;
      case 'warning':
        return styles.warning;
      case 'danger':
        return styles.danger;
      case 'outline':
        return styles.outline;
      default:
        return styles.default;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'success':
        return styles.successText;
      case 'warning':
        return styles.warningText;
      case 'danger':
        return styles.dangerText;
      case 'outline':
        return styles.outlineText;
      default:
        return styles.defaultText;
    }
  };

  return (
    <View style={[styles.badge, getBadgeStyle(), style]}>
      <Text style={[styles.text, getTextStyle(), textStyle]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
  default: {
    backgroundColor: '#f0f0f0',
  },
  primary: {
    backgroundColor: '#e6f7ff',
  },
  secondary: {
    backgroundColor: '#f5f5f5',
  },
  success: {
    backgroundColor: '#f6ffed',
  },
  warning: {
    backgroundColor: '#fffbe6',
  },
  danger: {
    backgroundColor: '#fff2f0',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d9d9d9',
  },
  defaultText: {
    color: '#666',
  },
  primaryText: {
    color: '#1890ff',
  },
  secondaryText: {
    color: '#666',
  },
  successText: {
    color: '#52c41a',
  },
  warningText: {
    color: '#faad14',
  },
  dangerText: {
    color: '#ff4d4f',
  },
  outlineText: {
    color: '#666',
  },
});

export default Badge;

