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
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
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

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>

      {footer && (
        <View
          style={[
            styles.footer,
            {
              paddingBottom: bottom || 16,
            },
          ]}
        >
          {footer}
        </View>
      )}
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
