import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// types
import type { SkeletonPlaceholderItemProps, ThemeSkeletonProps } from './types';
import { COLORS } from '@styles';

const Skeleton: React.FC<ThemeSkeletonProps> & {
  Item: React.FC<SkeletonPlaceholderItemProps>;
} = ({
  highlightThemeColor = 'gray_bg',
  backgroundThemeColor = 'gray_50',
  ...props
}: ThemeSkeletonProps) => {
  return (
    <SkeletonPlaceholder
      {...props}
      highlightColor={
        highlightThemeColor ? COLORS[highlightThemeColor] : props.highlightColor
      }
      backgroundColor={
        backgroundThemeColor
          ? COLORS[backgroundThemeColor]
          : props.backgroundColor
      }
    />
  );
};

Skeleton.Item = SkeletonPlaceholder.Item;

export { Skeleton };
