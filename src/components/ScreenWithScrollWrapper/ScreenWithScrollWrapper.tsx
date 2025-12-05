import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader, IAppHeaderProps } from '@ui';

interface IScreenWithScrollWrapperProps extends IAppHeaderProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  isFloatFooter?: boolean;
  footerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showsVerticalScrollIndicator?: boolean;
}

export const ScreenWithScrollWrapper = ({
  children,
  footer = null,
  isFloatFooter = true,
  footerStyle,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
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

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {headerProps.headerVariant && <AppHeader {...headerProps} />}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        keyboardShouldPersistTaps="handled"
      >
        {children}

        {!isFloatFooter && footer && FooterComponent}
      </ScrollView>

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
