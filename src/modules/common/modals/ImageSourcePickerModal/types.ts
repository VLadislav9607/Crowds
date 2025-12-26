import { BottomSheetModal, BottomSheetProps } from '@gorhom/bottom-sheet';
import { CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import { RefObject } from 'react';

export interface PickedImage {
  uri: string;
  name: string;
  type: string;
  size?: number;
}

export interface ImageSourcePickerModalData {
  onImagePicked?: (image: PickedImage) => void;
}

export interface ImageSourcePickerModalProps {
  bottomSheetProps?: Partial<BottomSheetProps>;
  imagePickerOptions?: ImageLibraryOptions;
  cameraOptions?: CameraOptions;
  bottomSheetRef?: RefObject<BottomSheetModal<ImageSourcePickerModalData> | null>;
  onImagePicked?: (image: PickedImage) => void;
}
