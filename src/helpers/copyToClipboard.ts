import { Alert, NativeModules } from 'react-native';

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
        Alert.alert('Success', successMessage);
      }
      onSuccess?.();
      return true;
    }
  } catch {
    if (errorMessage) {
      Alert.alert('Error', errorMessage);
    }
    return false;
  }
};
