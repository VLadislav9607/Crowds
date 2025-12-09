import { ViewStyle } from 'react-native';
import { AppTextProps } from '@ui';
import { BottomSheetModal, BottomSheetProps } from '@gorhom/bottom-sheet';

export interface BottomSheetFieldProps {
  label?: string;
  errorMessage?: string;
  labelProps?: Partial<AppTextProps>;
  errorMessageProps?: Partial<AppTextProps>;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  placeholderText?: string;
  placeholderTextProps?: Partial<AppTextProps>;
  leftIcon?: React.ReactNode;
  value?: string;
  children?:
    | React.ReactNode
    | ((props: { onClose: () => void }) => React.ReactNode);
  bottomSheetRef?: React.RefObject<BottomSheetModal>;
  bottomSheetProps?: Partial<BottomSheetProps>;
  disableRenderWhenClosed?: boolean;
}
