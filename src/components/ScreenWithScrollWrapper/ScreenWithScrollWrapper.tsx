import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

import { AppHeader } from '@ui';
import { IScreenWithScrollWrapperProps } from './types';
import { COLORS } from '@styles';

export const ScreenWithScrollWrapper = ({
  children,
  footer = null,
  isFloatFooter = true,
  footerStyle,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  showLoader = false,
  resetKeyboardOffset = false,
  onScroll,
  animatedScrollHandler,
  useAnimatedScrollView = false,
  keyboardAvoidingEnabled = true,
  withBottomTabBar = false,
  scrollViewRef,
  autoAdjustKeyboardInsets = true,
  ...headerProps
}: IScreenWithScrollWrapperProps) => {
  const { bottom } = useSafeAreaInsets();

  const FooterComponent = (
    <View
      style={[
        styles.footer,
        isFloatFooter && { paddingBottom: bottom || 16 },
        footerStyle,
      ]}
    >
      {footer}
    </View>
  );

  const ScrollViewComponent = useAnimatedScrollView
    ? Animated.ScrollView
    : ScrollView;
  const scrollProps =
    useAnimatedScrollView && animatedScrollHandler
      ? { onScroll: animatedScrollHandler, scrollEventThrottle: 16 }
      : { onScroll, scrollEventThrottle: 16 };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={keyboardAvoidingEnabled}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? (resetKeyboardOffset ? -bottom : 0) : 0
      }
    >
      {headerProps.headerVariant && <AppHeader {...headerProps} />}
      {showLoader && (
        <View style={styles.footerContainer}>
          <ActivityIndicator size="large" color={COLORS.white} />
        </View>
      )}
      <ScrollViewComponent
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          withBottomTabBar ? styles.noPadding : { paddingBottom: bottom || 16 },
          contentContainerStyle,
        ]}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        automaticallyAdjustKeyboardInsets={autoAdjustKeyboardInsets}
        {...scrollProps}
        keyboardShouldPersistTaps="handled"
      >
        {children}

        {!isFloatFooter && footer && FooterComponent}
      </ScrollViewComponent>

      {isFloatFooter && footer && FooterComponent}
    </KeyboardAvoidingView>
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
  noPadding: {
    paddingBottom: 0,
  },
  footer: {
    backgroundColor: 'transparent',
  },
  footerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.black_50,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
