import { View } from 'react-native';
import { AppText } from '@ui';
import { calculateAge, capitalize } from '@utils';
import { AppImage } from '@components';
import { ICONS } from '@assets';

import { HeaderTalentProfileProps } from './types';
import { styles } from './styles';

export const HeaderTalentProfile = ({
  birthDate,
  gender,
  location,
  avatarUrl,
  fullName,
}: HeaderTalentProfileProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <AppImage
          bucket="talents_avatars"
          imgPath={avatarUrl}
          containerStyle={styles.image}
          placeholderIcon={ICONS.avatar('gray_20')}
        />
      </View>

      <View>
        <View style={styles.nameContainer}>
          <AppText color="black" typography="semibold_20">
            {fullName}
          </AppText>
        </View>

        <AppText color="black" typography="regular_16" margin={{ bottom: 2 }}>
          {capitalize(gender)}, {calculateAge(birthDate) || ''}
        </AppText>
        <AppText color="black_60" typography="regular_16">
          {location}
        </AppText>
      </View>
    </View>
  );
};
