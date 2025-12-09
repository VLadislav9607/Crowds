import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

import { AppHeader, IAppHeaderProps } from '@ui';

interface IScreenWithScrollWrapperProps extends IAppHeaderProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  isFloatFooter?: boolean;
  footerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showsVerticalScrollIndicator?: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  animatedScrollHandler?: (event: any) => void;
  useAnimatedScrollView?: boolean;
}

export const ScreenWithScrollWrapper = ({
  children,
  footer = null,
  isFloatFooter = true,
  footerStyle,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  onScroll,
  animatedScrollHandler,
  useAnimatedScrollView = false,
  ...headerProps
}: IScreenWithScrollWrapperProps) => {
  const { bottom } = useSafeAreaInsets();

  const FooterComponent = (
    <View
      style={[
        styles.footer,
        {
          paddingBottom: bottom || 16,
          ...footerStyle,
        },
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
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {headerProps.headerVariant && <AppHeader {...headerProps} />}

      <ScrollViewComponent
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        keyboardShouldPersistTaps="handled"
        {...scrollProps}
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
  footer: {
    backgroundColor: 'transparent',
  },
});
