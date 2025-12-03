import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader, IAppHeaderProps } from '@ui';

interface IScreenWrapperProps extends IAppHeaderProps {
  children: React.ReactNode;
}

export const ScreenWrapper = ({
  children,
  ...headerProps
}: IScreenWrapperProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: bottom || 16 }]}>
      {headerProps.headerVariant && <AppHeader {...headerProps} />}

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
