import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { AppText } from '@ui';
import { Skeleton } from '@components';
import { CategoriesPickerProps } from './types';
import { useGetEventsCategories } from '@actions';

export const CategoriesPicker = ({
  selectedCategories = [],
  containerStyle,
  onCategoriesChange,
  onCategoryPress,
}: CategoriesPickerProps) => {
  const { data, isLoading } = useGetEventsCategories();
  const categories = data?.categories ?? [];

  const handleItemPress = (categoryId: string) => {
    onCategoryPress?.(categoryId);

    if (onCategoriesChange) {
      if (selectedCategories.includes(categoryId)) {
        const filteredValues = selectedCategories.filter(v => v !== categoryId);
        onCategoriesChange(filteredValues);
      } else {
        const newValues = [...selectedCategories, categoryId];
        onCategoriesChange(newValues);
      }
    }
  };

  const renderSkeleton = () => (
    <Skeleton>
      <View style={styles.categoriesContainer}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton.Item
            key={index}
            width={80 + Math.random() * 40}
            height={30}
            borderRadius={100}
          />
        ))}
      </View>
    </Skeleton>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <AppText typography="semibold_18">Categories</AppText>

      {isLoading ? (
        renderSkeleton()
      ) : (
        <View style={styles.categoriesContainer}>
          {categories.map(category => {
            const isSelected = selectedCategories.includes(category.id);
            return (
              <TouchableOpacity
                onPress={() => handleItemPress(category.id)}
                key={category.id}
                style={[styles.item, isSelected && styles.itemSelected]}
                activeOpacity={0.5}
              >
                <AppText
                  typography="regular_14"
                  color={isSelected ? 'white' : 'black'}
                >
                  {category.title}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};
