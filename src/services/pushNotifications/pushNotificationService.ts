import { Platform } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  AuthorizationStatus,
  requestPermission,
  getToken,
  onTokenRefresh,
} from '@react-native-firebase/messaging';

function messaging() {
  return getMessaging(getApp());
}

export async function requestPermissionAndGetTokens() {
  try {
    if (Platform.OS === 'ios') {
      const status = await requestPermission(messaging());
      const granted =
        status === AuthorizationStatus.AUTHORIZED ||
        status === AuthorizationStatus.PROVISIONAL;

      if (!granted) {
        return { granted: false, tokens: null };
      }
    }

    const fcmToken = await getToken(messaging());

    return {
      granted: true,
      tokens: { fcmToken },
    };
  } catch (e) {
    console.warn('[Push] init failed:', e);
    return { granted: false, tokens: null };
  }
}

export function subscribeToTokenRefresh(cb: (t: string) => void) {
  return onTokenRefresh(messaging(), cb);
}
