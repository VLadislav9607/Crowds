import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { AppText } from '@ui';
import { AppImage, If } from '@components';
import { ICONS, IMAGES } from '@assets';
import { styles } from '../styles';

interface PhotoUploadSectionProps {
  userFullBodyPhoto?: string | null;
  isUploadingPhoto?: boolean;
  errorMessage?: string;
  onPress: () => void;
}

export const PhotoUploadSection = ({
  userFullBodyPhoto,
  isUploadingPhoto,
  errorMessage,
  onPress,
}: PhotoUploadSectionProps) => {
  return (
    <>
      <AppImage
        bucket="talents_full_body_photos"
        imgPath={userFullBodyPhoto}
        placeholderImage={IMAGES.userWithGrayBg}
        containerStyle={styles.photoContainer}
        showSkeleton={isUploadingPhoto}
        onPress={onPress}
        CustomElements={
          <If condition={!userFullBodyPhoto && !isUploadingPhoto}>
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
        }
      />

      <If condition={!!errorMessage}>
        <AppText typography="medium_10" color="red" margin={{ top: 8 }}>
          {errorMessage || 'One Full Length Shot'}
        </AppText>
      </If>
    </>
  );
};
