import Toast, {
  type ToastConfig,
  type ToastConfigParams,
} from 'react-native-toast-message';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import type { AppToastProps, ToastCustomProps } from './types';
import { AppText } from '@ui';

export const AppToast = ({ textProps, removeTopOffset }: AppToastProps) => {
  const insets = useSafeAreaInsets();

  const toastConfig: ToastConfig = {
    success: ({ text1, props }: ToastConfigParams<ToastCustomProps>) => {
      const mergedTextProps = { ...textProps, ...props?.textProps, style: [styles.baseToastText, textProps?.style, props?.textProps?.style] };
      return (
        <View style={[styles.baseToast]}>
          <View style={[styles.statusBadge, styles.successBadge]} />
          <View style={styles.baseToastContent}>
            <AppText typography='medium_14' {...mergedTextProps}>
              {text1}
            </AppText>
          </View>
        </View>
      );
    },
    error: ({ text1, props }: ToastConfigParams<ToastCustomProps>) => {
      const mergedTextProps = { ...textProps, ...props?.textProps, style: [styles.baseToastText, textProps?.style, props?.textProps?.style] };
      return (
        <View style={[styles.baseToast]}>
          <View style={[styles.statusBadge, styles.errorBadge]} />
          <View style={styles.baseToastContent}>
            <AppText typography='medium_14' {...mergedTextProps}>
              {text1}
            </AppText>
          </View>
        </View>
      );
    },
    info: ({ text1, props }: ToastConfigParams<ToastCustomProps>) => {
      const mergedTextProps = { ...textProps, ...props?.textProps, style: [styles.baseToastText, textProps?.style, props?.textProps?.style] };
      return (
        <View style={[styles.baseToast]}>
          <View style={[styles.statusBadge, styles.infoBadge]} />
          <View style={styles.baseToastContent}>
            <AppText typography='medium_14' {...mergedTextProps}>
              {text1}
            </AppText>
          </View>
        </View>
      );
    },
    warning: ({ text1, props }: ToastConfigParams<ToastCustomProps>) => {
      const mergedTextProps = { ...textProps, ...props?.textProps, style: [styles.baseToastText, textProps?.style, props?.textProps?.style] };
      return (
        <View style={[styles.baseToast]}>
          <View style={[styles.statusBadge, styles.warningBadge]} />
          <View style={styles.baseToastContent}>
            <AppText typography='medium_14' {...mergedTextProps}>
              {text1}
            </AppText>
          </View>
        </View>
      );
    },
  };

  return <Toast config={toastConfig} topOffset={removeTopOffset ? undefined : insets.top || 20} />;
};
