import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const APP_ID = Platform.select({
  ios: 'com.crowdsnow.app',
  android: 'com.crowdsnow',
}) as string;
