import { AppTextProps } from '@ui';
import { StyleProp, ViewStyle } from 'react-native';

export interface IRangeSelectorProps {
  min: number;
  max: number;
  defaultMinValue: number;
  defaultMaxValue: number;
  containerStyles?: StyleProp<ViewStyle>;
  label?: string;
  step?: number;
  disableRange?: boolean;
  labelProps?: Partial<AppTextProps>;
  measure?: string;
  bottomLabels?: {
    minValueLabel: string;
    maxValueLabel: string;
    containerStyles?: StyleProp<ViewStyle>;
    labelProps?: Partial<AppTextProps>;
  };
  onRenderValue: (values: {min: number, max: number}) => string;
  onSlidingComplete: (values: Array<number>) => void;
}
