import { IAppHeaderProps } from '@ui';
import { StyleProp, ViewStyle } from 'react-native';

export interface IScreenWrapperProps extends IAppHeaderProps {
  children: React.ReactNode;
  withBottomTabBar?: boolean;
  wrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showLoader?: boolean;
}
