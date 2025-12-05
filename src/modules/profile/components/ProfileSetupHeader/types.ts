import { ColorsKeys } from '@styles';
import { ViewStyle } from 'react-native';

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
