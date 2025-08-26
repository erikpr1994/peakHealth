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

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  children,
  ...props
}) => {
  const getButtonStyle = () => {
    const buttonStyles: ViewStyle[] = [styles.button, styles[size]];

    if (fullWidth) {
      buttonStyles.push(styles.fullWidth);
    }

    if (disabled) {
      buttonStyles.push(styles.disabled);
      return buttonStyles;
    }

    switch (variant) {
      case 'primary':
        buttonStyles.push(styles.primary);
        break;
      case 'secondary':
        buttonStyles.push(styles.secondary);
        break;
      case 'outline':
        buttonStyles.push(styles.outline);
        break;
      case 'danger':
        buttonStyles.push(styles.danger);
        break;
      default:
        buttonStyles.push(styles.primary);
    }

    return buttonStyles;
  };

  const getTextStyle = () => {
    const textStyles: TextStyle[] = [styles.text];

    if (disabled) {
      textStyles.push(styles.disabledText);
      return textStyles;
    }

    switch (variant) {
      case 'primary':
        textStyles.push(styles.primaryText);
        break;
      case 'secondary':
        textStyles.push(styles.secondaryText);
        break;
      case 'outline':
        textStyles.push(styles.outlineText);
        break;
      case 'danger':
        textStyles.push(styles.dangerText);
        break;
      default:
        textStyles.push(styles.primaryText);
    }

    switch (size) {
      case 'small':
        textStyles.push(styles.smallText);
        break;
      case 'medium':
        textStyles.push(styles.mediumText);
        break;
      case 'large':
        textStyles.push(styles.largeText);
        break;
      default:
        textStyles.push(styles.mediumText);
    }

    return textStyles;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      {...props}>
      {isLoading ? (
        <ActivityIndicator
          color={variant === 'outline' ? '#0070f3' : '#ffffff'}
          size="small"
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  primary: {
    backgroundColor: '#0070f3',
  },
  secondary: {
    backgroundColor: '#f5f5f5',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0070f3',
  },
  danger: {
    backgroundColor: '#ff4d4f',
  },
  disabled: {
    backgroundColor: '#e0e0e0',
    borderColor: '#e0e0e0',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#333333',
  },
  outlineText: {
    color: '#0070f3',
  },
  dangerText: {
    color: '#ffffff',
  },
  disabledText: {
    color: '#999999',
  },
});

export default Button;

