import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { NumberProp } from 'react-native-svg';

export type ButtonSize = '60' | '56' | '50' | '40' | '37' | '36' | '31' | '28' | '25';
export type ButtonVariant = 'primary' | 'withBorder';

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  mb?: number;
  width?: number;
  size?: ButtonSize;
  variant?: ButtonVariant;
  isDisabled?: boolean;
  isLoading?: boolean;
  icon?: string | null;
  iconPlace?: 'left' | 'right';
  iconSize?: NumberProp;
  iconStyle?: StyleProp<ViewStyle>;
  wrapperStyles?: StyleProp<ViewStyle>;
  titleStyles?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}
