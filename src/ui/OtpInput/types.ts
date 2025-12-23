import { ViewStyle } from 'react-native';
import { AppTextProps } from '../AppText/types';

export interface OtpInputProps {
  label?: string;
  errorMessage?: string;
  labelProps?: Partial<AppTextProps>;
  errorMessageProps?: Partial<AppTextProps>;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string)=>void
  onComplete?: (value: string) => void;
  autofocus?: boolean;
}
