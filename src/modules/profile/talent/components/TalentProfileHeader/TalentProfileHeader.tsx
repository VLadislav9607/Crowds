import { View } from 'react-native';

import { AppButton, AppText, Avatar } from '@ui';
import { ICONS } from '@assets';
import { goToScreen, Screens } from '@navigation';

import { styles } from './styles';

export const TalentProfileHeader = () => (
  <View style={styles.headerContainer}>
    <View style={styles.profileInfoContainer}>
      <Avatar size={64} name="Mia Ferris" />

      <View>
        <View style={styles.nameBadgeContainer}>
          <AppText color="white" typography="semibold_16">
            Mia
          </AppText>

          <View style={[styles.cnBadge, styles.cnBadgeWithBorder]}>
            <AppText color="green" typography="semibold_8">
              CN
            </AppText>
          </View>
        </View>

        <AppText color="gray" typography="regular_14" margin={{ top: 8 }}>
          Female 32, VIC
        </AppText>
      </View>
    </View>

    <AppButton
      onPress={() => goToScreen(Screens.TalentProfileSetup)}
      title="View Profile"
      iconPlace="right"
      icon={ICONS.chevronRight('white')}
      titleStyles={styles.viewProfileButtonTitle}
      iconSize={12}
      size="25"
      wrapperStyles={styles.viewProfileButtonWrapper}
    />
  </View>
);
