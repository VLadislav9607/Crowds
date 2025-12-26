import { ColorsKeys } from '@styles';
import { ViewStyle } from 'react-native';
import { useAnimatedScrollHandler } from 'react-native-reanimated';

export interface ProfileSetupHeaderProps {
  containerStyle?: ViewStyle;
  circleBadgeStyle?: ViewStyle;
  cnBadgeStyle?: ViewStyle;
  showUnverifiedBadge?: boolean;
  showCnBadge?: boolean;
  cnBadgeColor?: ColorsKeys;
  showCircleBadge?: boolean;
  showCamera?: boolean;
}

export interface AnimatedProfileSetupHeaderRef {
  scrollHandler: ReturnType<typeof useAnimatedScrollHandler>;
}
