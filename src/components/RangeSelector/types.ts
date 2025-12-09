import { AppTextProps } from '@ui';
import { StyleProp, ViewStyle } from 'react-native';

export interface IRangeSelectorProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  containerStyles?: StyleProp<ViewStyle>;
  label?: string;
  onValueChange: (low: number, high: number) => void;
  step?: number;
  disableRange?: boolean;
  labelProps?: Partial<AppTextProps>;
  measure?: string;
  value?: string | number;
  bottomLabels?: {
    minValueLabel: string;
    maxValueLabel: string;
    containerStyles?: StyleProp<ViewStyle>;
    labelProps?: Partial<AppTextProps>;
  };
}
