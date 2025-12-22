import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader } from '@ui';
import { styles } from './styles';
import { IScreenWrapperProps } from './types';

interface IScreenWrapperProps extends IAppHeaderProps {
  children: React.ReactNode;
  witBottomTab?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const ScreenWrapper = ({
  children,
    containerStyle,
  contentContainerStyle,
  witBottomTab = false,
  ...headerProps
}: IScreenWrapperProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        { paddingBottom: withBottomTabBar ? 16 : bottom || 16 },
        wrapperStyle,
      ]}
    >
      {headerProps.headerVariant && <AppHeader {...headerProps} />}

      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>
    </View>
  );
};
