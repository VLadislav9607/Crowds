import { ColorsKeys, TypographyKeysType } from '@styles';
import { TextProps } from 'react-native';

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
}
