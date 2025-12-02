import { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';
import { AppTextProps } from '../AppText';
import { ColorsKeys } from '@styles';

export interface AppCheckboxProps
  extends Omit<TouchableOpacityProps, 'onPress'> {
  checked?: boolean;
  type?: 'square' | 'circle' | 'checkedIcon';
  label?: string;
  labelProps?: Partial<AppTextProps>;
  checkedStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  color?: ColorsKeys;
  colorChecked?: ColorsKeys;
  onChange?: (checked: boolean) => void;
}
