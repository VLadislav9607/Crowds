import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { AppText } from '@ui';
import { CategoriesPickerProps } from './types';

export const CategoriesPicker = ({
  selectedCategories = [],
  containerStyle,
  onCategoriesChange,
  onCategoryPress,
}: CategoriesPickerProps) => {
  const categories = [
    'Hospitality',
    'Retail',
    'PR Companies',
    'Private',
    'Music',
    'Politics',
    'TV',
    'Extras',
  ];

  const handleItemPress = (category: string) => {
    onCategoryPress?.(category);

    if (onCategoriesChange) {
      if (selectedCategories.includes(category)) {
        const filteredValues = selectedCategories.filter(v => v !== category);
        onCategoriesChange(filteredValues);
      } else {
        const newValues = [...selectedCategories, category];
        onCategoriesChange(newValues);
      }
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <AppText typography="semibold_18">Categories</AppText>

      <View style={styles.categoriesContainer}>
        {categories.map(category => {
          const isSelected = selectedCategories.includes(category);
          return (
            <TouchableOpacity
              onPress={() => handleItemPress(category)}
              key={category}
              style={[styles.item, isSelected && styles.itemSelected]}
              activeOpacity={0.5}
            >
              <AppText
                typography="regular_14"
                color={isSelected ? 'white' : 'black'}
              >
                {category}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
