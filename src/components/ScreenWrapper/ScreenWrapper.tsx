import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader } from '@ui';
import { IScreenWrapperProps } from './types';

export const ScreenWrapper = ({
  children,
  contentContainerStyle,
  withBottomTabBar = false,
  ...headerProps
}: IScreenWrapperProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        { paddingBottom: withBottomTabBar ? 0 : bottom || 16 },
      ]}
    >
      {headerProps.headerVariant && <AppHeader {...headerProps} />}

      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});
