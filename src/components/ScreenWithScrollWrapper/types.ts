import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { IAppHeaderProps } from '@ui';

export interface IScreenWithScrollWrapperProps extends IAppHeaderProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  isFloatFooter?: boolean;
  withBottomTabBar?: boolean;
  footerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showsVerticalScrollIndicator?: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  animatedScrollHandler?: (event: any) => void;
  useAnimatedScrollView?: boolean;
  keyboardAvoidingEnabled?: boolean;
  showLoader?: boolean;
}
