import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { AppText } from '@ui';
import { CategoriesPickerProps } from './types';
import { Category, categoryOptions } from '@modules/profile';

export const CategoriesPicker = ({
  selectedCategories = [],
  containerStyle,
  onCategoriesChange,
  onCategoryPress,
}: CategoriesPickerProps) => {
  const handleItemPress = (categoryValue: Category) => {
    onCategoryPress?.(categoryValue);

    if (onCategoriesChange) {
      if (selectedCategories.includes(categoryValue)) {
        const filteredValues = selectedCategories.filter(
          v => v !== categoryValue,
        );
        onCategoriesChange(filteredValues);
      } else {
        const newValues = [...selectedCategories, categoryValue];
        onCategoriesChange(newValues);
      }
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <AppText typography="semibold_18">Categories</AppText>

      <View style={styles.categoriesContainer}>
        {categoryOptions.map(category => {
          const isSelected = selectedCategories.includes(category.value);
          return (
            <TouchableOpacity
              onPress={() => handleItemPress(category.value)}
              key={category.value}
              style={[styles.item, isSelected && styles.itemSelected]}
              activeOpacity={0.5}
            >
              <AppText
                typography="regular_14"
                color={isSelected ? 'white' : 'black'}
              >
                {category.label}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
