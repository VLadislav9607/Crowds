import { AppText } from '@ui';
import { View } from 'react-native';
import { styles } from './styles';
import { ProfileSetupHeaderProps } from './types';
import { AppImage, If } from '@components';
import { COLORS } from '@styles';
import { SvgXml } from 'react-native-svg';
import { ICONS } from '@assets';
import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  ImageSourcePickerModal,
  ImageSourcePickerModalData,
  PickedImage,
} from '@modules/common';
import { calculateAge, capitalize } from '@utils';
import { useBucketUpload, useGetMe, useUpdateTalent } from '@actions';
import { showMutationErrorToast } from '@helpers';

export const ProfileSetupHeader = ({
  containerStyle,
  showCircleBadge = false,
  showUnverifiedBadge = false,
  showCnBadge,
  cnBadgeColor,
  circleBadgeStyle,
  cnBadgeStyle,
  showCamera = false,
}: ProfileSetupHeaderProps) => {
  const { mutateAsync: updateTalentMutateAsync } = useUpdateTalent();

  const { mutate: upsertTalentAvatarMutate, isPending: isUpsertingAvatar } =
    useBucketUpload({
      onSuccess: async data => {
        await updateTalentMutateAsync({
          id: talent?.id!,
          data: { avatar_path: data.uploadedFile.path },
        });
      },
      onError: showMutationErrorToast,
    });

  const imageSourcePickerModalRef =
    useRef<BottomSheetModal<ImageSourcePickerModalData>>(null);

  const { data: me } = useGetMe();

  const talent = me?.talent;

  const pickImage = () => {
    imageSourcePickerModalRef.current?.present({
      onImagePicked: (image: PickedImage) => {
        upsertTalentAvatarMutate({ bucket: 'talents_avatars', file: image });
      },
    });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.imageWrapper}>
        <AppImage
          bucket="talents_avatars"
          imgPath={me?.talent?.avatar_path}
          containerStyle={styles.image}
          showSkeleton={isUpsertingAvatar}
          onPress={pickImage}
          placeholderIcon={ICONS.avatar('gray_20')}
          CustomElements={
            <If condition={!me?.talent?.avatar_path}>
              <If condition={showCamera}>
                <View style={styles.cameraContainer}>
                  <SvgXml xml={ICONS.camera('black')} width={16} height={13} />
                </View>
              </If>

              <If condition={showCircleBadge}>
                <View
                  style={[
                    styles.circleBadge,
                    !showUnverifiedBadge && styles.circleBadgeUnverified,
                    circleBadgeStyle,
                  ]}
                />
              </If>

              <If condition={showUnverifiedBadge}>
                <View style={styles.unverifiedBadge}>
                  <AppText color="white" typography="bold_10">
                    Unverified
                  </AppText>
                </View>
              </If>
            </If>
          }
        />
      </View>

      <View>
        <View style={styles.nameContainer}>
          <AppText color="black" typography="semibold_20">
            {me?.talent?.first_name}
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
          {capitalize(me?.talent?.gender)},{' '}
          {calculateAge(me?.talent?.birth_date) || ''}
        </AppText>
        <AppText color="black_60" typography="regular_16">
          {me?.talent?.talent_location?.country},{' '}
          {me?.talent?.talent_location?.city || ''}
        </AppText>
      </View>

      <ImageSourcePickerModal bottomSheetRef={imageSourcePickerModalRef} />
    </View>
  );
};
