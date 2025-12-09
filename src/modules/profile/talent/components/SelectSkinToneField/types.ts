import { BottomSheetFieldProps } from '@components';
import { ViewStyle } from 'react-native';

export interface SelectSkinToneFieldItem {
  label: string;
  value: string;
  hex: string;
}

export interface SelectSkinToneFieldProps {
  fieldProps?: Partial<Omit<BottomSheetFieldProps, 'children'>>;
  options?: SelectSkinToneFieldItem[];
  selectedValues?: string | string[];
  containerStyle?: ViewStyle;
  enableAutoClose?: boolean;
  onOptionSelect?: (value: SelectSkinToneFieldItem, index: number) => void;
  onSelectedOptionsChange?: (values: SelectSkinToneFieldItem[]) => void;
}
