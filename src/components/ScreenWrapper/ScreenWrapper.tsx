import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo } from 'react';

import { AppHeader } from '@ui';
import { styles, getWrapperPaddingBottom } from './styles';
import { IScreenWrapperProps } from './types';

export const ScreenWrapper = ({
  children,
  containerStyle,
  contentContainerStyle,
  withBottomTabBar = false,
  ...headerProps
}: IScreenWrapperProps) => {
  const { bottom } = useSafeAreaInsets();

  const wrapperPaddingBottomStyle = useMemo(
    () => ({
      paddingBottom: getWrapperPaddingBottom(withBottomTabBar, bottom),
    }),
    [withBottomTabBar, bottom],
  );

  return (
    <View style={[styles.wrapper, wrapperPaddingBottomStyle, containerStyle]}>
      {headerProps.headerVariant && <AppHeader {...headerProps} />}

      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>
    </View>
  );
};
