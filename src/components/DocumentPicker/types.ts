import { StyleProp, ViewStyle } from 'react-native';

export interface PickedDocument {
  uri: string;
  name: string;
  type?: string;
  size?: number;
}

export interface DocumentPickerProps {
  title?: string;
  description?: string;
  icon?: string | null;
  titleIcon?: string | null;
  iconSize?: number;
  titleIconSize?: number;
  onDocumentSelect?: (document: PickedDocument | null) => void;
  documentTypes?: string[];
  style?: StyleProp<ViewStyle>;
}
