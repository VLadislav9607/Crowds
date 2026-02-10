import { View } from 'react-native';
import { ScreenWithScrollWrapper } from '@components';
import { AppText, Avatar } from '@ui';
import { ICONS } from '@assets';
import { useGetTalentFullProfile } from '@actions';
import { calculateAge } from '@utils';
import { TalentFlag } from '@modules/common';

import { styles } from './styles';
import { FlagParticipantLayoutProps } from './types';

export const FlagParticipantScreenLayout = ({
  children,
  talentId,
}: FlagParticipantLayoutProps) => {
  const { data: participant } = useGetTalentFullProfile(talentId);

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
          flag={participant?.flag as TalentFlag}
          name={participant?.first_name + ' ' + participant?.last_name}
          style={styles.avatar}
          bucket="talents_avatars"
          imgPath={participant?.avatar_path || undefined}
        />
        <View style={styles.userDetails}>
          <AppText typography="extra_bold_22">
            {participant?.first_name + ' ' + participant?.last_name}
          </AppText>
          <AppText typography="regular_18">
            {participant?.gender} {calculateAge(participant?.birth_date)}
          </AppText>
          <AppText typography="regular_18">
            {participant?.address || ''}
          </AppText>
        </View>
      </View>

      {children}
    </ScreenWithScrollWrapper>
  );
};
