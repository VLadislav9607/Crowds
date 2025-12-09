import type { StyleProp, ViewStyle } from 'react-native';
import type { ColorsKeys } from '@styles';

export type SkeletonPlaceholderItemProps = ViewStyle & {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export interface ThemeSkeletonProps {
  backgroundThemeColor?: ColorsKeys;
  highlightThemeColor?: ColorsKeys;

  children: React.ReactNode;

  backgroundColor?: string;
  highlightColor?: string;
  speed?: number;
  direction?: 'right' | 'left';
  enabled?: boolean;
  borderRadius?: number;
}

export type ThemeSkeletonFCProps = React.FC<ThemeSkeletonProps> & {
  Item: React.FC<SkeletonPlaceholderItemProps>;
};
