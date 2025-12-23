import Toast from "react-native-toast-message";
import { ToastCustomProps } from "src/components/AppToast/types";



export const showSuccessToast = (message: string, props?: ToastCustomProps) => {
  Toast.show({
    text1: message,
    type: 'success',
    props,
  });
};

export const showErrorToast = (message: string, props?: ToastCustomProps) => {
  Toast.show({
    text1: message,
    type: 'error',
    props,
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