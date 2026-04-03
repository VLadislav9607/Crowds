import { View } from 'react-native';
import { AppText, Avatar } from '@ui';
import { TalentFlag } from '@modules/common';
import { styles } from './styles';

interface EventDetailHeaderProps {
  location?: string;
  date?: string;
  logoPath?: string;
  officeFlag?: TalentFlag;
}

export const EventDetailHeader = ({
  location,
  date,
  logoPath,
  officeFlag,
}: EventDetailHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <AppText
          renderIf={!!location}
          typography="regular_16"
          color="white"
          margin={{ bottom: 4 }}
          numberOfLines={1}
        >
          {location}
        </AppText>
        <AppText
          renderIf={!!date}
          typography="regular_14"
          color="white"
          numberOfLines={1}
        >
          {date}
        </AppText>
      </View>
      <Avatar
        size={64}
        imgPath={logoPath}
        bucket="brand_avatars"
        flag={officeFlag}
      />
    </View>
  );
};
