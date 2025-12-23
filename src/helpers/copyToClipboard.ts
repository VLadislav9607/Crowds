import { NativeModules } from 'react-native';
import { showErrorToast, showInfoToast } from './showToast';

const { Clipboard } = NativeModules;

interface CopyToClipboardOptions {
  text: string;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
}

export const copyToClipboard = async ({
  text,
  successMessage = 'Copied to clipboard!',
  errorMessage = 'Failed to copy',
  onSuccess,
}: CopyToClipboardOptions) => {
  try {
    if (Clipboard?.setString) {
      await Clipboard.setString(text);
      if (successMessage) {
        showInfoToast(successMessage);
      }
      onSuccess?.();
      return true;
    }
  } catch {
    if (errorMessage) {
      showErrorToast(errorMessage);
    }
    return false;
  }
};
