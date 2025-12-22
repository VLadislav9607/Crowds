import { View } from 'react-native';

import { ScreenWithScrollWrapper, Switch } from '@components';
import { AppText } from '@ui';
import { COLORS } from '@styles';

import { useNotificationSettings } from '../../hooks';
import { styles } from './styles';

export const NotificationSettingsScreen = () => {
  const { options, allEnabled, toggleAll } = useNotificationSettings();

  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitle"
      title="Notification Settings"
      headerStyles={{ backgroundColor: COLORS.black }}
    >
      <View style={styles.container}>
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
      </View>
    </ScreenWithScrollWrapper>
  );
};
