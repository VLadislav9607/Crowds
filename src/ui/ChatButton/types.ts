import { TouchableOpacityProps } from 'react-native';

export interface ChatButtonProps extends TouchableOpacityProps {
  topText?: string;
  bottomText?: string;
  isLoading?: boolean;
  showSkeleton?: boolean;
}
