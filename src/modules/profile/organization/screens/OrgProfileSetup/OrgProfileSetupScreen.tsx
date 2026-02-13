import { ScreenWithScrollWrapper } from '@components';
import { AppButton, AppInput, AppText } from '@ui';
import { AppImage } from '@components';
import { View } from 'react-native';
import { styles } from './styles';
import { ICONS } from '@assets';
import { SvgXml } from 'react-native-svg';
import { useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  ImageSourcePickerModal,
  ImageSourcePickerModalData,
} from '@modules/common';
import { useBucketUpload, useGetMe, useUpdateBrand } from '@actions';
import { showMutationErrorToast, showSuccessToast } from '@helpers';
import { goBack } from '@navigation';

export const OrgProfileSetupScreen = () => {
  const imageSourcePickerModalRef =
    useRef<BottomSheetModal<ImageSourcePickerModalData>>(null);

  const { organizationMember, refetch } = useGetMe();

  const { mutateAsync: updateBrandMutateAsync } = useUpdateBrand();

  const [orgName, setOrgName] = useState(
    organizationMember?.current_context?.brand?.name,
  );

  const { mutate: updateBrandMutate, isPending: isUpdatingBrand } =
    useUpdateBrand({
      onSuccess: async () => {
        await refetch();
        goBack();
        showSuccessToast('Changes saved successfully');
      },
      onError: showMutationErrorToast,
    });

  const { mutate: upsertTalentAvatarMutate, isPending: isUpsertingAvatar } =
    useBucketUpload({
      onError: showMutationErrorToast,
      onSuccess: async data => {
        await updateBrandMutateAsync({
          brand_id: organizationMember?.current_context?.brand?.id!,
          logo_path: data.uploadedFile.path,
        });
        await refetch();
        showSuccessToast('Logo updated successfully');
      },
    });

  const pickImage = () => {
    imageSourcePickerModalRef.current?.present({
      onImagePicked: logo => {
        upsertTalentAvatarMutate({
          bucket: 'organizations_avatars',
          file: { uri: logo.uri, type: logo.type, name: logo.name },
          folderName: organizationMember?.current_context?.brand?.id,
        });
      },
    });
  };

  const handleSaveChanges = () => {
    updateBrandMutate({
      brand_id: organizationMember?.current_context?.brand?.id!,
      brand_name: orgName,
    });
  };

  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitleAndImageBg"
      title="Organisation details"
      contentContainerStyle={{ paddingTop: 24 }}
      footer={
        <AppButton
          wrapperStyles={styles.saveButtonWrapper}
          title="Save changes"
          onPress={handleSaveChanges}
          isLoading={isUpdatingBrand}
        />
      }
    >
      <View style={styles.logoContainer}>
        <AppText typography="semibold_20">Logo/Brand</AppText>
        <AppText
          typography="regular_14"
          margin={{ top: 7, bottom: 36 }}
          style={styles.logoDescription}
        >
          This will be added to any post you make and{'\n'}should fit into a
          square shape.
        </AppText>

        <AppImage
          onPress={pickImage}
          showSkeleton={isUpsertingAvatar}
          imgPath={organizationMember?.current_context?.brand?.logo_path}
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

        <AppText typography="semibold_16" margin={{ top: 32, bottom: 27 }}>
          Business contact details
        </AppText>

        <View style={{ gap: 16 }}>
          <AppInput
            label="Company/business name"
            labelProps={{ color: 'main', typography: 'regular_12' }}
            value={orgName}
            onChangeText={setOrgName}
          />

          <AppInput
            disabled
            label="Official email address"
            labelProps={{ color: 'main', typography: 'regular_12' }}
            value={organizationMember?.email}
          />
        </View>
      </View>
    </ScreenWithScrollWrapper>
  );
};
