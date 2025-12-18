import { StyleProp, ViewStyle } from 'react-native';
import { DocumentPickerResponse } from 'react-native-document-picker';

export interface DocumentPickerProps {
  title?: string;
  description?: string;
  icon?: string | null;
  titleIcon?: string | null;
  iconSize?: number;
  titleIconSize?: number;
  onDocumentSelect?: (document: DocumentPickerResponse | null) => void;
  documentTypes?: string[];
  style?: StyleProp<ViewStyle>;
}

