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

export const showMutationErrorToast = (error: unknown) => {
  let message = 'Something went wrong';

  if (error instanceof Error) {
    message = error.message || message;
  } else if (typeof error === 'object' && error !== null) {
    const err = error as Record<string, unknown>;
    if (typeof err.message === 'string' && err.message) {
      message = err.message;
    } else if (typeof err.error === 'string' && err.error) {
      message = err.error;
    }
  } else if (typeof error === 'string' && error) {
    message = error;
  }

  Toast.show({
    text1: message,
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
