import { ViewStyle } from 'react-native';
import { AppTextProps } from '../../ui/AppText/types';

export interface AppDateInputProps {
  label?: string;
  description?: string;
  mode?: 'date' | 'time' | 'datetime';
  customIcon?: string;
  placeholder?: string;
  errorMessage?: string;
  labelProps?: Partial<AppTextProps>;
  errorMessageProps?: Partial<AppTextProps>;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  value?: Date;
  useDefaultIcon?: boolean;
  defaultIconPosition?: 'left' | 'right';
  fieldStyle?: ViewStyle;
  placeholderProps?: Partial<AppTextProps>;
  valueProps?: Partial<AppTextProps>;
  onChange?: (date: Date) => void;
  valueFormat?: string;
  maximumDate?: Date;
  minimumDate?: Date;
  locale?: string;
}
