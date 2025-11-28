import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AppHeader, IAppHeaderProps } from '@ui';

interface IScreenWithScrollWrapperProps extends IAppHeaderProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showsVerticalScrollIndicator?: boolean;
}

export const ScreenWithScrollWrapper = ({
  children,
  headerVariant,
  title,
  customElement,
  headerImageBg,
  headerStyles,
  colorHeader,
  footer = null,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  rightIcons,
  goBackCallback,
}: IScreenWithScrollWrapperProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      {headerVariant && (
        <AppHeader
          headerVariant={headerVariant}
          title={title}
          customElement={customElement}
          headerImageBg={headerImageBg}
          rightIcons={rightIcons}
          headerStyles={headerStyles}
          colorHeader={colorHeader}
          goBackCallback={goBackCallback}
        />
      )}

      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: bottom || 16 },
          contentContainerStyle,
        ]}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        enableOnAndroid
        enableAutomaticScroll
        keyboardShouldPersistTaps="handled"
      >
        {children}

        {footer}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
