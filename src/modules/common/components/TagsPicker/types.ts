import { StyleProp, ViewStyle } from 'react-native';

export interface TagsPickerProps {
  selectedTags?: string[];
  containerStyle?: StyleProp<ViewStyle>;
  onTagPress?: (tag: string) => void;
  onTagsChange?: (tags: string[]) => void;
}
