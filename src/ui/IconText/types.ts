import { TouchableOpacityProps } from 'react-native';
import { AppTextProps } from '../AppText';

export interface IconTextProps extends TouchableOpacityProps {
  icon: string;
  iconSize?: number;
  gap?: number;
  text: string;
  textProps?: Omit<AppTextProps, 'children'>;
}
