import { AppTextProps } from '@ui';
import { ToastShowParams } from 'react-native-toast-message';

export interface AppToastProps {
  textProps?: Partial<AppTextProps>;
  removeTopOffset?: boolean;
}

export interface ToastCustomProps {
  textProps?: Partial<AppTextProps>;
}

export interface ToastOptionsWithCustomProps
  extends Omit<ToastShowParams, 'text1' | 'type'> {
  textProps?: Partial<AppTextProps>;
}
