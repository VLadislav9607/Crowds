import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { AppText } from '@ui';
import { If } from '@components';
import { ICONS, IMAGES } from '@assets';
import { PickedImage } from '@modules/common';
import { styles } from '../styles';

interface PhotoUploadSectionProps {
  photo?: PickedImage;
  errorMessage?: string;
  onPress: () => void;
}

export const PhotoUploadSection = ({
  photo,
  errorMessage,
  onPress,
}: PhotoUploadSectionProps) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.photoContainerWrapper}
      >
        <ImageBackground
          source={photo?.uri ? { uri: photo.uri } : IMAGES.userWithGrayBg}
          style={styles.photoContainer}
        >
          <If condition={!photo?.uri}>
            <SvgXml
              xml={ICONS.manScan()}
              width={30}
              height={30}
              style={styles.manScan}
            />
            <View style={styles.cameraContainer}>
              <SvgXml xml={ICONS.camera('black')} width={15} height={15} />
            </View>
          </If>
        </ImageBackground>
      </TouchableOpacity>

      <If condition={!!errorMessage}>
        <AppText typography="medium_10" color="red" margin={{ top: 8 }}>
          {errorMessage || 'One Full Length Shot'}
        </AppText>
      </If>
    </View>
  );
};
