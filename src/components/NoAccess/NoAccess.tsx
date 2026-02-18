import { IMAGES } from '@assets';
import { Image, View } from 'react-native';
import { styles } from './styles';
import { NoAccessProps } from './types';
import { AppText } from '@ui';

export const NoAccess = ({
  title = 'Oops! You’re not allowed here.',
  description = 'Access to this content is controlled by your admin. You can contact them if you believe you need access.',
  containerStyle,
}: NoAccessProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={IMAGES.noAccess} style={styles.noAccessImage} />
      <AppText
        typography="bold_20"
        color="red"
        margin={{ top: 20, bottom: 10 }}
        style={styles.textCenter}
      >
        {title}
      </AppText>
      <AppText typography="regular_14" style={styles.textCenter}>
        {description}
      </AppText>
    </View>
  );
};
