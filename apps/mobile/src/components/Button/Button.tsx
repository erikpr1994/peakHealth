import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { platformSelect, isIOS } from '../../utils/platform';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  ...props
}) => {
  // Platform-specific button styles
  const buttonStyles = platformSelect<ViewStyle>(
    {
      // iOS-specific styles
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    {
      // Android-specific styles
      elevation: 2,
    }
  );

  // Platform-specific text styles
  const platformTextStyles = platformSelect<TextStyle>(
    {
      // iOS-specific text styles
      fontWeight: '600',
    },
    {
      // Android-specific text styles
      fontWeight: '700',
      fontFamily: 'sans-serif-medium',
    }
  );

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[`${variant}Button`],
        styles[`${size}Button`],
        fullWidth && styles.fullWidth,
        disabled && styles.disabledButton,
        buttonStyles,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          testID="button-loading-indicator"
          color={variant === 'primary' ? '#FFFFFF' : '#3B82F6'}
          size={platformSelect('small', 'small')}
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text
            style={[
              styles.text,
              styles[`${variant}Text`],
              styles[`${size}Text`],
              platformTextStyles,
              textStyle,
            ]}
          >
            {children}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  text: {
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabledButton: {
    opacity: 0.5,
  },
  // Variant styles
  primaryButton: {
    backgroundColor: '#3B82F6',
  },
  secondaryButton: {
    backgroundColor: '#6B7280',
  },
  successButton: {
    backgroundColor: '#10B981',
  },
  dangerButton: {
    backgroundColor: '#EF4444',
  },
  warningButton: {
    backgroundColor: '#F59E0B',
  },
  infoButton: {
    backgroundColor: '#3B82F6',
  },
  // Text colors
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  successText: {
    color: '#FFFFFF',
  },
  dangerText: {
    color: '#FFFFFF',
  },
  warningText: {
    color: '#FFFFFF',
  },
  infoText: {
    color: '#FFFFFF',
  },
  // Size styles
  smallButton: {
    paddingVertical: 6,
  },
  mediumButton: {
    paddingVertical: 10,
  },
  largeButton: {
    paddingVertical: 14,
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
});

