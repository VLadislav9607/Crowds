import { PressableProps } from 'react-native';
import { AppTextProps } from '../AppText';

export interface IconTextProps extends PressableProps {
  icon: string;
  iconSize?: number;
  gap?: number;
  text: string;
  textProps?: Partial<AppTextProps>;
}
