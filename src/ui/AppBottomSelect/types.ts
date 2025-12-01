import { ViewStyle } from 'react-native';
import { AppTextProps } from '../AppText/types';
import { BottomSheetModal, BottomSheetProps } from '@gorhom/bottom-sheet';

export interface AppBottomSelectProps {
  label?: string;
  errorMessage?: string;
  labelProps?: Partial<AppTextProps>;
  errorMessageProps?: Partial<AppTextProps>;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  placeholderText?: string;
  placeholderTextProps?: Partial<AppTextProps>;
  value?: string;
  children?:
    | React.ReactNode
    | ((props: { onClose: () => void }) => React.ReactNode);
  bottomSheetRef?: React.RefObject<BottomSheetModal>;
  bottomSheetProps?: BottomSheetProps;
  disableRenderWhenClosed?: boolean;
}
