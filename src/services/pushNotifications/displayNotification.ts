import { Platform } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  onMessage,
  setBackgroundMessageHandler as setFCMBackgroundHandler,
} from '@react-native-firebase/messaging';
import { COLORS } from '@styles';

const ANDROID_CHANNEL_ID = 'default';

/** Create Android channel (required before displaying notifications). Idempotent. */
async function ensureAndroidChannel(): Promise<void> {
  if (Platform.OS !== 'android') return;
  await notifee.createChannel({
    id: ANDROID_CHANNEL_ID,
    name: 'Notifications',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });
}

/** Call this from onMessage (foreground) to show the push as a notification. */
export async function displayNotification(remoteMessage: {
  notification?: { title?: string; body?: string } | null;
}): Promise<void> {
  const title = remoteMessage.notification?.title ?? 'New message';
  const body = remoteMessage.notification?.body ?? '';

  if (Platform.OS === 'android') {
    await ensureAndroidChannel();
  }

  await notifee.displayNotification({
    title,
    body,
    ...(Platform.OS === 'android' && {
      android: {
        channelId: ANDROID_CHANNEL_ID,
        sound: 'default',
        smallIcon: 'ic_stat_name',
      },
    }),
  });
}

export const setBackgroundMessageHandler = (): void => {
  setFCMBackgroundHandler(getMessaging(getApp()), async remoteMessage => {
    console.log('remoteMessage', remoteMessage);
    await displayNotification(remoteMessage);
  });
};

export const setForegroundMessageHandler = (): void => {
  onMessage(getMessaging(getApp()), async remoteMessage => {
    try {
      await displayNotification(remoteMessage);
    } catch (e) {
      console.warn('[Push] Failed to display foreground notification:', e);
    }
  });
};

/** Must be called at app startup (e.g. index.js). Handles Notifee notification events in background. */
export const setNotifeeBackgroundEventHandler = (): void => {
  notifee.onBackgroundEvent(async _event => {
    // User pressed/dismissed a notification while app was in background.
    // Add navigation etc. here if needed (e.g. _event.detail.notification).
  });
};
