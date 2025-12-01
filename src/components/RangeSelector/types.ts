export type Measure = 'km' | 'Kg' | 'Ft';

export interface IRangeSelectorProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  measure: Measure;
  containerStyles?: StyleProp<ViewStyle>;
  label?: string;
  onValueChange: (low: number, high: number) => void;
  step?: number;
  disabled?: boolean;
}
