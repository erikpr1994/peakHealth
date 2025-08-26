import { Platform, Dimensions, StatusBar, NativeModules } from 'react-native';

/**
 * Check if the device is running iOS
 */
export const isIOS = Platform.OS === 'ios';

/**
 * Check if the device is running Android
 */
export const isAndroid = Platform.OS === 'android';

/**
 * Get the device's screen dimensions
 */
export const screenDimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

/**
 * Get the status bar height
 */
export const getStatusBarHeight = (): number => {
  if (isIOS) {
    return StatusBar.currentHeight || 20;
  }
  return StatusBar.currentHeight || 0;
};

/**
 * Check if the device has a notch (iPhone X and newer)
 */
export const hasNotch = (): boolean => {
  if (!isIOS) return false;
  
  const { height, width } = Dimensions.get('window');
  return (
    (height === 812 || width === 812) || // iPhone X, XS, 11 Pro
    (height === 896 || width === 896) || // iPhone XR, XS Max, 11, 11 Pro Max
    (height === 844 || width === 844) || // iPhone 12, 12 Pro
    (height === 926 || width === 926)    // iPhone 12 Pro Max
  );
};

/**
 * Get the bottom space for devices with home indicator
 */
export const getBottomSpace = (): number => {
  return hasNotch() ? 34 : 0;
};

/**
 * Check if the device is a tablet
 */
export const isTablet = (): boolean => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  return aspectRatio <= 1.6;
};

/**
 * Get platform-specific styles
 * @param iosStyles Styles for iOS
 * @param androidStyles Styles for Android
 */
export const platformStyles = <T>(iosStyles: T, androidStyles: T): T => {
  return isIOS ? iosStyles : androidStyles;
};

/**
 * Get platform-specific value
 * @param iosValue Value for iOS
 * @param androidValue Value for Android
 */
export const platformSelect = <T>(iosValue: T, androidValue: T): T => {
  return Platform.select({
    ios: iosValue,
    android: androidValue,
  }) as T;
};

