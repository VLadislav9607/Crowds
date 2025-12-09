import { AppText } from '@ui';
import { TouchableOpacity, View, Image } from 'react-native';
import { styles } from './styles';
import { ProfileSetupHeaderProps } from './types';
import { If } from '@components';
import { COLORS } from '@styles';
import { SvgXml } from 'react-native-svg';
import { ICONS } from '@assets';
import { useState, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  ImageSourcePickerModal,
  ImageSourcePickerModalData,
  PickedImage,
} from '@modules/common';

export const ProfileSetupHeader = ({
  containerStyle,
  showCircleBadge,
  showUnverifiedBadge,
  showCnBadge,
  cnBadgeColor,
  circleBadgeStyle,
  cnBadgeStyle,
  showCamera,
}: ProfileSetupHeaderProps) => {
  const [photo, setPhoto] = useState<PickedImage | null>(null);
  const imageSourcePickerModalRef =
    useRef<BottomSheetModal<ImageSourcePickerModalData>>(null);

  const pickImage = () => {
    imageSourcePickerModalRef.current?.present({
      onImagePicked: (image: PickedImage) => {
        setPhoto(image);
      },
    });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.imageContainer}
        onPress={showCamera ? pickImage : undefined}
      >
        <If condition={!!showCamera}>
          <View style={styles.cameraContainer}>
            <SvgXml xml={ICONS.camera('black')} width={16} height={13} />
          </View>
        </If>

        <If condition={!!photo?.uri}>
          {photo?.uri && (
            <Image
              source={{ uri: photo.uri }}
              style={styles.imageContainer}
              resizeMode="cover"
            />
          )}
        </If>

        <If condition={!photo?.uri}>
          <SvgXml
            xml={ICONS.avatar('gray')}
            width={112}
            height={112}
            opacity={0.2}
          />
        </If>

        <If condition={!!showCircleBadge}>
          <View
            style={[
              styles.circleBadge,
              !showUnverifiedBadge && styles.circleBadgeUnverified,
              circleBadgeStyle,
            ]}
          />
        </If>

        <If condition={!!showUnverifiedBadge}>
          <View style={styles.unverifiedBadge}>
            <AppText color="white" typography="bold_10">
              Unverified
            </AppText>
          </View>
        </If>
      </TouchableOpacity>

      <View>
        <View style={styles.nameContainer}>
          <AppText color="black" typography="semibold_20">
            Mia
          </AppText>

          <If condition={!!showCnBadge}>
            <View
              style={[
                styles.cnBadge,
                { borderColor: COLORS[cnBadgeColor || 'red'] },
                cnBadgeStyle,
              ]}
            >
              <AppText color={cnBadgeColor || 'red'} typography="semibold_8">
                CN
              </AppText>
            </View>
          </If>
        </View>

        <AppText color="black" typography="regular_16" margin={{ bottom: 2 }}>
          Female, 32
        </AppText>
        <AppText color="black_60" typography="regular_16">
          VIC
        </AppText>
      </View>

      <ImageSourcePickerModal bottomSheetRef={imageSourcePickerModalRef} />
    </View>
  );
};
