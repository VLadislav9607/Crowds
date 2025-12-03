import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { AppCheckboxProps, AppTextProps } from '@ui';

export interface CheckboxListItem {
  label: string;
  value: string;
}

export interface CheckboxListProps {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  errorMessage?: string;
  errorMessageProps?: Partial<AppTextProps>;
  items: CheckboxListItem[];
  checkedValues?: string[] | string;
  containerStyle?: StyleProp<ViewStyle>;
  listContainerStyle?: StyleProp<ViewStyle>;
  checkboxProps?: Partial<AppCheckboxProps>;
  onCheckboxPress?: (item: CheckboxListItem) => void;
  onCheckedValuesChange?: (values: string[]) => void;
}
