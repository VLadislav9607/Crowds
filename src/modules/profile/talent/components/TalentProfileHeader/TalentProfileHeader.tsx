import { View } from 'react-native';

import { AppButton, AppText, Avatar } from '@ui';
import { ICONS } from '@assets';
import { goToScreen, Screens } from '@navigation';
import { capitalize } from '@utils';

import { styles } from './styles';

interface TalentProfileHeaderProps {
  fullName: string;
  gender: string;
  age: number;
  avatarUri: string;
  location: string;
}

export const TalentProfileHeader = ({
  fullName,
  gender,
  age,
  avatarUri,
  location,
}: TalentProfileHeaderProps) => (
  <View style={styles.headerContainer}>
    <Avatar
      size={64}
      bucket="talents_avatars"
      imgPath={avatarUri}
      name={fullName}
    />

    <View style={styles.textContainer}>
      <View style={styles.nameBadgeContainer}>
        <AppText color="white" typography="semibold_16">
          {fullName}
        </AppText>

        <View style={[styles.cnBadge, styles.cnBadgeWithBorder]}>
          <AppText color="green" typography="semibold_8">
            CN
          </AppText>
        </View>
      </View>

      <AppText
        color="gray"
        typography="regular_14"
        numberOfLines={2}
        style={styles.infoTextContainer}
      >
        {capitalize(gender)} {age}, {location}
      </AppText>
    </View>

    <AppButton
      onPress={() => goToScreen(Screens.TalentProfileSetup)}
      title="View Profile"
      iconPlace="right"
      icon={ICONS.chevronRight('white')}
      titleStyles={styles.viewProfileButtonTitle}
      iconSize={12}
      width={98}
      size="25"
      wrapperStyles={styles.viewProfileButtonWrapper}
    />
  </View>
);
