import Toast from 'react-native-toast-message';
import {
  ToastCustomProps,
  ToastOptionsWithCustomProps,
} from 'src/components/AppToast/types';

export const showSuccessToast = (message: string, props?: ToastCustomProps) => {
  Toast.show({
    text1: message,
    type: 'success',
    props,
  });
};

export const showErrorToast = (
  message: string,
  options?: ToastOptionsWithCustomProps,
) => {
  Toast.show({
    text1: message,
    type: 'error',
    ...options,
  });
};

export const showMutationErrorToast = (error: Error) => {
  Toast.show({
    text1: error.message || 'Something went wrong',
    type: 'error',
  });
};

export const showWarningToast = (message: string, props?: ToastCustomProps) => {
  Toast.show({
    text1: message,
    type: 'warning',
    props,
  });
};

export const showInfoToast = (message: string, props?: ToastCustomProps) => {
  Toast.show({
    text1: message,
    type: 'info',
    props,
  });
};
