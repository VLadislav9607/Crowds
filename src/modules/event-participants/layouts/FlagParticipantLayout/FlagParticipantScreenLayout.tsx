import { View } from 'react-native';

import { ScreenWithScrollWrapper } from '@components';
import { AppText, Avatar } from '@ui';

import { styles } from './styles';
import { FlagParticipantLayoutProps } from './types';
import { ICONS } from '@assets';

export const FlagParticipantScreenLayout = ({
  children,
  participant,
}: FlagParticipantLayoutProps) => {
  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitle"
      colorHeader="black"
      title="Flag participant"
      contentContainerStyle={styles.contentContainer}
      rightIcons={[
        {
          icon: () => ICONS.dotsVertical('white'),
          onPress: () => {},
        },
      ]}
    >
      <View style={styles.userInfoSection}>
        <Avatar
          size={148}
          name={participant.name}
          style={styles.avatar}
          uri={participant.avatarUrl}
        />
        <View style={styles.userDetails}>
          <AppText typography="extra_bold_22">{participant.name}</AppText>
          <AppText typography="regular_18">
            {participant.gender} {participant.age}
          </AppText>
          <AppText typography="regular_18">{participant.location}</AppText>
        </View>
      </View>

      {children}
    </ScreenWithScrollWrapper>
  );
};
