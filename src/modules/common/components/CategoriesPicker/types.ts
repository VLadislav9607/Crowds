import { StyleProp, ViewStyle } from 'react-native';
import { Category } from '@modules/profile';

export interface CategoriesPickerProps {
  selectedCategories?: Category[];
  containerStyle?: StyleProp<ViewStyle>;
  onCategoryPress?: (category: Category) => void;
  onCategoriesChange?: (categories: Category[]) => void;
}
