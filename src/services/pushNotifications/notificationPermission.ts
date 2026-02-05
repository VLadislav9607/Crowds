import { checkNotifications, openSettings } from 'react-native-permissions';

/** Returns whether app has notification permission (for in-app settings UI). */
export async function getNotificationPermissionStatus(): Promise<boolean> {
  try {
    const { status } = await checkNotifications();
    return status === 'granted';
  } catch {
    return false;
  }
}

/** Opens the system notification settings for this app. */
export function openNotificationSettings(): Promise<void> {
  return openSettings('notifications');
}
