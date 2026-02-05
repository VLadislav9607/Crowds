import { TextInputProps, ViewStyle } from 'react-native';
import { AppTextProps } from '../AppText/types';

export interface AppInputProps extends TextInputProps {
  label?: string;
  description?: string;
  errorMessage?: string;
  labelProps?: Partial<AppTextProps>;
  errorMessageProps?: Partial<AppTextProps>;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  inputContainerStyle?: ViewStyle;
  skeleton?: boolean;
}
