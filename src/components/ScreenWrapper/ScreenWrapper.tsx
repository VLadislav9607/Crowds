import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader } from '@ui';
import { styles } from './styles';
import { IScreenWrapperProps } from './types';

export const ScreenWrapper = ({
  children,
  contentContainerStyle,
  withBottomTabBar = false,
  wrapperStyle,
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
