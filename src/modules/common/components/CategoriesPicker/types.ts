import { StyleProp, ViewStyle } from 'react-native';

export interface CategoriesPickerProps {
  selectedCategories?: string[];
  containerStyle?: StyleProp<ViewStyle>;
  onCategoryPress?: (category: string) => void;
  onCategoriesChange?: (categories: string[]) => void;
}
