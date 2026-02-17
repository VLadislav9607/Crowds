import { useMemo } from 'react';
import {
  useGetMe,
  useGetNotificationSettings,
  useUpsertNotificationSettings,
} from '@actions';

import {
  TALENT_NOTIFICATION_OPTIONS,
  ORG_NOTIFICATION_OPTIONS,
  TALENT_DEFAULT_SETTINGS,
  ORG_DEFAULT_SETTINGS,
} from '../screens/NotificationSettings/constants';

export const useNotificationSettings = () => {
  const { isTalent } = useGetMe();
  const { data: serverData, isLoading } = useGetNotificationSettings();
  const { mutate: upsertSettings } = useUpsertNotificationSettings();

  const notificationOptions = isTalent
    ? TALENT_NOTIFICATION_OPTIONS
    : ORG_NOTIFICATION_OPTIONS;

  const defaultSettings = isTalent
    ? TALENT_DEFAULT_SETTINGS
    : ORG_DEFAULT_SETTINGS;

  const settings: Record<string, boolean> = useMemo(
    () => ({ ...defaultSettings, ...serverData?.settings }),
    [defaultSettings, serverData?.settings],
  );

  const toggleSetting = (key: string) => (value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    upsertSettings({ settings: newSettings });
  };

  const toggleAll = (value: boolean) => {
    const newSettings = { ...settings };
    notificationOptions.forEach(({ key, enabled }) => {
      if (enabled) {
        newSettings[key] = value;
      }
    });
    upsertSettings({ settings: newSettings });
  };

  const options = notificationOptions.map(({ key, title, enabled }) => ({
    key,
    title,
    enabled,
    value: settings[key] ?? false,
    onToggle: toggleSetting(key),
  }));

  const allEnabled = options
    .filter(option => option.enabled)
    .every(option => option.value);

  return {
    options,
    allEnabled,
    toggleAll,
    isLoading,
  };
};
