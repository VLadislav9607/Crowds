import DeviceInfo from 'react-native-device-info';

/**
 * Returns stable device id via react-native-device-info (iOS: IDFV, Android: ANDROID_ID).
 * Used as p_device_id for public.upsert_push_device.
 */
export function getDeviceId() {
  return DeviceInfo.getUniqueId();
}
