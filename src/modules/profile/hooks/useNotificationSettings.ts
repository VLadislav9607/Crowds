import { useState, useMemo } from 'react';
import { useGetMe } from '@actions';

import {
  TALENT_NOTIFICATION_OPTIONS,
  ORG_NOTIFICATION_OPTIONS,
  TALENT_DEFAULT_SETTINGS,
  ORG_DEFAULT_SETTINGS,
} from '../screens/NotificationSettings/constants';

type TalentSettings = typeof TALENT_DEFAULT_SETTINGS;
type OrgSettings = typeof ORG_DEFAULT_SETTINGS;
type Settings = TalentSettings | OrgSettings;

export const useNotificationSettings = () => {
  const { isTalent } = useGetMe();

  const notificationOptions = isTalent
    ? TALENT_NOTIFICATION_OPTIONS
    : ORG_NOTIFICATION_OPTIONS;

  const defaultSettings = isTalent
    ? TALENT_DEFAULT_SETTINGS
    : ORG_DEFAULT_SETTINGS;

  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const toggleSetting = (key: string) => (value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleAll = (value: boolean) => {
    const updatedSettings = notificationOptions.reduce((acc, { key }) => {
      (acc as Record<string, boolean>)[key] = value;
      return acc;
    }, {} as Settings);

    setSettings(updatedSettings);
  };

  const options = useMemo(
    () =>
      notificationOptions.map(({ key, title }) => ({
        key,
        title,
        value: (settings as Record<string, boolean>)[key],
        onToggle: toggleSetting(key),
      })),
    [settings, notificationOptions],
  );

  const allEnabled = options.every(option => option.value);

  return {
    options,
    allEnabled,
    toggleAll,
  };
};
