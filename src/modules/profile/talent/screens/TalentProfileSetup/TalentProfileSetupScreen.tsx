import { ScreenWithScrollWrapper } from '@components';
import { COLORS } from '@styles';
import { View } from 'react-native';
import { AppText } from '@ui';

export const TalentProfileSetupScreen = () => {
  return (
    <ScreenWithScrollWrapper
      title="Setup My Profile"
      headerVariant="withTitle"
      headerStyles={{
        backgroundColor: COLORS.black,
      }}
      customElement={<View />}
    >
      <View>
        <AppText>TalentProfileSetupScreen</AppText>
      </View>
    </ScreenWithScrollWrapper>
  );
};
