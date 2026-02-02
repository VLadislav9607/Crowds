import { ScreenWrapper } from '@components';
import { AppText } from '@ui';
import { AppImage } from '@components';
import { View } from 'react-native';
import { styles } from './styles';
import { ICONS } from '@assets';
import { SvgXml } from 'react-native-svg';
import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  ImageSourcePickerModal,
  ImageSourcePickerModalData,
} from '@modules/common';
import { useBucketUpload } from '@actions';
import { showMutationErrorToast } from '@helpers';

export const OrgProfileSetupScreen = () => {
  const imageSourcePickerModalRef =
    useRef<BottomSheetModal<ImageSourcePickerModalData>>(null);

  const { mutate: upsertTalentAvatarMutate, isPending: isUpsertingAvatar } =
    useBucketUpload({
      onError: showMutationErrorToast,
    });

  const pickImage = () => {
    imageSourcePickerModalRef.current?.present({
      onImagePicked: logo => {
        upsertTalentAvatarMutate({
          bucket: 'organizations_avatars',
          file: logo,
        });
      },
    });
  };

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title="Organisation details"
    >
      <View style={styles.logoContainer}>
        <AppText typography="semibold_20">Logo/Brand</AppText>
        <AppText
          typography="regular_14"
          margin={{ top: 7 }}
          style={styles.logoDescription}
        >
          This will be added to any post you make and{'\n'}should fit into a
          square shape.
        </AppText>

        {/* <AppImage 
                bucket="organizations_avatars" 
                style={styles.logoImage} 
                placeholderIcon={ICONS.orgAvatarLogo('lihgt_gray4')}
                /> */}

        <AppImage
          onPress={pickImage}
          showSkeleton={isUpsertingAvatar}
          // imgUri={pickedLogo?.uri}
          containerStyle={styles.imageContainer}
          bucket="organizations_avatars"
          placeholderIcon={ICONS.orgAvatarLogo('lihgt_gray4')}
          CustomElements={
            <View style={styles.cameraWrapper}>
              <SvgXml width={14} height={14} xml={ICONS.camera('black')} />
            </View>
          }
        />

        <ImageSourcePickerModal
          bottomSheetRef={imageSourcePickerModalRef}
          validateForBucket="organizations_avatars"
        />
      </View>
    </ScreenWrapper>
  );
};
