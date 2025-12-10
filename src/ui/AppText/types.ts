import { StyleProp, TextProps, TextStyle } from 'react-native';
import { ColorsKeys, TypographyKeysType } from '@styles';

export interface AppTextProps extends TextProps {
  color?: ColorsKeys;
  typography?: TypographyKeysType;
  children: React.ReactNode;
  renderIf?: boolean;
  margin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  style?: StyleProp<TextStyle>;
}
