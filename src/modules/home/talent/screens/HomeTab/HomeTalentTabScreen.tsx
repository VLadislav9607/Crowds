import { ScreenWrapper } from '@components';
import { View } from 'react-native';
import { ICONS } from '@assets';
import { COLORS } from '@styles';

export const HomeTalentTabScreen = () => {
  return (
    <ScreenWrapper
      headerVariant="withLogo"
      logoProps={{ width: 164, height: 34.5 }}
      headerStyles={{ backgroundColor: COLORS.black }}
      rightIcons={[
        {
          icon: () => ICONS.search('white'),
          onPress: () => {},
        },
      ]}
    >
      <View />
    </ScreenWrapper>
  );
};
