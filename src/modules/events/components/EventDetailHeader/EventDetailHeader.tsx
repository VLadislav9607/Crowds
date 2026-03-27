import { View } from 'react-native';
import { AppText } from '@ui';
import { AppImage } from '@components';
import { styles } from './styles';

interface EventDetailHeaderProps {
  location?: string;
  date?: string;
  logoPath?: string;
}

export const EventDetailHeader = ({
  location,
  date,
  logoPath,
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
      <AppImage
        imgPath={logoPath}
        bucket="brand_avatars"
        containerStyle={styles.image}
      />
    </View>
  );
};
