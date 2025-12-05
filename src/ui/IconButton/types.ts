import { PressableProps, StyleProp, ViewStyle } from 'react-native';

export interface IconButtonProps extends PressableProps {
  icon: string;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
}
