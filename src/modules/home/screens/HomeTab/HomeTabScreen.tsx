import { View } from 'react-native';
import { ScreenWrapper } from '@components';
import { AppText } from '@ui';

export const HomeTabScreen = () => {
  return (
    <ScreenWrapper headerVariant="withLogoAndImageBg">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AppText>Template screen</AppText>
      </View>
    </ScreenWrapper>
  );
};
