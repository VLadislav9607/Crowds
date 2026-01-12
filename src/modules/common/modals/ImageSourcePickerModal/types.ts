import { BottomSheetModal, BottomSheetProps } from '@gorhom/bottom-sheet';
import { CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import { RefObject } from 'react';
import { BucketsTypes } from '@configs';

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
  validateForBucket?: BucketsTypes;
  onImagePicked?: (image: PickedImage) => void;
}
