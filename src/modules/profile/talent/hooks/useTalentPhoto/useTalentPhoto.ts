import { useRef } from 'react';
import { Keyboard } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useGetMe } from '@actions';
import { ImageSourcePickerModalData, PickedImage } from '@modules/common';
import { useUpdateTalentProfile } from '../useUpdateTalentProfile';

export const useTalentPhoto = () => {
  const { data: me } = useGetMe();
  const { uploadFullBodyPhoto, isUploadingPhoto } = useUpdateTalentProfile();

  const imageSourcePickerModalRef =
    useRef<BottomSheetModal<ImageSourcePickerModalData>>(null);

  const currentPhoto = me?.talent?.avatar_full_path;

  const openPhotoPicker = () => {
    Keyboard.dismiss();
    imageSourcePickerModalRef.current?.present({
      onImagePicked: (image: PickedImage) => {
        uploadFullBodyPhoto(image);
      },
    });
  };

  return {
    currentPhoto,
    isUploadingPhoto,
    openPhotoPicker,
    imageSourcePickerModalRef,
  };
};

