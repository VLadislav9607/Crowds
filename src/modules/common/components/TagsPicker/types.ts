import { StyleProp, ViewStyle } from 'react-native';

export interface TagsPickerProps {
  selectedSubcategoryIds: string[];
  selectedTags?: string[];
  containerStyle?: StyleProp<ViewStyle>;
  tagsContainerStyle?: StyleProp<ViewStyle>;
  onTagPress?: (tagId: string) => void;
  onTagsChange?: (tagIds: string[]) => void;
}
