import { TextInputProps, ViewStyle } from 'react-native';
import { AppTextProps } from '../AppText/types';

export interface AppTextareaProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  labelProps?: Partial<AppTextProps>;
  errorMessageProps?: Partial<AppTextProps>;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  labelContainerStyle?: ViewStyle;
  optional?: boolean;
}
