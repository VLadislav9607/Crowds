import { useMemo, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { AppText } from '@ui';
import { Skeleton } from '@components';
import { useGetEventsSubCategories } from '@actions';

import { styles } from './styles';
import { SubcategoriesPickerProps } from './types';

export const SubcategoriesPicker = ({
  selectedCategoryIds,
  selectedSubcategories = [],
  containerStyle,
  onSubcategoriesChange,
  onSubcategoryPress,
}: SubcategoriesPickerProps) => {
  const { data, isLoading } = useGetEventsSubCategories(selectedCategoryIds);
  const subcategories = useMemo(
    () => data?.subCategories ?? [],
    [data?.subCategories],
  );

  const handleItemPress = (subcategoryId: string) => {
    onSubcategoryPress?.(subcategoryId);

    if (onSubcategoriesChange) {
      if (selectedSubcategories.includes(subcategoryId)) {
        const filteredValues = selectedSubcategories.filter(
          v => v !== subcategoryId,
        );
        onSubcategoriesChange(filteredValues);
      } else {
        const newValues = [...selectedSubcategories, subcategoryId];
        onSubcategoriesChange(newValues);
      }
    }
  };

  // Auto-cleanup invalid subcategories when categories change
  useEffect(() => {
    if (subcategories.length === 0) return;

    const validIds = new Set(subcategories.map(s => s.id));
    const validSelectedSubcategories = selectedSubcategories.filter(id =>
      validIds.has(id),
    );

    if (
      validSelectedSubcategories.length !== selectedSubcategories.length &&
      onSubcategoriesChange
    ) {
      onSubcategoriesChange(validSelectedSubcategories);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subcategories]);

  if (selectedCategoryIds.length === 0) {
    return null;
  }

  const renderSkeleton = () => (
    <Skeleton>
      <View style={styles.subcategoriesContainer}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton.Item
            key={index}
            width={70 + Math.random() * 30}
            height={30}
            borderRadius={100}
          />
        ))}
      </View>
    </Skeleton>
  );

  if (!isLoading && subcategories.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <AppText typography="semibold_18">Subcategories</AppText>

      {isLoading ? (
        renderSkeleton()
      ) : (
        <View style={styles.subcategoriesContainer}>
          {subcategories.map(subcategory => {
            const isSelected = selectedSubcategories.includes(subcategory.id);
            return (
              <TouchableOpacity
                onPress={() => handleItemPress(subcategory.id)}
                key={subcategory.id}
                style={[styles.item, isSelected && styles.itemSelected]}
                activeOpacity={0.5}
              >
                <AppText
                  typography="regular_14"
                  color={isSelected ? 'white' : 'black'}
                >
                  {subcategory.title}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};
