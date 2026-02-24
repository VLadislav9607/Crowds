import { Platform } from 'react-native';
import notifee, {
  AndroidImportance,
  EventType,
} from '@notifee/react-native';
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  onMessage,
  setBackgroundMessageHandler as setFCMBackgroundHandler,
} from '@react-native-firebase/messaging';
import { queryClient } from '../reactQuery';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { navigateFromNotification } from './notificationNavigator';
import { invalidateCacheForNotificationType } from './notificationCacheInvalidator';

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
  data?: Record<string, string>;
}): Promise<void> {
  const title = remoteMessage.notification?.title ?? 'New message';
  const body = remoteMessage.notification?.body ?? '';

  if (Platform.OS === 'android') {
    await ensureAndroidChannel();
  }

  await notifee.displayNotification({
    title,
    body,
    data: remoteMessage.data,
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
    await displayNotification({
      notification: remoteMessage.notification,
      data: remoteMessage.data as Record<string, string> | undefined,
    });
  });
};

export const setForegroundMessageHandler = (): void => {
  onMessage(getMessaging(getApp()), async remoteMessage => {
    try {
      await displayNotification({
        notification: remoteMessage.notification,
        data: remoteMessage.data as Record<string, string> | undefined,
      });
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_UNREAD_NOTIFICATIONS_COUNT],
      });
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_NOTIFICATIONS],
      });
      invalidateCacheForNotificationType(
        remoteMessage.data?.type,
      );
    } catch (e) {
      console.warn('[Push] Failed to display foreground notification:', e);
    }
  });
};

/** Register Notifee foreground event handler. Call inside a useEffect in the app root. */
export const setNotifeeForegroundEventHandler = (): (() => void) => {
  return notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS && detail.notification?.data) {
      const data = detail.notification.data as Record<string, string>;
      navigateFromNotification(data.type, data);
    }
  });
};

/** Must be called at app startup (e.g. index.js). Handles Notifee notification events in background. */
export const setNotifeeBackgroundEventHandler = (): void => {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS && detail.notification?.data) {
      const data = detail.notification.data as Record<string, string>;
      navigateFromNotification(data.type, data);
    }
  });
};
