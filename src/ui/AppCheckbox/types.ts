import { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';

export interface AppCheckboxProps
  extends Omit<TouchableOpacityProps, 'onPress'> {
  checked?: boolean;
  type?: 'square' | 'circle';
  onChange?: (checked: boolean) => void;
  checkedStyle?: StyleProp<ViewStyle>;
}
