import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader, IAppHeaderProps } from '@ui';

interface IScreenWrapperProps extends IAppHeaderProps {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const ScreenWrapper = ({
  children,
  contentContainerStyle,
  ...headerProps
}: IScreenWrapperProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: bottom || 16 }]}>
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
