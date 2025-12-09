import { AppButton } from '@ui';
import {
  ImageSourcePickerModalProps,
  ImageSourcePickerModalData,
  PickedImage,
} from './types';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@styles';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';

export const ImageSourcePickerModal = ({
  bottomSheetProps,
  bottomSheetRef,
  imagePickerOptions,
  cameraOptions,
}: ImageSourcePickerModalProps) => {
  const insets = useSafeAreaInsets();

  const handleCloseSheet = useCallback(
    () => bottomSheetRef?.current?.dismiss(),
    [bottomSheetRef],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={handleCloseSheet}
      />
    ),
    [handleCloseSheet],
  );

  const backgroundStyle: BottomSheetBackdropProps['style'] = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  };

  const handleImagePickerResponse = useCallback(
    (
      response: ImagePickerResponse,
      onImagePicked?: (image: PickedImage) => void,
    ) => {
      if (response.didCancel) {
        return;
      }

      if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
        return;
      }

      if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        onImagePicked?.({
          uri: asset.uri || '',
          name: asset.fileName || `photo_${Date.now()}.jpg`,
          type: asset.type || 'image/jpeg',
        });
        handleCloseSheet?.();
      }
    },
    [handleCloseSheet],
  );

  const handlePickFromGallery = useCallback(
    (onImagePicked?: (image: PickedImage) => void) => {
      const options = {
        mediaType: 'photo' as MediaType,
        quality: 0.8 as const,
        includeBase64: false,
        ...imagePickerOptions,
      };

      launchImageLibrary(options, response =>
        handleImagePickerResponse(response, onImagePicked),
      );
    },
    [handleImagePickerResponse, imagePickerOptions],
  );

  const handlePickFromCamera = useCallback(
    (onImagePicked?: (image: PickedImage) => void) => {
      const options = {
        mediaType: 'photo' as MediaType,
        quality: 0.8 as const,
        includeBase64: false,
        ...cameraOptions,
      };

      launchCamera(options, response =>
        handleImagePickerResponse(response, onImagePicked),
      );
    },
    [handleImagePickerResponse, cameraOptions],
  );

  return (
    <BottomSheetModal<ImageSourcePickerModalData>
      ref={bottomSheetRef}
      snapPoints={[145 + insets.bottom]}
      enablePanDownToClose
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      backgroundStyle={backgroundStyle}
      {...bottomSheetProps}
    >
      {({ data }) => {
        const onImagePicked = data?.onImagePicked;
        return (
          <BottomSheetView style={styles.bottomSheetContent}>
            <AppButton
              title="Pick from Gallery"
              onPress={() => handlePickFromGallery(onImagePicked)}
              size="50"
              variant="withBorder"
              titleStyles={{ color: COLORS.black }}
              wrapperStyles={{ borderColor: COLORS.black }}
            />
            <AppButton
              title="Open Camera"
              onPress={() => handlePickFromCamera(onImagePicked)}
              size="50"
              variant="withBorder"
              titleStyles={{ color: COLORS.black }}
              wrapperStyles={{ borderColor: COLORS.black }}
            />
          </BottomSheetView>
        );
      }}
    </BottomSheetModal>
  );
};
