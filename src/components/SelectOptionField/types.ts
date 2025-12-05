import { BottomSheetFieldProps } from '../BottomSheetField';
import { ViewStyle } from 'react-native';

export interface SelectOptionFieldItem {
  label: string;
  value: string;
}

export interface SelectOptionFieldProps {
  fieldProps?: Partial<Omit<BottomSheetFieldProps, 'children'>>;
  options?: SelectOptionFieldItem[];
  selectedValues?: string | string[];
  containerStyle?: ViewStyle;
  enableAutoClose?: boolean;
  onOptionSelect?: (value: SelectOptionFieldItem, index: number) => void;
  onSelectedOptionsChange?: (values: SelectOptionFieldItem[]) => void;
}
