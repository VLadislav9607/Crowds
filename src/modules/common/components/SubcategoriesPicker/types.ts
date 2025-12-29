import { StyleProp, ViewStyle } from 'react-native';

export interface SubcategoriesPickerProps {
  selectedCategoryIds: string[];
  selectedSubcategories?: string[];
  containerStyle?: StyleProp<ViewStyle>;
  onSubcategoryPress?: (subcategoryId: string) => void;
  onSubcategoriesChange?: (subcategoryIds: string[]) => void;
}

