import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader, IAppHeaderProps } from '@ui';

interface ScreenWrapper extends IAppHeaderProps {
  children: React.ReactNode;
}

export const ScreenWrapper = ({
  children,
  headerVariant,
  title,
  customElement,
  headerImageBg,
  headerStyles,
  colorHeader,
  rightIcons,
  goBackCallback,
}: ScreenWrapper) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: bottom || 16 }]}>
      {headerVariant && (
        <AppHeader
          rightIcons={rightIcons}
          headerVariant={headerVariant}
          title={title}
          customElement={customElement}
          headerImageBg={headerImageBg}
          headerStyles={headerStyles}
          colorHeader={colorHeader}
          goBackCallback={goBackCallback}
        />
      )}

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
