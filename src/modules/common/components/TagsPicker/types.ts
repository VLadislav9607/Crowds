import { StyleProp, ViewStyle } from 'react-native';
import { Category, TagValue } from '@modules/profile';

export interface TagsPickerProps {
  selectedCategories: Category[];
  selectedTags?: TagValue[];
  containerStyle?: StyleProp<ViewStyle>;
  categoriesContainerStyle?: StyleProp<ViewStyle>;
  onTagPress?: (tag: TagValue) => void;
  onTagsChange?: (tags: TagValue[]) => void;
}
