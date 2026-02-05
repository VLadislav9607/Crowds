import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import { ScreenWithScrollWrapper, Switch } from '@components';
import { useAppIsActive } from '@hooks';
import {
  getNotificationPermissionStatus,
  openNotificationSettings,
} from '@services';
import { AppText, AppButton } from '@ui';
import { COLORS } from '@styles';

import { useNotificationSettings } from '../../hooks';
import { styles } from './styles';

export const NotificationSettingsScreen = () => {
  const { options, allEnabled, toggleAll } = useNotificationSettings();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const isMountedRef = useRef(true);

  const checkPermission = useCallback(async () => {
    try {
      const granted = await getNotificationPermissionStatus();
      if (isMountedRef.current) {
        setHasPermission(granted);
      }
    } catch {
      if (isMountedRef.current) {
        setHasPermission(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    checkPermission();
    return () => {
      isMountedRef.current = false;
    };
  }, [checkPermission]);

  useAppIsActive(checkPermission);

  const handleOpenSettings = useCallback(() => {
    openNotificationSettings();
  }, []);

  const showSettings = hasPermission === true;

  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitle"
      title="Notification Settings"
      headerStyles={{ backgroundColor: COLORS.black }}
    >
      <View style={[styles.container, !showSettings && styles.containerCentered]}>
        {hasPermission === false && (
          <View style={styles.permissionBlock}>
            <AppText typography="regular_14" style={styles.permissionText}>
              Push notifications are disabled. Enable them in system settings to
              manage notifications for this app.
            </AppText>
            <AppButton
              title="Open notification settings"
              onPress={handleOpenSettings}
              variant="primary"
            />
          </View>
        )}

        {showSettings && (
          <>
            <View style={styles.optionRow}>
              <AppText typography="regular_14">All notifications</AppText>
              <Switch
                active={allEnabled}
                onChange={toggleAll}
                trackColor={{ false: COLORS.white, true: COLORS.main }}
              />
            </View>

            {options.map(option => (
              <View key={option.key} style={styles.optionRow}>
                <AppText typography="regular_14">{option.title}</AppText>
                <Switch
                  active={option.value}
                  onChange={option.onToggle}
                  trackColor={{ false: COLORS.white, true: COLORS.main }}
                />
              </View>
            ))}
          </>
        )}
      </View>
    </ScreenWithScrollWrapper>
  );
};
