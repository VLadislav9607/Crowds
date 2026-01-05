import { StyleProp, ViewStyle } from 'react-native';

export interface CategoriesPickerProps {
  selectedCategories?: string[];
  containerStyle?: StyleProp<ViewStyle>;
  onCategoryPress?: (categoryId: string) => void;
  onCategoriesChange?: (categoryIds: string[]) => void;
}
