import { PredefinedFileTypes } from '@react-native-documents/picker';
import { StyleProp, ViewStyle } from 'react-native';

export interface PickedDocument {
  uri: string;
  name: string;
  type?: string;
  size?: number;
}

export interface DocumentPickerProps {
  placeholder?: string;
  description?: string;
  icon?: string | null;
  titleIcon?: string | null;
  iconSize?: number;
  titleIconSize?: number;
  selectedDocumentName?: string;
  documentTypes?: PredefinedFileTypes[];
  style?: StyleProp<ViewStyle>;
  onDocumentSelect?: (document: PickedDocument) => void;
  onDocumentRemove?: () => void;
}
